/**
 * Trip Model
 * Represents a complete trip with all booking details
 */
class Trip {
    constructor(data = {}) {
        this.id = data.id || this.generateId();
        this.userEmail = data.userEmail || '';
        this.startDate = data.startDate ? new Date(data.startDate) : null;
        this.endDate = data.endDate ? new Date(data.endDate) : null;
        this.countries = data.countries || []; // Array of TripCountry
        this.cities = data.cities || []; // Array of TripCity
        this.hotels = data.hotels || []; // Array of TripHotel
        this.entertainment = data.entertainment || []; // Array of TripEntertainment
        this.totalCost = data.totalCost || 0;
        this.status = data.status || 'draft'; // draft, confirmed, completed, cancelled
        this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
        this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
    }

    /**
     * Generate unique ID
     * @returns {string}
     */
    generateId() {
        return 'trip_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Calculate total duration in days
     * @returns {number}
     */
    getDuration() {
        if (!this.startDate || !this.endDate) return 0;
        const diffTime = Math.abs(this.endDate - this.startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**
     * Calculate total cost from all bookings
     * @returns {number}
     */
    calculateTotalCost() {
        let total = 0;

        // Hotel costs
        this.hotels.forEach(hotel => {
            total += hotel.pricePerNight * hotel.nights;
        });

        // Entertainment costs
        this.entertainment.forEach(ent => {
            total += ent.price;
        });

        this.totalCost = total;
        return total;
    }

    /**
     * Add a country to the trip
     * @param {TripCountry} tripCountry 
     */
    addCountry(tripCountry) {
        this.countries.push(tripCountry);
        this.updatedAt = new Date();
    }

    /**
     * Add a city to the trip
     * @param {TripCity} tripCity 
     */
    addCity(tripCity) {
        this.cities.push(tripCity);
        this.updatedAt = new Date();
    }

    /**
     * Add hotel booking
     * @param {TripHotel} tripHotel 
     */
    addHotel(tripHotel) {
        this.hotels.push(tripHotel);
        this.calculateTotalCost();
        this.updatedAt = new Date();
    }

    /**
     * Add entertainment booking
     * @param {TripEntertainment} tripEntertainment 
     */
    addEntertainment(tripEntertainment) {
        this.entertainment.push(tripEntertainment);
        this.calculateTotalCost();
        this.updatedAt = new Date();
    }

    /**
     * Validate trip data
     * @returns {Object} { isValid: boolean, errors: string[] }
     */
    validate() {
        const errors = [];

        if (!this.startDate) {
            errors.push('Start date is required');
        }

        if (!this.endDate) {
            errors.push('End date is required');
        }

        if (this.startDate && this.endDate && this.startDate >= this.endDate) {
            errors.push('End date must be after start date');
        }

        if (this.countries.length === 0) {
            errors.push('At least one country must be selected');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Convert to plain object for storage/API
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            userEmail: this.userEmail,
            startDate: this.startDate ? this.startDate.toISOString() : null,
            endDate: this.endDate ? this.endDate.toISOString() : null,
            countries: this.countries,
            cities: this.cities,
            hotels: this.hotels,
            entertainment: this.entertainment,
            totalCost: this.totalCost,
            status: this.status,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString()
        };
    }

    /**
     * Create Trip from JSON
     * @param {Object} json 
     * @returns {Trip}
     */
    static fromJSON(json) {
        return new Trip(json);
    }
}

/**
 * Trip Country - Country included in a trip
 */
class TripCountry {
    constructor(data = {}) {
        this.countryId = data.countryId || null;
        this.countryName = data.countryName || '';
        this.visitOrder = data.visitOrder || 1;
        this.startDate = data.startDate ? new Date(data.startDate) : null;
        this.endDate = data.endDate ? new Date(data.endDate) : null;
    }

    toJSON() {
        return {
            countryId: this.countryId,
            countryName: this.countryName,
            visitOrder: this.visitOrder,
            startDate: this.startDate ? this.startDate.toISOString() : null,
            endDate: this.endDate ? this.endDate.toISOString() : null
        };
    }
}

/**
 * Trip City - City included in a trip
 */
class TripCity {
    constructor(data = {}) {
        this.cityId = data.cityId || null;
        this.cityName = data.cityName || '';
        this.countryId = data.countryId || null;
        this.nightsCount = data.nightsCount || 1;
        this.startDate = data.startDate ? new Date(data.startDate) : null;
    }

    toJSON() {
        return {
            cityId: this.cityId,
            cityName: this.cityName,
            countryId: this.countryId,
            nightsCount: this.nightsCount,
            startDate: this.startDate ? this.startDate.toISOString() : null
        };
    }
}

/**
 * Trip Hotel - Hotel booking in a trip
 */
class TripHotel {
    constructor(data = {}) {
        this.hotelId = data.hotelId || null;
        this.hotelName = data.hotelName || '';
        this.cityId = data.cityId || null;
        this.checkIn = data.checkIn ? new Date(data.checkIn) : null;
        this.checkOut = data.checkOut ? new Date(data.checkOut) : null;
        this.nights = data.nights || 1;
        this.pricePerNight = data.pricePerNight || 0;
    }

    getTotalPrice() {
        return this.pricePerNight * this.nights;
    }

    toJSON() {
        return {
            hotelId: this.hotelId,
            hotelName: this.hotelName,
            cityId: this.cityId,
            checkIn: this.checkIn ? this.checkIn.toISOString() : null,
            checkOut: this.checkOut ? this.checkOut.toISOString() : null,
            nights: this.nights,
            pricePerNight: this.pricePerNight
        };
    }
}

/**
 * Trip Entertainment - Entertainment booking in a trip
 */
class TripEntertainment {
    constructor(data = {}) {
        this.entertainmentId = data.entertainmentId || null;
        this.name = data.name || '';
        this.cityId = data.cityId || null;
        this.visitDate = data.visitDate ? new Date(data.visitDate) : null;
        this.price = data.price || 0;
    }

    toJSON() {
        return {
            entertainmentId: this.entertainmentId,
            name: this.name,
            cityId: this.cityId,
            visitDate: this.visitDate ? this.visitDate.toISOString() : null,
            price: this.price
        };
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Trip, TripCountry, TripCity, TripHotel, TripEntertainment };
}
