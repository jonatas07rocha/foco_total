/**
 * ui_controller.js
 * Módulo com todas as funções que manipulam o DOM para renderizar a UI.
 */

import { state } from './state.js';
import { dom } from './ui.js';
import { themes } from './themes.js';
import { achievements } from './achievements.js';
import { xpForNextLevel } from './gamification.js';
// CORREÇÃO: Importa os dados da loja para saber quais temas são pagos.
import { shopCollections } from './shop.js';

// --- Funções de Renderização ---

export function renderTasks() {
    const tasksToRender = state.showCompletedTasks ? state.tasks : state.tasks.filter(task => !task.completed);
    dom.taskListEl.innerHTML = tasksToRender.length === 0 ? '<p class="text-muted text-center text-sm">Adicione a sua primeira tarefa!</p>' : '';
    
    tasksToRender.forEach(task => {
        const taskEl = document.createElement('div');
        taskEl.className = `task-item p-3 rounded-lg border-2 border-transparent cursor-pointer ${task.id === state.selectedTaskId ? 'selected' : ''} ${task.completed ? 'opacity-60' : ''}`;
        taskEl.dataset.id = task.id;
        
        taskEl.innerHTML = `
        <div class="flex justify-between items-center">
            <div class="flex items-center min-w-0 flex-grow">
                <button data-complete-id="${task.id}" class="complete-btn text-muted hover:text-green-500 mr-3 flex-shrink-0" aria-label="Marcar tarefa ${task.name} como concluída"><i data-lucide="${task.completed ? 'check-square' : 'square'}" class="w-5 h-5"></i></button>
                ${task.isEditing
                    ? `<input type="text" value="${task.name}" class="task-edit-input rounded px-2 py-1 text-sm flex-grow mx-2 border-2 border-primary focus:outline-none" data-edit-input-id="${task.id}" aria-label="Editar nome da tarefa ${task.name}">`
                    : `<span class="task-name truncate text-sm ${task.completed ? 'line-through' : ''}">${task.name}</span>`
                }
            </div>
            <div class="flex items-center space-x-1 flex-shrink-0">
                <button data-edit-id="${task.id}" class="edit-btn text-muted hover:text-primary transition-colors p-1 rounded-md" aria-label="${task.isEditing ? 'Salvar edição' : 'Editar tarefa'}"><i data-lucide="${task.isEditing ? 'save' : 'pencil'}" class="w-4 h-4"></i></button>
                <button data-delete-id="${task.id}" class="delete-btn text-muted hover:text-red-500 transition-colors p-1 rounded-md" aria-label="Excluir tarefa"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-1 items-center mt-2 pl-8 text-xs text-center">
            ${state.settings.focusMethod === 'pomodoro' ? `<span class="text-muted font-bold flex items-center justify-center" title="Pomodoros"><i data-lucide="check-circle-2" class="w-4 h-4 mr-1 text-green-500"></i>${task.pomodorosCompleted}/${task.pomodoroEstimate}</span>` : ''}
            <span class="text-muted font-bold flex items-center justify-center" title="Tempo de Foco"><i data-lucide="clock" class="w-4 h-4 mr-1 text-primary-light"></i>${formatTime(task.focusTime)}</span>
            <span class="text-muted font-bold flex items-center justify-center" title="Interrupções Internas"><i data-lucide="zap-off" class="w-4 h-4 mr-1"></i>${task.internalInterruptions}</span>
            <span class="text-muted font-bold flex items-center justify-center" title="Interrupções Externas"><i data-lucide="user-x" class="w-4 h-4 mr-1"></i>${task.externalInterruptions}</span>
        </div>`;
        dom.taskListEl.appendChild(taskEl);
    });
    updateCurrentTaskDisplay();
    lucide.createIcons();
}

