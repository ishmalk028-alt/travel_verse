/**
 * Hotel Model
 * Represents a hotel in a city
 */
class Hotel {
    constructor(data = {}) {
        this.id = data.id || null;
        this.cityId = data.cityId || data.city_id || null;
        this.name = data.name || '';
        this.starRating = data.starRating || data.star_rating || 3;
        this.pricePerNight = data.pricePerNight || data.price_per_night || 0;
        this.imageUrl = data.imageUrl || data.image_url || '';
        this.images = data.images || [];
        this.description = data.description || '';
        this.address = data.address || '';
        this.amenities = data.amenities || [];
        this.rating = data.rating || 0; // User rating (0-5)
        this.reviewCount = data.reviewCount || data.review_count || 0;
        this.roomTypes = data.roomTypes || data.room_types || [];
        this.latitude = data.latitude || null;
        this.longitude = data.longitude || null;
    }

    /**
     * Get star rating as array for display
     * @returns {number[]}
     */
    getStarsArray() {
        return Array.from({ length: 5 }, (_, i) => i < this.starRating ? 1 : 0);
    }

    /**
     * Get formatted price
     * @param {string} currency 
     * @returns {string}
     */
    getFormattedPrice(currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(this.pricePerNight);
    }

    /**
     * Check if hotel has specific amenity
     * @param {string} amenity 
     * @returns {boolean}
     */
    hasAmenity(amenity) {
        return this.amenities.some(a => 
            a.toLowerCase().includes(amenity.toLowerCase())
        );
    }

    /**
     * Calculate total price for stay
     * @param {number} nights 
     * @returns {number}
     */
    calculateTotalPrice(nights) {
        return this.pricePerNight * nights;
    }

    /**
     * Convert to plain object
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            cityId: this.cityId,
            name: this.name,
            starRating: this.starRating,
            pricePerNight: this.pricePerNight,
            imageUrl: this.imageUrl,
            images: this.images,
            description: this.description,
            address: this.address,
            amenities: this.amenities,
            rating: this.rating,
            reviewCount: this.reviewCount,
            roomTypes: this.roomTypes,
            latitude: this.latitude,
            longitude: this.longitude
        };
    }

    /**
     * Create Hotel from API response
     * @param {Object} json 
     * @returns {Hotel}
     */
    static fromJSON(json) {
        return new Hotel(json);
    }

    /**
     * Create array of Hotels from API response
     * @param {Array} jsonArray 
     * @returns {Hotel[]}
     */
    static fromJSONArray(jsonArray) {
        return jsonArray.map(json => Hotel.fromJSON(json));
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Hotel;
}
