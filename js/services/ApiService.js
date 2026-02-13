/**
 * API Service
 * Handles all API communications with the backend
 */
class ApiService {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl || this._getBaseUrl();
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    /**
     * Get base URL for API
     * @returns {string}
     */
    _getBaseUrl() {
        // In development, use relative path
        // In production, this would be your API domain
        return window.location.origin + '/php/api';
    }

    /**
     * Generic fetch wrapper with error handling
     * @param {string} endpoint 
     * @param {Object} options 
     * @returns {Promise<Object>}
     */
    async _fetch(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        const config = {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new ApiError(
                    `HTTP error! status: ${response.status}`,
                    response.status
                );
            }

            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(error.message, 0);
        }
    }

    /**
     * GET request
     * @param {string} endpoint 
     * @param {Object} params 
     * @returns {Promise<Object>}
     */
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this._fetch(url, { method: 'GET' });
    }

    /**
     * POST request
     * @param {string} endpoint 
     * @param {Object} data 
     * @returns {Promise<Object>}
     */
    async post(endpoint, data = {}) {
        return this._fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * PUT request
     * @param {string} endpoint 
     * @param {Object} data 
     * @returns {Promise<Object>}
     */
    async put(endpoint, data = {}) {
        return this._fetch(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    /**
     * DELETE request
     * @param {string} endpoint 
     * @returns {Promise<Object>}
     */
    async delete(endpoint) {
        return this._fetch(endpoint, { method: 'DELETE' });
    }

    // === Specific API Methods ===

    /**
     * Get all countries
     * @returns {Promise<Country[]>}
     */
    async getCountries() {
        const data = await this.get('/countries.php');
        return Country.fromJSONArray(data.countries || data);
    }

    /**
     * Get country by ID
     * @param {string} id 
     * @returns {Promise<Country>}
     */
    async getCountryById(id) {
        const data = await this.get(`/countries.php`, { id });
        return Country.fromJSON(data.country || data);
    }

    /**
     * Get cities by country ID
     * @param {string} countryId 
     * @returns {Promise<City[]>}
     */
    async getCitiesByCountry(countryId) {
        const data = await this.get('/cities.php', { country_id: countryId });
        return City.fromJSONArray(data.cities || data);
    }

    /**
     * Get city by ID
     * @param {string} id 
     * @returns {Promise<City>}
     */
    async getCityById(id) {
        const data = await this.get('/cities.php', { id });
        return City.fromJSON(data.city || data);
    }

    /**
     * Get hotels by city ID
     * @param {string} cityId 
     * @param {Object} filters 
     * @returns {Promise<Hotel[]>}
     */
    async getHotelsByCity(cityId, filters = {}) {
        const params = { city_id: cityId, ...filters };
        const data = await this.get('/hotels.php', params);
        return Hotel.fromJSONArray(data.hotels || data);
    }

    /**
     * Get hotel by ID
     * @param {string} id 
     * @returns {Promise<Hotel>}
     */
    async getHotelById(id) {
        const data = await this.get('/hotels.php', { id });
        return Hotel.fromJSON(data.hotel || data);
    }

    /**
     * Get entertainment by city ID
     * @param {string} cityId 
     * @param {Object} filters 
     * @returns {Promise<Entertainment[]>}
     */
    async getEntertainmentByCity(cityId, filters = {}) {
        const params = { city_id: cityId, ...filters };
        const data = await this.get('/entertainment.php', params);
        return Entertainment.fromJSONArray(data.entertainment || data);
    }

    /**
     * Save trip to server
     * @param {Trip} trip 
     * @returns {Promise<Object>}
     */
    async saveTrip(trip) {
        return this.post('/trips.php', trip.toJSON());
    }

    /**
     * Get trip by ID
     * @param {string} tripId 
     * @returns {Promise<Trip>}
     */
    async getTripById(tripId) {
        const data = await this.get('/trips.php', { id: tripId });
        return Trip.fromJSON(data.trip || data);
    }
}

/**
 * Custom API Error class
 */
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ApiService, ApiError };
}
