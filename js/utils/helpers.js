/**
 * General helper functions
 */

/**
 * Debounce a function
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Show toast notification
 */
export function showToast(message, type = 'info', title = '') {
  const container = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  const iconMap = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <div class="toast__icon">${iconMap[type] || 'ℹ️'}</div>
    <div class="toast__text">
      ${title ? `<div class="toast__title">${title}</div>` : ''}
      <div class="toast__message">${message}</div>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('is-hiding');
    toast.addEventListener('animationend', () => toast.remove());
  }, 4000);
}

function createToastContainer() {
  const el = document.createElement('div');
  el.id = 'toast-container';
  el.className = 'toast-container';
  document.body.appendChild(el);
  return el;
}

/**
 * Smoothly scroll to element
 */
export function scrollTo(selector) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Navigate to a page with step tracking
 */
export function navigateTo(path) {
  window.location.href = path;
}

/**
 * Get current step from URL
 */
export function getCurrentStep() {
  const page = window.location.pathname.split('/').pop();
  const stepMap = {
    'select-dates.html':         1,
    'select-countries.html':     2,
    'select-cities.html':        3,
    'select-hotels.html':        4,
    'select-entertainment.html': 5,
    'trip-summary.html':         6,
    'checkout.html':             7,
  };
  return stepMap[page] || 0;
}

/**
 * Create a loading skeleton element
 */
export function createSkeleton(count = 3, height = '200px') {
  return Array.from({ length: count }, () => {
    const el = document.createElement('div');
    el.className = 'skeleton';
    el.style.height = height;
    el.style.borderRadius = 'var(--radius-xl)';
    return el;
  });
}

/**
 * Format number with commas
 */
export function formatNumber(n) {
  return n.toLocaleString('en-US');
}

/**
 * Group array by key
 */
export function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}
