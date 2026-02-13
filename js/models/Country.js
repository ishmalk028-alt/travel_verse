/**
 * Country Model
 * Represents a country available for trips
 */
class Country {
    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.code = data.code || ''; // ISO country code (e.g., 'US', 'FR')
        this.imageUrl = data.imageUrl || data.image_url || '';
        this.description = data.description || '';
        this.continent = data.continent || '';
        this.currency = data.currency || 'USD';
        this.language = data.language || '';
        this.timezone = data.timezone || '';
        this.isPopular = data.isPopular || data.is_popular || false;
    }

    /**
     * Get flag emoji from country code
     * @returns {string}
     */
    getFlagEmoji() {
        if (!this.code) return '';
        const codePoints = this.code
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }

    /**
     * Get formatted display name with flag
     * @returns {string}
     */
    getDisplayName() {
        return `${this.getFlagEmoji()} ${this.name}`;
    }

    /**
     * Convert to plain object
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            code: this.code,
            imageUrl: this.imageUrl,
            description: this.description,
            continent: this.continent,
            currency: this.currency,
            language: this.language,
            timezone: this.timezone,
            isPopular: this.isPopular
        };
    }

    /**
     * Create Country from API response
     * @param {Object} json 
     * @returns {Country}
     */
    static fromJSON(json) {
        return new Country(json);
    }

    /**
     * Create array of Countries from API response
     * @param {Array} jsonArray 
     * @returns {Country[]}
     */
    static fromJSONArray(jsonArray) {
        return jsonArray.map(json => Country.fromJSON(json));
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Country;
}
