/**
 * audio.js
 * Módulo para gerenciar todos os efeitos sonoros.
 */

import { state } from './state.js';

// Função interna para tocar um som.
function _playBeepInternal(frequency, duration, volume) {
    const oscillator = state.audioContext.createOscillator();
    const gainNode = state.audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(state.audioContext.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0, state.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, state.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, state.audioContext.currentTime + duration / 1000);
    oscillator.start(state.audioContext.currentTime);
    oscillator.stop(state.audioContext.currentTime + duration / 1000);
}

// Toca um beep simples. Pede permissão ao navegador se necessário.
export function playBeep(frequency = 800, duration = 200, volume = 0.3) {
    if (state.audioContext.state === 'suspended') {
        state.audioContext.resume().then(() => _playBeepInternal(frequency, duration, volume));
    } else {
        _playBeepInternal(frequency, duration, volume);
    }
}

// Toca o som de finalização de sessão.
export function playFinishSound() {
    playBeep(523, 150, 0.4);
    setTimeout(() => playBeep(659, 150, 0.4), 200);
    setTimeout(() => playBeep(784, 300, 0.5), 400);
}
