// Módulos de Dados
import { themes } from './themes.js';
import { achievements } from './achievements.js';

// Módulos de Lógica
import { state } from './state.js';
import { dom } from './ui.js';
import { loadState, saveState } from './persistence.js';
import { playBeep, playFinishSound } from './audio.js';
import * as gamification from './gamification.js';
import * as timer from './timer.js';
import * as tasks from './tasks.js';
import * as ui from './ui_controller.js';
import * as shop from './shop_logic.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE CONTROLE (O ORQUESTRADOR) ---

    function handleTimerTick() {
        const finished = timer.updateTimer();
        ui.updateTimerDisplay();
        if (finished) {
            handleSessionEnd();
        }
    }

    function handleSessionEnd() {
        const { previousMode, focusDuration } = timer.switchMode();
        playFinishSound();
        if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);

        if (previousMode === 'focus') {
            const streakInfo = gamification.checkStreak();
            if (streakInfo && streakInfo.bonus > 0) {
                ui.showModal(dom.alertModalOverlay, `Sequência de ${streakInfo.streak} dias! Você ganhou ${streakInfo.bonus} moedas de bônus!`);
            }
            
            const xpGained = Math.floor(focusDuration / 60);
            const leveledUp = gamification.addXP(xpGained);
            gamification.addCoins(5);

            if (leveledUp) {
                playBeep(659, 150, 0.4);
                setTimeout(() => playBeep(784, 300, 0.5), 200);
                ui.showModal(dom.alertModalOverlay, `Parabéns! Você alcançou o Nível ${state.gamification.level}!`);
            }
            
            const endMessage = state.settings.focusMethod === 'pomodoro'
                ? 'Você completou um Pomodoro! Hora de fazer uma pausa.'
                : 'Sessão de foco finalizada!';
            ui.showModal(dom.sessionEndModalOverlay, endMessage);

            dom.xpGainDisplay.textContent = `+${xpGained} XP`;
            dom.coinGainDisplay.textContent = `+5 Moedas`;

        } else {
            ui.showModal(dom.sessionEndModalOverlay, 'Pausa finalizada! Vamos voltar ao trabalho?');
        }
        
        checkGains();
        ui.updateUI();
        ui.renderTasks();
        saveState();
    }
    
    function checkGains() {
        const newMissions = gamification.checkMissionsProgress();
        newMissions.forEach(mission => {
            ui.showToast('mission', mission);
            playBeep(700, 150, 0.4);
        });

        const newAchievements = gamification.checkForAchievements();
        newAchievements.forEach(key => {
            ui.showToast('achievement', achievements[key]);
            playBeep(880, 200, 0.5);
        });

        if (newMissions.length > 0 || newAchievements.length > 0) {
            ui.renderDashboard();
            ui.updateGamificationUI();
            saveState();
        }
    }
    
    function handleAddTask() {
        const taskName = dom.newTaskInput.value.trim();
        const estimate = parseInt(dom.newTaskEstimateInput.value);
        const newTask = tasks.addTask(taskName, estimate);
        if (newTask) {
            dom.newTaskInput.value = '';
            dom.newTaskEstimateInput.value = '1';
            playBeep(440, 100, 0.2);
            if (!state.selectedTaskId || state.tasks.find(t => t.id === state.selectedTaskId)?.completed) {
                tasks.selectTask(newTask.id);
                timer.resetTimer('focus');
                ui.updateUI();
            }
            ui.renderTasks();
            saveState();
        }
    }

    function handleStartPauseLogic() {
        if (state.isRunning) {
            if (state.settings.focusMethod === 'adaptativo' && state.mode === 'focus') {
                clearInterval(state.timerInterval);
                state.timerInterval = null;
                handleSessionEnd();
            } else {
                timer.pauseTimer();
            }
        } else {
            const startResult = timer.startTimer();
            if (startResult === 'NO_TASK') {
                ui.showModal(dom.alertModalOverlay, 'Por favor, selecione uma tarefa para iniciar o foco.');
            } else if (startResult) {
                state.timerInterval = setInterval(handleTimerTick, 1000);
                checkGains();
            }
        }
        ui.updateUI();
    }

    // --- EVENT LISTENERS ---

    // Controles do Timer
    dom.startPauseBtn.addEventListener('click', () => {
        if (!state.audioInitialized) state.audioContext.resume().then(() => state.audioInitialized = true);
        dom.xpGainDisplay.textContent = '';
        dom.coinGainDisplay.textContent = '';
        
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isIOS && !state.isRunning && state.settings.focusMethod === 'pomodoro') {
            if (state.mode === 'focus') {
                dom.iosPromptTitle.textContent = 'Lembrete de Foco';
                dom.iosPromptMessage.textContent = 'Para garantir o alarme no final do foco, recomendamos criar um lembrete. Deseja fazer isso agora?';
            } else {
                dom.iosPromptTitle.textContent = 'Lembrete de Pausa';
                dom.iosPromptMessage.textContent = 'Para garantir o alarme no final da pausa, recomendamos criar um lembrete. Deseja fazer isso agora?';
            }
            ui.showModal(dom.iosStartPromptModalOverlay);
        } else {
            handleStartPauseLogic();
        }
    });

    dom.iosPromptConfirmBtn.addEventListener('click', () => {
        let duration, eventTitle, eventDescription;
        const appUrl = 'https://focototal.vercel.app';

        if (state.mode === 'focus') {
            const task = state.tasks.find(t => t.id === state.selectedTaskId);
            eventTitle = `🎉 Fim do Foco: ${task ? task.name : 'Foco'}`;
            eventDescription = `Sua sessão de foco terminou. Hora de fazer uma pausa! Volte ao app: ${appUrl}`;
            duration = state.settings.focusDuration;
        } else {
            eventTitle = state.mode === 'shortBreak' ? `🚀 Fim da Pausa Curta` : `🏆 Fim da Pausa Longa`;
            eventDescription = `Sua pausa acabou. Hora de voltar ao foco! Volte ao app: ${appUrl}`;
            duration = state.mode === 'shortBreak' ? state.settings.shortBreakDuration : state.settings.longBreakDuration;
        }
        
        const formatDT = (date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const eventStartTime = new Date(Date.now() + duration * 60 * 1000);
        const eventEndTime = new Date(eventStartTime.getTime() + 1 * 60 * 1000);
        
        const icsContent = [
            'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//FocoTotal//PWA//PT',
            'BEGIN:VEVENT', 'UID:' + Date.now() + '@focototal.app', 'DTSTAMP:' + formatDT(new Date()),
            'DTSTART:' + formatDT(eventStartTime), 'DTEND:' + formatDT(eventEndTime),
            'SUMMARY:' + eventTitle, 
            'DESCRIPTION:' + eventDescription,
            'URL;VALUE=URI:' + appUrl,
            'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + eventDescription, 'TRIGGER:-PT0S', 'END:VALARM',
            'END:VEVENT', 'END:VCALENDAR'
        ].join('\r\n');
        
        const base64Content = btoa(unescape(encodeURIComponent(icsContent)));
        window.location.href = `data:text/calendar;base64,${base64Content}`;

        handleStartPauseLogic();
        ui.hideModal(dom.iosStartPromptModalOverlay);
    });

    dom.iosPromptCancelBtn.addEventListener('click', () => {
        handleStartPauseLogic();
        ui.hideModal(dom.iosStartPromptModalOverlay);
    });

    dom.resetBtn.addEventListener('click', () => ui.showModal(dom.resetConfirmModalOverlay));
    dom.resetConfirmBtn.addEventListener('click', () => {
        timer.resetDay();
        ui.renderTasks();
        ui.hideModal(dom.resetConfirmModalOverlay);
        ui.showModal(dom.alertModalOverlay, 'O dia foi zerado com sucesso!');
    });

    // Controles de Tarefas
    dom.addTaskBtn.addEventListener('click', handleAddTask);

    dom.newTaskInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });

    if (dom.toggleCompletedTasksBtn) {
        dom.toggleCompletedTasksBtn.addEventListener('click', () => {
            tasks.toggleShowCompleted();
            ui.updateShowCompletedBtn();
            ui.renderTasks();
            saveState();
        });
    }
    
    dom.taskListEl.addEventListener('click', (e) => {
        if (e.target.matches('.task-edit-input')) {
            return;
        }

        const target = e.target.closest('[data-id], [data-complete-id], [data-edit-id], [data-delete-id]');
        if (!target) return;

        const id = parseInt(target.dataset.id || target.dataset.completeId || target.dataset.editId || target.dataset.deleteId);

        if (target.matches('[data-complete-id]')) {
            const wasCompleted = tasks.toggleTaskCompleted(id);
            if (wasCompleted) {
                const leveledUp = gamification.addXP(10);
                gamification.addCoins(2);
                if (leveledUp) {
                     ui.showModal(dom.alertModalOverlay, `Parabéns! Você alcançou o Nível ${state.gamification.level}!`);
                }
                checkGains();
            }
            if (state.isRunning && state.selectedTaskId === id) {
                timer.pauseTimer();
                timer.resetTimer('focus');
            }
        } else if (target.matches('[data-edit-id]')) {
            tasks.toggleEditState(id);
        } else if (target.matches('[data-delete-id]')) {
            tasks.deleteTask(id);
        } else if (target.matches('[data-id]')) {
            tasks.selectTask(id);
            timer.resetTimer('focus');
        }
        
        ui.renderTasks();
        ui.updateUI();
        ui.updateGamificationUI();
        saveState();
    });

    dom.taskListEl.addEventListener('focusout', (e) => {
        if (e.target.matches('.task-edit-input')) {
            const id = parseInt(e.target.dataset.editInputId);
            tasks.updateTaskName(id, e.target.value.trim());
            ui.renderTasks();
            saveState();
        }
    });
    
    dom.taskListEl.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && e.target.matches('.task-edit-input')) {
            e.target.blur();
        }
    });

    // Outros Controles da UI
    dom.settingsBtn.addEventListener('click', () => {
        ui.renderPaletteSelector();
        ui.showModal(dom.settingsModalOverlay);
    });

    dom.dashboardBtn.addEventListener('click', () => {
        ui.renderDashboard();
        ui.showModal(dom.dashboardModalOverlay);
    });

    if (dom.dashboardModalOverlay) {
        const tabButtons = dom.dashboardModalOverlay.querySelectorAll('.dashboard-tab');
        const tabContents = dom.dashboardModalOverlay.querySelectorAll('.dashboard-tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;

                tabButtons.forEach(btn => {
                    btn.classList.toggle('active', btn === button);
                });

                tabContents.forEach(content => {
                    content.classList.toggle('hidden', content.id !== `dashboard-${tabName}-content`);
                });
            });
        });
    }

    dom.shopBtn.addEventListener('click', () => {
        shop.renderShop();
        ui.showModal(dom.shopModalOverlay);
    });

    dom.shopCollectionsContainer.addEventListener('click', (e) => {
        const buyButton = e.target.closest('.buy-btn');
        if (buyButton && !buyButton.disabled) {
            shop.buyItem(buyButton.dataset.itemId);
        }
    });

    // CORREÇÃO: Adiciona o listener para o botão de Ajuda.
    dom.helpBtn.addEventListener('click', () => {
        const isPomodoro = state.settings.focusMethod === 'pomodoro';
        dom.helpContentPomodoro.classList.toggle('hidden', !isPomodoro);
        dom.helpContentAdaptativo.classList.toggle('hidden', isPomodoro);
        ui.showModal(dom.helpModalOverlay);
    });


    dom.settingsSaveBtn.addEventListener('click', () => {
        state.settings.focusDuration = parseInt(dom.focusDurationInput.value) || 25;
        state.settings.shortBreakDuration = parseInt(dom.shortBreakDurationInput.value) || 5;
        state.settings.longBreakDuration = parseInt(dom.longBreakDurationInput.value) || 15;
        state.settings.longBreakInterval = parseInt(dom.longBreakIntervalInput.value) || 4;
        ui.hideModal(dom.settingsModalOverlay);
        if (!state.isRunning) {
            timer.resetTimer('focus');
            ui.updateUI();
        }
        saveState();
    });

    dom.colorPaletteSelector.addEventListener('click', (e) => {
        const target = e.target.closest('button[data-theme]');
        if (target) {
            state.settings.theme = target.dataset.theme;
            ui.applyTheme(state.settings.theme);
            ui.renderPaletteSelector();
            ui.updateMethodToggleUI();
            ui.updateUI();
            saveState();
        }
    });

    dom.focusMethodToggle.addEventListener('click', (e) => {
        const target = e.target.closest('.method-btn');
        if (target && !state.isRunning) {
            state.settings.focusMethod = target.dataset.method;
            ui.updateMethodToggleUI();
            timer.resetTimer('focus');
            ui.renderTasks();
            ui.updateUI();
            saveState();
        } else if (state.isRunning) {
            ui.showModal(dom.alertModalOverlay, 'Não é possível trocar de modo enquanto o timer está rodando.');
        }
    });

    // Fechar Modais
    [dom.alertModalOverlay, dom.settingsModalOverlay, dom.dashboardModalOverlay, dom.helpModalOverlay, dom.resetConfirmModalOverlay, dom.sessionEndModalOverlay, dom.shopModalOverlay, dom.iosStartPromptModalOverlay].forEach(overlay => {
        overlay.addEventListener('click', (e) => { if (e.target === overlay) ui.hideModal(overlay); });
    });
    [dom.alertModalCloseBtn, dom.sessionEndCloseBtn, dom.dashboardModalCloseBtn, dom.helpModalCloseBtn, dom.resetCancelBtn, dom.shopModalCloseBtn].forEach(btn => {
        if(btn) btn.addEventListener('click', () => ui.hideModal(btn.closest('.modal-overlay')));
    });

    // --- INICIALIZAÇÃO DA APLICAÇÃO ---
    function initializeApp() {
        loadState();
        
        ui.applyTheme(state.settings.theme);
        ui.updateMethodToggleUI();
        ui.renderTasks();
        ui.updateGamificationUI();
        ui.renderDashboard();
        ui.updateUI();
        ui.updateShowCompletedBtn();
        
        if (state.isRunning) {
            state.timerInterval = setInterval(handleTimerTick, 1000);
        }
        
        gamification.generateDailyMissions();
        saveState();
        
        lucide.createIcons();
    }

    initializeApp();
});