export function renderMissions() {
    dom.dashboardMissionsContent.innerHTML = '';
    if (state.gamification.dailyMissions.length === 0) {
        dom.dashboardMissionsContent.innerHTML = '<p class="text-muted text-center">Nenhuma missão para hoje. Volte amanhã!</p>';
        return;
    }
    const stats = {
        focusTimeToday: state.tasks.reduce((acc, task) => acc + task.focusTime, 0),
        tasksCompletedToday: state.tasks.filter(t => t.completed).length,
        pomodorosCompletedToday: state.tasks.reduce((acc, task) => acc + task.pomodorosCompleted, 0),
    };

    state.gamification.dailyMissions.forEach(mission => {
        const isCompleted = state.gamification.completedMissions.includes(mission.id);
        const currentProgress = Math.min(stats[mission.metric] || 0, mission.goal);
        const progressPercent = (currentProgress / mission.goal) * 100;

        const el = document.createElement('div');
        el.className = `mission-item p-4 rounded-lg ${isCompleted ? 'completed' : ''}`;
        el.innerHTML = `
            <div class="flex items-start space-x-4">
                <span class="text-3xl">${mission.emoji}</span>
                <div class="flex-grow">
                    <p class="font-bold">${mission.title}</p>
                    <p class="text-sm text-muted">${mission.description}</p>
                    <div class="flex items-center text-xs mt-2 space-x-4">
                        <span style="color: rgb(var(--color-xp-bar));"><strong>+${mission.rewards.xp}</strong> XP</span>
                        <span class="text-coin"><strong>+${mission.rewards.coins}</strong> Moedas</span>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div class="w-full bg-gray-700 rounded-full h-2.5">
                    <div class="mission-progress-bar h-2.5 rounded-full" style="width: ${progressPercent}%"></div>
                </div>
                <p class="text-right text-xs mt-1 text-muted">${Math.floor(currentProgress)} / ${mission.goal}</p>
            </div>
        `;
        dom.dashboardMissionsContent.appendChild(el);
    });
}

export function renderAchievements() {
    dom.dashboardAchievementsContent.innerHTML = '';
    Object.keys(achievements).forEach(key => {
        const achievement = achievements[key];
        const isUnlocked = state.gamification.unlockedAchievements.includes(key);
        const el = document.createElement('div');
        el.className = `achievement-item p-4 rounded-lg flex items-center space-x-4 ${isUnlocked ? 'unlocked' : 'opacity-60'}`;
        el.innerHTML = `
            <span class="text-5xl">${achievement.emoji}</span>
            <div>
                <p class="font-bold">${achievement.name}</p>
                <p class="text-sm text-muted">${achievement.description}</p>
            </div>
        `;
        dom.dashboardAchievementsContent.appendChild(el);
    });
}

export function renderDashboard() {
    dom.dashboardCurrentStreak.textContent = state.gamification.currentStreak;
    dom.dashboardLongestStreak.textContent = state.gamification.longestStreak;
    
    if (state.tasks.length === 0) {
        dom.dashboardDailyReport.innerHTML = '<p class="text-muted text-center text-sm">Nenhuma tarefa para exibir.</p>';
    } else {
        let statsHTML = '';
        [...state.tasks].sort((a, b) => a.completed - b.completed).forEach(task => {
            statsHTML += `
            <div class="stats-item p-3 rounded-lg ${task.completed ? 'opacity-60' : ''}">
                <p class="font-bold truncate ${task.completed ? 'line-through' : ''}">${task.name}</p>
                <div class="grid grid-cols-4 gap-2 mt-2 text-center text-xs">
                    <div><p class="text-xs text-muted">Foco</p><p class="font-semibold">${formatTime(task.focusTime)}</p></div>
                    <div><p class="text-xs text-muted">Ciclos</p><p class="font-semibold">${task.pomodorosCompleted}/${task.pomodoroEstimate}</p></div>
                    <div><p class="text-xs text-muted">Int. Interna</p><p class="font-semibold">${task.internalInterruptions}</p></div>
                    <div><p class="text-xs text-muted">Int. Externa</p><p class="font-semibold">${task.externalInterruptions}</p></div>
                </div>
            </div>`;
        });
        dom.dashboardDailyReport.innerHTML = statsHTML;
    }

    renderMissions();
    renderAchievements();
}

