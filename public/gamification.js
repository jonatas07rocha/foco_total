/**
 * gamification.js
 * Módulo com a lógica pura de gamificação (XP, moedas, conquistas, missões).
 * Este módulo apenas lê e modifica o objeto 'state'. Ele não interage com a UI.
 */

import { state } from './state.js';
import { achievements } from './achievements.js';
import { missionsData } from './missions.js';

// Calcula a quantidade de XP necessária para o próximo nível.
export const xpForNextLevel = () => Math.floor(100 * Math.pow(1.5, state.gamification.level - 1));

// Adiciona XP e verifica se o usuário subiu de nível.
export function addXP(amount) {
    if (!amount) return false;
    state.gamification.xp += amount;
    let leveledUp = false;
    let nextLevelXP = xpForNextLevel();
    while (state.gamification.xp >= nextLevelXP) {
        state.gamification.xp -= nextLevelXP;
        state.gamification.level++;
        leveledUp = true;
        nextLevelXP = xpForNextLevel();
    }
    return leveledUp; // Retorna true se o usuário subiu de nível.
}

// Adiciona moedas.
export function addCoins(amount) {
    if (!amount) return;
    state.gamification.coins += amount;
}

// Desbloqueia uma conquista se ela ainda não foi desbloqueada.
export function unlockAchievement(key) {
    if (!state.gamification.unlockedAchievements.includes(key)) {
        state.gamification.unlockedAchievements.push(key);
        return true; // Retorna true se a conquista foi nova.
    }
    return false;
}

// Verifica o progresso de todas as conquistas.
export function checkForAchievements() {
    const stats = getDailyStats();
    const unlockedNow = [];
    if (stats.pomodorosCompletedToday >= 1 && unlockAchievement('FIRST_STEP')) unlockedNow.push('FIRST_STEP');
    if (stats.pomodorosCompletedToday >= 5 && unlockAchievement('FOCUSED_BEGINNER')) unlockedNow.push('FOCUSED_BEGINNER');
    if (stats.tasksCompletedToday >= 10 && unlockAchievement('TASK_MASTER')) unlockedNow.push('TASK_MASTER');
    if (stats.focusTimeToday >= 14400 && unlockAchievement('MARATHONER')) unlockedNow.push('MARATHONER');
    if (state.gamification.currentStreak >= 3 && unlockAchievement('STREAK_STARTER')) unlockedNow.push('STREAK_STARTER');
    if (state.gamification.currentStreak >= 7 && unlockAchievement('ON_FIRE')) unlockedNow.push('ON_FIRE');
    if (state.gamification.coins >= 500 && unlockAchievement('COIN_COLLECTOR')) unlockedNow.push('COIN_COLLECTOR');
    if (state.gamification.level >= 5 && unlockAchievement('LEVEL_5')) unlockedNow.push('LEVEL_5');
    if (state.gamification.level >= 10 && unlockAchievement('LEVEL_10')) unlockedNow.push('LEVEL_10');
    return unlockedNow; // Retorna um array com as chaves das conquistas desbloqueadas agora.
}

// Verifica o progresso das missões.
export function checkMissionsProgress() {
    const stats = getDailyStats();
    const allMissions = [...state.gamification.dailyMissions, ...Object.values(missionsData).filter(m => m.type === 'secret')];
    const completedNow = [];

    allMissions.forEach(mission => {
        if (state.gamification.completedMissions.includes(mission.id)) return;
        let completed = false;
        if (mission.type === 'daily') {
            const currentProgress = stats[mission.metric] || 0;
            if (currentProgress >= mission.goal) completed = true;
        } else if (mission.type === 'secret') {
            const hour = new Date().getHours();
            if (mission.id === 'SECRET_NIGHT_OWL' && state.isRunning && hour >= 22) completed = true;
            if (mission.id === 'SECRET_EARLY_BIRD' && state.isRunning && hour < 6) completed = true;
            if (mission.id === 'SECRET_THEME_EXPLORER' && state.gamification.changedThemesCount.size >= 3) completed = true;
        }

        if (completed) {
            state.gamification.completedMissions.push(mission.id);
            addXP(mission.rewards.xp);
            addCoins(mission.rewards.coins);
            completedNow.push(mission);
        }
    });
    return completedNow; // Retorna um array com as missões completadas agora.
}

// Verifica e atualiza a sequência de dias de foco.
// CORREÇÃO: Lógica de data aprimorada para ser mais robusta.
export function checkStreak() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zera a hora para comparar apenas a data

    // Se não houver data da última sessão, inicia a sequência hoje.
    if (!state.gamification.lastSessionDate) {
        state.gamification.currentStreak = 1;
        state.gamification.lastSessionDate = today.toISOString();
        if (state.gamification.longestStreak < 1) {
            state.gamification.longestStreak = 1;
        }
        return { streak: 1, bonus: 0 };
    }

    const lastSession = new Date(state.gamification.lastSessionDate);
    lastSession.setHours(0, 0, 0, 0);

    // Se a última sessão foi hoje, não faz nada.
    if (today.getTime() === lastSession.getTime()) {
        return null;
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    let bonusCoins = 0;

    // Se a última sessão foi ontem, incrementa a sequência.
    if (lastSession.getTime() === yesterday.getTime()) {
        state.gamification.currentStreak++;
        bonusCoins = state.gamification.currentStreak * 2;
        addCoins(bonusCoins);
    } else {
        // Se não foi ontem, a sequência é quebrada e reinicia.
        state.gamification.currentStreak = 1;
    }

    // Atualiza a maior sequência se necessário.
    if (state.gamification.currentStreak > state.gamification.longestStreak) {
        state.gamification.longestStreak = state.gamification.currentStreak;
    }
    
    // Salva a data de hoje como a última sessão.
    state.gamification.lastSessionDate = today.toISOString();
    return { streak: state.gamification.currentStreak, bonus: bonusCoins };
}


// Gera novas missões diárias.
export function generateDailyMissions() {
    const today = new Date().toISOString().slice(0, 10);
    if (state.gamification.lastMissionDate === today) return; 

    const allDailyMissions = Object.values(missionsData).filter(m => m.type === 'daily');
    const shuffled = allDailyMissions.sort(() => 0.5 - Math.random());
    state.gamification.dailyMissions = shuffled.slice(0, 3);
    
    state.gamification.completedMissions = state.gamification.completedMissions.filter(id => missionsData[id]?.type === 'secret');
    state.gamification.lastMissionDate = today;
    state.gamification.changedThemesCount.clear();
}

// Obtém as estatísticas do dia.
function getDailyStats() {
    return {
        focusTimeToday: state.tasks.reduce((acc, task) => acc + task.focusTime, 0),
        tasksCompletedToday: state.tasks.filter(t => t.completed).length,
        pomodorosCompletedToday: state.tasks.reduce((acc, task) => acc + task.pomodorosCompleted, 0),
        uninterruptedSessionsToday: state.uninterruptedSessionsToday,
    };
}
