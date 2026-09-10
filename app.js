const products = [
  { name:'Авокадо-тост', desc:'Ремесленный хлеб, творожный сыр, авокадо и микрозелень', price:3200, category:'breakfast', veg:true, kids:false, isNew:false, image:'./assets/menu-v2/avocado-toast.webp' },
  { name:'Куриная суп-лапша', desc:'Куриный бульон, лапша, морковь, лук, курица и укроп', price:1800, category:'food', veg:false, kids:true, isNew:false, image:'./assets/menu-v2/chicken-soup.webp' },
  { name:'Раф лаванда', desc:'Сливочный кофе с тонким ароматом лаванды', price:2200, category:'drinks', veg:true, kids:false, isNew:true, image:'./assets/menu-v2/lavender-raf.webp' },
  { name:'Капучино 350 мл', desc:'Эспрессо, молоко и плотная бархатная пенка', price:1700, category:'drinks', veg:true, kids:false, isNew:false, image:'./assets/menu-v2/cappuccino.webp' },
  { name:'Английский завтрак', desc:'Колбаски, яйцо, тост и свежие овощи', price:3900, category:'breakfast', veg:false, kids:false, isNew:false, image:'./assets/menu-v2/english-breakfast.webp' },
  { name:'Зеленый салат', desc:'Свежая зелень, овощи, мягкий сыр и легкая заправка', price:3200, category:'food', veg:true, kids:false, isNew:false, image:'./assets/menu-v2/green-salad.webp' },
  { name:'Боул с киноа', desc:'Киноа, брокколи, яйцо и сезонные овощи', price:3900, category:'food', veg:true, kids:false, isNew:false, image:'./assets/menu-v2/quinoa-bowl.webp' },
  { name:'Тост с лососем', desc:'Слабосоленый лосось, яйцо пашот и сливочный сыр', price:4900, category:'breakfast', veg:false, kids:false, isNew:false, image:'./assets/menu-v2/salmon-toast.webp' },
  { name:'Классический круассан', desc:'Свежая выпечка из слоеного сливочного теста', price:1000, category:'bakery', veg:true, kids:true, isNew:false, image:'./assets/menu-v2/croissant.webp' },
  { name:'Булочка фисташка-малина', desc:'Фисташковый крем и малина', price:1600, category:'bakery', veg:true, kids:true, isNew:true, image:'./assets/menu-v2/pistachio-raspberry-bun.webp' },
  { name:'Фрезье', desc:'Миндальный бисквит, клубничное компоте и ванильный мусс', price:2900, category:'desserts', veg:true, kids:true, isNew:true, image:'./assets/menu-v2/fraisier.webp' },
  { name:'Чизкейк Орео', desc:'Шоколадный крамбл, крем-чиз, печенье Орео и нутелла', price:2900, category:'desserts', veg:true, kids:true, isNew:false, image:'./assets/menu-v2/oreo-cheesecake.webp' },
  { name:'Домашние котлетки', desc:'Картофельное пюре, говяжьи котлеты и сливочный соус', price:2000, category:'food', veg:false, kids:true, isNew:false, image:'./assets/menu-v2/homestyle-cutlets.webp' }
];

const storyPhotos = [
  'https://imageproxy.wolt.com/assets/6926e9304be0f0d2140eb38c',
  'https://imageproxy.wolt.com/assets/6926ea10bdb7711ba3d35b9d',
  'https://imageproxy.wolt.com/assets/6926ed4ed40d543329714fe1',
  'https://imageproxy.wolt.com/assets/6926ed2cd40d543329714fcd',
  'https://imageproxy.wolt.com/assets/6926e7debdb7711ba3d35a0d',
  'https://imageproxy.wolt.com/assets/6926e80ed40d543329714d9a',
  'https://imageproxy.wolt.com/assets/6926e85d4be0f0d2140eb335',
  'https://imageproxy.wolt.com/assets/6926e8ea4be0f0d2140eb369',
  'https://imageproxy.wolt.com/assets/6926ef1e4be0f0d2140eb5b1',
  'https://imageproxy.wolt.com/assets/6926ef244be0f0d2140eb5b3',
  'https://imageproxy.wolt.com/assets/6926eea94be0f0d2140eb579',
  'https://imageproxy.wolt.com/assets/6926eef94be0f0d2140eb599',
  'https://imageproxy.wolt.com/assets/6926eb2dbdb7711ba3d35c36'
];
products.forEach((product, index) => { product.storyImage = storyPhotos[index]; });