// CORREÇÃO: A lógica agora identifica dinamicamente os temas gratuitos.
export function renderPaletteSelector() {
    dom.colorPaletteSelector.innerHTML = '';
    
    // 1. Cria um conjunto com todos os IDs de temas que estão à venda na loja.
    const paidThemeIds = new Set();
    for (const collectionId in shopCollections) {
        for (const itemId in shopCollections[collectionId].items) {
            paidThemeIds.add(shopCollections[collectionId].items[itemId].themeId);
        }
    }

    // 2. Filtra a lista principal de temas para encontrar os que NÃO são pagos.
    const defaultThemes = Object.keys(themes).filter(themeId => !paidThemeIds.has(themeId));
    
    // 3. Combina os temas padrão (gratuitos) com os temas que o usuário desbloqueou.
    const availableThemeIds = new Set([...defaultThemes, ...state.gamification.unlockedThemes]);

    // 4. Renderiza os botões para cada tema disponível.
    availableThemeIds.forEach(themeId => {
        if (!themes[themeId]) return; 

        const theme = themes[themeId];
        const button = document.createElement('button');
        button.dataset.theme = themeId;
        button.title = theme.name;
        button.className = `h-12 rounded-lg border-2 transition-all transform flex flex-col items-center justify-center p-1 text-xs font-semibold ${state.settings.theme === themeId ? 'border-white scale-105' : 'border-transparent'}`;
        button.style.backgroundColor = theme['--color-bg-shell'];
        button.style.color = theme['--color-text-muted'];
        button.innerHTML = `<div class="w-full h-4 rounded" style="background-color: rgb(${theme['--color-primary-rgb']})"></div><span class="mt-1">${theme.name.split(' ')[0]}</span>`;
        dom.colorPaletteSelector.appendChild(button);
    });
}


// --- Funções de Atualização da UI ---

export function updateGamificationUI() {
    const nextLevelXP = xpForNextLevel();
    dom.levelDisplay.textContent = state.gamification.level;
    dom.xpDisplay.textContent = state.gamification.xp;
    dom.xpNextLevelDisplay.textContent = nextLevelXP;
    dom.xpBarFill.style.width = `${(state.gamification.xp / nextLevelXP) * 100}%`;
    dom.coinsDisplay.textContent = state.gamification.coins;
    dom.streakDisplay.textContent = state.gamification.currentStreak;
}

export function updateTimerDisplay() {
    const totalSecondsAbs = Math.abs(state.timeRemaining);
    const minutes = Math.floor((totalSecondsAbs % 3600) / 60);
    const seconds = totalSecondsAbs % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    dom.timerDisplay.textContent = display;
    document.title = `${display} - Foco Total`;
    const circumference = 2 * Math.PI * 45;
    let progress = (state.settings.focusMethod === 'pomodoro' || state.mode !== 'focus') ? ((state.totalTime > 0) ? (state.totalTime - state.timeRemaining) / state.totalTime : 0) : (state.isRunning ? 1 : 0);
    dom.progressRing.style.strokeDasharray = circumference;
    dom.progressRing.style.strokeDashoffset = circumference * (1 - progress);
}

export function updateCurrentTaskDisplay() {
    const task = state.tasks.find(t => t.id === state.selectedTaskId);
    dom.currentTaskDisplay.textContent = task ? task.name : 'Nenhuma tarefa selecionada';
    dom.pomodoroCyclesEl.innerHTML = '';
    if (state.settings.focusMethod !== 'pomodoro' || !state.settings.longBreakInterval || state.settings.longBreakInterval <= 0) return;
    const cyclesToShow = state.pomodoroSessionCount % state.settings.longBreakInterval;
    for(let i = 0; i < state.settings.longBreakInterval; i++) {
        const icon = i < cyclesToShow ? '<i data-lucide="check-circle-2" class="text-green-500"></i>' : '<i data-lucide="circle" class="text-muted"></i>';
        dom.pomodoroCyclesEl.innerHTML += `<span class="transition-all">${icon}</span>`;
    }
    lucide.createIcons();
}

