// Lista mestre de todas as conquistas disponíveis no aplicativo.
const allAchievements = [
    { id: 'FIRST_DRINK',    n: 'Primeiro Gole',      u: false, icon: 'cup-soda' },
    { id: 'MORNING_HYDRATION', n: 'Força Matinal',    u: false, icon: 'sunrise' },
    { id: 'GOAL_REACHED',   n: 'Meta Atingida!',     u: false, icon: 'target' },
    { id: 'OVERACHIEVER',   n: 'Super-Hidratado',    u: false, icon: 'trending-up' },
    { id: 'LATE_NIGHT_HYDRATION', n: 'Guerreiro da Noite', u: false, icon: 'moon' },
    { id: 'PERFECT_1000',   n: '1 Litro!',           u: false, icon: 'award' }
];

// Estrutura de dados padrão para um novo usuário ou para resetar.
const defaultState = {
    lastVisit: new Date().toISOString().slice(0, 10),
    settings: {
        dailyGoal: 2000,
        reminders: false,
        theme: 'teal',
        widgetOrder: ['progress', 'stats', 'weekly', 'history', 'achievements', 'tip']
    },
    dailyUserData: {
        currentAmount: 0,
        history: []
    },
    persistentUserData: {
        achievements: JSON.parse(JSON.stringify(allAchievements)),
        weeklyProgress: [
            { day: 'Seg', p: 0 }, { day: 'Ter', p: 0 }, { day: 'Qua', p: 0 }, 
            { day: 'Qui', p: 0 }, { day: 'Sex', p: 0 }, { day: 'Sáb', p: 0 }, { day: 'Dom', p: 0 }
        ]
    }
};

function getInitialState() {
    const savedStateJSON = localStorage.getItem('acqua-state');
    
    if (!savedStateJSON) {
        return defaultState;
    }

    let state = JSON.parse(savedStateJSON);
    const today = new Date().toISOString().slice(0, 10);

    if (state.lastVisit !== today) {
        state.lastVisit = today;
        state.dailyUserData = { ...defaultState.dailyUserData }; 
        
        const dayOfWeek = new Date().getDay();
        if (dayOfWeek === 1) {
            state.persistentUserData.weeklyProgress = [ ...defaultState.persistentUserData.weeklyProgress ];
        }
    }

    state.persistentUserData.achievements = allAchievements.map(defaultAch => {
        const savedAch = state.persistentUserData.achievements.find(a => a.id === defaultAch.id);
        return savedAch ? { ...defaultAch, u: savedAch.u } : defaultAch;
    });

    defaultState.settings.widgetOrder.forEach(widgetId => {
        if (!state.settings.widgetOrder.includes(widgetId)) {
            state.settings.widgetOrder.push(widgetId);
        }
    });

    return state;
}

let state = getInitialState();

export function getState() {
    return state;
}

export function updateState(newState) {
    state = {
        ...state,
        ...newState,
        settings: { ...state.settings, ...newState.settings },
        dailyUserData: { ...state.dailyUserData, ...newState.dailyUserData },
        persistentUserData: { ...state.persistentUserData, ...newState.persistentUserData }
    };
    localStorage.setItem('acqua-state', JSON.stringify(state));
}

/**
 * Apaga todos os dados salvos e recarrega a aplicação para um estado inicial.
 */
export function resetState() {
    localStorage.removeItem('acqua-state');
    location.reload();
}
