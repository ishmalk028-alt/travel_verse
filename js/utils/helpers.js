/**
 * Helper Functions
 * Trip Planner Website
 */

/**
 * Debounce function
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 * @param {Function} func 
 * @param {number} limit 
 * @returns {Function}
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Generate unique ID
 * @param {string} prefix 
 * @returns {string}
 */
function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Deep clone object
 * @param {Object} obj 
 * @returns {Object}
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clone = {};
        for (const key of Object.keys(obj)) {
            clone[key] = deepClone(obj[key]);
        }
        return clone;
    }
    return obj;
}

/**
 * Check if object is empty
 * @param {Object} obj 
 * @returns {boolean}
 */
function isEmpty(obj) {
    if (obj === null || obj === undefined) return true;
    if (typeof obj === 'string') return obj.trim() === '';
    if (Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    return false;
}

/**
 * Get element by selector
 * @param {string} selector 
 * @param {Element} context 
 * @returns {Element}
 */
function $(selector, context = document) {
    return context.querySelector(selector);
}

/**
 * Get all elements by selector
 * @param {string} selector 
 * @param {Element} context 
 * @returns {NodeList}
 */
function $$(selector, context = document) {
    return context.querySelectorAll(selector);
}

/**
 * Create element with attributes and content
 * @param {string} tag 
 * @param {Object} attributes 
 * @param {string|Element|Array} content 
 * @returns {Element}
 */
function createElement(tag, attributes = {}, content = null) {
    const element = document.createElement(tag);
    
    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            for (const [dataKey, dataValue] of Object.entries(value)) {
                element.dataset[dataKey] = dataValue;
            }
        } else if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
            element.setAttribute(key, value);
        }
    }
    
    if (content !== null) {
        if (typeof content === 'string') {
            element.innerHTML = content;
        } else if (content instanceof Element) {
            element.appendChild(content);
        } else if (Array.isArray(content)) {
            content.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else if (child instanceof Element) {
                    element.appendChild(child);
                }
            });
        }
    }
    
    return element;
}

/**
 * Add event listener with delegation
 * @param {Element} element 
 * @param {string} eventType 
 * @param {string} selector 
 * @param {Function} handler 
 */
function delegate(element, eventType, selector, handler) {
    element.addEventListener(eventType, function(event) {
        const target = event.target.closest(selector);
        if (target && element.contains(target)) {
            handler.call(target, event, target);
        }
    });
}

/**
 * Show element
 * @param {Element} element 
 * @param {string} display 
 */
function show(element, display = 'block') {
    element.style.display = display;
}

/**
 * Hide element
 * @param {Element} element 
 */
function hide(element) {
    element.style.display = 'none';
}

/**
 * Toggle element visibility
 * @param {Element} element 
 * @param {string} display 
 */
function toggle(element, display = 'block') {
    element.style.display = element.style.display === 'none' ? display : 'none';
}

/**
 * Add class to element
 * @param {Element} element 
 * @param {...string} classes 
 */
function addClass(element, ...classes) {
    element.classList.add(...classes);
}

/**
 * Remove class from element
 * @param {Element} element 
 * @param {...string} classes 
 */
function removeClass(element, ...classes) {
    element.classList.remove(...classes);
}

/**
 * Toggle class on element
 * @param {Element} element 
 * @param {string} className 
 * @param {boolean} force 
 */
function toggleClass(element, className, force) {
    element.classList.toggle(className, force);
}

/**
 * Check if element has class
 * @param {Element} element 
 * @param {string} className 
 * @returns {boolean}
 */
function hasClass(element, className) {
    return element.classList.contains(className);
}

/**
 * Scroll to element
 * @param {Element|string} target 
 * @param {Object} options 
 */
function scrollTo(target, options = {}) {
    const element = typeof target === 'string' ? $(target) : target;
    if (!element) return;
    
    element.scrollIntoView({
        behavior: options.behavior || 'smooth',
        block: options.block || 'start',
        inline: options.inline || 'nearest'
    });
}

/**
 * Get URL parameters
 * @param {string} url 
 * @returns {Object}
 */
function getUrlParams(url = window.location.href) {
    const params = {};
    const searchParams = new URL(url).searchParams;
    for (const [key, value] of searchParams) {
        params[key] = value;
    }
    return params;
}

/**
 * Set URL parameters without page reload
 * @param {Object} params 
 */
function setUrlParams(params) {
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries(params)) {
        if (value === null || value === undefined) {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, value);
        }
    }
    window.history.pushState({}, '', url);
}

/**
 * Get days between two dates
 * @param {Date} date1 
 * @param {Date} date2 
 * @returns {number}
 */
function getDaysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if element is in viewport
 * @param {Element} element 
 * @returns {boolean}
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Copy text to clipboard
 * @param {string} text 
 * @returns {Promise<boolean>}
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
}

/**
 * Wait for specified milliseconds
 * @param {number} ms 
 * @returns {Promise}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        generateId,
        deepClone,
        isEmpty,
        $,
        $$,
        createElement,
        delegate,
        show,
        hide,
        toggle,
        addClass,
        removeClass,
        toggleClass,
        hasClass,
        scrollTo,
        getUrlParams,
        setUrlParams,
        getDaysBetween,
        isInViewport,
        copyToClipboard,
        sleep
    };
}
