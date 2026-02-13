/**
 * Formatter Functions
 * Trip Planner Website
 */

/**
 * Format currency
 * @param {number} amount 
 * @param {string} currency 
 * @param {string} locale 
 * @returns {string}
 */
function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * Format number with commas
 * @param {number} number 
 * @param {string} locale 
 * @returns {string}
 */
function formatNumber(number, locale = 'en-US') {
    return new Intl.NumberFormat(locale).format(number);
}

/**
 * Format date
 * @param {Date|string} date 
 * @param {string} format 
 * @param {string} locale 
 * @returns {string}
 */
function formatDate(date, format = 'medium', locale = 'en-US') {
    const d = new Date(date);
    
    if (isNaN(d.getTime())) return '';
    
    const options = {
        short: { month: 'short', day: 'numeric' },
        medium: { year: 'numeric', month: 'short', day: 'numeric' },
        long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    };
    
    return new Intl.DateTimeFormat(locale, options[format] || options.medium).format(d);
}

/**
 * Format date range
 * @param {Date|string} startDate 
 * @param {Date|string} endDate 
 * @param {string} locale 
 * @returns {string}
 */
function formatDateRange(startDate, endDate, locale = 'en-US') {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';
    
    const options = { month: 'short', day: 'numeric' };
    
    // If same month
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return `${start.getDate()} - ${end.getDate()} ${new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(start)}`;
    }
    
    // If same year
    if (start.getFullYear() === end.getFullYear()) {
        return `${new Intl.DateTimeFormat(locale, options).format(start)} - ${new Intl.DateTimeFormat(locale, { ...options, year: 'numeric' }).format(end)}`;
    }
    
    // Different years
    const fullOptions = { ...options, year: 'numeric' };
    return `${new Intl.DateTimeFormat(locale, fullOptions).format(start)} - ${new Intl.DateTimeFormat(locale, fullOptions).format(end)}`;
}

/**
 * Format date for input field (YYYY-MM-DD)
 * @param {Date|string} date 
 * @returns {string}
 */
function formatDateForInput(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

/**
 * Format relative time (e.g., "2 days ago", "in 3 hours")
 * @param {Date|string} date 
 * @param {string} locale 
 * @returns {string}
 */
function formatRelativeTime(date, locale = 'en-US') {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const now = new Date();
    const diffInSeconds = Math.floor((d - now) / 1000);
    const absSeconds = Math.abs(diffInSeconds);
    
    const intervals = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2592000 },
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 }
    ];
    
    for (const interval of intervals) {
        const count = Math.floor(absSeconds / interval.seconds);
        if (count >= 1) {
            const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
            return rtf.format(diffInSeconds >= 0 ? count : -count, interval.unit);
        }
    }
    
    return 'just now';
}

/**
 * Format duration in minutes to human readable
 * @param {number} minutes 
 * @returns {string}
 */
function formatDuration(minutes) {
    if (!minutes || minutes < 1) return 'N/A';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return hours === 1 ? '1 hour' : `${hours} hours`;
    return `${hours}h ${mins}m`;
}

/**
 * Format nights count
 * @param {number} nights 
 * @returns {string}
 */
function formatNights(nights) {
    if (nights === 1) return '1 night';
    return `${nights} nights`;
}

/**
 * Format star rating
 * @param {number} rating 
 * @param {number} maxStars 
 * @returns {string}
 */
function formatStarRating(rating, maxStars = 5) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

/**
 * Format file size
 * @param {number} bytes 
 * @returns {string}
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format phone number
 * @param {string} phone 
 * @returns {string}
 */
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    if (cleaned.length === 11) {
        return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    
    return phone;
}

/**
 * Truncate text with ellipsis
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
function truncateText(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

/**
 * Capitalize first letter
 * @param {string} text 
 * @returns {string}
 */
function capitalize(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Title case string
 * @param {string} text 
 * @returns {string}
 */
function titleCase(text) {
    if (!text) return '';
    return text.split(' ').map(word => capitalize(word)).join(' ');
}

/**
 * Convert to slug
 * @param {string} text 
 * @returns {string}
 */
function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Format percentage
 * @param {number} value 
 * @param {number} decimals 
 * @returns {string}
 */
function formatPercentage(value, decimals = 0) {
    return `${value.toFixed(decimals)}%`;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatCurrency,
        formatNumber,
        formatDate,
        formatDateRange,
        formatDateForInput,
        formatRelativeTime,
        formatDuration,
        formatNights,
        formatStarRating,
        formatFileSize,
        formatPhoneNumber,
        truncateText,
        capitalize,
        titleCase,
        slugify,
        formatPercentage
    };
}
