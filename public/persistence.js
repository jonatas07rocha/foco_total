/**
 * persistence.js
 * Módulo para salvar e carregar o estado da aplicação no localStorage.
 */

import { state } from './state.js';
import { dom } from './ui.js';

// Salva o estado atual no localStorage.
export function saveState() {
    const stateToSave = {
        tasks: state.tasks,
        selectedTaskId: state.selectedTaskId,
        pomodoroSessionCount: state.pomodoroSessionCount,
        uninterruptedSessionsToday: state.uninterruptedSessionsToday,
        settings: state.settings,
        gamification: state.gamification,
        showCompletedTasks: state.showCompletedTasks,
        timerState: {
            isRunning: state.isRunning,
            mode: state.mode,
            endTime: state.endTime,
            totalTime: state.totalTime
        }
    };
    // Converte o Set para um Array para que possa ser salvo como JSON.
    const serializableGamification = { ...state.gamification, changedThemesCount: Array.from(state.gamification.changedThemesCount) };
    stateToSave.gamification = serializableGamification;

    localStorage.setItem('pomodoroAppState', JSON.stringify(stateToSave));
}

// Carrega o estado do localStorage.
export function loadState() {
    const savedStateJSON = localStorage.getItem('pomodoroAppState');
    if (!savedStateJSON) return;

    const savedState = JSON.parse(savedStateJSON);
    
    // Hidrata o objeto de estado com os dados salvos.
    state.tasks = savedState.tasks || [];
    state.selectedTaskId = savedState.selectedTaskId;
    state.pomodoroSessionCount = savedState.pomodoroSessionCount || 0;
    state.uninterruptedSessionsToday = savedState.uninterruptedSessionsToday || 0;
    state.showCompletedTasks = savedState.showCompletedTasks || false;
    Object.assign(state.settings, savedState.settings);
    Object.assign(state.gamification, savedState.gamification);
    
    // Restaura o timer se ele estava a ser executado quando a aplicação foi fechada.
    if (savedState.timerState) {
        const { isRunning: wasRunning, mode: savedMode, endTime: savedEndTime, totalTime: savedTotalTime } = savedState.timerState;
        if (wasRunning && savedEndTime && savedEndTime > Date.now()) {
            state.isRunning = true;
            state.mode = savedMode;
            state.totalTime = savedTotalTime;
            state.endTime = savedEndTime;
            state.timeRemaining = Math.round((state.endTime - Date.now()) / 1000);
        }
    }
    
    // Garante que nenhuma tarefa carregue em modo de edição.
    state.tasks.forEach(task => task.isEditing = false); 

    // Converte o array salvo de volta para um Set.
    state.gamification.changedThemesCount = new Set(savedState.gamification.changedThemesCount || []);

    // Atualiza os inputs de configuração com os valores carregados
    dom.focusDurationInput.value = state.settings.focusDuration;
    dom.shortBreakDurationInput.value = state.settings.shortBreakDuration;
    dom.longBreakDurationInput.value = state.settings.longBreakDuration;
    dom.longBreakIntervalInput.value = state.settings.longBreakInterval;
}