// Stories are warmed while the splash screen is visible, so taps can swap frames immediately.
const storyPreloads = storyPhotos.map((src, index) => {
  const image = new Image();
  image.decoding = 'async';
  image.fetchPriority = index < 6 ? 'high' : 'low';
  image.src = src;
  return image;
});

const grid = document.querySelector('#productGrid');
const splash = document.querySelector('#splash');
const app = document.querySelector('#app');
const cartFab = document.querySelector('#cartFab');
const cartTotal = document.querySelector('#cartTotal');
const toast = document.querySelector('#toast');
const heroSearchInput = document.querySelector('#heroSearchInput');
const searchSuggestions = document.querySelector('#searchSuggestions');
const searchResults = document.querySelector('#searchResults');
const menuTitle = document.querySelector('#menuTitle');
const storyViewer = document.querySelector('#storyViewer');
const storyPhoto = document.querySelector('#storyPhoto');
const storyAvatar = document.querySelector('#storyAvatar');
const storyCategory = document.querySelector('#storyCategory');
const storyName = document.querySelector('#storyName');
const storyDesc = document.querySelector('#storyDesc');
const storyPrice = document.querySelector('#storyPrice');
const storyProgress = document.querySelector('#storyProgress');
const budgetSheet = document.querySelector('#budgetSheet');
const budgetInput = document.querySelector('#budgetInput');
const budgetButton = document.querySelector('[data-filter="budget"]');
const cartSheet = document.querySelector('#cartSheet');
const cartList = document.querySelector('#cartList');
const cartSheetTotal = document.querySelector('#cartSheetTotal');
const productSheet = document.querySelector('#productSheet');
const detailImage = document.querySelector('#detailImage');
const detailName = document.querySelector('#detailName');
const detailDesc = document.querySelector('#detailDesc');
const detailAddons = document.querySelector('#detailAddons');
const detailPrice = document.querySelector('#detailPrice');

let selectedCategory = 'all';
let activeFilter = 'all';
let cart = 0;
let storyItems = [];
let storyIndex = 0;
let storyTimer;
let storyCategoryKey = 'all';
let budgetLimit = 4000;
let budgetCategory = 'all';
let searchFrame;
let detailProductIndex = -1;
const selectedAddons = new Set();
const cartLines = new Map();

const money = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₸';
const categoryNames = { all:'Все', breakfast:'Завтраки', drinks:'Напитки', bakery:'Выпечка', desserts:'Десерты', food:'Кухня' };

function productMatches(product, query) {
  const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
  const filterMatch = activeFilter === 'all'
    || (activeFilter === 'new' && product.isNew)
    || (activeFilter === 'budget' && product.price <= budgetLimit && (budgetCategory === 'all' || product.category === budgetCategory))
    || (activeFilter === 'veg' && product.veg)
    || (activeFilter === 'kids' && product.kids);
  const normalized = query.trim().toLocaleLowerCase('ru');
  const searchMatch = !normalized || `${product.name} ${product.desc}`.toLocaleLowerCase('ru').includes(normalized);
  return categoryMatch && filterMatch && searchMatch;
}

function renderProducts(query = '') {
  const filterTitles = { new:'Новинки', budget:`До ${new Intl.NumberFormat('ru-RU').format(budgetLimit)} ₸`, veg:'Без мяса', kids:'Для детей' };
  menuTitle.textContent = activeFilter !== 'all' ? filterTitles[activeFilter] : (selectedCategory === 'all' ? 'Все меню' : categoryNames[selectedCategory]);
  const visibleProducts = products.map((product, index) => ({ product, index })).filter(({ product }) => productMatches(product, query));
  const cards = visibleProducts.map(({ product, index }, visibleIndex) => {
    return `<article class="product" data-index="${index}" role="button" tabindex="0" aria-label="Открыть ${product.name}" style="animation-delay:${Math.min(visibleIndex * 45, 300)}ms">
      <div class="product-image"><img src="${product.image}" alt="${product.name}" loading="${index < 4 ? 'eager' : 'lazy'}" decoding="async"></div>
      <div class="product-copy"><h3>${product.name}</h3><p>${product.desc}</p><div class="product-foot"><span class="product-price">${money(product.price)}</span></div></div>
    </article>`;
  }).join('');

  grid.innerHTML = cards + (visibleProducts.length ? '' : `<div class="empty-state"><i>✦</i><strong>Ничего не нашли</strong><span>Попробуйте другой запрос или откройте все меню.</span></div>`);
}

