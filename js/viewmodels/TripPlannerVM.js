/**
 * Trip Planner ViewModel
 * Main ViewModel that manages the entire trip planning flow
 */
class TripPlannerVM {
    constructor() {
        // Current trip being planned
        this.currentTrip = null;
        
        // Current step in the planning process
        this.currentStep = 1;
        this.totalSteps = 7;
        
        // Services
        this.apiService = null;
        this.storageService = null;
        
        // State
        this.isLoading = false;
        this.error = null;
        
        // Listeners for state changes (Observer pattern)
        this.listeners = new Map();
        
        // Initialize
        this._init();
    }

    /**
     * Initialize the ViewModel
     */
    async _init() {
        // Initialize services
        if (typeof ApiService !== 'undefined') {
            this.apiService = new ApiService();
        }
        if (typeof StorageService !== 'undefined') {
            this.storageService = new StorageService();
        }
        
        // Try to restore previous trip from storage
        await this._restoreTrip();
    }

    /**
     * Restore trip from local storage
     */
    async _restoreTrip() {
        if (!this.storageService) return;
        
        const savedTrip = this.storageService.get('currentTrip');
        if (savedTrip) {
            this.currentTrip = Trip.fromJSON(savedTrip);
            this._notifyListeners('tripRestored', this.currentTrip);
        }
    }

    /**
     * Save current trip to storage
     */
    _saveTrip() {
        if (!this.storageService || !this.currentTrip) return;
        this.storageService.set('currentTrip', this.currentTrip.toJSON());
    }

    /**
     * Start a new trip
     */
    startNewTrip() {
        this.currentTrip = new Trip();
        this.currentStep = 1;
        this._saveTrip();
        this._notifyListeners('tripStarted', this.currentTrip);
    }

    /**
     * Set trip dates
     * @param {Date} startDate 
     * @param {Date} endDate 
     */
    setTripDates(startDate, endDate) {
        if (!this.currentTrip) {
            this.startNewTrip();
        }
        
        this.currentTrip.startDate = new Date(startDate);
        this.currentTrip.endDate = new Date(endDate);
        this._saveTrip();
        this._notifyListeners('datesSet', { startDate, endDate });
    }

    /**
     * Add country to trip
     * @param {Country} country 
     * @param {number} visitOrder 
     * @param {Date} startDate 
     * @param {Date} endDate 
     */
    addCountryToTrip(country, visitOrder, startDate, endDate) {
        if (!this.currentTrip) return;
        
        const tripCountry = new TripCountry({
            countryId: country.id,
            countryName: country.name,
            visitOrder,
            startDate,
            endDate
        });
        
        this.currentTrip.addCountry(tripCountry);
        this._saveTrip();
        this._notifyListeners('countryAdded', tripCountry);
    }

    /**
     * Remove country from trip
     * @param {string} countryId 
     */
    removeCountryFromTrip(countryId) {
        if (!this.currentTrip) return;
        
        this.currentTrip.countries = this.currentTrip.countries.filter(
            c => c.countryId !== countryId
        );
        
        // Also remove related cities, hotels, and entertainment
        const removedCityIds = this.currentTrip.cities
            .filter(c => c.countryId === countryId)
            .map(c => c.cityId);
        
        this.currentTrip.cities = this.currentTrip.cities.filter(
            c => c.countryId !== countryId
        );
        
        this.currentTrip.hotels = this.currentTrip.hotels.filter(
            h => !removedCityIds.includes(h.cityId)
        );
        
        this.currentTrip.entertainment = this.currentTrip.entertainment.filter(
            e => !removedCityIds.includes(e.cityId)
        );
        
        this.currentTrip.calculateTotalCost();
        this._saveTrip();
        this._notifyListeners('countryRemoved', countryId);
    }

    /**
     * Add city to trip
     * @param {City} city 
     * @param {number} nightsCount 
     * @param {Date} startDate 
     */
    addCityToTrip(city, nightsCount, startDate) {
        if (!this.currentTrip) return;
        
        const tripCity = new TripCity({
            cityId: city.id,
            cityName: city.name,
            countryId: city.countryId,
            nightsCount,
            startDate
        });
        
        this.currentTrip.addCity(tripCity);
        this._saveTrip();
        this._notifyListeners('cityAdded', tripCity);
    }

    /**
     * Add hotel booking
     * @param {Hotel} hotel 
     * @param {Date} checkIn 
     * @param {Date} checkOut 
     * @param {number} nights 
     */
    addHotelBooking(hotel, checkIn, checkOut, nights) {
        if (!this.currentTrip) return;
        
        const tripHotel = new TripHotel({
            hotelId: hotel.id,
            hotelName: hotel.name,
            cityId: hotel.cityId,
            checkIn,
            checkOut,
            nights,
            pricePerNight: hotel.pricePerNight
        });
        
        this.currentTrip.addHotel(tripHotel);
        this._saveTrip();
        this._notifyListeners('hotelAdded', tripHotel);
    }

    /**
     * Add entertainment booking
     * @param {Entertainment} entertainment 
     * @param {Date} visitDate 
     */
    addEntertainmentBooking(entertainment, visitDate) {
        if (!this.currentTrip) return;
        
        const tripEntertainment = new TripEntertainment({
            entertainmentId: entertainment.id,
            name: entertainment.name,
            cityId: entertainment.cityId,
            visitDate,
            price: entertainment.price
        });
        
        this.currentTrip.addEntertainment(tripEntertainment);
        this._saveTrip();
        this._notifyListeners('entertainmentAdded', tripEntertainment);
    }

    /**
     * Go to next step
     */
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this._notifyListeners('stepChanged', this.currentStep);
        }
    }

    /**
     * Go to previous step
     */
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this._notifyListeners('stepChanged', this.currentStep);
        }
    }

    /**
     * Go to specific step
     * @param {number} step 
     */
    goToStep(step) {
        if (step >= 1 && step <= this.totalSteps) {
            this.currentStep = step;
            this._notifyListeners('stepChanged', this.currentStep);
        }
    }

    /**
     * Get trip summary
     * @returns {Object}
     */
    getTripSummary() {
        if (!this.currentTrip) return null;
        
        return {
            duration: this.currentTrip.getDuration(),
            countriesCount: this.currentTrip.countries.length,
            citiesCount: this.currentTrip.cities.length,
            hotelsCount: this.currentTrip.hotels.length,
            entertainmentCount: this.currentTrip.entertainment.length,
            totalCost: this.currentTrip.calculateTotalCost(),
            isValid: this.currentTrip.validate().isValid
        };
    }

    /**
     * Clear current trip
     */
    clearTrip() {
        this.currentTrip = null;
        this.currentStep = 1;
        if (this.storageService) {
            this.storageService.remove('currentTrip');
        }
        this._notifyListeners('tripCleared', null);
    }

    /**
     * Subscribe to state changes
     * @param {string} event 
     * @param {Function} callback 
     */
    subscribe(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    /**
     * Unsubscribe from state changes
     * @param {string} event 
     * @param {Function} callback 
     */
    unsubscribe(event, callback) {
        if (!this.listeners.has(event)) return;
        const callbacks = this.listeners.get(event);
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    /**
     * Notify all listeners of an event
     * @param {string} event 
     * @param {*} data 
     */
    _notifyListeners(event, data) {
        if (!this.listeners.has(event)) return;
        this.listeners.get(event).forEach(callback => callback(data));
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TripPlannerVM;
}
