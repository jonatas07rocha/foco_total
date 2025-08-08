// --- DEFINIÇÃO DOS TEMAS ---
// Este arquivo contém a definição de todos os temas da aplicação.
// Cada tema é um objeto com propriedades CSS personalizadas (variáveis).
export const themes = {
    // Região Norte
    acre_dark: {
        name: 'AC Escuro',
        '--color-primary-rgb': '0, 128, 0', /* Verde da bandeira AC */
        '--color-primary-focus-rgb': '0, 100, 0',
        '--color-primary-darker-rgb': '0, 70, 0',
        '--color-primary-light-rgb': '50, 180, 50',
        '--color-bg-main': 'radial-gradient(circle at center, #1a202c 0%, #000000 70%)',
        '--color-bg-shell': '#1F2937',
        '--color-bg-panel': '#111827',
        '--color-bg-input': '#374151',
        '--color-bg-input-light': '#4B5563',
        '--color-text-base': '#D1D5DB',
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '255, 255, 0', /* Amarelo */
        '--color-break-long': '255, 0, 0', /* Vermelho */
    },
    alagoas_light: {
        name: 'AL Claro',
        '--color-primary-rgb': '0, 0, 139', /* Azul Marinho da bandeira AL */
        '--color-primary-focus-rgb': '0, 0, 115',
        '--color-primary-darker-rgb': '0, 0, 90',
        '--color-primary-light-rgb': '50, 50, 180',
        '--color-bg-main': '#F0F8FF', /* Azul muito claro */
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F8F8FF',
        '--color-bg-input': '#E8F0F8',
        '--color-bg-input-light': '#DCE6F0',
        '--color-text-base': '#333333',
        '--color-text-header': '#000000',
        '--color-text-muted': '#666666',
        '--color-text-placeholder': '#AAAAAA',
        '--color-text-timer': '#000000',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '255, 0, 0', /* Vermelho */
        '--color-break-long': '255, 255, 255', /* Branco */
    },
    amapa_dark: {
        name: 'AP Escuro',
        '--color-primary-rgb': '255, 204, 0', /* Amarelo da bandeira AP */
        '--color-primary-focus-rgb': '230, 180, 0',
        '--color-primary-darker-rgb': '200, 150, 0',
        '--color-primary-light-rgb': '255, 220, 70',
        '--color-bg-main': 'radial-gradient(circle at center, #1a1a1a 0%, #000000 70%)',
        '--color-bg-shell': '#111111',
        '--color-bg-panel': '#000000',
        '--color-bg-input': '#222222',
        '--color-bg-input-light': '#333333',
        '--color-text-base': '#D1D5DB',
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '0, 0, 139', /* Azul Marinho */
        '--color-break-long': '0, 128, 0', /* Verde */
    },
    amazonas_light: {
        name: 'AM Claro',
        '--color-primary-rgb': '0, 0, 139', /* Azul Marinho da bandeira AM */
        '--color-primary-focus-rgb': '0, 0, 115',
        '--color-primary-darker-rgb': '0, 0, 90',
        '--color-primary-light-rgb': '50, 50, 180',
        '--color-bg-main': '#F9FAFB',
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F3F4F6',
        '--color-bg-input': '#FFFFFF',
        '--color-bg-input-light': '#E5E7EB',
        '--color-text-base': '#374151',
        '--color-text-header': '#111827',
        '--color-text-muted': '#6B7280',
        '--color-text-placeholder': '#9CA3AF',
        '--color-text-timer': '#111827',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '255, 0, 0', /* Vermelho */
        '--color-break-long': '255, 255, 255', /* Branco */
    },
    bahia_dark: {
        name: 'BA Escuro',
        '--color-primary-rgb': '204, 0, 0', /* Vermelho da bandeira BA */
        '--color-primary-focus-rgb': '170, 0, 0',
        '--color-primary-darker-rgb': '140, 0, 0',
        '--color-primary-light-rgb': '230, 30, 30',
        '--color-bg-main': 'radial-gradient(circle at center, #003366 0%, #000033 70%)', /* Azul escuro */
        '--color-bg-shell': '#002A5C',
        '--color-bg-panel': '#001A3A',
        '--color-bg-input': '#004080',
        '--color-bg-input-light': '#0050A0',
        '--color-text-base': '#D1D5DB', /* Cinza claro */
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '255, 255, 255', /* Branco */
        '--color-break-long': '0, 51, 102', /* Azul */
    },
    brasil_dark: {
        name: 'BR Escuro',
        '--color-primary-rgb': '0, 155, 58', /* Verde Bandeira */
        '--color-primary-focus-rgb': '0, 130, 48',
        '--color-primary-darker-rgb': '0, 100, 38',
        '--color-primary-light-rgb': '77, 184, 108',
        '--color-bg-main': 'radial-gradient(circle at center, #1a202c 0%, #000000 70%)', /* Quase preto */
        '--color-bg-shell': '#1F2937', /* Azul Escuro */
        '--color-bg-panel': '#111827', /* Azul ainda mais escuro */
        '--color-bg-input': '#374151', /* Cinza Azulado */
        '--color-bg-input-light': '#4B5563', /* Cinza Azulado mais claro */
        '--color-text-base': '#D1D5DB', /* Cinza claro */
        '--color-text-header': '#FFFFFF', /* Branco */
        '--color-text-muted': '#9CA3AF', /* Cinza */
        '--color-text-placeholder': '#6B7280', /* Cinza mais escuro */
        '--color-text-timer': '#FFFFFF', /* Branco */
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '255, 221, 0', /* Amarelo da bandeira */
        '--color-break-long': '0, 39, 118', /* Azul da bandeira */
    },
    brasil_light: {
        name: 'BR Claro',
        '--color-primary-rgb': '255, 221, 0', /* Amarelo Bandeira */
        '--color-primary-focus-rgb': '230, 199, 0',
        '--color-primary-darker-rgb': '200, 170, 0',
        '--color-primary-light-rgb': '255, 235, 77',
        '--color-bg-main': '#FEFCE8', /* Amarelo muito claro */
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#FFFBEB',
        '--color-bg-input': '#F7FAFC',
        '--color-bg-input-light': '#EDF2F7',
        '--color-text-base': '#4A5568', /* Cinza escuro */
        '--color-text-header': '#1A202C', /* Quase preto */
        '--color-text-muted': '#718096', /* Cinza */
        '--color-text-placeholder': '#A0AEC0', /* Cinza claro */
        '--color-text-timer': '#1A202C', /* Quase preto */
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '0, 155, 58', /* Verde da bandeira */
        '--color-break-long': '0, 39, 118', /* Azul da bandeira */
    },
    ceara_dark: {
        name: 'CE Escuro',
        '--color-primary-rgb': '0, 0, 205', /* Azul da bandeira CE */
        '--color-primary-focus-rgb': '0, 0, 180',
        '--color-primary-darker-rgb': '0, 0, 150',
        '--color-primary-light-rgb': '50, 50, 255',
        '--color-bg-main': 'radial-gradient(circle at center, #1a202c 0%, #000000 70%)',
        '--color-bg-shell': '#1F2937',
        '--color-bg-panel': '#111827',
        '--color-bg-input': '#374151',
        '--color-bg-input-light': '#4B5563',
        '--color-text-base': '#D1D5DB',
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '0, 128, 0', /* Verde */
        '--color-break-long': '255, 255, 0', /* Amarelo */
    },
    distritofederal_dark: {
        name: 'DF Escuro',
        '--color-primary-rgb': '0, 128, 0', /* Verde da bandeira DF */
        '--color-primary-focus-rgb': '0, 100, 0',
        '--color-primary-darker-rgb': '0, 70, 0',
        '--color-primary-light-rgb': '50, 180, 50',
        '--color-bg-main': 'radial-gradient(circle at center, #1a202c 0%, #000000 70%)',
        '--color-bg-shell': '#1F2937',
        '--color-bg-panel': '#111827',
        '--color-bg-input': '#374151',
        '--color-bg-input-light': '#4B5563',
        '--color-text-base': '#D1D5DB',
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '255, 255, 0', /* Amarelo */
        '--color-break-long': '255, 255, 255', /* Branco */
    },
    espiritosanto_light: {
        name: 'ES Claro',
        '--color-primary-rgb': '255, 105, 180', /* Rosa da bandeira ES */
        '--color-primary-focus-rgb': '230, 80, 150',
        '--color-primary-darker-rgb': '200, 60, 120',
        '--color-primary-light-rgb': '255, 130, 200',
        '--color-bg-main': '#F0F8FF',
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F8F8FF',
        '--color-bg-input': '#E8F0F8',
        '--color-bg-input-light': '#DCE6F0',
        '--color-text-base': '#333333',
        '--color-text-header': '#000000',
        '--color-text-muted': '#666666',
        '--color-text-placeholder': '#AAAAAA',
        '--color-text-timer': '#000000',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '255, 255, 255', /* Branco */
        '--color-break-long': '0, 0, 255', /* Azul */
    },
    goias_light: {
        name: 'GO Claro',
        '--color-primary-rgb': '255, 255, 0', /* Amarelo da bandeira GO */
        '--color-primary-focus-rgb': '230, 230, 0',
        '--color-primary-darker-rgb': '200, 200, 0',
        '--color-primary-light-rgb': '255, 255, 77',
        '--color-bg-main': '#F9FAFB',
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F3F4F6',
        '--color-bg-input': '#FFFFFF',
        '--color-bg-input-light': '#E5E7EB',
        '--color-text-base': '#374151',
        '--color-text-header': '#111827',
        '--color-text-muted': '#6B7280',
        '--color-text-placeholder': '#9CA3AF',
        '--color-text-timer': '#111827',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '0, 128, 0', /* Verde */
        '--color-break-long': '255, 255, 255', /* Branco */
    },
    maranhao_dark: {
        name: 'MA Escuro',
        '--color-primary-rgb': '220, 20, 60', /* Vermelho da bandeira MA */
        '--color-primary-focus-rgb': '170, 14, 38',
        '--color-primary-darker-rgb': '140, 10, 30',
        '--color-primary-light-rgb': '240, 50, 90',
        '--color-bg-main': 'radial-gradient(circle at center, #1a202c 0%, #000000 70%)',
        '--color-bg-shell': '#1F2937',
        '--color-bg-panel': '#111827',
        '--color-bg-input': '#374151',
        '--color-bg-input-light': '#4B5563',
        '--color-text-base': '#D1D5DB',
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '255, 255, 255', /* Branco */
        '--color-break-long': '0, 0, 139', /* Azul Marinho */
    },
    matogrosso_dark: {
        name: 'MT Escuro',
        '--color-primary-rgb': '255, 204, 0', /* Amarelo da bandeira MT */
        '--color-primary-focus-rgb': '230, 180, 0',
        '--color-primary-darker-rgb': '200, 150, 0',
        '--color-primary-light-rgb': '255, 220, 70',
        '--color-bg-main': 'radial-gradient(circle at center, #1a202c 0%, #000000 70%)',
        '--color-bg-shell': '#1F2937',
        '--color-bg-panel': '#111827',
        '--color-bg-input': '#374151',
        '--color-bg-input-light': '#4B5563',
        '--color-text-base': '#D1D5DB',
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '0, 128, 0', /* Verde */
        '--color-break-long': '0, 0, 139', /* Azul Marinho */
    },
    matogrossodosul_light: {
        name: 'MS Claro',
        '--color-primary-rgb': '0, 0, 139', /* Azul Marinho da bandeira MS */
        '--color-primary-focus-rgb': '0, 0, 115',
        '--color-primary-darker-rgb': '0, 0, 90',
        '--color-primary-light-rgb': '50, 50, 180',
        '--color-bg-main': '#F0F8FF',
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F8F8FF',
        '--color-bg-input': '#E8F0F8',
        '--color-bg-input-light': '#DCE6F0',
        '--color-text-base': '#333333',
        '--color-text-header': '#000000',
        '--color-text-muted': '#666666',
        '--color-text-placeholder': '#AAAAAA',
        '--color-text-timer': '#000000',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '0, 128, 0', /* Verde */
        '--color-break-long': '255, 255, 255', /* Branco */
    },
    minasgerais_light: {
        name: 'MG Claro',
        '--color-primary-rgb': '200, 16, 46', /* Vermelho da bandeira MG */
        '--color-primary-focus-rgb': '170, 14, 38',
        '--color-primary-darker-rgb': '140, 10, 30',
        '--color-primary-light-rgb': '220, 40, 70',
        '--color-bg-main': '#F9FAFB', /* Branco */
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F3F4F6',
        '--color-bg-input': '#FFFFFF',
        '--color-bg-input-light': '#E5E7EB',
        '--color-text-base': '#374151', /* Cinza escuro */
        '--color-text-header': '#111827', /* Quase preto */
        '--color-text-muted': '#6B7280',
        '--color-text-placeholder': '#9CA3AF',
        '--color-text-timer': '#111827',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '10, 185, 129', /* Verde */
        '--color-break-long': '139, 92, 246', /* Roxo */
    },
    para_dark: {
        name: 'PA Escuro',
        '--color-primary-rgb': '220, 20, 60', /* Vermelho da bandeira PA */
        '--color-primary-focus-rgb': '170, 14, 38',
        '--color-primary-darker-rgb': '140, 10, 30',
        '--color-primary-light-rgb': '240, 50, 90',
        '--color-bg-main': 'radial-gradient(circle at center, #1a202c 0%, #000000 70%)',
        '--color-bg-shell': '#1F2937',
        '--color-bg-panel': '#111827',
        '--color-bg-input': '#374151',
        '--color-bg-input-light': '#4B5563',
        '--color-text-base': '#D1D5DB',
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '255, 255, 255', /* Branco */
        '--color-break-long': '0, 0, 139', /* Azul Marinho */
    },
    paraiba_dark: {
        name: 'PB Escuro',
        '--color-primary-rgb': '200, 16, 46', /* Vermelho da bandeira PB */
        '--color-primary-focus-rgb': '170, 14, 38',
        '--color-primary-darker-rgb': '140, 10, 30',
        '--color-primary-light-rgb': '220, 40, 70',
        '--color-bg-main': 'radial-gradient(circle at center, #1a1a1a 0%, #000000 70%)',
        '--color-bg-shell': '#111111',
        '--color-bg-panel': '#000000',
        '--color-bg-input': '#222222',
        '--color-bg-input-light': '#333333',
        '--color-text-base': '#D1D5DB',
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '0, 0, 0', /* Preto */
        '--color-break-long': '255, 255, 255', /* Branco */
    },
    parana_dark: {
        name: 'PR Escuro',
        '--color-primary-rgb': '0, 0, 205', /* Azul da bandeira PR */
        '--color-primary-focus-rgb': '0, 0, 180',
        '--color-primary-darker-rgb': '0, 0, 150',
        '--color-primary-light-rgb': '50, 50, 255',
        '--color-bg-main': 'radial-gradient(circle at center, #1a202c 0%, #000000 70%)',
        '--color-bg-shell': '#1F2937',
        '--color-bg-panel': '#111827',
        '--color-bg-input': '#374151',
        '--color-bg-input-light': '#4B5563',
        '--color-text-base': '#D1D5DB',
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '255, 255, 255', /* Branco */
        '--color-break-long': '0, 128, 0', /* Verde */
    },
    pernambuco_light: {
        name: 'PE Claro',
        '--color-primary-rgb': '255, 255, 0', /* Amarelo da bandeira PE */
        '--color-primary-focus-rgb': '230, 230, 0',
        '--color-primary-darker-rgb': '200, 200, 0',
        '--color-primary-light-rgb': '255, 255, 77',
        '--color-bg-main': '#F0F8FF', /* Azul muito claro */
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F8F8FF',
        '--color-bg-input': '#E8F0F8',
        '--color-bg-input-light': '#DCE6F0',
        '--color-text-base': '#333333', /* Cinza escuro */
        '--color-text-header': '#000000', /* Preto */
        '--color-text-muted': '#666666',
        '--color-text-placeholder': '#AAAAAA',
        '--color-text-timer': '#000000',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '255, 0, 0', /* Vermelho */
        '--color-break-long': '0, 0, 205', /* Azul */
    },
    piaui_light: {
        name: 'PI Claro',
        '--color-primary-rgb': '255, 255, 0', /* Amarelo da bandeira PI */
        '--color-primary-focus-rgb': '230, 230, 0',
        '--color-primary-darker-rgb': '200, 200, 0',
        '--color-primary-light-rgb': '255, 255, 77',
        '--color-bg-main': '#F9FAFB',
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F3F4F6',
        '--color-bg-input': '#FFFFFF',
        '--color-bg-input-light': '#E5E7EB',
        '--color-text-base': '#374151',
        '--color-text-header': '#111827',
        '--color-text-muted': '#6B7280',
        '--color-text-placeholder': '#9CA3AF',
        '--color-text-timer': '#111827',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '0, 128, 0', /* Verde */
        '--color-break-long': '0, 0, 255', /* Azul */
    },
    riodejaneiro_light: {
        name: 'RJ Claro',
        '--color-primary-rgb': '0, 42, 140', /* Azul da bandeira RJ */
        '--color-primary-focus-rgb': '0, 35, 115',
        '--color-primary-darker-rgb': '0, 28, 90',
        '--color-primary-light-rgb': '50, 80, 180',
        '--color-bg-main': '#F0F8FF', /* Azul muito claro */
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F8F8FF',
        '--color-bg-input': '#E8F0F8',
        '--color-bg-input-light': '#DCE6F0',
        '--color-text-base': '#333333', /* Cinza escuro */
        '--color-text-header': '#000000', /* Preto */
        '--color-text-muted': '#666666',
        '--color-text-placeholder': '#AAAAAA',
        '--color-text-timer': '#000000',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '255, 221, 0', /* Amarelo (sol) */
        '--color-break-long': '200, 16, 46', /* Vermelho (brasão) */
    },
    riograndedonorte_light: {
        name: 'RN Claro',
        '--color-primary-rgb': '255, 221, 0', /* Amarelo da bandeira RN */
        '--color-primary-focus-rgb': '230, 199, 0',
        '--color-primary-darker-rgb': '200, 170, 0',
        '--color-primary-light-rgb': '255, 235, 77',
        '--color-bg-main': '#F9FAFB',
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F3F4F6',
        '--color-bg-input': '#FFFFFF',
        '--color-bg-input-light': '#E5E7EB',
        '--color-text-base': '#374151',
        '--color-text-header': '#111827',
        '--color-text-muted': '#6B7280',
        '--color-text-placeholder': '#9CA3AF',
        '--color-text-timer': '#111827',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '0, 128, 0', /* Verde */
        '--color-break-long': '255, 0, 0', /* Vermelho */
    },
    riograndedosul_dark: {
        name: 'RS Escuro',
        '--color-primary-rgb': '200, 16, 46', /* Vermelho da bandeira RS */
        '--color-primary-focus-rgb': '170, 14, 38',
        '--color-primary-darker-rgb': '140, 10, 30',
        '--color-primary-light-rgb': '220, 40, 70',
        '--color-bg-main': 'radial-gradient(circle at center, #1a1a1a 0%, #000000 70%)',
        '--color-bg-shell': '#111111',
        '--color-bg-panel': '#000000',
        '--color-bg-input': '#222222',
        '--color-bg-input-light': '#333333',
        '--color-text-base': '#D1D5DB',
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '0, 128, 0', /* Verde */
        '--color-break-long': '255, 255, 0', /* Amarelo */
    },
    rondonia_dark: {
        name: 'RO Escuro',
        '--color-primary-rgb': '0, 128, 0', /* Verde da bandeira RO */
        '--color-primary-focus-rgb': '0, 100, 0',
        '--color-primary-darker-rgb': '0, 70, 0',
        '--color-primary-light-rgb': '50, 180, 50',
        '--color-bg-main': 'radial-gradient(circle at center, #1a202c 0%, #000000 70%)',
        '--color-bg-shell': '#1F2937',
        '--color-bg-panel': '#111827',
        '--color-bg-input': '#374151',
        '--color-bg-input-light': '#4B5563',
        '--color-text-base': '#D1D5DB',
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '255, 255, 0', /* Amarelo */
        '--color-break-long': '0, 0, 139', /* Azul Marinho */
    },
    roraima_light: {
        name: 'RR Claro',
        '--color-primary-rgb': '255, 204, 0', /* Amarelo da bandeira RR */
        '--color-primary-focus-rgb': '230, 180, 0',
        '--color-primary-darker-rgb': '200, 150, 0',
        '--color-primary-light-rgb': '255, 220, 70',
        '--color-bg-main': '#F9FAFB',
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F3F4F6',
        '--color-bg-input': '#FFFFFF',
        '--color-bg-input-light': '#E5E7EB',
        '--color-text-base': '#374151',
        '--color-text-header': '#111827',
        '--color-text-muted': '#6B7280',
        '--color-text-placeholder': '#9CA3AF',
        '--color-text-timer': '#111827',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '0, 0, 255', /* Azul */
        '--color-break-long': '255, 0, 0', /* Vermelho */
    },
    santacatarina_light: {
        name: 'SC Claro',
        '--color-primary-rgb': '220, 20, 60', /* Vermelho da bandeira SC */
        '--color-primary-focus-rgb': '170, 14, 38',
        '--color-primary-darker-rgb': '140, 10, 30',
        '--color-primary-light-rgb': '240, 50, 90',
        '--color-bg-main': '#F0F8FF',
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F8F8FF',
        '--color-bg-input': '#E8F0F8',
        '--color-bg-input-light': '#DCE6F0',
        '--color-text-base': '#333333',
        '--color-text-header': '#000000',
        '--color-text-muted': '#666666',
        '--color-text-placeholder': '#AAAAAA',
        '--color-text-timer': '#000000',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '255, 255, 255', /* Branco */
        '--color-break-long': '0, 0, 139', /* Azul Marinho */
    },
    saopaulo_dark: {
        name: 'SP Escuro',
        '--color-primary-rgb': '200, 16, 46', /* Vermelho da bandeira SP */
        '--color-primary-focus-rgb': '170, 14, 38',
        '--color-primary-darker-rgb': '140, 10, 30',
        '--color-primary-light-rgb': '220, 40, 70',
        '--color-bg-main': 'radial-gradient(circle at center, #1a1a1a 0%, #000000 70%)', /* Preto */
        '--color-bg-shell': '#111111',
        '--color-bg-panel': '#000000',
        '--color-bg-input': '#222222',
        '--color-bg-input-light': '#333333',
        '--color-text-base': '#D1D5DB', /* Cinza claro */
        '--color-text-header': '#FFFFFF', /* Branco */
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '255, 255, 255', /* Branco */
        '--color-break-long': '0, 0, 0', /* Preto */
    },
    sergipe_dark: {
        name: 'SE Escuro',
        '--color-primary-rgb': '0, 128, 0', /* Verde da bandeira SE */
        '--color-primary-focus-rgb': '0, 100, 0',
        '--color-primary-darker-rgb': '0, 70, 0',
        '--color-primary-light-rgb': '50, 180, 50',
        '--color-bg-main': 'radial-gradient(circle at center, #1a202c 0%, #000000 70%)',
        '--color-bg-shell': '#1F2937',
        '--color-bg-panel': '#111827',
        '--color-bg-input': '#374151',
        '--color-bg-input-light': '#4B5563',
        '--color-text-base': '#D1D5DB',
        '--color-text-header': '#FFFFFF',
        '--color-text-muted': '#9CA3AF',
        '--color-text-placeholder': '#6B7280',
        '--color-text-timer': '#FFFFFF',
        '--color-border-subtle-rgb': '255, 255, 255',
        '--color-break-short': '255, 255, 0', /* Amarelo */
        '--color-break-long': '0, 0, 255', /* Azul */
    },
    tocantins_light: {
        name: 'TO Claro',
        '--color-primary-rgb': '255, 221, 0', /* Amarelo da bandeira TO */
        '--color-primary-focus-rgb': '230, 199, 0',
        '--color-primary-darker-rgb': '200, 170, 0',
        '--color-primary-light-rgb': '255, 235, 77',
        '--color-bg-main': '#F0F8FF',
        '--color-bg-shell': '#FFFFFF',
        '--color-bg-panel': '#F8F8FF',
        '--color-bg-input': '#E8F0F8',
        '--color-bg-input-light': '#DCE6F0',
        '--color-text-base': '#333333',
        '--color-text-header': '#000000',
        '--color-text-muted': '#666666',
        '--color-text-placeholder': '#AAAAAA',
        '--color-text-timer': '#000000',
        '--color-border-subtle-rgb': '0, 0, 0',
        '--color-break-short': '0, 0, 139', /* Azul Marinho */
        '--color-break-long': '255, 255, 255', /* Branco */
    },
// --- TEMAS DA LOJA ---

    // Coleção Paisagens Brasileiras
    natureza_floresta: {
        name: 'Floresta',
        '--color-primary-rgb': '34, 139, 34',
        '--color-primary-focus-rgb': '0, 100, 0',
        '--color-bg-main': '#2F4F4F',
        '--color-bg-shell': '#013220',
        '--color-text-base': '#E0E0E0',
        '--color-text-header': '#FFFFFF',
        '--color-break-short': '255, 215, 0',
        '--color-break-long': '139, 69, 19',
        // ... (outras propriedades)
    },
    natureza_cerrado: {
        name: 'Cerrado',
        '--color-primary-rgb': '255, 140, 0',
        '--color-bg-main': '#FFF8E1',
        '--color-bg-shell': '#FFFFFF',
        '--color-text-base': '#5D4037',
        '--color-text-header': '#4E342E',
        '--color-break-short': '76, 175, 80',
        '--color-break-long': '121, 85, 72',
        // ... (outras propriedades)
    },
    natureza_praias: {
        name: 'Praias',
        '--color-primary-rgb': '0, 191, 255',
        '--color-bg-main': '#E0FFFF',
        '--color-bg-shell': '#FFFFFF',
        '--color-text-base': '#006064',
        '--color-text-header': '#004D40',
        '--color-break-short': '255, 238, 88',
        '--color-break-long': '255, 167, 38',
        // ... (outras propriedades)
    },
    natureza_pantanal: {
        name: 'Pantanal',
        '--color-primary-rgb': '100, 181, 246',
        '--color-bg-main': '#1B5E20',
        '--color-bg-shell': '#2E7D32',
        '--color-text-base': '#C8E6C9',
        '--color-text-header': '#FFFFFF',
        '--color-break-short': '255, 241, 118',
        '--color-break-long': '121, 85, 72',
        // ... (outras propriedades)
    },

    // Coleção Abstratos & Minimalistas
    zen_light: {
        name: 'Zen',
        '--color-primary-rgb': '176, 190, 197',
        '--color-bg-main': '#ECEFF1',
        '--color-bg-shell': '#FFFFFF',
        '--color-text-base': '#546E7A',
        '--color-text-header': '#37474F',
        '--color-break-short': '129, 212, 250',
        '--color-break-long': '165, 214, 167',
         // ... (outras propriedades)
    },
    abstrato_energia: {
        name: 'Energia',
        '--color-primary-rgb': '255, 64, 129',
        '--color-bg-main': 'linear-gradient(45deg, #FF4081, #F50057, #D500F9)',
        '--color-bg-shell': '#1A1A1A',
        '--color-text-base': '#E0E0E0',
        '--color-text-header': '#FFFFFF',
        '--color-break-short': '100, 221, 23',
        '--color-break-long': '255, 171, 0',
         // ... (outras propriedades)
    },
    abstrato_estrelas: {
        name: 'Estrelas',
        '--color-primary-rgb': '236, 239, 241',
        '--color-bg-main': 'radial-gradient(ellipse at bottom, #020111 0%, #191970 100%)',
        '--color-bg-shell': '#000033',
        '--color-text-base': '#CFD8DC',
        '--color-text-header': '#FFFFFF',
        '--color-break-short': '173, 216, 230',
        '--color-break-long': '255, 250, 205',
         // ... (outras propriedades)
    },
    abstrato_aquarela: {
        name: 'Aquarela',
        '--color-primary-rgb': '126, 87, 194',
        '--color-bg-main': '#F3E5F5',
        '--color-bg-shell': '#FFFFFF',
        '--color-text-base': '#6A1B9A',
        '--color-text-header': '#4A148C',
        '--color-break-short': '79, 195, 247',
        '--color-break-long': '255, 204, 128',
        // ... (outras propriedades)
    },

    // Coleção Tecnologia & Ficção Científica
    tech_matrix: {
        name: 'Matrix',
        '--color-primary-rgb': '57, 255, 20',
        '--color-bg-main': '#000000',
        '--color-bg-shell': '#0D0D0D',
        '--color-text-base': '#39FF14',
        '--color-text-header': '#FFFFFF',
        '--color-break-short': '200, 200, 200',
        '--color-break-long': '100, 100, 100',
        // ... (outras propriedades)
    },
    tech_vaporwave: {
        name: 'Vaporwave',
        '--color-primary-rgb': '255, 105, 180',
        '--color-bg-main': 'linear-gradient(to bottom right, #2c003e, #5a004a)',
        '--color-bg-shell': '#1a0024',
        '--color-text-base': '#f0e6ff',
        '--color-text-header': '#FFFFFF',
        '--color-break-short': '0, 255, 255',
        '--color-break-long': '255, 255, 0',
        // ... (outras propriedades)
    },
    tech_hightech: {
        name: 'High-Tech',
        '--color-primary-rgb': '0, 123, 255',
        '--color-bg-main': '#F8F9FA',
        '--color-bg-shell': '#FFFFFF',
        '--color-text-base': '#495057',
        '--color-text-header': '#212529',
        '--color-break-short': '40, 167, 69',
        '--color-break-long': '255, 193, 7',
         // ... (outras propriedades)
    },
    tech_cyberpunk: {
        name: 'Cyberpunk',
        '--color-primary-rgb': '255, 0, 255',
        '--color-bg-main': '#0c0c1c',
        '--color-bg-shell': '#14143c',
        '--color-text-base': '#A0A0FF',
        '--color-text-header': '#FFFFFF',
        '--color-break-short': '0, 255, 255',
        '--color-break-long': '255, 255, 0',
        // ... (outras propriedades)
    },

    // --- TEMAS SAZONAIS ---
    seasonal_carnaval: {
        name: 'Carnaval',
        '--color-primary-rgb': '255, 215, 0',
        '--color-bg-main': 'linear-gradient(45deg, #4CAF50, #2196F3, #F44336, #FFEB3B)',
        '--color-bg-shell': '#FFFFFF',
        '--color-text-base': '#212121',
        '--color-text-header': '#000000',
        '--color-break-short': '3, 169, 244',
        '--color-break-long': '76, 175, 80',
         // ... (outras propriedades)
    },
    seasonal_festa_junina: {
        name: 'Festa Junina',
        '--color-primary-rgb': '255, 87, 34',
        '--color-bg-main': '#F5DEB3',
        '--color-bg-shell': '#FFF8DC',
        '--color-text-base': '#8B4513',
        '--color-text-header': '#A0522D',
        '--color-break-short': '220, 20, 60',
        '--color-break-long': '34, 139, 34',
         // ... (outras propriedades)
    },
    seasonal_halloween: {
        name: 'Halloween',
        '--color-primary-rgb': '255, 152, 0',
        '--color-bg-main': '#212121',
        '--color-bg-shell': '#1A1A1A',
        '--color-text-base': '#E0E0E0',
        '--color-text-header': '#FFFFFF',
        '--color-break-short': '103, 58, 183',
        '--color-break-long': '76, 175, 80',
        // ... (outras propriedades)
    },
    seasonal_natal: {
        name: 'Natal',
        '--color-primary-rgb': '211, 47, 47',
        '--color-bg-main': '#1B5E20',
        '--color-bg-shell': '#2E7D32',
        '--color-text-base': '#E8F5E9',
        '--color-text-header': '#FFFFFF',
        '--color-break-short': '255, 215, 0',
        '--color-break-long': '255, 255, 255',
        // ... (outras propriedades)
    },
};
