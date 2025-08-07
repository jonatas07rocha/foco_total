/**
 * shop_logic.js
 * Módulo para gerenciar a lógica da loja de temas.
 */

import { shopCollections } from './shop.js';
import { themes } from './themes.js';
import { state } from './state.js';
import { dom } from './ui.js';
import { renderPaletteSelector, showModal } from './ui_controller.js';
import { updateGamificationUI } from './ui_controller.js';
import { saveState } from './persistence.js';
import { playBeep } from './audio.js';

// Renderiza todas as coleções e itens na modal da loja.
export function renderShop() {
    dom.shopCoinsDisplay.textContent = state.gamification.coins;
    const container = dom.shopCollectionsContainer;
    container.innerHTML = '';

    for (const collectionId in shopCollections) {
        const collection = shopCollections[collectionId];
        
        const collectionEl = document.createElement('div');
        collectionEl.innerHTML = `
            <h3 class="text-lg font-semibold text-primary-light mb-2">${collection.name}</h3>
            <p class="text-sm text-muted mb-4">${collection.description}</p>
            <div class="grid grid-cols-2 gap-4">
                <!-- Itens da coleção aqui -->
            </div>
        `;

        const itemsContainer = collectionEl.querySelector('.grid');
        for (const itemId in collection.items) {
            const item = collection.items[itemId];
            const isOwned = state.gamification.unlockedThemes.includes(item.themeId);
            
            const itemEl = document.createElement('div');
            itemEl.className = 'p-3 rounded-lg flex flex-col items-center justify-between bg-gray-800 border border-gray-700';
            itemEl.innerHTML = `
                <div class="w-full h-10 rounded mb-2 border-2 border-gray-600" style="background-color: ${themes[item.themeId]['--color-bg-shell']}; background-image: ${themes[item.themeId]['--color-bg-main']}"></div>
                <p class="font-semibold text-sm text-center flex-grow">${item.name}</p>
                <p class="text-xs text-muted text-center mb-3 h-8">${item.availability || ''}</p>
                <button data-item-id="${item.id}" class="buy-btn w-full text-sm font-bold py-2 px-3 rounded-lg transition-colors ${isOwned ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-primary-focus hover:bg-primary-darker'}" ${isOwned ? 'disabled' : ''}>
                    ${isOwned ? 'Adquirido' : `<div class="flex items-center justify-center"><i data-lucide="circle-dollar-sign" class="w-4 h-4 mr-2"></i> ${item.price}</div>`}
                </button>
            `;
            itemsContainer.appendChild(itemEl);
        }
        container.appendChild(collectionEl);
    }
    lucide.createIcons();
}

// Lógica para comprar um item.
export function buyItem(itemId) {
    // Encontra o item em qualquer coleção
    let itemToBuy = null;
    for (const collectionId in shopCollections) {
        if (shopCollections[collectionId].items[itemId]) {
            itemToBuy = shopCollections[collectionId].items[itemId];
            break;
        }
    }

    if (!itemToBuy) {
        console.error("Item não encontrado na loja:", itemId);
        return;
    }

    if (state.gamification.unlockedThemes.includes(itemToBuy.themeId)) {
        console.log("Item já adquirido.");
        return;
    }

    if (state.gamification.coins < itemToBuy.price) {
        showModal(dom.alertModalOverlay, "Moedas insuficientes!");
        playBeep(440, 150, 0.3);
        return;
    }

    // Transação
    state.gamification.coins -= itemToBuy.price;
    state.gamification.unlockedThemes.push(itemToBuy.themeId);
    
    // Feedback
    playBeep(880, 200, 0.4);
    showModal(dom.alertModalOverlay, `Tema "${itemToBuy.name}" comprado com sucesso!`);
    
    // Atualiza a UI
    renderShop(); // Re-renderiza a loja para mostrar o item como "Adquirido"
    updateGamificationUI(); // Atualiza o display de moedas principal
    renderPaletteSelector(); // Atualiza o seletor de temas nas configurações
    saveState();
}