function renderSearchResults(query = '') {
  const normalized = query.trim().toLocaleLowerCase('ru');
  searchSuggestions.hidden = Boolean(normalized);
  searchResults.hidden = !normalized;
  if (!normalized) {
    searchResults.innerHTML = '';
    return;
  }

  const matches = products.filter(product => `${product.name} ${product.desc}`.toLocaleLowerCase('ru').includes(normalized)).slice(0, 4);
  searchResults.innerHTML = matches.length ? matches.map(product => {
    const index = products.indexOf(product);
    return `<article class="search-result" data-index="${index}" role="button" tabindex="0" aria-label="Открыть ${product.name}">
      <span class="search-result-image"><img src="${product.image}" alt="" decoding="async"></span>
      <span class="search-result-copy"><strong>${product.name}</strong><small>${money(product.price)}</small></span>
    </article>`;
  }).join('') : `<div class="search-empty"><strong>Ничего не нашли</strong><span>Попробуйте написать короче</span></div>`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1500);
}

function renderCart() {
  const lines = [...cartLines.entries()].filter(([, quantity]) => quantity > 0);
  const itemCount = lines.reduce((sum, [, quantity]) => sum + quantity, 0);
  cart = lines.reduce((sum, [index, quantity]) => sum + products[index].price * quantity, 0);
  cartTotal.textContent = money(cart);
  cartSheetTotal.textContent = money(cart);
  cartFab.classList.toggle('visible', itemCount > 0);
  cartList.innerHTML = lines.length ? lines.map(([index, quantity]) => {
    const product = products[index];
    return `<article class="cart-line" data-index="${index}">
      <span class="cart-line-image"><img src="${product.image}" alt="" decoding="async"></span>
      <span class="cart-line-copy"><strong>${product.name}</strong><small>${money(product.price * quantity)}</small></span>
      <span class="cart-quantity"><button type="button" data-cart-change="-1" aria-label="Убрать ${product.name}">−</button><b>${quantity}</b><button type="button" data-cart-change="1" aria-label="Добавить ${product.name}">+</button></span>
    </article>`;
  }).join('') : `<div class="cart-empty"><strong>Пока пусто</strong><span>Добавленные блюда появятся здесь</span></div>`;
}

function addToCart(product) {
  if (!product) return;
  const index = products.indexOf(product);
  cartLines.set(index, (cartLines.get(index) || 0) + 1);
  renderCart();
}

function scrollToMenu() {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelector('.products-section').scrollIntoView({ behavior:'smooth', block:'start' });
  }));
}

function setSheetState(sheet, open) {
  sheet.classList.toggle('open', open);
  sheet.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('modal-open', document.querySelector('.mode-sheet.open') !== null);
}

function closeSheet(sheet) {
  setSheetState(sheet, false);
}

function suggestedAddons(productIndex) {
  const category = products[productIndex].category;
  if (category === 'drinks') return [8, 9];
  if (category === 'bakery' || category === 'desserts') return [3, 2];
  if (category === 'breakfast') return [3, 2];
  return [3, 8];
}

function updateDetailTotal() {
  const base = products[detailProductIndex]?.price || 0;
  const addons = [...selectedAddons].reduce((sum, index) => sum + products[index].price, 0);
  detailPrice.textContent = money(base + addons);
}

function openProduct(productIndex) {
  const product = products[productIndex];
  if (!product) return;
  detailProductIndex = productIndex;
  selectedAddons.clear();
  detailImage.src = product.image;
  detailImage.alt = product.name;
  detailName.textContent = product.name;
  detailDesc.textContent = product.desc;
  detailAddons.innerHTML = suggestedAddons(productIndex).filter(index => index !== productIndex).map(index => {
    const addon = products[index];
    return `<button type="button" data-addon-index="${index}" aria-pressed="false"><img src="${addon.image}" alt=""><span><strong>${addon.name}</strong><small>+ ${money(addon.price)}</small></span></button>`;
  }).join('');
  updateDetailTotal();
  setSheetState(productSheet, true);
}

function paintStory() {
  const product = storyItems[storyIndex];
  if (!product) return;
  clearTimeout(storyTimer);
  storyPhoto.src = product.storyImage;
  storyPhoto.alt = product.name;
  storyAvatar.src = product.storyImage;
  storyCategory.textContent = categoryNames[storyCategoryKey] || 'Все';
  storyName.textContent = product.name;
  storyDesc.textContent = product.desc;
  storyPrice.textContent = money(product.price);
  storyViewer.dataset.productIndex = products.indexOf(product);
  storyProgress.innerHTML = storyItems.map((_, index) => `<span class="${index < storyIndex ? 'done' : index === storyIndex ? 'current' : ''}"><i></i></span>`).join('');
  storyTimer = setTimeout(() => changeStory(1), 5200);
}

