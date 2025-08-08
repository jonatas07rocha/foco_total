/**
 * state.js
 * * Módulo central para gerenciar todo o estado da aplicação.
 * Todas as variáveis que mudam durante o uso do app estão aqui.
 * Isso centraliza os dados e facilita o controle e a depuração.
 */

export const state = {
    // Estado do Timer e da Sessão
    timerInterval: null,
    isRunning: false,
    mode: 'focus', // 'focus', 'shortBreak', 'longBreak'
    timeRemaining: 0,
    totalTime: 0,
    endTime: null,
    pomodoroSessionCount: 0,
    uninterruptedSessionsToday: 0,

    // Estado das Tarefas
    tasks: [],
    selectedTaskId: null,
    showCompletedTasks: false,

    // Configurações do Usuário
    settings: {
        focusDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        longBreakInterval: 4,
        theme: 'brasil_dark',
        focusMethod: 'pomodoro' // 'pomodoro', 'adaptativo'
    },

    // Estado de Gamificação
    gamification: {
        level: 1,
        xp: 0,
        coins: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastSessionDate: null,
        unlockedAchievements: [],
        // CORREÇÃO: Adiciona a propriedade para temas desbloqueados.
        unlockedThemes: [], 
        dailyMissions: [],
        completedMissions: [],
        lastMissionDate: null,
        changedThemesCount: new Set()
    },

    // Estado do PWA (Progressive Web App)
    deferredInstallPrompt: null,

    // Estado do Áudio
    audioContext: new (window.AudioContext || window.webkitAudioContext)(),
    audioInitialized: false,
};
