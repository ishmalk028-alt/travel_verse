/**
 * City Model
 * Represents a city within a country
 */
class City {
    constructor(data = {}) {
        this.id = data.id || null;
        this.countryId = data.countryId || data.country_id || null;
        this.name = data.name || '';
        this.imageUrl = data.imageUrl || data.image_url || '';
        this.description = data.description || '';
        this.population = data.population || 0;
        this.isCapital = data.isCapital || data.is_capital || false;
        this.isPopular = data.isPopular || data.is_popular || false;
        this.averageHotelPrice = data.averageHotelPrice || data.average_hotel_price || 0;
        this.attractions = data.attractions || [];
    }

    /**
     * Get formatted population
     * @returns {string}
     */
    getFormattedPopulation() {
        if (this.population >= 1000000) {
            return (this.population / 1000000).toFixed(1) + 'M';
        } else if (this.population >= 1000) {
            return (this.population / 1000).toFixed(0) + 'K';
        }
        return this.population.toString();
    }

    /**
     * Convert to plain object
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            countryId: this.countryId,
            name: this.name,
            imageUrl: this.imageUrl,
            description: this.description,
            population: this.population,
            isCapital: this.isCapital,
            isPopular: this.isPopular,
            averageHotelPrice: this.averageHotelPrice,
            attractions: this.attractions
        };
    }

    /**
     * Create City from API response
     * @param {Object} json 
     * @returns {City}
     */
    static fromJSON(json) {
        return new City(json);
    }

    /**
     * Create array of Cities from API response
     * @param {Array} jsonArray 
     * @returns {City[]}
     */
    static fromJSONArray(jsonArray) {
        return jsonArray.map(json => City.fromJSON(json));
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = City;
}