function openStory(category) {
  storyCategoryKey = category;
  storyItems = (category === 'all' ? products.slice(0, 6) : products.filter(product => product.category === category));
  if (!storyItems.length) return;
  storyIndex = 0;
  storyViewer.classList.add('open');
  storyViewer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('story-open');
  paintStory();
  document.querySelector('#storyClose').focus({ preventScroll:true });
}

function closeStory() {
  clearTimeout(storyTimer);
  storyViewer.classList.remove('open');
  storyViewer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('story-open');
  heroSearchInput.value = '';
  renderSearchResults('');
  selectedCategory = storyCategoryKey;
  activeFilter = 'all';
  paintActiveFilter();
  document.querySelectorAll('.category').forEach(button => button.classList.toggle('active', button.dataset.category === selectedCategory));
  renderProducts();
  setTimeout(scrollToMenu, 80);
}

function changeStory(direction) {
  const next = storyIndex + direction;
  if (next < 0) { paintStory(); return; }
  if (next >= storyItems.length) { closeStory(); return; }
  storyIndex = next;
  paintStory();
}

function resetCategory() {
  selectedCategory = 'all';
  document.querySelectorAll('.category').forEach(button => button.classList.toggle('active', button.dataset.category === 'all'));
}

function paintActiveFilter() {
  document.querySelectorAll('.filter').forEach(button => {
    const matchesFilter = button.dataset.filter === activeFilter;
    const allMenuIsCurrent = activeFilter !== 'all' || selectedCategory === 'all';
    button.classList.toggle('active', matchesFilter && allMenuIsCurrent);
  });
}

function showResults() {
  renderSearchResults(heroSearchInput.value);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
  const video = document.querySelector('#splashVideo');
  video?.play().catch(() => {});

  requestAnimationFrame(() => requestAnimationFrame(() => splash.classList.add('show-logo')));
  setTimeout(() => splash.classList.add('leaving'), 3500);
  setTimeout(() => { splash.classList.add('exit'); app.classList.add('ready'); }, 3900);
  setTimeout(() => { splash.classList.add('hidden'); video?.pause(); }, 5050);
});

document.querySelector('.category-row').addEventListener('click', event => {
  const button = event.target.closest('.category');
  if (!button) return;
  heroSearchInput.value = '';
  renderSearchResults('');
  button.classList.add('viewed');
  openStory(button.dataset.category);
});

document.querySelector('.filter-row').addEventListener('click', event => {
  const button = event.target.closest('.filter');
  if (!button) return;
  if (button.dataset.filter === 'all') {
    heroSearchInput.value = '';
    renderSearchResults('');
    activeFilter = 'all';
    resetCategory();
    paintActiveFilter();
    renderProducts();
    scrollToMenu();
    return;
  }
  if (button.dataset.filter === 'budget') {
    budgetInput.value = activeFilter === 'budget' ? budgetLimit : '';
    setSheetState(budgetSheet, true);
    return;
  }
  heroSearchInput.value = '';
  renderSearchResults('');
  const wasActive = button.classList.contains('active');
  activeFilter = wasActive ? 'all' : button.dataset.filter;
  resetCategory();
  paintActiveFilter();
  renderProducts();
  scrollToMenu();
});

heroSearchInput.addEventListener('input', () => {
  cancelAnimationFrame(searchFrame);
  searchFrame = requestAnimationFrame(() => renderSearchResults(heroSearchInput.value));
});

heroSearchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') { event.preventDefault(); showResults(); heroSearchInput.blur(); }
});

document.querySelector('.search-suggestions').addEventListener('click', event => {
  const button = event.target.closest('[data-query]');
  if (!button) return;
  heroSearchInput.value = button.dataset.query;
  showResults();
  heroSearchInput.focus();
});

searchResults.addEventListener('click', event => {
  const result = event.target.closest('.search-result');
  if (!result) return;
  openProduct(Number(result.dataset.index));
});

searchResults.addEventListener('keydown', event => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const result = event.target.closest('.search-result');
  if (!result) return;
  event.preventDefault();
  openProduct(Number(result.dataset.index));
});

document.querySelectorAll('[data-close-sheet]').forEach(button => {
  button.addEventListener('click', () => closeSheet(button.closest('.mode-sheet')));
});

