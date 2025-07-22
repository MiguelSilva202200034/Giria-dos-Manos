"use strict";

// Importe o que precisa de slangData.js
import { getRandomSlang, getSlangById, slangData, categories } from './slangData.js';


// --- Funções de Ícones ---
const getIconSvg = (iconName, classes = '') => {
    const icons = {
        'MenuIcon': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`,
        'XIcon': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`,
        'SearchIcon': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>`,
        'RefreshCwIcon': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M20 10c0 5-4 9-9 9m7-9v-4h-4"></path><path d="M4 14c0-5 4-9 9-9m-7 9v4h4"></path></svg>`,
        'ArrowLeftIcon': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>`
    };
    return icons[iconName] || '';
};

// --- Lógica do Router ---
const router = async () => {
    const hashPath = window.location.hash.slice(1) || '/';
    const root = document.getElementById('root');
    root.innerHTML = ''; // Limpar conteúdo anterior

    const mainElement = document.createElement('main');
    mainElement.className = "flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8";

    // Render Header
    root.appendChild(renderHeader());

    if (hashPath === '/') {
        mainElement.appendChild(renderHome());
    } else if (hashPath.startsWith('/dicionario')) {
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
        const search = urlParams.get('search') || '';
        const category = urlParams.get('category') || '';
        mainElement.appendChild(renderDictionary(search, category));
    } else if (hashPath.startsWith('/giria/')) {
        const id = hashPath.split('/')[2];
        mainElement.appendChild(renderSlangPage(id));
    } else {
        mainElement.innerHTML = `
            <div class="text-center py-12">
                <h1 class="text-3xl font-bold text-red-500 mb-4">Página Não Encontrada</h1>
                <p class="text-gray-300 mb-6">A página que estás à procura não existe.</p>
                <a href="#/" class="text-green-500 hover:text-green-400">Voltar para o Inicio</a>
            </div>
        `;
    }

    root.appendChild(mainElement);
    // Render Footer
    root.appendChild(renderFooter());

    // Re-attach event listeners after rendering (important for dynamic content)
    // Apenas event listeners que não são específicos de componentes dinâmicos.
    attachGlobalEventListeners();
};

const navigateTo = (url) => {
    window.location.hash = url; // Usa a hash do URL para navegação
};

window.addEventListener('hashchange', router); // Aciona o router quando a hash muda

// Event listener para cliques em links que usam hash (SPA)
document.addEventListener('click', (e) => {
    const { target } = e;
    const isRefreshButton = target.closest('#refresh-slang-btn'); // Não queremos que o botão de refresh altere o URL principal

    // Verifica se é um link que começa com "#/" mas não é o botão de refresh
    if (target.matches('a[href^="#/"]') && !isRefreshButton) {
        e.preventDefault(); // Impede o comportamento padrão do link
        navigateTo(target.getAttribute('href').substring(1)); // Remove o '#' e navega
    }
    // Adicione esta condição para links que parecem ser SPA mas podem estar faltando o #
    // Isso é uma medida de segurança caso algum link esteja escrito como /giria/id
    if (target.matches('a[href^="/giria/"]')) {
        e.preventDefault();
        // Garante que o URL tem a hash para o router funcionar
        navigateTo(target.getAttribute('href').replace(/^\//, '#/'));
    }
});


// --- Funções de Renderização de Componentes ---
function renderHeader() {
    const header = document.createElement('header');
    header.className = "bg-black border-b border-green-800";
    header.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <div class="flex-shrink-0">
                    <a href="#/" class="flex items-center no-underline" style="text-decoration: none;">
                        <span class="text-2xl md:text-3xl font-extrabold tracking-tight text-red-600">
                            GÍRIA<span class="text-green-500">DOS</span>MANOS
                        </span>
                    </a>
                </div>

                <!-- Desktop search menu: só aparece em md+ -->
                <div id="desktop-search-menu" class="md:hidden flex-grow-0 ml-auto mr-6"> 
                    <form id="header-search-form" class="relative">
                        <input
                            type="text"
                            id="header-search-input"
                            placeholder="Procurar gíria..."
                            class="w-full bg-gray-900 text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <span class="h-5 w-5 text-gray-400 absolute left-3 top-2.5">${getIconSvg('SearchIcon', 'h-5 w-5')}</span>
                    </form>
                </div>
                <!-- Desktop top menu: só aparece em md+ -->
                <nav id="desktop-top-menu" class="md:hidden items-center space-x-6">
                     <a href="#/" class="text-gray-300 hover:text-green-500 font-medium no-underline" style="text-decoration: none;">Inicio</a>
                      <a href="#/dicionario" class="text-gray-300 hover:text-green-500 font-medium no-underline" style="text-decoration: none;">Dicionário</a>
                </nav>

                <!-- Botão mobile: só aparece em mobile -->
                <button id="mobile-menu-toggle" class="hidden md:hidden text-gray-300 focus:outline-none ml-2" aria-label="Abrir menu">
                    ${getIconSvg('MenuIcon', 'h-6 w-6')}
                </button>
            </div>

            <!-- Painel mobile: começa escondido, só aparece em mobile -->
            <div id="mobile-menu-panel" class="md:hidden bg-black border-t border-green-800 px-4 py-4 flex flex-col items-center" style="display:none">
                <form id="mobile-search-form" class="relative mb-4 w-full max-w-md mx-auto flex justify-center items-center">
                    <input
                        type="text"
                        id="mobile-search-input"
                        placeholder="Procurar gíria..."
                        class="w-full bg-gray-900 text-white rounded-md pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-left"
                        style="text-align: left;"
                    />
                </form>
                <nav class="flex flex-col space-y-2 items-center">
                    <a href="#/" class="mobile-menu-link text-gray-300 hover:text-green-500 font-medium no-underline" style="text-decoration: none;">Inicio</a>
                    <a href="#/dicionario" class="mobile-menu-link text-gray-300 hover:text-green-500 font-medium no-underline" style="text-decoration: none;">Dicionário</a>
                </nav>
            </div>
        </div>
    `;
    return header;
}

function renderFooter() {
    const footer = document.createElement('footer');
    footer.className = "bg-black border-t border-green-800 py-4 text-center text-gray-400 text-sm";
    footer.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p>&copy; ${new Date().getFullYear()} Gíria dos Manos. Todos os direitos reservados.</p>
            <p class="mt-2">Conteúdo para maiores de 18 anos. Use com sabedoria (ou não).</p>
        </div>
    `;
    return footer;
}

function renderHome() {
    const homeDiv = document.createElement('div');
    homeDiv.className = "space-y-10";

    // Pega uma gíria aleatória
    let slangOfTheDay = getRandomSlang();

    // Constrói o conteúdo do cartão da gíria do dia
    const initialSlangCardContent = slangOfTheDay ? `
        <div class="flex flex-col md:flex-row md:items-baseline mb-2">
            <h3 class="text-xl font-bold text-red-500 mr-2">${slangOfTheDay.acronym}</h3>
            <p class="text-lg text-gray-200 font-medium">${slangOfTheDay.term}</p>
        </div>
        <div class="mb-2">
            <p class="text-gray-300">${slangOfTheDay.definition}</p>
        </div>
        <div class="mb-3">
            <h4 class="text-sm uppercase tracking-wider text-green-600 mb-1">Exemplo:</h4>
            <p class="italic text-gray-400">"${slangOfTheDay.examples[0]}"</p>
        </div>
        <div class="mt-3 text-right">
            <a href="#/giria/${slangOfTheDay.id}" class="text-green-500 hover:text-green-400 text-sm font-medium">
                Ver detalhes completos →
            </a>
        </div>
    ` : `
        <div class="text-center py-4">
            <p class="text-gray-400">Nenhuma gíria disponível para hoje. Tente recarregar!</p>
        </div>
    `;


    homeDiv.innerHTML = `
        <section class="text-center max-w-3xl mx-auto">
            <h1 class="text-4xl md:text-5xl font-extrabold text-green-500 mb-6">
                GÍRIA DOS MANOS
            </h1>
            <p class="text-xl text-gray-300 mb-8">
                O dicionário definitivo das gírias mais obscenas, nojentas e hilárias
                inventadas por um grupo de amigos sem qualquer filtro social.
            </p>
            <div class="flex justify-center space-x-4">
                <a href="#/dicionario" class="bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md transition duration-200 no-underline" style="text-decoration: none;">
                    Ver Dicionário
                </a>
            </div>
        </section>


        <section class="bg-gray-900 rounded-lg p-6 border border-green-800 max-w-4xl mx-auto">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold text-yellow-500">Gíria do Dia</h2>
                <a href="#" id="refresh-slang-btn" class="bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md transition duration-200 flex items-center cursor-pointer no-underline" style="text-decoration: none;" aria-label="Gerar nova gíria aleatória">
                    ${getIconSvg('RefreshCwIcon', 'h-5 w-5 mr-1')}
                    <span class="text-sm">Gerar outra</span>
                </a>
            </div>
            <div class="bg-black bg-opacity-50 p-5 rounded-md" id="slang-of-the-day-card">
                ${initialSlangCardContent}
            </div>
        </section>

        <section class="max-w-3xl mx-auto">
            <h2 class="text-2xl font-bold text-green-500 mb-4">
                Sobre o Projeto
            </h2>
            <div class="bg-gray-900 rounded-lg p-6 border border-green-800">
                <p class="text-gray-300 mb-4">
                    "Gíria dos Manos" nasceu durante intermináveis noites de bebedeira,
                    jogos e conversas sem filtro entre um grupo de amigos que não tem
                    medo de falar sobre as funções corporais mais nojentas e situações
                    mais constrangedoras.
                </p>
                <p class="text-gray-300 mb-4">
                    Cada gíria tem uma história por trás, geralmente envolvendo um
                    evento traumático, nojento ou hilariante que aconteceu com um dos
                    membros do grupo.
                </p>
                <p class="text-gray-300">
                    Este dicionário é um tributo à criatividade linguística que surge
                    quando homens adultos se comportam como crianças de 12 anos com
                    acesso irrestrito a palavrões.
                </p>
            </div>
        </section>

        <section class="max-w-3xl mx-auto text-center">
            <p class="text-yellow-500 font-bold text-lg mb-2">AVISO</p>
            <p class="text-gray-400 text-sm">
                Este site contém linguagem explícita, referências a funções corporais
                e humor adulto. Se você se ofende facilmente, este provavelmente não é
                o lugar para você.
            </p>
        </section>
    `;

    return homeDiv;
}

function updateSlangOfTheDay(slang) {
    const card = document.getElementById('slang-of-the-day-card');
    if (card && slang) { // Adicionado verificação para 'slang'
        card.innerHTML = `
            <div class="flex flex-col md:flex-row md:items-baseline mb-3">
                <h3 class="text-xl font-bold text-red-500 mr-2">${slang.acronym}</h3>
                <p class="text-lg text-gray-200 font-medium">${slang.term}</p>
            </div>
            <div class="mb-4">
                <p class="text-gray-300">${slang.definition}</p>
            </div>
            <div class="mb-4">
                <h4 class="text-sm uppercase tracking-wider text-green-600 mb-1">Exemplo:</h4>
                <p class="italic text-gray-400">"${slang.examples[0]}"</p>
            </div>
            <div class="mt-4 text-right">
                <a href="#/giria/${slang.id}" class="text-green-500 hover:text-green-400 text-sm font-medium">
                    Ver detalhes completos →
                </a>
            </div>
        `;
    } else if (card) { // Se slang for null ou undefined
        card.innerHTML = `
            <div class="text-center py-4">
                <p class="text-gray-400">Nenhuma gíria disponível no momento.</p>
            </div>
        `;
    }
}


function renderDictionary(searchFromUrl = '', categoryFromUrl = '') {
    const dictionaryDiv = document.createElement('div');
    dictionaryDiv.className = "space-y-8 main-content-dictionary-class";

    let currentSearchQuery = searchFromUrl;
    let currentSelectedCategory = categoryFromUrl;
    let currentFilteredSlang = [];

    const updateFilteredSlang = () => {
        let result = slangData;
        if (currentSearchQuery) {
            const query = currentSearchQuery.toLowerCase();
            result = result.filter(
                (slang) =>
                    slang.term.toLowerCase().includes(query) ||
                    (slang.acronym && slang.acronym.toLowerCase().includes(query)) ||
                    slang.definition.toLowerCase().includes(query)
            );
        }
        if (currentSelectedCategory) {
            result = result.filter((slang) => slang.category === currentSelectedCategory);
        }
        currentFilteredSlang = result;
        renderSlangList();
    };

    const renderSlangList = () => {
        const slangListContainer = dictionaryDiv.querySelector('#slang-list-container');
        if (!slangListContainer) return;

        if (currentFilteredSlang.length === 0) {
            slangListContainer.innerHTML = `
                <div class="text-center">
                    <p class="text-gray-400 mb-2">Nenhuma gíria encontrada para sua busca.</p>
                    <a href="#/dicionario" class="text-green-500 hover:text-green-400">Limpar filtros</a>
                </div>
            `;
        } else {
            slangListContainer.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${currentFilteredSlang.map(slang => `
                        <a href="#/giria/${slang.id}" class="bg-black bg-opacity-60 border border-gray-800 rounded-md p-4 hover:bg-gray-800 transition duration-200 no-underline"style="text-decoration: none;">
                            <div class="flex items-baseline mb-2">
                                <span class="text-red-500 font-bold mr-2">${slang.acronym}</span>
                                <span class="text-white font-medium">${slang.term}</span>
                            </div>
                            <p class="text-gray-400 text-sm line-clamp-2">${slang.definition}</p>
                            <div class="mt-2 flex justify-between items-center">
                                <span class="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">${slang.category}</span>
                                <span class="text-green-500 text-xs">Ver mais →</span>
                            </div>
                        </a>
                    `).join('')}
                </div>
            `;
        }
    };

    dictionaryDiv.innerHTML = `
        <div class="text-center max-w-3xl mx-auto mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-green-500 mb-2">Dicionário de Gírias</h1>
            <p class="text-gray-300">
                Explore a coleção completa de gírias inventadas pelos manos. Use os
                filtros para encontrar o que procura.
            </p>
        </div>
        <div class="bg-gray-900 p-6 rounded-lg border border-green-800">
            <div class="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
                <div class="flex-2 w-full md:w-1/2">
                    <label for="search" class="block text-sm font-medium text-gray-400 mb-1 text-center md:text-left">Pesquisar:</label>
                    <input
                        type="text"
                        id="dictionary-search-input"
                        value="${currentSearchQuery}"
                        placeholder="Procure uma gíria ou termo..."
                        class="w-full bg-black border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div class="w-full md:w-1/2">
                    <label for="category" class="block text-sm font-medium text-gray-400 mb-1 text-center md:text-left">Categoria:</label>
                    <select
                        id="category-select"
                        class="w-full bg-black border border-gray-700 rounded-md pl-4 pr-8 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">Todas as categorias</option>
                        ${categories.map(cat => `<option value="${cat}" ${currentSelectedCategory === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div id="slang-list-container">
            </div>
        </div>
    `;

    // Anexar event listeners diretamente aos elementos recém-criados
    const searchInput = dictionaryDiv.querySelector('#dictionary-search-input');
    const categorySelect = dictionaryDiv.querySelector('#category-select');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value; // Atualiza o estado local
            updateFilteredSlang(); // Só filtra localmente, não navega!
        });
        // Atualiza o URL apenas ao sair do campo ou pressionar Enter
        searchInput.addEventListener('blur', () => {
            const urlParams = new URLSearchParams();
            if (currentSearchQuery) urlParams.set('search', encodeURIComponent(currentSearchQuery));
            if (currentSelectedCategory) urlParams.set('category', encodeURIComponent(currentSelectedCategory));
            navigateTo(`/dicionario${urlParams.toString() ? '?' + urlParams.toString() : ''}`);
        });
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchInput.blur(); // Força o blur para atualizar o URL
            }
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            currentSelectedCategory = e.target.value;
            const urlParams = new URLSearchParams();
            if (currentSearchQuery) {
                urlParams.set('search', encodeURIComponent(currentSearchQuery));
            }
            if (currentSelectedCategory) {
                urlParams.set('category', encodeURIComponent(currentSelectedCategory));
            }
            navigateTo(`/dicionario${urlParams.toString() ? '?' + urlParams.toString() : ''}`);
        });
    }

    updateFilteredSlang();

    return dictionaryDiv;
}


function renderSlangPage(id) {
    const slang = getSlangById(id);
    const slangPageDiv = document.createElement('div');
    slangPageDiv.className = "max-w-4xl mx-auto";

    if (!slang) {
        slangPageDiv.innerHTML = `
            <div class="text-center py-12">
                <h1 class="text-3xl font-bold text-red-500 mb-4">Gíria não encontrada</h1>
                <p class="text-gray-300 mb-6">A gíria que você está procurando não existe no nosso dicionário.</p>
                <a href="#/dicionario" class="text-green-500 hover:text-green-400 flex items-center justify-center no-underline" style="text-decoration: none;">
                    ${getIconSvg('ArrowLeftIcon', 'h-4 w-4 mr-2')}
                    Voltar ao dicionário
                </a>
            </div>
        `;
        return slangPageDiv;
    }

    const relatedSlang = slangData
        .filter((item) => item.category === slang.category && item.id !== slang.id)
        .slice(0, 3);

    slangPageDiv.innerHTML = `
        <a href="#/dicionario" class="text-green-500 hover:text-green-400 flex items-center mb-6 no-underline" style="text-decoration: none;">
            ${getIconSvg('ArrowLeftIcon', 'h-4 w-4 mr-2')}
            Voltar ao dicionário
        </a>
        <div class="bg-gray-900 rounded-lg border border-green-800 overflow-hidden">
            <div class="p-6 md:p-8">
                <div class="flex flex-col md:flex-row md:items-baseline mb-6">
                    <h1 class="text-3xl font-bold text-red-500 mr-3">${slang.acronym}</h1>
                    <h2 class="text-2xl text-white font-medium">${slang.term}</h2>
                </div>
                <div class="mb-8">
                    <h3 class="text-sm uppercase tracking-wider text-green-600 mb-2">Definição:</h3>
                    <p class="text-gray-200 text-lg">${slang.definition}</p>
                </div>
                <div class="mb-8">
                    <h3 class="text-sm uppercase tracking-wider text-green-600 mb-2">Exemplos de uso:</h3>
                    <ul class="space-y-2">
                        ${slang.examples.map((example, index) => `<li key="${index}" class="italic text-gray-300">"${example}"</li>`).join('')}
                    </ul>
                </div>
                ${slang.context ? `
                <div class="mb-8">
                    <h3 class="text-sm text-green-600">Origem/Contexto:</h3>
                    <p class="text-gray-300">${slang.context}</p>
                </div>
                ` : ''}
                <div class="mt-6 pt-4 border-t border-gray-800 flex items-center gap-4">
                    <span class="text-m text-gray-400">Categoria:</span>
                    <span class="ml-2 inline-flex items-center px-4 py-1 rounded-full border border-yellow-500 bg-black bg-opacity-60 text-yellow-400 font-semibold text-xs shadow-sm transition">
                        ${slang.category}
                    </span>
                </div>
            </div>
        </div>
        ${relatedSlang.length > 0 ? `
        <div class="mt-10">
            <h3 class="text-xl font-bold text-green-500 mb-4">Gírias Relacionadas</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                ${relatedSlang.map((item) => `
                    <a href="#/giria/${item.id}" class="bg-gray-900 border border-gray-800 rounded-md p-4 hover:bg-gray-800 transition duration-200 no-underline" style="text-decoration: none;">
                        <div class="flex items-baseline mb-2">
                            <span class="text-red-500 font-bold mr-2">${item.acronym}</span>
                            <span class="text-white font-medium">${item.term}</span>
                        </div>
                        <p class="text-gray-400 text-sm line-clamp-2">${item.definition}</p>
                    </a>
                `).join('')}
            </div>
        </div>
        ` : ''}
    `;
    return slangPageDiv;
}

function attachGlobalEventListeners() {
    console.log(window.innerWidth);
    const desktopSearchMenu = document.getElementById('desktop-search-menu');
    const desktopTopMenu = document.getElementById('desktop-top-menu');
    if (window.innerWidth < 768) {
        desktopSearchMenu.style.display = 'none';
        desktopTopMenu.style.display = 'none';
    }else{
        desktopSearchMenu.style.display = 'flex';
        desktopTopMenu.style.display = 'flex';

    }

    const headerSearchForm = document.getElementById('header-search-form');
    const headerSearchInput = document.getElementById('header-search-input');
    if (headerSearchForm && headerSearchInput) {
        headerSearchForm.onsubmit = (e) => {
            e.preventDefault();
            const query = headerSearchInput.value.trim();
            if (query) {
                navigateTo(`/dicionario?search=${encodeURIComponent(query)}`);
                headerSearchInput.value = '';
            }
            // Close mobile menu if open
            const mobileMenuPanel = document.getElementById('mobile-menu-panel');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            if (mobileMenuPanel && mobileMenuToggle && !mobileMenuPanel.classList.contains('hidden')) {
                mobileMenuPanel.classList.add('hidden');
                mobileMenuToggle.innerHTML = getIconSvg('MenuIcon', 'h-6 w-6');
            }
            // Make sure the desktopMenu hiding logic is removed as previously discussed.
        };
    }

    const mobileSearchForm = document.getElementById('mobile-search-form');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    if (mobileSearchForm && mobileSearchInput) {
        mobileSearchForm.onsubmit = (e) => {
            e.preventDefault();
            const query = mobileSearchInput.value.trim();
            if (query) {
                navigateTo(`/dicionario?search=${encodeURIComponent(query)}`);
                mobileSearchInput.value = '';
            }
            // Close mobile menu
            const mobileMenuPanel = document.getElementById('mobile-menu-panel');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            if (mobileMenuPanel && mobileMenuToggle) {
                mobileMenuPanel.classList.add('hidden');
                mobileMenuToggle.innerHTML = getIconSvg('MenuIcon', 'h-6 w-6');
            }
        };
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');
    if (mobileMenuToggle && mobileMenuPanel) {
        mobileMenuToggle.onclick = () => {
            if (mobileMenuPanel.style.display == 'none') {
                mobileMenuToggle.innerHTML = getIconSvg('XIcon', 'h-6 w-6');
                console.log("Cliquei para abrir!");
                mobileMenuPanel.style.display = 'block';
            } else {
                mobileMenuToggle.innerHTML = getIconSvg('MenuIcon', 'h-6 w-6');
                console.log("Cliquei para fechar!");
                mobileMenuPanel.style.display = 'none';
            }
        };
    }

    // Mobile menu links (to close menu when clicked)
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuPanel && mobileMenuToggle) {
                mobileMenuPanel.classList.add('hidden');
                mobileMenuToggle.innerHTML = getIconSvg('MenuIcon', 'h-6 w-6');
            }
        });
    });

    // Home page "Refresh Slang" button
    const refreshSlangBtn = document.getElementById('refresh-slang-btn');
    if (refreshSlangBtn) {
        refreshSlangBtn.addEventListener('click', () => {
            const newSlang = getRandomSlang();
            updateSlangOfTheDay(newSlang);
        });
    }
}


// Initial router call when DOM is fully loaded
document.addEventListener('DOMContentLoaded', router);

// Chamada inicial para anexar os listeners globais
document.addEventListener('DOMContentLoaded', attachGlobalEventListeners);