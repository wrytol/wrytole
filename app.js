// Sample Starter Dataset
const articles = [
  {
    id: 1,
    title: "M3 MacBook Air 15-inch Discounted by $200",
    category: "deal",
    tag: "Hardware Deal",
    desc: "Apple's latest 15-inch M3 laptop drops to a record low price across major online retailers.",
    date: "Aug 22, 2026",
    link: "#",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Best Open-Source LLMs for Local Deployment in 2026",
    category: "ai",
    tag: "AI Software",
    desc: "A comparative evaluation of lightweight models capable of running natively on consumer hardware.",
    date: "Aug 20, 2026",
    link: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Complete Guide to Asymmetric Encryption Standards",
    category: "guide",
    tag: "Security Guide",
    desc: "Understand post-quantum cryptographic primitives and how they affect modern web infrastructure.",
    date: "Aug 18, 2026",
    link: "#",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "4K OLED Monitor Sale: Top 3 Picks",
    category: "deal",
    tag: "Display Deal",
    desc: "High refresh rate OLED displays are seeing significant price reductions this season.",
    date: "Aug 15, 2026",
    link: "#",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60"
  }
];

// Single Page Navigation Controller
function navigateTo(viewId) {
  const views = document.querySelectorAll('.page-view');
  views.forEach(v => v.classList.remove('active'));
  
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  
  const activeNav = document.getElementById(`nav-${viewId}`);
  if (activeNav) {
    activeNav.classList.add('active');
  }

  // Close mobile navigation menu if open
  document.getElementById('nav-links').classList.remove('open');
  window.scrollTo(0, 0);
}

// Mobile Menu Toggle
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('open');
}

// Render Card Grid Data
function renderCards(data, targetContainerId) {
  const container = document.getElementById(targetContainerId);
  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No results found.</p>`;
    return;
  }

  container.innerHTML = data.map(item => `
    <article class="card">
      <img src="${item.image}" alt="${item.title}" class="card-img" loading="lazy">
      <div class="card-body">
        <span class="card-tag ${item.category === 'deal' ? 'deal' : ''}">${item.tag}</span>
        <h2 class="card-title">${item.title}</h2>
        <p class="card-desc">${item.desc}</p>
        <div class="card-footer">
          <span>${item.date}</span>
          <a href="${item.link}" style="color: var(--primary); font-weight: 600;">Read More →</a>
        </div>
      </div>
    </article>
  `).join('');
}

// Search and Filter Handling
let currentCategory = 'all';

function filterCategory(category, buttonEl) {
  currentCategory = category;
  
  // Update Tab Styling
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  if (buttonEl) buttonEl.classList.add('active');

  applyFilters();
}

function handleSearch(query) {
  applyFilters(query.toLowerCase());
}

function applyFilters(searchQuery = '') {
  let filtered = articles;

  if (currentCategory !== 'all') {
    filtered = filtered.filter(a => a.category === currentCategory);
  }

  if (searchQuery) {
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(searchQuery) || 
      a.desc.toLowerCase().includes(searchQuery)
    );
  }

  renderCards(filtered, 'content-grid');
}

// Initial Population Routine
document.addEventListener('DOMContentLoaded', () => {
  // Populate main views
  renderCards(articles, 'content-grid');
  renderCards(articles.filter(a => a.category === 'deal'), 'deals-grid');
  renderCards(articles.filter(a => a.category === 'guide'), 'guides-grid');
  renderCards(articles.filter(a => a.category === 'ai'), 'ai-grid');

  // Handle URL Hash navigation
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    navigateTo(hash);
  }
});