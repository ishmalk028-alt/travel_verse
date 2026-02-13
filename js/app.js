/**
 * Main Application Entry Point
 * Trip Planner Website
 */

// Global app instance
let app = null;

/**
 * Main Application Class
 */
class TripPlannerApp {
    constructor() {
        // ViewModels
        this.tripPlannerVM = null;
        this.expenseCalculatorVM = null;
        
        // Services
        this.apiService = null;
        this.storageService = null;
        this.validationService = null;
        
        // State
        this.isInitialized = false;
        this.currentPage = null;
        
        // Initialize on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('🚀 Initializing Trip Planner App...');
            
            // Initialize services
            this._initServices();
            
            // Initialize ViewModels
            this._initViewModels();
            
            // Initialize UI components
            this._initUIComponents();
            
            // Setup global event listeners
            this._setupGlobalListeners();
            
            // Detect and initialize current page
            this._initCurrentPage();
            
            this.isInitialized = true;
            console.log('✅ Trip Planner App initialized successfully!');
            
        } catch (error) {
            console.error('❌ Failed to initialize app:', error);
        }
    }

    /**
     * Initialize services
     */
    _initServices() {
        // API Service
        if (typeof ApiService !== 'undefined') {
            this.apiService = new ApiService();
        }
        
        // Storage Service
        if (typeof StorageService !== 'undefined') {
            this.storageService = new StorageService('tripplanner_');
        }
        
        // Validation Service
        if (typeof ValidationService !== 'undefined') {
            this.validationService = new ValidationService();
        }
    }

    /**
     * Initialize ViewModels
     */
    _initViewModels() {
        // Trip Planner ViewModel
        if (typeof TripPlannerVM !== 'undefined') {
            this.tripPlannerVM = new TripPlannerVM();
        }
        
        // Expense Calculator ViewModel
        if (typeof ExpenseCalculatorVM !== 'undefined') {
            this.expenseCalculatorVM = new ExpenseCalculatorVM();
        }
    }

    /**
     * Initialize UI components
     */
    _initUIComponents() {
        // Initialize mobile menu
        this._initMobileMenu();
        
        // Initialize modals
        this._initModals();
        
        // Initialize tooltips
        this._initTooltips();
        
        // Initialize smooth scroll
        this._initSmoothScroll();
    }

    /**
     * Setup global event listeners
     */
    _setupGlobalListeners() {
        // Handle escape key for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
        
        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this._handleResize();
            }, 250);
        });
        
        // Handle scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this._handleScroll();
            }, 100);
        });
    }

    /**
     * Initialize mobile menu
     */
    _initMobileMenu() {
        const menuToggle = document.querySelector('[data-menu-toggle]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('is-active');
                menuToggle.classList.toggle('is-active');
                document.body.classList.toggle('menu-open');
            });
        }
    }

    /**
     * Initialize modals
     */
    _initModals() {
        // Close modal on backdrop click
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    this.closeModal(backdrop.dataset.modal);
                }
            });
        });
        
        // Close modal on close button click
        document.querySelectorAll('[data-modal-close]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal') || btn.closest('.modal-backdrop');
                if (modal) {
                    this.closeModal(modal.id || modal.dataset.modal);
                }
            });
        });
    }

    /**
     * Initialize tooltips
     */
    _initTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this._showTooltip(e.target, e.target.dataset.tooltip);
            });
            element.addEventListener('mouseleave', () => {
                this._hideTooltip();
            });
        });
    }

    /**
     * Initialize smooth scroll for anchor links
     */
    _initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    /**
     * Detect and initialize current page
     */
    _initCurrentPage() {
        const bodyClass = document.body.className;
        const path = window.location.pathname;
        
        // Detect page from URL or body class
        if (path.includes('select-dates') || bodyClass.includes('page-dates')) {
            this.currentPage = 'dates';
        } else if (path.includes('select-countries') || bodyClass.includes('page-countries')) {
            this.currentPage = 'countries';
        } else if (path.includes('select-cities') || bodyClass.includes('page-cities')) {
            this.currentPage = 'cities';
        } else if (path.includes('select-hotels') || bodyClass.includes('page-hotels')) {
            this.currentPage = 'hotels';
        } else if (path.includes('select-entertainment') || bodyClass.includes('page-entertainment')) {
            this.currentPage = 'entertainment';
        } else if (path.includes('trip-summary') || bodyClass.includes('page-summary')) {
            this.currentPage = 'summary';
        } else if (path.includes('checkout') || bodyClass.includes('page-checkout')) {
            this.currentPage = 'checkout';
        } else {
            this.currentPage = 'home';
        }
        
        console.log(`📍 Current page: ${this.currentPage}`);
    }

    /**
     * Open modal
     * @param {string} modalId 
     */
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        const backdrop = document.querySelector(`[data-modal="${modalId}"]`) || 
                        document.querySelector('.modal-backdrop');
        
        if (modal) {
            modal.classList.add('is-active');
            if (backdrop) backdrop.classList.add('is-active');
            document.body.classList.add('modal-open');
        }
    }

    /**
     * Close modal
     * @param {string} modalId 
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        const backdrop = document.querySelector(`[data-modal="${modalId}"]`) || 
                        document.querySelector('.modal-backdrop');
        
        if (modal) {
            modal.classList.remove('is-active');
            if (backdrop) backdrop.classList.remove('is-active');
            document.body.classList.remove('modal-open');
        }
    }

    /**
     * Close all modals
     */
    closeAllModals() {
        document.querySelectorAll('.modal.is-active').forEach(modal => {
            modal.classList.remove('is-active');
        });
        document.querySelectorAll('.modal-backdrop.is-active').forEach(backdrop => {
            backdrop.classList.remove('is-active');
        });
        document.body.classList.remove('modal-open');
    }

    /**
     * Show toast notification
     * @param {string} message 
     * @param {string} type 
     * @param {number} duration 
     */
    showToast(message, type = 'info', duration = 3000) {
        let container = document.querySelector('.toast-container');
        
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.innerHTML = `
            <div class="toast__icon">
                ${this._getToastIcon(type)}
            </div>
            <div class="toast__content">
                <p class="toast__message">${message}</p>
            </div>
            <button class="toast__close">&times;</button>
        `;
        
        container.appendChild(toast);
        
        // Close button handler
        toast.querySelector('.toast__close').addEventListener('click', () => {
            toast.remove();
        });
        
        // Auto remove
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.animation = 'toast-slide-out 0.3s ease forwards';
                setTimeout(() => toast.remove(), 300);
            }
        }, duration);
    }

    /**
     * Get toast icon SVG
     * @param {string} type 
     * @returns {string}
     */
    _getToastIcon(type) {
        const icons = {
            success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>',
            error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
            warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
        };
        return icons[type] || icons.info;
    }

    /**
     * Show tooltip
     * @param {Element} element 
     * @param {string} text 
     */
    _showTooltip(element, text) {
        // Implement tooltip logic
    }

    /**
     * Hide tooltip
     */
    _hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    }

    /**
     * Handle window resize
     */
    _handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const mobileMenu = document.querySelector('[data-mobile-menu]');
            if (mobileMenu) {
                mobileMenu.classList.remove('is-active');
            }
            document.body.classList.remove('menu-open');
        }
    }

    /**
     * Handle window scroll
     */
    _handleScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        }
    }

    /**
     * Navigate to page
     * @param {string} page 
     */
    navigateTo(page) {
        window.location.href = page;
    }

    /**
     * Start trip planning
     */
    startPlanning() {
        if (this.tripPlannerVM) {
            this.tripPlannerVM.startNewTrip();
        }
        this.navigateTo('pages/select-dates.html');
    }
}

// Initialize app when script loads
document.addEventListener('DOMContentLoaded', () => {
    app = new TripPlannerApp();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TripPlannerApp;
}
