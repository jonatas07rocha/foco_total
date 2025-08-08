/**
 * timer.js
 * Módulo com a lógica do cronômetro Pomodoro e Adaptativo.
 */

import { state } from './state.js';
import { saveState } from './persistence.js';

// Inicia o timer.
export function startTimer() {
    if (state.isRunning) return false;
    if (!state.selectedTaskId && state.mode === 'focus') return 'NO_TASK';
    
    if (state.settings.focusMethod === 'pomodoro' || state.mode !== 'focus') {
        // Se não houver tempo restante (início ou após reset), define a duração total.
        if (state.timeRemaining <= 0) {
            state.timeRemaining = (state.settings[`${state.mode}Duration`] || 25) * 60;
            state.totalTime = state.timeRemaining;
        }
    } else {
        state.timeRemaining = state.timeRemaining || 0;
        state.totalTime = 1; // Para a barra de progresso no modo adaptativo
    }
    state.isRunning = true;
    state.endTime = Date.now() + state.timeRemaining * 1000;
    
    return true;
}

// Pausa o timer.
export function pauseTimer() {
    if (!state.isRunning) return;
    state.isRunning = false;
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    if (state.endTime) {
        state.timeRemaining = Math.round((state.endTime - Date.now()) / 1000);
    }
    saveState();
}

// Atualiza o tempo restante a cada segundo.
export function updateTimer() {
    let finished = false;
    if (state.settings.focusMethod === 'pomodoro' || state.mode !== 'focus') {
        const remaining = Math.round((state.endTime - Date.now()) / 1000);
        if (remaining >= 0) {
            state.timeRemaining = remaining;
        } else {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
            finished = true;
        }
    } else {
        state.timeRemaining++;
    }
    return finished; // Retorna true se o timer acabou.
}

// Troca para o próximo modo (foco -> pausa, pausa -> foco).
export function switchMode() {
    state.isRunning = false;
    state.endTime = null;

    const previousMode = state.mode;
    let focusDuration = 0;

    if (previousMode === 'focus') {
        state.uninterruptedSessionsToday++;
        const task = state.tasks.find(t => t.id === state.selectedTaskId);
        if (task) {
            if (state.settings.focusMethod === 'pomodoro') {
                state.pomodoroSessionCount++;
                task.pomodorosCompleted++;
                focusDuration = state.settings.focusDuration * 60;
                task.focusTime += focusDuration;
            } else {
                focusDuration = state.timeRemaining;
                task.focusTime += focusDuration;
            }
        }
        
        // CORREÇÃO: A transição para a pausa só deve ocorrer no modo Pomodoro.
        if (state.settings.focusMethod === 'pomodoro') {
            state.mode = (state.pomodoroSessionCount % state.settings.longBreakInterval === 0) ? 'longBreak' : 'shortBreak';
        } else {
            // No modo adaptativo, apenas retorna para o modo de foco (parado).
            state.mode = 'focus';
        }

    } else {
        state.mode = 'focus';
    }
    
    resetTimer();
    return { previousMode, focusDuration }; // Retorna dados sobre a sessão finalizada.
}

// Reseta o timer para o modo atual.
export function resetTimer(forceMode = null) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    state.isRunning = false;
    state.endTime = null;
    state.mode = forceMode || state.mode;
    if (state.settings.focusMethod === 'pomodoro' || state.mode !== 'focus') {
        state.timeRemaining = (state.settings[`${state.mode}Duration`] || 25) * 60;
        state.totalTime = state.timeRemaining;
    } else {
        state.timeRemaining = 0;
        state.totalTime = 1;
    }
    saveState();
}

// Zera completamente o progresso do dia.
export function resetDay() {
    pauseTimer();
    state.tasks = [];
    state.selectedTaskId = null;
    state.pomodoroSessionCount = 0;
    state.uninterruptedSessionsToday = 0;
    resetTimer('focus');
}
