/**
 * Validation Service
 * Handles form and data validation
 */
class ValidationService {
    constructor() {
        // Common validation patterns
        this.patterns = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^\+?[\d\s-]{10,}$/,
            date: /^\d{4}-\d{2}-\d{2}$/,
            alphanumeric: /^[a-zA-Z0-9]+$/,
            numeric: /^\d+$/
        };

        // Error messages
        this.messages = {
            required: 'This field is required',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number',
            date: 'Please enter a valid date',
            minLength: 'Must be at least {min} characters',
            maxLength: 'Must be no more than {max} characters',
            min: 'Must be at least {min}',
            max: 'Must be no more than {max}',
            pattern: 'Invalid format',
            dateRange: 'End date must be after start date',
            futureDate: 'Date must be in the future'
        };
    }

    /**
     * Validate a single field
     * @param {*} value 
     * @param {Object} rules 
     * @returns {Object} { isValid: boolean, errors: string[] }
     */
    validateField(value, rules) {
        const errors = [];

        // Check required
        if (rules.required && this._isEmpty(value)) {
            errors.push(this.messages.required);
            return { isValid: false, errors };
        }

        // Skip other validations if empty and not required
        if (this._isEmpty(value)) {
            return { isValid: true, errors };
        }

        // Email validation
        if (rules.email && !this.patterns.email.test(value)) {
            errors.push(this.messages.email);
        }

        // Phone validation
        if (rules.phone && !this.patterns.phone.test(value)) {
            errors.push(this.messages.phone);
        }

        // Date validation
        if (rules.date && !this._isValidDate(value)) {
            errors.push(this.messages.date);
        }

        // Future date validation
        if (rules.futureDate && !this._isFutureDate(value)) {
            errors.push(this.messages.futureDate);
        }

        // Min length
        if (rules.minLength && String(value).length < rules.minLength) {
            errors.push(this.messages.minLength.replace('{min}', rules.minLength));
        }

        // Max length
        if (rules.maxLength && String(value).length > rules.maxLength) {
            errors.push(this.messages.maxLength.replace('{max}', rules.maxLength));
        }

        // Min value (numeric)
        if (rules.min !== undefined && Number(value) < rules.min) {
            errors.push(this.messages.min.replace('{min}', rules.min));
        }

        // Max value (numeric)
        if (rules.max !== undefined && Number(value) > rules.max) {
            errors.push(this.messages.max.replace('{max}', rules.max));
        }

        // Custom pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            errors.push(rules.patternMessage || this.messages.pattern);
        }

        // Custom validator function
        if (rules.custom && typeof rules.custom === 'function') {
            const customResult = rules.custom(value);
            if (customResult !== true) {
                errors.push(customResult || 'Validation failed');
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate multiple fields
     * @param {Object} data - { fieldName: value }
     * @param {Object} schema - { fieldName: rules }
     * @returns {Object} { isValid: boolean, errors: { fieldName: string[] } }
     */
    validate(data, schema) {
        const errors = {};
        let isValid = true;

        for (const [field, rules] of Object.entries(schema)) {
            const result = this.validateField(data[field], rules);
            if (!result.isValid) {
                isValid = false;
                errors[field] = result.errors;
            }
        }

        return { isValid, errors };
    }

    /**
     * Validate date range
     * @param {Date|string} startDate 
     * @param {Date|string} endDate 
     * @returns {Object}
     */
    validateDateRange(startDate, endDate) {
        const errors = [];
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime())) {
            errors.push('Invalid start date');
        }

        if (isNaN(end.getTime())) {
            errors.push('Invalid end date');
        }

        if (errors.length === 0 && start >= end) {
            errors.push(this.messages.dateRange);
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate trip data
     * @param {Trip} trip 
     * @returns {Object}
     */
    validateTrip(trip) {
        const errors = {};

        // Validate dates
        if (!trip.startDate) {
            errors.startDate = ['Start date is required'];
        }

        if (!trip.endDate) {
            errors.endDate = ['End date is required'];
        }

        if (trip.startDate && trip.endDate) {
            const dateResult = this.validateDateRange(trip.startDate, trip.endDate);
            if (!dateResult.isValid) {
                errors.dateRange = dateResult.errors;
            }
        }

        // Validate countries
        if (!trip.countries || trip.countries.length === 0) {
            errors.countries = ['At least one country must be selected'];
        }

        // Validate cities
        if (!trip.cities || trip.cities.length === 0) {
            errors.cities = ['At least one city must be selected'];
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    /**
     * Check if value is empty
     * @param {*} value 
     * @returns {boolean}
     */
    _isEmpty(value) {
        if (value === null || value === undefined) return true;
        if (typeof value === 'string') return value.trim() === '';
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        return false;
    }

    /**
     * Check if value is a valid date
     * @param {*} value 
     * @returns {boolean}
     */
    _isValidDate(value) {
        const date = new Date(value);
        return !isNaN(date.getTime());
    }

    /**
     * Check if date is in the future
     * @param {*} value 
     * @returns {boolean}
     */
    _isFutureDate(value) {
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationService;
}