export function updateUI() {
    updateTimerDisplay();
    const currentTheme = themes[state.settings.theme] || themes.brasil_dark;

    if (state.mode === 'shortBreak') dom.progressRing.style.stroke = currentTheme['--color-break-short'];
    else if (state.mode === 'longBreak') dom.progressRing.style.stroke = currentTheme['--color-break-long'];
    else dom.progressRing.style.stroke = `rgb(${currentTheme['--color-primary-rgb']})`;
    
    dom.progressRing.classList.toggle('breathing', state.settings.focusMethod === 'adaptativo' && state.mode === 'focus' && state.isRunning);

    let btnIcon, btnBgClass, ariaLabelText;
    if (state.settings.focusMethod === 'pomodoro' || state.mode !== 'focus') {
        btnIcon = state.isRunning ? 'pause' : 'play';
        btnBgClass = state.isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-primary-focus hover:bg-primary-darker';
        ariaLabelText = state.isRunning ? 'Pausar Timer' : 'Iniciar Timer';
    } else {
        btnIcon = state.isRunning ? 'square' : 'play';
        btnBgClass = state.isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-primary-focus hover:bg-primary-darker';
        ariaLabelText = state.isRunning ? 'Parar Foco Adaptativo' : 'Iniciar Foco Adaptativo';
    }
    dom.startPauseBtn.className = `w-20 h-20 text-white font-bold rounded-full text-base transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center ${btnBgClass}`;
    dom.startPauseBtn.innerHTML = `<i data-lucide="${btnIcon}" class="w-8 h-8 ${btnIcon === 'play' ? 'pl-1' : ''}"></i>`;
    dom.startPauseBtn.setAttribute('aria-label', ariaLabelText);
    dom.internalInterruptBtn.style.display = (state.isRunning && state.mode === 'focus') ? 'flex' : 'none';
    dom.externalInterruptBtn.style.display = (state.isRunning && state.mode === 'focus') ? 'flex' : 'none';
    updateCurrentTaskDisplay();
    lucide.createIcons();
}

export function updateMethodToggleUI() {
    document.querySelectorAll('#focus-method-toggle .method-btn').forEach(btn => {
        const isSelected = btn.dataset.method === state.settings.focusMethod;
        btn.classList.toggle('bg-primary-focus', isSelected);
        btn.classList.toggle('text-white', isSelected);
        const isDarkTheme = state.settings.theme.includes('_dark'); 
        btn.classList.toggle(isDarkTheme ? 'text-gray-400' : 'text-gray-500', !isSelected);
    });
    dom.pomodoroCyclesEl.style.display = state.settings.focusMethod === 'pomodoro' ? 'flex' : 'none';
    dom.newTaskEstimateInput.style.display = state.settings.focusMethod === 'pomodoro' ? 'inline-block' : 'none';
    dom.newTaskEstimateLabel.style.display = state.settings.focusMethod === 'pomodoro' ? 'inline-block' : 'none';
}

export function updateShowCompletedBtn() {
    if (dom.toggleCompletedTasksBtn) {
        dom.toggleCompletedTasksBtn.textContent = state.showCompletedTasks ? 'Ocultar Concluídas' : 'Mostrar Concluídas';
        dom.toggleCompletedTasksBtn.classList.toggle('active', state.showCompletedTasks);
    }
}


// --- Funções de Utilidade da UI ---

export function showModal(modalOverlay, message) {
    const messageElId = modalOverlay.id.replace('-overlay', '-message');
    const messageEl = document.getElementById(messageElId);
    if(messageEl && message) messageEl.textContent = message;
    modalOverlay.classList.add('visible');
}

export function hideModal(modalOverlay) {
    modalOverlay.classList.remove('visible');
}

export function showToast(type, data) {
    let toastEl, nameEl, emojiEl;
    if (type === 'achievement') {
        toastEl = dom.achievementToast;
        nameEl = dom.achievementToastName;
        emojiEl = null;
    } else { 
        toastEl = dom.missionToast;
        nameEl = dom.missionToastName;
        emojiEl = dom.missionToastEmoji;
    }
    nameEl.textContent = data.name || data.title;
    if (emojiEl && data.emoji) emojiEl.textContent = data.emoji;
    toastEl.classList.add('show');
    setTimeout(() => {
        toastEl.classList.remove('show');
    }, 4000);
}

export function applyTheme(themeName) {
    const theme = themes[themeName] || themes.brasil_dark; 
    const root = document.documentElement;
    Object.keys(theme).forEach(key => { if (key !== 'name') root.style.setProperty(key, theme[key]); });
    dom.themeColorMeta.setAttribute('content', theme['--color-bg-shell']);
}

export function formatTime(totalSeconds) {
    if (!totalSeconds || totalSeconds < 1) return `0m`;
    const minutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) return `${hours}h ${remainingMinutes}m`;
    return `${minutes}m`;
}
