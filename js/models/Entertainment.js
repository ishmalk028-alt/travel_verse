/**
 * Entertainment Model
 * Represents entertainment/activity spots in a city
 */
class Entertainment {
    constructor(data = {}) {
        this.id = data.id || null;
        this.cityId = data.cityId || data.city_id || null;
        this.name = data.name || '';
        this.type = data.type || ''; // museum, adventure, show, tour, attraction, etc.
        this.price = data.price || 0;
        this.duration = data.duration || ''; // e.g., "2 hours", "Full day"
        this.durationMinutes = data.durationMinutes || data.duration_minutes || 0;
        this.description = data.description || '';
        this.imageUrl = data.imageUrl || data.image_url || '';
        this.images = data.images || [];
        this.rating = data.rating || 0;
        this.reviewCount = data.reviewCount || data.review_count || 0;
        this.openingHours = data.openingHours || data.opening_hours || '';
        this.address = data.address || '';
        this.latitude = data.latitude || null;
        this.longitude = data.longitude || null;
        this.tags = data.tags || [];
        this.isPopular = data.isPopular || data.is_popular || false;
        this.requiresBooking = data.requiresBooking || data.requires_booking || false;
    }

    /**
     * Get entertainment type icon name
     * @returns {string}
     */
    getTypeIcon() {
        const icons = {
            'museum': 'museum',
            'adventure': 'hiking',
            'show': 'theater',
            'tour': 'map',
            'attraction': 'star',
            'restaurant': 'utensils',
            'park': 'tree',
            'beach': 'umbrella-beach',
            'shopping': 'shopping-bag',
            'nightlife': 'moon'
        };
        return icons[this.type.toLowerCase()] || 'ticket';
    }

    /**
     * Get formatted price
     * @param {string} currency 
     * @returns {string}
     */
    getFormattedPrice(currency = 'USD') {
        if (this.price === 0) return 'Free';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(this.price);
    }

    /**
     * Get formatted duration
     * @returns {string}
     */
    getFormattedDuration() {
        if (this.duration) return this.duration;
        if (!this.durationMinutes) return 'Varies';
        
        const hours = Math.floor(this.durationMinutes / 60);
        const minutes = this.durationMinutes % 60;
        
        if (hours === 0) return `${minutes} min`;
        if (minutes === 0) return `${hours} hr`;
        return `${hours} hr ${minutes} min`;
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
            type: this.type,
            price: this.price,
            duration: this.duration,
            durationMinutes: this.durationMinutes,
            description: this.description,
            imageUrl: this.imageUrl,
            images: this.images,
            rating: this.rating,
            reviewCount: this.reviewCount,
            openingHours: this.openingHours,
            address: this.address,
            latitude: this.latitude,
            longitude: this.longitude,
            tags: this.tags,
            isPopular: this.isPopular,
            requiresBooking: this.requiresBooking
        };
    }

    /**
     * Create Entertainment from API response
     * @param {Object} json 
     * @returns {Entertainment}
     */
    static fromJSON(json) {
        return new Entertainment(json);
    }

    /**
     * Create array of Entertainment from API response
     * @param {Array} jsonArray 
     * @returns {Entertainment[]}
     */
    static fromJSONArray(jsonArray) {
        return jsonArray.map(json => Entertainment.fromJSON(json));
    }

    /**
     * Filter by type
     * @param {Entertainment[]} items 
     * @param {string} type 
     * @returns {Entertainment[]}
     */
    static filterByType(items, type) {
        return items.filter(item => item.type.toLowerCase() === type.toLowerCase());
    }
}

// Entertainment types constant
Entertainment.TYPES = [
    'museum',
    'adventure',
    'show',
    'tour',
    'attraction',
    'restaurant',
    'park',
    'beach',
    'shopping',
    'nightlife'
];

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Entertainment;
}
