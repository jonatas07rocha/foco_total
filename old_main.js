// Importa a definição de temas e missões
import { themes } from './themes.js';
import { missionsData } from './missions.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DO DOM ---
    const themeColorMeta = document.getElementById('theme-color-meta');
    const timerDisplay = document.getElementById('timer-display');
    const startPauseBtn = document.getElementById('start-pause-btn');
    const internalInterruptBtn = document.getElementById('internal-interrupt-btn');
    const externalInterruptBtn = document.getElementById('external-interrupt-btn');
    const resetBtn = document.getElementById('reset-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const dashboardBtn = document.getElementById('dashboard-btn');
    const helpBtn = document.getElementById('help-btn');
    const progressRing = document.getElementById('progress-ring');
    const newTaskInput = document.getElementById('new-task-input');
    const newTaskEstimateInput = document.getElementById('new-task-estimate');
    const newTaskEstimateLabel = document.getElementById('new-task-estimate-label');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskListEl = document.getElementById('task-list');
    const currentTaskDisplay = document.getElementById('current-task-display');
    const pomodoroCyclesEl = document.getElementById('pomodoro-cycles');
    const focusMethodToggle = document.getElementById('focus-method-toggle');
    const toggleCompletedTasksBtn = document.getElementById('toggle-completed-tasks-btn');
    const alertModalOverlay = document.getElementById('alert-modal-overlay');
    const alertModalCloseBtn = document.getElementById('alert-modal-close-btn');
    const sessionEndModalOverlay = document.getElementById('session-end-modal-overlay');
    const sessionEndCloseBtn = document.getElementById('session-end-close-btn');
    const settingsModalOverlay = document.getElementById('settings-modal-overlay');
    const settingsSaveBtn = document.getElementById('settings-save-btn');
    const helpModalOverlay = document.getElementById('help-modal-overlay');
    const helpModalCloseBtn = document.getElementById('help-modal-close-btn');
    const resetConfirmModalOverlay = document.getElementById('reset-confirm-modal-overlay');
    const resetConfirmBtn = document.getElementById('reset-confirm-btn');
    const resetCancelBtn = document.getElementById('reset-cancel-btn');
    const focusDurationInput = document.getElementById('focus-duration');
    const shortBreakDurationInput = document.getElementById('short-break-duration');
    const longBreakDurationInput = document.getElementById('long-break-duration');
    const longBreakIntervalInput = document.getElementById('long-break-interval');
    const installBanner = document.getElementById('install-banner');
    const installBtn = document.getElementById('install-btn');
    const installDismissBtn = document.getElementById('install-dismiss-btn');
    const colorPaletteSelector = document.getElementById('color-palette-selector');
    // CORREÇÃO: Adicionando os elementos do modal do iOS que faltavam
    const iosStartPromptModalOverlay = document.getElementById('ios-start-prompt-modal-overlay');
    const iosPromptConfirmBtn = document.getElementById('ios-prompt-confirm-btn');
    const iosPromptCancelBtn = document.getElementById('ios-prompt-cancel-btn');
    const iosPromptTitle = document.getElementById('ios-prompt-title');
    const iosPromptMessage = document.getElementById('ios-prompt-message');

    // --- ELEMENTOS DE GAMIFICATION ---
    const levelDisplay = document.getElementById('level-display');
    const xpDisplay = document.getElementById('xp-display');
    const xpNextLevelDisplay = document.getElementById('xp-next-level-display');
    const xpBarFill = document.getElementById('xp-bar-fill');
    const xpGainDisplay = document.getElementById('xp-gain-display');
    const coinGainDisplay = document.getElementById('coin-gain-display');
    const achievementToast = document.getElementById('achievement-toast');
    const achievementToastName = document.getElementById('achievement-toast-name');
    const missionToast = document.getElementById('mission-toast');
    const missionToastName = document.getElementById('mission-toast-name');
    const missionToastEmoji = document.getElementById('mission-toast-emoji');
    const coinsDisplay = document.getElementById('coins-display');
    const streakDisplay = document.getElementById('streak-display');
    
    // --- ELEMENTOS DO DASHBOARD ---
    const dashboardModalOverlay = document.getElementById('dashboard-modal-overlay');
    const dashboardModalCloseBtn = document.getElementById('dashboard-modal-close-btn');
    const dashboardStatsContent = document.getElementById('dashboard-stats-content');
    const dashboardMissionsContent = document.getElementById('dashboard-missions-content');
    const dashboardAchievementsContent = document.getElementById('dashboard-achievements-content');
    const dashboardCurrentStreak = document.getElementById('dashboard-current-streak');
    const dashboardLongestStreak = document.getElementById('dashboard-longest-streak');
    const dashboardDailyReport = document.getElementById('dashboard-daily-report');

    // --- ESTADO DA APLICAÇÃO ---
    let timerInterval, isRunning = false, mode = 'focus', timeRemaining, totalTime, endTime;
    let tasks = [], selectedTaskId = null, pomodoroSessionCount = 0, uninterruptedSessionsToday = 0;
    let settings = { 
        focusDuration: 25, 
        shortBreakDuration: 5, 
        longBreakDuration: 15, 
        longBreakInterval: 4,
        theme: 'brasil_dark'
    };
    let focusMethod = 'pomodoro';
    let deferredInstallPrompt = null;
    let showCompletedTasks = false;
    let changedThemesCount = new Set();

    // --- ESTADO DE GAMIFICATION ---
    let gamification = {
        level: 1,
        xp: 0,
        coins: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastSessionDate: null,
        unlockedAchievements: [],
        dailyMissions: [],
        completedMissions: [],
        lastMissionDate: null,
    };

    const achievements = {
        FIRST_STEP: { name: 'Primeiro Passo', description: 'Complete sua primeira sessão de foco.', emoji: '🚀' },
        FOCUSED_BEGINNER: { name: 'Iniciante Focado', description: 'Complete 5 sessões de foco.', emoji: '🎯' },
        TASK_MASTER: { name: 'Mestre das Tarefas', description: 'Complete 10 tarefas em um dia.', emoji: '✔️' },
        MARATHONER: { name: 'Maratonista', description: 'Foque por um total de 4 horas em um dia.', emoji: '🏃' },
        STREAK_STARTER: { name: 'Começando a Pegar Fogo', description: 'Alcance uma sequência de 3 dias.', emoji: '🔥' },
        ON_FIRE: { name: 'Em Chamas!', description: 'Alcance uma sequência de 7 dias.', emoji: '🔥🔥' },
        COIN_COLLECTOR: { name: 'Colecionador de Moedas', description: 'Acumule 500 moedas.', emoji: '💰' },
        LEVEL_5: { name: 'Nível 5', description: 'Alcance o nível 5.', emoji: '⭐' },
        LEVEL_10: { name: 'Nível 10', description: 'Alcance o nível 10.', emoji: '🌟' }
    };

    // --- LÓGICA DE GAMIFICATION ---
    const xpForNextLevel = () => Math.floor(100 * Math.pow(1.5, gamification.level - 1));

    const updateGamificationUI = () => {
        const nextLevelXP = xpForNextLevel();
        levelDisplay.textContent = gamification.level;
        xpDisplay.textContent = gamification.xp;
        xpNextLevelDisplay.textContent = nextLevelXP;
        xpBarFill.style.width = `${(gamification.xp / nextLevelXP) * 100}%`;
        coinsDisplay.textContent = gamification.coins;
        streakDisplay.textContent = gamification.currentStreak;
    };
    
    const showToast = (type, data) => {
        let toastEl, nameEl, emojiEl;

        if (type === 'achievement') {
            toastEl = achievementToast;
            nameEl = achievementToastName;
            emojiEl = null;
        } else { 
            toastEl = missionToast;
            nameEl = missionToastName;
            emojiEl = missionToastEmoji;
        }

        nameEl.textContent = data.name || data.title;
        if (emojiEl && data.emoji) emojiEl.textContent = data.emoji;

        toastEl.classList.add('show');
        setTimeout(() => {
            toastEl.classList.remove('show');
        }, 4000);
    };

    const unlockAchievement = (key) => {
        if (!gamification.unlockedAchievements.includes(key)) {
            gamification.unlockedAchievements.push(key);
            showToast('achievement', achievements[key]);
            playBeep(880, 200, 0.5);
            renderAchievements();
            saveState();
        }
    };
    
    const getDailyStats = () => ({
        focusTimeToday: tasks.reduce((acc, task) => acc + task.focusTime, 0),
        tasksCompletedToday: tasks.filter(t => t.completed).length,
        pomodorosCompletedToday: tasks.reduce((acc, task) => acc + task.pomodorosCompleted, 0),
        uninterruptedSessionsToday: uninterruptedSessionsToday,
    });

    const checkMissionsProgress = () => {
        const stats = getDailyStats();
        const allMissions = [...gamification.dailyMissions, ...Object.values(missionsData).filter(m => m.type === 'secret')];

        allMissions.forEach(mission => {
            if (gamification.completedMissions.includes(mission.id)) return;

            let completed = false;
            if (mission.type === 'daily') {
                const currentProgress = stats[mission.metric] || 0;
                if (currentProgress >= mission.goal) {
                    completed = true;
                }
            } else if (mission.type === 'secret') {
                const hour = new Date().getHours();
                if (mission.id === 'SECRET_NIGHT_OWL' && isRunning && hour >= 22) completed = true;
                if (mission.id === 'SECRET_EARLY_BIRD' && isRunning && hour < 6) completed = true;
                if (mission.id === 'SECRET_THEME_EXPLORER' && changedThemesCount.size >= 3) completed = true;
            }

            if (completed) {
                gamification.completedMissions.push(mission.id);
                addXP(mission.rewards.xp);
                addCoins(mission.rewards.coins);
                showToast('mission', mission);
                playBeep(700, 150, 0.4);
                renderMissions();
            }
        });
        saveState();
    };

    const checkForAchievements = () => {
        const stats = getDailyStats();
        if (stats.pomodorosCompletedToday >= 1) unlockAchievement('FIRST_STEP');
        if (stats.pomodorosCompletedToday >= 5) unlockAchievement('FOCUSED_BEGINNER');
        if (stats.tasksCompletedToday >= 10) unlockAchievement('TASK_MASTER');
        if (stats.focusTimeToday >= 14400) unlockAchievement('MARATHONER');
        if (gamification.currentStreak >= 3) unlockAchievement('STREAK_STARTER');
        if (gamification.currentStreak >= 7) unlockAchievement('ON_FIRE');
        if (gamification.coins >= 500) unlockAchievement('COIN_COLLECTOR');
        if (gamification.level >= 5) unlockAchievement('LEVEL_5');
        if (gamification.level >= 10) unlockAchievement('LEVEL_10');
    };

    const addXP = (amount) => {
        if (!amount) return;
        gamification.xp += amount;
        xpGainDisplay.textContent = `+${amount} XP`;
        let nextLevelXP = xpForNextLevel();
        while (gamification.xp >= nextLevelXP) {
            gamification.xp -= nextLevelXP;
            gamification.level++;
            playBeep(659, 150, 0.4);
            setTimeout(() => playBeep(784, 300, 0.5), 200);
            showModal(alertModalOverlay, `Parabéns! Você alcançou o Nível ${gamification.level}!`);
            nextLevelXP = xpForNextLevel();
        }
        updateGamificationUI();
        checkForAchievements();
    };
    
    const addCoins = (amount) => {
        if (!amount) return;
        gamification.coins += amount;
        coinGainDisplay.textContent = `+${amount} Moedas`;
        updateGamificationUI();
        checkForAchievements();
    };

    const checkStreak = () => {
        const today = new Date().toISOString().slice(0, 10);
        if (gamification.lastSessionDate === today) return;
        
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

        if (gamification.lastSessionDate === yesterday) {
            gamification.currentStreak++;
            const bonusCoins = gamification.currentStreak * 2;
            addCoins(bonusCoins);
            showModal(alertModalOverlay, `Sequência de ${gamification.currentStreak} dias! Você ganhou ${bonusCoins} moedas de bônus!`);
        } else {
            gamification.currentStreak = 1;
        }

        if (gamification.currentStreak > gamification.longestStreak) {
            gamification.longestStreak = gamification.currentStreak;
        }
        
        gamification.lastSessionDate = today;
        updateGamificationUI();
    };

    const generateDailyMissions = () => {
        const today = new Date().toISOString().slice(0, 10);
        if (gamification.lastMissionDate === today) return; 

        const allDailyMissions = Object.values(missionsData).filter(m => m.type === 'daily');
        const shuffled = allDailyMissions.sort(() => 0.5 - Math.random());
        gamification.dailyMissions = shuffled.slice(0, 3);
        
        gamification.completedMissions = gamification.completedMissions.filter(id => missionsData[id]?.type === 'secret');
        gamification.lastMissionDate = today;
        changedThemesCount.clear();
        saveState();
    };

    const renderMissions = () => {
        dashboardMissionsContent.innerHTML = '';
        if (gamification.dailyMissions.length === 0) {
            dashboardMissionsContent.innerHTML = '<p class="text-muted text-center">Nenhuma missão para hoje. Volte amanhã!</p>';
            return;
        }
        const stats = getDailyStats();
        gamification.dailyMissions.forEach(mission => {
            const isCompleted = gamification.completedMissions.includes(mission.id);
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
            dashboardMissionsContent.appendChild(el);
        });
    };

    const renderAchievements = () => {
        dashboardAchievementsContent.innerHTML = '';
        Object.keys(achievements).forEach(key => {
            const achievement = achievements[key];
            const isUnlocked = gamification.unlockedAchievements.includes(key);
            const el = document.createElement('div');
            el.className = `achievement-item p-4 rounded-lg flex items-center space-x-4 ${isUnlocked ? 'unlocked' : 'opacity-60'}`;
            el.innerHTML = `
                <span class="text-5xl">${achievement.emoji}</span>
                <div>
                    <p class="font-bold">${achievement.name}</p>
                    <p class="text-sm text-muted">${achievement.description}</p>
                </div>
            `;
            dashboardAchievementsContent.appendChild(el);
        });
    };
    
    const renderDashboard = () => {
        // Renderiza estatísticas gerais
        dashboardCurrentStreak.textContent = gamification.currentStreak;
        dashboardLongestStreak.textContent = gamification.longestStreak;
        
        // CORREÇÃO: Renderiza o relatório detalhado por tarefa
        if (tasks.length === 0) {
            dashboardDailyReport.innerHTML = '<p class="text-muted text-center text-sm">Nenhuma tarefa para exibir.</p>';
        } else {
            let statsHTML = '';
            [...tasks].sort((a, b) => a.completed - b.completed).forEach(task => {
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
            dashboardDailyReport.innerHTML = statsHTML;
        }

        renderMissions();
        renderAchievements();
    };

    // --- LÓGICA DE BADGING E ÁUDIO ---
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let audioInitialized = false;
    const _playBeepInternal = (frequency, duration, volume) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    };
    const playBeep = (frequency = 800, duration = 200, volume = 0.3) => {
        if (audioContext.state === 'suspended') audioContext.resume().then(() => _playBeepInternal(frequency, duration, volume));
        else _playBeepInternal(frequency, duration, volume);
    };
    const playFinishSound = () => {
        playBeep(523, 150, 0.4);
        setTimeout(() => playBeep(659, 150, 0.4), 200);
        setTimeout(() => playBeep(784, 300, 0.5), 400);
    };

    // --- LÓGICA DE INSTALAÇÃO PWA ---
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredInstallPrompt = e; if (!localStorage.getItem('installBannerDismissed')) installBanner.style.display = 'block'; });
    installBtn.addEventListener('click', () => { if (deferredInstallPrompt) { deferredInstallPrompt.prompt(); deferredInstallPrompt.userChoice.then(() => { deferredInstallPrompt = null; installBanner.style.display = 'none'; }); } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) { showModal(alertModalOverlay, 'Para instalar no iOS, toque em Compartilhar e "Adicionar à Tela de Início".'); } });
    installDismissBtn.addEventListener('click', () => { localStorage.setItem('installBannerDismissed', 'true'); installBanner.style.display = 'none'; });
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) installBanner.style.display = 'none';

    // --- FUNÇÕES DE GESTÃO DE TEMA E MODO ---
    const applyTheme = (themeName) => {
        const theme = themes[themeName] || themes.brasil_dark; 
        const root = document.documentElement;
        Object.keys(theme).forEach(key => { if (key !== 'name') root.style.setProperty(key, theme[key]); });
        themeColorMeta.setAttribute('content', theme['--color-bg-shell']);
        if (gamification.lastMissionDate === new Date().toISOString().slice(0, 10)) {
            changedThemesCount.add(themeName);
            checkMissionsProgress();
        }
    };

    const renderPaletteSelector = () => {
        colorPaletteSelector.innerHTML = '';
        Object.keys(themes).sort().forEach(key => {
            const theme = themes[key];
            const button = document.createElement('button');
            button.dataset.theme = key;
            button.title = theme.name;
            button.className = `h-12 rounded-lg border-2 transition-all transform flex flex-col items-center justify-center p-1 text-xs font-semibold ${settings.theme === key ? 'border-white scale-105' : 'border-transparent'}`;
            button.style.backgroundColor = theme['--color-bg-shell'];
            button.style.color = theme['--color-text-muted'];
            button.innerHTML = `<div class="w-full h-4 rounded" style="background-color: rgb(${theme['--color-primary-rgb']})"></div><span class="mt-1">${theme.name.split(' ')[0]}</span>`;
            colorPaletteSelector.appendChild(button);
        });
    };

    const updateMethodToggleUI = () => {
        document.querySelectorAll('#focus-method-toggle .method-btn').forEach(btn => {
            const isSelected = btn.dataset.method === focusMethod;
            btn.classList.toggle('bg-primary-focus', isSelected);
            btn.classList.toggle('text-white', isSelected);
            const isDarkTheme = settings.theme.includes('_dark'); 
            btn.classList.toggle(isDarkTheme ? 'text-gray-400' : 'text-gray-500', !isSelected);
        });
        pomodoroCyclesEl.style.display = focusMethod === 'pomodoro' ? 'flex' : 'none';
        newTaskEstimateInput.style.display = focusMethod === 'pomodoro' ? 'inline-block' : 'none';
        newTaskEstimateLabel.style.display = focusMethod === 'pomodoro' ? 'inline-block' : 'none';
        if (!isRunning) resetTimer('focus');
    };

    // --- FUNÇÕES DO TIMER ---
    const showModal = (modalOverlay, message) => {
        const messageElId = modalOverlay.id.replace('-overlay', '-message');
        const messageEl = document.getElementById(messageElId);
        if(messageEl && message) messageEl.textContent = message;
        modalOverlay.classList.add('visible');
    };
    const hideModal = (modalOverlay) => modalOverlay.classList.remove('visible');
    
    const startTimer = () => {
        if (isRunning) return;
        if (!selectedTaskId && mode === 'focus') {
            showModal(alertModalOverlay, 'Por favor, selecione uma tarefa para iniciar o foco.');
            return;
        }
        if (mode === 'focus') checkMissionsProgress(); 
        
        if (focusMethod === 'pomodoro' || mode !== 'focus') {
            timeRemaining = (settings[`${mode}Duration`] || 25) * 60;
            totalTime = timeRemaining;
        } else {
            timeRemaining = 0;
            totalTime = 1;
        }
        isRunning = true;
        endTime = Date.now() + (focusMethod === 'pomodoro' || mode !== 'focus' ? timeRemaining * 1000 : 0);
        updateUI();
        timerInterval = setInterval(updateTimer, 1000);
    };

    const pauseTimer = () => {
        if (!isRunning) return;
        isRunning = false;
        clearInterval(timerInterval);
        if (focusMethod === 'pomodoro' || mode !== 'focus') timeRemaining = Math.round((endTime - Date.now()) / 1000);
        saveState();
        updateUI();
    };

    const updateTimerDisplay = () => {
        const totalSecondsAbs = Math.abs(timeRemaining);
        const minutes = Math.floor((totalSecondsAbs % 3600) / 60);
        const seconds = totalSecondsAbs % 60;
        const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timerDisplay.textContent = display;
        document.title = `${display} - Foco Total`;
        const circumference = 2 * Math.PI * 45;
        let progress = (focusMethod === 'pomodoro' || mode !== 'focus') ? ((totalTime > 0) ? (totalTime - timeRemaining) / totalTime : 0) : (isRunning ? 1 : 0);
        progressRing.style.strokeDasharray = circumference;
        progressRing.style.strokeDashoffset = circumference * (1 - progress);
    };

    const updateTimer = () => {
        if (focusMethod === 'pomodoro' || mode !== 'focus') {
            const remaining = Math.round((endTime - Date.now()) / 1000);
            if (remaining >= 0) timeRemaining = remaining;
            else { clearInterval(timerInterval); switchMode(); }
        } else {
            timeRemaining++;
        }
        updateTimerDisplay();
    };

    const switchMode = () => {
        isRunning = false;
        endTime = null;
        playFinishSound();
        xpGainDisplay.textContent = ''; 
        coinGainDisplay.textContent = '';
        if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);

        // CORREÇÃO: Restaurando a lógica de notificação Push
        if ('Notification' in window && Notification.permission === 'granted') {
            const notificationTitle = mode === 'focus' ? 'Foco Finalizado!' : 'Pausa Finalizada!';
            const notificationBody = mode === 'focus' ? 'Hora de fazer uma pausa.' : 'Vamos voltar ao trabalho?';
            navigator.serviceWorker.ready.then(reg => reg.showNotification(notificationTitle, { body: notificationBody, icon: '/icon-192x192.png', renotify: true, tag: 'foco-total-notification' }));
        }

        if (mode === 'focus') {
            checkStreak();
            uninterruptedSessionsToday++;
            const task = tasks.find(t => t.id === selectedTaskId);
            let focusDuration = 0;
            if (task) {
                if (focusMethod === 'pomodoro') {
                    pomodoroSessionCount++;
                    task.pomodorosCompleted++;
                    focusDuration = settings.focusDuration * 60;
                    task.focusTime += focusDuration;
                } else {
                    focusDuration = timeRemaining;
                    task.focusTime += focusDuration;
                }
            }
            const xpGained = Math.floor(focusDuration / 60);
            addXP(xpGained);
            addCoins(5);
            checkMissionsProgress();
            mode = (focusMethod === 'pomodoro' && pomodoroSessionCount % settings.longBreakInterval === 0) ? 'longBreak' : 'shortBreak';
            showModal(sessionEndModalOverlay, `Você ${focusMethod === 'pomodoro' ? 'completou um Pomodoro!' : 'finalizou seu foco.'} Hora de fazer uma pausa.`);
        } else {
            mode = 'focus';
            showModal(sessionEndModalOverlay, 'Pausa finalizada! Vamos voltar ao trabalho?');
        }
        resetTimer();
        renderTasks();
    };

    const resetTimer = (forceMode = null) => {
        clearInterval(timerInterval);
        isRunning = false;
        endTime = null;
        mode = forceMode || mode;
        if (focusMethod === 'pomodoro' || mode !== 'focus') {
            timeRemaining = (settings[`${mode}Duration`] || 25) * 60;
            totalTime = timeRemaining;
        } else {
            timeRemaining = 0;
            totalTime = 1;
        }
        saveState();
        updateUI();
    };

    const resetDay = () => {
        pauseTimer();
        tasks = [];
        selectedTaskId = null;
        pomodoroSessionCount = 0;
        uninterruptedSessionsToday = 0;
        resetTimer('focus');
        renderTasks();
        hideModal(resetConfirmModalOverlay);
        showModal(alertModalOverlay, 'O dia foi zerado com sucesso!');
    };

    const updateUI = () => {
        updateTimerDisplay();
        const currentTheme = themes[settings.theme] || themes.brasil_dark;

        if (mode === 'shortBreak') progressRing.style.stroke = currentTheme['--color-break-short'];
        else if (mode === 'longBreak') progressRing.style.stroke = currentTheme['--color-break-long'];
        else progressRing.style.stroke = `rgb(${currentTheme['--color-primary-rgb']})`;
        
        progressRing.classList.toggle('breathing', focusMethod === 'adaptativo' && mode === 'focus' && isRunning);

        let btnIcon, btnBgClass, ariaLabelText;
        if (focusMethod === 'pomodoro' || mode !== 'focus') {
            btnIcon = isRunning ? 'pause' : 'play';
            btnBgClass = isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-primary-focus hover:bg-primary-darker';
            ariaLabelText = isRunning ? 'Pausar Timer' : 'Iniciar Timer';
        } else {
            btnIcon = isRunning ? 'square' : 'play';
            btnBgClass = isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-primary-focus hover:bg-primary-darker';
            ariaLabelText = isRunning ? 'Parar Foco Adaptativo' : 'Iniciar Foco Adaptativo';
        }
        startPauseBtn.className = `w-20 h-20 text-white font-bold rounded-full text-base transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center ${btnBgClass}`;
        startPauseBtn.innerHTML = `<i data-lucide="${btnIcon}" class="w-8 h-8 ${btnIcon === 'play' ? 'pl-1' : ''}"></i>`;
        startPauseBtn.setAttribute('aria-label', ariaLabelText);
        internalInterruptBtn.style.display = (isRunning && mode === 'focus') ? 'flex' : 'none';
        externalInterruptBtn.style.display = (isRunning && mode === 'focus') ? 'flex' : 'none';
        updateCurrentTaskDisplay();
        lucide.createIcons();
    };

    const formatTime = (totalSeconds) => {
        if (!totalSeconds || totalSeconds < 1) return `0m`;
        const minutes = Math.floor(totalSeconds / 60);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (hours > 0) return `${hours}h ${remainingMinutes}m`;
        return `${minutes}m`;
    };

    const renderTasks = () => {
        const tasksToRender = showCompletedTasks ? tasks : tasks.filter(task => !task.completed);
        taskListEl.innerHTML = tasksToRender.length === 0 ? '<p class="text-muted text-center text-sm">Adicione a sua primeira tarefa!</p>' : '';
        tasksToRender.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.className = `task-item p-3 rounded-lg border-2 border-transparent cursor-pointer ${task.id === selectedTaskId ? 'selected' : ''} ${task.completed ? 'opacity-60' : ''}`;
            taskEl.dataset.id = task.id;
            
            // CORREÇÃO: Restaurando o template detalhado do card de tarefa
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
                ${focusMethod === 'pomodoro' ? `<span class="text-muted font-bold flex items-center justify-center" title="Pomodoros"><i data-lucide="check-circle-2" class="w-4 h-4 mr-1 text-green-500"></i>${task.pomodorosCompleted}/${task.pomodoroEstimate}</span>` : ''}
                <span class="text-muted font-bold flex items-center justify-center" title="Tempo de Foco"><i data-lucide="clock" class="w-4 h-4 mr-1 text-primary-light"></i>${formatTime(task.focusTime)}</span>
                <span class="text-muted font-bold flex items-center justify-center" title="Interrupções Internas"><i data-lucide="zap-off" class="w-4 h-4 mr-1"></i>${task.internalInterruptions}</span>
                <span class="text-muted font-bold flex items-center justify-center" title="Interrupções Externas"><i data-lucide="user-x" class="w-4 h-4 mr-1"></i>${task.externalInterruptions}</span>
            </div>`;
            taskListEl.appendChild(taskEl);
        });
        updateCurrentTaskDisplay();
        saveState();
        lucide.createIcons();
    };

    const addTask = () => {
        if (!audioInitialized) audioContext.resume().then(() => audioInitialized = true);
        const taskName = newTaskInput.value.trim();
        if (taskName) {
            const newTask = { id: Date.now(), name: taskName, pomodoroEstimate: (parseInt(newTaskEstimateInput.value) || 1), pomodorosCompleted: 0, internalInterruptions: 0, externalInterruptions: 0, focusTime: 0, completed: false, isEditing: false };
            tasks.push(newTask);
            newTaskInput.value = '';
            newTaskEstimateInput.value = '1';
            playBeep(440, 100, 0.2);
            const currentSelectedTask = tasks.find(t => t.id === selectedTaskId);
            if (!currentSelectedTask || currentSelectedTask.completed) selectTask(newTask.id);
            else renderTasks();
        }
    };

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        if (selectedTaskId === id) {
            selectTask(tasks.find(t => !t.completed)?.id || null);
        } else {
            renderTasks();
        }
    };

    const toggleTaskCompleted = (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            if (task.completed) {
                addXP(10); 
                addCoins(2);
                checkMissionsProgress();
            }
            if (task.completed && selectedTaskId === id) {
                if(isRunning) pauseTimer();
                selectTask(tasks.find(t => !t.completed)?.id || null);
                if (!isRunning && mode === 'focus') resetTimer('focus');
            }
            renderTasks();
        }
    };

    // CORREÇÃO: Restaurando a lógica de edição de tarefas
    const toggleEditState = (id) => {
        tasks.forEach(task => task.isEditing = task.id === id ? !task.isEditing : false);
        renderTasks();
        const input = document.querySelector(`[data-edit-input-id="${id}"]`);
        if (input) { input.focus(); input.select(); }
    };

    const updateTaskName = (id, newName) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            if (newName) task.name = newName;
            task.isEditing = false;
            renderTasks();
        }
    };

    const selectTask = (id) => {
        const task = tasks.find(t => t.id === id);
        if ((task || id === null) && !tasks.some(t => t.isEditing)) {
            selectedTaskId = id;
            renderTasks();
            if (!isRunning) resetTimer('focus');
        }
    };

    const logInterruption = (type) => {
        if (isRunning && mode === 'focus' && selectedTaskId) {
            const task = tasks.find(t => t.id === selectedTaskId);
            if (task) {
                if (type === 'internal') task.internalInterruptions++;
                else if (type === 'external') task.externalInterruptions++;
                uninterruptedSessionsToday = 0;
                renderTasks();
                showModal(alertModalOverlay, `Interrupção registrada!`);
            }
        } else {
            showModal(alertModalOverlay, 'Só pode registrar interrupções durante um foco ativo.');
        }
    };

    const updateCurrentTaskDisplay = () => {
        const task = tasks.find(t => t.id === selectedTaskId);
        currentTaskDisplay.textContent = task ? task.name : 'Nenhuma tarefa selecionada';
        pomodoroCyclesEl.innerHTML = '';
        if (focusMethod !== 'pomodoro' || !settings.longBreakInterval || settings.longBreakInterval <= 0) return;
        const cyclesToShow = pomodoroSessionCount % settings.longBreakInterval;
        for(let i = 0; i < settings.longBreakInterval; i++) {
            const icon = i < cyclesToShow ? '<i data-lucide="check-circle-2" class="text-green-500"></i>' : '<i data-lucide="circle" class="text-muted"></i>';
            pomodoroCyclesEl.innerHTML += `<span class="transition-all">${icon}</span>`;
        }
        lucide.createIcons();
    };

    const saveState = () => {
        const state = { settings, tasks, selectedTaskId, pomodoroSessionCount, focusMethod, showCompletedTasks, gamification, uninterruptedSessionsToday, timerState: { isRunning, mode, endTime, totalTime } };
        localStorage.setItem('pomodoroAppState', JSON.stringify(state));
    };

    const loadState = () => {
        const state = JSON.parse(localStorage.getItem('pomodoroAppState'));
        if (state) {
            settings = { ...settings, ...state.settings };
            tasks = state.tasks || [];
            selectedTaskId = state.selectedTaskId;
            pomodoroSessionCount = state.pomodoroSessionCount || 0;
            focusMethod = state.focusMethod || 'pomodoro';
            showCompletedTasks = state.showCompletedTasks || false;
            uninterruptedSessionsToday = state.uninterruptedSessionsToday || 0;
            
            const defaultGamification = { level: 1, xp: 0, coins: 0, currentStreak: 0, longestStreak: 0, lastSessionDate: null, unlockedAchievements: [], dailyMissions: [], completedMissions: [], lastMissionDate: null };
            gamification = { ...defaultGamification, ...state.gamification };

            if (state.timerState) {
                const { isRunning: wasRunning, mode: savedMode, endTime: savedEndTime, totalTime: savedTotalTime } = state.timerState;
                if (wasRunning && savedEndTime && savedEndTime > Date.now()) {
                    isRunning = true; mode = savedMode; totalTime = savedTotalTime; endTime = savedEndTime;
                    timeRemaining = Math.round((endTime - Date.now()) / 1000);
                    timerInterval = setInterval(updateTimer, 1000);
                }
            }
        }
        tasks.forEach(task => task.isEditing = false); // Garante que nenhuma tarefa carregue em modo de edição
        focusDurationInput.value = settings.focusDuration;
        shortBreakDurationInput.value = settings.shortBreakDuration;
        longBreakDurationInput.value = settings.longBreakDuration;
        longBreakIntervalInput.value = settings.longBreakInterval;
        if (selectedTaskId && (!tasks.find(t => t.id === selectedTaskId) || tasks.find(t => t.id === selectedTaskId).completed)) {
            selectedTaskId = null;
        }
        if (!selectedTaskId) {
            selectTask(tasks.find(t => !t.completed)?.id || null);
        }
        generateDailyMissions();
    };

    // --- EVENT LISTENERS ---
    const handleStartPauseClick = () => {
        startPauseBtn.classList.add('start-pause-btn-clicked');
        startPauseBtn.addEventListener('animationend', () => startPauseBtn.classList.remove('start-pause-btn-clicked'), { once: true });
        if (focusMethod === 'pomodoro' || mode !== 'focus') {
            isRunning ? pauseTimer() : startTimer();
        } else {
            if (isRunning) {
                pauseTimer();
                const focusDuration = timeRemaining;
                const task = tasks.find(t => t.id === selectedTaskId);
                if (task) task.focusTime += focusDuration;
                const xpGained = Math.floor(focusDuration / 60);
                addXP(xpGained);
                addCoins(5);
                checkStreak();
                checkMissionsProgress();
                showModal(sessionEndModalOverlay, `Você se concentrou por ${formatTime(timeRemaining)}.`);
                resetTimer('focus');
            } else {
                startTimer();
            }
        }
    };
    
    // CORREÇÃO: Restaurando a lógica de notificação do iOS
    startPauseBtn.addEventListener('click', () => {
        if (!audioInitialized) audioContext.resume().then(() => audioInitialized = true);
        xpGainDisplay.textContent = '';
        coinGainDisplay.textContent = '';
        
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (isIOS && !isRunning && focusMethod === 'pomodoro') {
            if (mode === 'focus') {
                iosPromptTitle.textContent = 'Lembrete de Foco';
                iosPromptMessage.textContent = 'Para garantir o alarme no final do foco, recomendamos criar um lembrete. Deseja fazer isso agora?';
            } else {
                iosPromptTitle.textContent = 'Lembrete de Pausa';
                iosPromptMessage.textContent = 'Para garantir o alarme no final da pausa, recomendamos criar um lembrete. Deseja fazer isso agora?';
            }
            showModal(iosStartPromptModalOverlay);
        } else {
            handleStartPauseClick();
        }
    });

    iosPromptConfirmBtn.addEventListener('click', () => {
        let duration, eventTitle, eventDescription;
        if (mode === 'focus') {
            const task = tasks.find(t => t.id === selectedTaskId);
            eventTitle = `🎉 Fim do Foco: ${task ? task.name : 'Foco'}`;
            eventDescription = `Sua sessão de foco terminou. Hora de fazer uma pausa!`;
            duration = settings.focusDuration;
        } else {
            eventTitle = mode === 'shortBreak' ? `🚀 Fim da Pausa Curta` : `🏆 Fim da Pausa Longa`;
            eventDescription = `Sua pausa acabou. Hora de voltar ao foco!`;
            duration = mode === 'shortBreak' ? settings.shortBreakDuration : settings.longBreakDuration;
        }
        // Lógica para gerar e baixar o arquivo .ics
        const formatDT = (date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const eventStartTime = new Date(Date.now() + duration * 60 * 1000);
        const eventEndTime = new Date(eventStartTime.getTime() + 1 * 60 * 1000);
        const icsContent = [
            'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//FocoTotal//PWA//PT',
            'BEGIN:VEVENT', 'UID:' + Date.now() + '@focototal.app', 'DTSTAMP:' + formatDT(new Date()),
            'DTSTART:' + formatDT(eventStartTime), 'DTEND:' + formatDT(eventEndTime),
            'SUMMARY:' + eventTitle, 'DESCRIPTION:' + eventDescription,
            'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + eventDescription, 'TRIGGER:-PT0S', 'END:VALARM',
            'END:VEVENT', 'END:VCALENDAR'
        ].join('\r\n');
        
        const base64Content = btoa(unescape(encodeURIComponent(icsContent)));
        window.location.href = `data:text/calendar;base64,${base64Content}`;

        handleStartPauseClick();
        hideModal(iosStartPromptModalOverlay);
    });

    iosPromptCancelBtn.addEventListener('click', () => {
        handleStartPauseClick();
        hideModal(iosStartPromptModalOverlay);
    });
    
    resetBtn.addEventListener('click', () => showModal(resetConfirmModalOverlay));
    resetConfirmBtn.addEventListener('click', resetDay);
    resetCancelBtn.addEventListener('click', () => hideModal(resetConfirmModalOverlay));
    internalInterruptBtn.addEventListener('click', () => logInterruption('internal'));
    externalInterruptBtn.addEventListener('click', () => logInterruption('external'));
    settingsBtn.addEventListener('click', () => { renderPaletteSelector(); showModal(settingsModalOverlay); });
    dashboardBtn.addEventListener('click', () => { renderDashboard(); showModal(dashboardModalOverlay); });
    helpBtn.addEventListener('click', () => showModal(helpModalOverlay));
    dashboardModalCloseBtn.addEventListener('click', () => hideModal(dashboardModalOverlay));
    alertModalCloseBtn.addEventListener('click', () => hideModal(alertModalOverlay));
    sessionEndCloseBtn.addEventListener('click', () => hideModal(sessionEndModalOverlay));
    
    settingsSaveBtn.addEventListener('click', () => {
        settings.focusDuration = parseInt(focusDurationInput.value) || 25;
        settings.shortBreakDuration = parseInt(shortBreakDurationInput.value) || 5;
        settings.longBreakDuration = parseInt(longBreakDurationInput.value) || 15;
        settings.longBreakInterval = parseInt(longBreakIntervalInput.value) || 4;
        hideModal(settingsModalOverlay);
        if (!isRunning) resetTimer('focus');
        saveState();
    });

    colorPaletteSelector.addEventListener('click', (e) => {
        const target = e.target.closest('button[data-theme]');
        if (target) {
            settings.theme = target.dataset.theme;
            applyTheme(settings.theme);
            renderPaletteSelector();
            updateMethodToggleUI();
            updateUI();
            saveState();
        }
    });

    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });
    
    focusMethodToggle.addEventListener('click', (e) => {
        const target = e.target.closest('.method-btn');
        if (target && !isRunning) {
            focusMethod = target.dataset.method;
            updateMethodToggleUI();
            renderTasks();
            saveState();
        } else if (isRunning) {
            showModal(alertModalOverlay, 'Não é possível trocar de modo enquanto o timer está rodando.');
        }
    });

    toggleCompletedTasksBtn.addEventListener('click', () => {
        showCompletedTasks = !showCompletedTasks;
        toggleCompletedTasksBtn.textContent = showCompletedTasks ? 'Esconder Concluídas' : 'Mostrar Concluídas';
        renderTasks();
    });
    
    dashboardModalOverlay.addEventListener('click', (e) => {
        const tabButton = e.target.closest('.dashboard-tab');
        if (tabButton) {
            const tabName = tabButton.dataset.tab;
            ['stats', 'missions', 'achievements'].forEach(tab => {
                document.getElementById(`dashboard-${tab}-content`).classList.add('hidden');
            });
            dashboardModalOverlay.querySelectorAll('.dashboard-tab').forEach(btn => btn.classList.remove('active'));
            
            document.getElementById(`dashboard-${tabName}-content`).classList.remove('hidden');
            tabButton.classList.add('active');
        }
    });

    [alertModalOverlay, settingsModalOverlay, dashboardModalOverlay, helpModalOverlay, resetConfirmModalOverlay, sessionEndModalOverlay, iosStartPromptModalOverlay].forEach(overlay => {
        overlay.addEventListener('click', (e) => { if (e.target === overlay) hideModal(overlay); });
    });

    // CORREÇÃO: Restaurando os listeners para edição de tarefas
    taskListEl.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('[data-delete-id]');
        const completeBtn = e.target.closest('[data-complete-id]');
        const editBtn = e.target.closest('[data-edit-id]');
        const taskItem = e.target.closest('.task-item');
        if (deleteBtn) { deleteTask(parseInt(deleteBtn.dataset.deleteId)); return; }
        if (completeBtn) { toggleTaskCompleted(parseInt(completeBtn.dataset.completeId)); return; }
        if (editBtn) {
            const id = parseInt(editBtn.dataset.editId);
            const task = tasks.find(t => t.id === id);
            if (task && task.isEditing) {
                const input = taskListEl.querySelector(`[data-edit-input-id="${id}"]`);
                if (input) updateTaskName(id, input.value.trim());
            } else {
                toggleEditState(id);
            }
            return;
        }
        if (taskItem) { selectTask(parseInt(taskItem.dataset.id)); }
    });

    taskListEl.addEventListener('keyup', (e) => {
        if (e.target.matches('.task-edit-input')) {
            const id = parseInt(e.target.dataset.editInputId);
            if (e.key === 'Enter') updateTaskName(id, e.target.value.trim());
            else if (e.key === 'Escape') toggleEditState(null);
        }
    });

    taskListEl.addEventListener('focusout', (e) => {
        if (e.target.matches('.task-edit-input')) {
            const id = parseInt(e.target.dataset.editInputId);
            setTimeout(() => {
                const task = tasks.find(t => t.id === id);
                if (task && task.isEditing) updateTaskName(id, e.target.value.trim());
            }, 150);
        }
    });

    // --- INICIALIZAÇÃO DA APLICAÇÃO ---
    loadState();
    applyTheme(settings.theme); 
    updateMethodToggleUI();
    renderTasks();
    updateUI();
    updateGamificationUI();
    checkForAchievements();
    lucide.createIcons();
    document.addEventListener('click', () => {
        if (audioContext.state === 'suspended') audioContext.resume().then(() => audioInitialized = true);
    }, { once: true });
});
