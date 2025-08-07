/**
 * tasks.js
 * Módulo para gerenciar a lógica das tarefas.
 */

import { state } from './state.js';

// Adiciona uma nova tarefa à lista.
export function addTask(name, estimate) {
    if (!name) return null;
    const newTask = { 
        id: Date.now(), 
        name, 
        pomodoroEstimate: estimate || 1, 
        pomodorosCompleted: 0, 
        internalInterruptions: 0, 
        externalInterruptions: 0, 
        focusTime: 0, 
        completed: false, 
        isEditing: false 
    };
    state.tasks.push(newTask);
    return newTask;
}

// Deleta uma tarefa.
export function deleteTask(id) {
    state.tasks = state.tasks.filter(task => task.id !== id);
    if (state.selectedTaskId === id) {
        selectTask(state.tasks.find(t => !t.completed)?.id || null);
    }
}

// Alterna o estado de 'concluída' de uma tarefa.
export function toggleTaskCompleted(id) {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return false;
    
    task.completed = !task.completed;
    if (task.completed && state.selectedTaskId === id) {
        selectTask(state.tasks.find(t => !t.completed)?.id || null);
    }
    return task.completed; // Retorna o novo estado.
}

// CORREÇÃO: Adiciona uma função para alternar a visibilidade das tarefas concluídas.
export function toggleShowCompleted() {
    state.showCompletedTasks = !state.showCompletedTasks;
}


// Ativa/desativa o modo de edição de uma tarefa.
export function toggleEditState(id) {
    let inputToFocus = null;
    state.tasks.forEach(task => {
        if (task.id === id) {
            task.isEditing = !task.isEditing;
            if (task.isEditing) {
                // Prepara para focar no input que será renderizado
                inputToFocus = `[data-edit-input-id="${id}"]`;
            }
        } else {
            task.isEditing = false;
        }
    });
    return inputToFocus; // Retorna o seletor do input para focar
}

// Atualiza o nome de uma tarefa.
export function updateTaskName(id, newName) {
    const task = state.tasks.find(t => t.id === id);
    if (task) {
        if (newName) task.name = newName;
        task.isEditing = false;
    }
}

// Seleciona uma tarefa para o foco.
export function selectTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if ((task || id === null) && !state.tasks.some(t => t.isEditing)) {
        state.selectedTaskId = id;
        return true;
    }
    return false;
}

// Registra uma interrupção na tarefa atual.
export function logInterruption(type) {
    if (state.isRunning && state.mode === 'focus' && state.selectedTaskId) {
        const task = state.tasks.find(t => t.id === state.selectedTaskId);
        if (task) {
            if (type === 'internal') task.internalInterruptions++;
            else if (type === 'external') task.externalInterruptions++;
            state.uninterruptedSessionsToday = 0;
            return true;
        }
    }
    return false;
}