document.querySelector('#budgetCategories').addEventListener('click', event => {
  const button = event.target.closest('[data-budget-category]');
  if (!button) return;
  budgetCategory = button.dataset.budgetCategory;
  document.querySelectorAll('[data-budget-category]').forEach(item => item.classList.toggle('active', item === button));
});

document.querySelector('#applyBudget').addEventListener('click', () => {
  const entered = Number(budgetInput.value);
  if (!budgetInput.value.trim() || !Number.isFinite(entered) || entered < 500) {
    showToast('Введите бюджет от 500 ₸');
    budgetInput.focus();
    return;
  }
  budgetLimit = Math.min(20000, Math.max(500, entered));
  budgetInput.value = budgetLimit;
  activeFilter = 'budget';
  resetCategory();
  paintActiveFilter();
  budgetButton.textContent = `До ${new Intl.NumberFormat('ru-RU').format(budgetLimit)} ₸`;
  renderProducts();
  closeSheet(budgetSheet);
  scrollToMenu();
});

document.querySelector('#resetBudget').addEventListener('click', () => {
  budgetLimit = 4000;
  budgetCategory = 'all';
  budgetInput.value = '';
  activeFilter = 'all';
  budgetButton.textContent = 'Бюджет';
  document.querySelectorAll('[data-budget-category]').forEach(button => button.classList.toggle('active', button.dataset.budgetCategory === 'all'));
  paintActiveFilter();
  resetCategory();
  renderProducts();
  closeSheet(budgetSheet);
});

cartList.addEventListener('click', event => {
  const button = event.target.closest('[data-cart-change]');
  if (!button) return;
  const line = button.closest('.cart-line');
  const index = Number(line.dataset.index);
  const nextQuantity = (cartLines.get(index) || 0) + Number(button.dataset.cartChange);
  if (nextQuantity > 0) cartLines.set(index, nextQuantity);
  else cartLines.delete(index);
  renderCart();
});

document.querySelector('#cartDone').addEventListener('click', () => closeSheet(cartSheet));

grid.addEventListener('click', event => {
  const card = event.target.closest('.product');
  if (!card) return;
  openProduct(Number(card.dataset.index));
});

grid.addEventListener('keydown', event => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const card = event.target.closest('.product');
  if (!card) return;
  event.preventDefault();
  openProduct(Number(card.dataset.index));
});

detailAddons.addEventListener('click', event => {
  const button = event.target.closest('[data-addon-index]');
  if (!button) return;
  const index = Number(button.dataset.addonIndex);
  if (selectedAddons.has(index)) selectedAddons.delete(index);
  else selectedAddons.add(index);
  button.classList.toggle('selected', selectedAddons.has(index));
  button.setAttribute('aria-pressed', String(selectedAddons.has(index)));
  updateDetailTotal();
});

document.querySelector('#detailAdd').addEventListener('click', () => {
  addToCart(products[detailProductIndex]);
  selectedAddons.forEach(index => addToCart(products[index]));
  closeSheet(productSheet);
});

document.querySelector('#storyClose').addEventListener('click', closeStory);
document.querySelector('#storyPrev').addEventListener('click', () => changeStory(-1));
document.querySelector('#storyNext').addEventListener('click', () => changeStory(1));
document.querySelector('#storyAdd').addEventListener('click', () => {
  const product = products[Number(storyViewer.dataset.productIndex)];
  addToCart(product);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (storyViewer.classList.contains('open')) closeStory();
    document.querySelectorAll('.mode-sheet.open').forEach(closeSheet);
  }
  if (!storyViewer.classList.contains('open')) return;
  if (event.key === 'ArrowRight') changeStory(1);
  if (event.key === 'ArrowLeft') changeStory(-1);
});

cartFab.addEventListener('click', () => {
  renderCart();
  setSheetState(cartSheet, true);
});

// The menu is presented as a fixed mobile composition: prevent accidental browser zoom and side panning.
let lastTouchEnd = 0;
document.addEventListener('gesturestart', event => event.preventDefault(), { passive:false });
document.addEventListener('gesturechange', event => event.preventDefault(), { passive:false });
document.addEventListener('touchmove', event => {
  if (event.touches.length > 1) event.preventDefault();
}, { passive:false });
document.addEventListener('touchend', event => {
  const now = Date.now();
  if (now - lastTouchEnd < 280) event.preventDefault();
  lastTouchEnd = now;
}, { passive:false });
document.addEventListener('wheel', event => {
  if (event.ctrlKey) event.preventDefault();
}, { passive:false });
