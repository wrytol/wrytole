// REAL WRYTELO CONTENT DATA
const APP_DATA = {
    deals: [
        {
            id: 'd1',
            title: 'Apple MacBook Air M3 (16GB RAM, 512GB SSD)',
            category: 'Laptops',
            price: '$1,099',
            originalPrice: '$1,299',
            date: 'Aug 23, 2026',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
            description: 'Powerful M3 chip with 16GB unified memory for creative workflows and long battery life.',
            link: 'https://wa.me/256709539676?text=Inquiring%20about%20MacBook%20Air%20M3%20Deal'
        },
        {
            id: 'd2',
            title: 'Sony WH-1000XM5 Noise-Canceling Headphones',
            category: 'Audio',
            price: '$328',
            originalPrice: '$399',
            date: 'Aug 22, 2026',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
            description: 'Industry-leading noise cancellation dual processor headphones with crystal clear mic technology.',
            link: 'https://wa.me/256709539676?text=Inquiring%20about%20Sony%20WH-1000XM5'
        },
        {
            id: 'd3',
            title: 'Samsung Galaxy S24 Ultra (512GB)',
            category: 'Smartphones',
            price: '$1,119',
            originalPrice: '$1,419',
            date: 'Aug 21, 2026',
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
            description: 'Integrated Galaxy AI features, titanium frame, and 200MP camera setup.',
            link: 'https://wa.me/256709539676?text=Inquiring%20about%20Galaxy%20S24%20Ultra'
        }
    ],
    guides: [
        {
            id: 'g1',
            title: 'How to Run Local AI Models via Ollama',
            category: 'Tutorials',
            date: 'Aug 20, 2026',
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
            description: 'Complete setup guide for running open-source LLMs locally on macOS or Linux without subscription fees.',
            link: '#guides'
        },
        {
            id: 'g2',
            title: 'Apple M3 Pro vs Snapdragon X Elite Comparison',
            category: 'Comparisons',
            date: 'Aug 18, 2026',
            image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80',
            description: 'Real-world benchmarks evaluating ARM battery efficiency and application compatibility.',
            link: '#guides'
        }
    ],
    aiNews: [
        {
            id: 'a1',
            title: 'Autonomous Coding Agents Streamline Fullstack Development',
            category: 'AI Tools',
            date: 'Aug 23, 2026',
            image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
            description: 'How production engineering teams utilize modern AI agents to refactor codebases safely.',
            link: '#ai'
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTheme();
    renderContent();
    initFilters();
    initForms();
});

// ROUTING
function initNavigation() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));
}

function handleRoute() {
    const hash = window.location.hash || '#home';
    const targetId = `view-${hash.replace('#', '')}`;
    
    document.querySelectorAll('.view-page').forEach(view => {
        if (view.id === targetId) view.classList.add('active');
        else view.classList.remove('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === hash) link.classList.add('active');
        else link.classList.remove('active');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// TOGGLE DETAILS FOR SOCIAL MEDIA
function toggleSocialDetails(containerId) {
    const targetContainer = document.getElementById(containerId);
    if (!targetContainer) return;

    const isShown = targetContainer.classList.contains('show');
    const btn = targetContainer.previousElementSibling;

    if (isShown) {
        targetContainer.classList.remove('show');
        if (btn) btn.innerHTML = `Show Details <i class="fa-solid fa-chevron-down"></i>`;
    } else {
        targetContainer.classList.add('show');
        if (btn) btn.innerHTML = `Hide Details <i class="fa-solid fa-chevron-up"></i>`;
    }
}

// THEME
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('wrytelo_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('wrytelo_theme', next);
    });
}

// RENDERING CONTENT
function renderContent() {
    renderDeals('home-deals-grid', APP_DATA.deals);
    renderDeals('deals-page-grid', APP_DATA.deals);
    renderGuides('home-guides-grid', APP_DATA.guides);
    renderGuides('guides-page-grid', APP_DATA.guides);
    renderAINews('home-ai-grid', APP_DATA.aiNews);
    renderAINews('ai-page-grid', APP_DATA.aiNews);
}

function renderDeals(targetId, items) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = items.map(item => `
        <article class="card">
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <span class="card-category-badge">${item.category}</span>
            </div>
            <div class="card-body">
                <span class="card-date">${item.date}</span>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-text">${item.description}</p>
                <div class="deal-price-row">
                    <span class="deal-price">${item.price}</span>
                    <span class="deal-original-price">${item.originalPrice}</span>
                </div>
                <a href="${item.link}" target="_blank" rel="noopener" class="btn btn-primary btn-block">Get Deal Offer</a>
            </div>
        </article>
    `).join('');
}

function renderGuides(targetId, items) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = items.map(item => `
        <article class="card">
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <span class="card-category-badge">${item.category}</span>
            </div>
            <div class="card-body">
                <span class="card-date">${item.date}</span>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-text">${item.description}</p>
                <a href="${item.link}" class="btn btn-secondary btn-block">Read Guide</a>
            </div>
        </article>
    `).join('');
}

function renderAINews(targetId, items) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = items.map(item => `
        <article class="card">
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <span class="card-category-badge">${item.category}</span>
            </div>
            <div class="card-body">
                <span class="card-date">${item.date}</span>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-text">${item.description}</p>
                <a href="${item.link}" class="btn btn-outline btn-block">Read Insight</a>
            </div>
        </article>
    `).join('');
}

// SEARCH AND FILTERS
function initFilters() {
    const dealsSearch = document.getElementById('deals-search');
    if (dealsSearch) {
        dealsSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = APP_DATA.deals.filter(d => d.title.toLowerCase().includes(query));
            renderDeals('deals-page-grid', filtered);
        });
    }
}

// FORMS
function initForms() {
    ['ad-inquiry-form', 'contact-form'].forEach(id => {
        const form = document.getElementById(id);
        if (!form) return;
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const status = form.querySelector('.form-status');
            status.style.display = 'block';
            status.className = 'form-status success';
            status.textContent = 'Submission received! Our team will contact you shortly.';
            form.reset();
        });
    });
}