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
        if (window.location.protocol === 'file:') {
            const match = window.location.pathname.replace(/\\/g, '/').match(/\/htdocs\/([^/]+)/i);
            const appFolder = match ? match[1] : 'travel_verse';
            return `http://localhost/${appFolder}/php/api`;
        }

        const path = window.location.pathname.replace(/\\/g, '/');
        const pagesIndex = path.indexOf('/pages/');
        let appRoot = '';

        if (pagesIndex !== -1) {
            appRoot = path.slice(0, pagesIndex);
        } else {
            appRoot = path.slice(0, path.lastIndexOf('/'));
        }

        return `${window.location.origin}${appRoot}/php/api`;
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
            const data = await response.json().catch(() => null);
            
            if (!response.ok) {
                throw new ApiError(
                    data?.message || `HTTP error! status: ${response.status}`,
                    response.status,
                    data?.errors || null
                );
            }

            if (data && data.success === false) {
                throw new ApiError(data.message || 'API request failed', response.status, data.errors || null);
            }

            return data;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                `${error.message}. Make sure Apache is running and open the site through http://localhost/travel_verse/.`,
                0
            );
        }
    }

    /**
     * Extract data from the standard PHP response envelope.
     * @param {Object} response
     * @returns {*}
     */
    _payload(response) {
        return response && Object.prototype.hasOwnProperty.call(response, 'data')
            ? response.data
            : response;
    }

    /**
     * Extract a named collection/object from the API payload.
     * @param {Object} response
     * @param {string} key
     * @param {*} fallback
     * @returns {*}
     */
    _extract(response, key, fallback = []) {
        const payload = this._payload(response);
        if (!payload) return fallback;
        return Object.prototype.hasOwnProperty.call(payload, key) ? payload[key] : fallback;
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
        const countries = this._extract(data, 'countries');
        return typeof Country !== 'undefined' ? Country.fromJSONArray(countries) : countries;
    }

    /**
     * Get country by ID
     * @param {string} id 
     * @returns {Promise<Country>}
     */
    async getCountryById(id) {
        const data = await this.get(`/countries.php`, { id });
        const country = this._extract(data, 'country', {});
        return typeof Country !== 'undefined' ? Country.fromJSON(country) : country;
    }

    /**
     * Get cities by country ID
     * @param {string} countryId 
     * @returns {Promise<City[]>}
     */
    async getCitiesByCountry(countryId) {
        const data = await this.get('/cities.php', { country_id: countryId });
        const cities = this._extract(data, 'cities');
        return typeof City !== 'undefined' ? City.fromJSONArray(cities) : cities;
    }

    /**
     * Get city by ID
     * @param {string} id 
     * @returns {Promise<City>}
     */
    async getCityById(id) {
        const data = await this.get('/cities.php', { id });
        const city = this._extract(data, 'city', {});
        return typeof City !== 'undefined' ? City.fromJSON(city) : city;
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
        const hotels = this._extract(data, 'hotels');
        return typeof Hotel !== 'undefined' ? Hotel.fromJSONArray(hotels) : hotels;
    }

    /**
     * Get hotel by ID
     * @param {string} id 
     * @returns {Promise<Hotel>}
     */
    async getHotelById(id) {
        const data = await this.get('/hotels.php', { id });
        const hotel = this._extract(data, 'hotel', {});
        return typeof Hotel !== 'undefined' ? Hotel.fromJSON(hotel) : hotel;
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
        const entertainment = this._extract(data, 'entertainment');
        return typeof Entertainment !== 'undefined'
            ? Entertainment.fromJSONArray(entertainment)
            : entertainment;
    }

    /**
     * Save trip to server
     * @param {Trip} trip 
     * @returns {Promise<Object>}
     */
    async saveTrip(trip) {
        const payload = trip && typeof trip.toJSON === 'function' ? trip.toJSON() : trip;
        return this.post('/trips.php', payload);
    }

    /**
     * Get trip by ID
     * @param {string} tripId 
     * @returns {Promise<Trip>}
     */
    async getTripById(tripId) {
        const data = await this.get('/trips.php', { id: tripId });
        const trip = this._extract(data, 'trip', {});
        return typeof Trip !== 'undefined' ? Trip.fromJSON(trip) : trip;
    }
}

/**
 * Custom API Error class
 */
class ApiError extends Error {
    constructor(message, statusCode, errors = null) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ApiService, ApiError };
}
