/**
 * Storage Service
 * Handles local storage operations with JSON parsing
 */
class StorageService {
    constructor(prefix = 'tripplanner_') {
        this.prefix = prefix;
        this.storage = window.localStorage;
    }

    /**
     * Get prefixed key
     * @param {string} key 
     * @returns {string}
     */
    _getKey(key) {
        return this.prefix + key;
    }

    /**
     * Get item from storage
     * @param {string} key 
     * @param {*} defaultValue 
     * @returns {*}
     */
    get(key, defaultValue = null) {
        try {
            const item = this.storage.getItem(this._getKey(key));
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch (error) {
            console.error('StorageService.get error:', error);
            return defaultValue;
        }
    }

    /**
     * Set item in storage
     * @param {string} key 
     * @param {*} value 
     * @returns {boolean}
     */
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            this.storage.setItem(this._getKey(key), serialized);
            return true;
        } catch (error) {
            console.error('StorageService.set error:', error);
            return false;
        }
    }

    /**
     * Remove item from storage
     * @param {string} key 
     * @returns {boolean}
     */
    remove(key) {
        try {
            this.storage.removeItem(this._getKey(key));
            return true;
        } catch (error) {
            console.error('StorageService.remove error:', error);
            return false;
        }
    }

    /**
     * Clear all items with prefix
     * @returns {boolean}
     */
    clear() {
        try {
            const keysToRemove = [];
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                if (key.startsWith(this.prefix)) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => this.storage.removeItem(key));
            return true;
        } catch (error) {
            console.error('StorageService.clear error:', error);
            return false;
        }
    }

    /**
     * Check if key exists
     * @param {string} key 
     * @returns {boolean}
     */
    has(key) {
        return this.storage.getItem(this._getKey(key)) !== null;
    }

    /**
     * Get all keys with prefix
     * @returns {string[]}
     */
    keys() {
        const keys = [];
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (key.startsWith(this.prefix)) {
                keys.push(key.replace(this.prefix, ''));
            }
        }
        return keys;
    }

    /**
     * Get storage size in bytes
     * @returns {number}
     */
    getSize() {
        let size = 0;
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (key.startsWith(this.prefix)) {
                size += this.storage.getItem(key).length * 2; // UTF-16
            }
        }
        return size;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageService;
}
