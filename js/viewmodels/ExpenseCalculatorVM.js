/**
 * Expense Calculator ViewModel
 * Handles all expense calculations and breakdowns
 */
class ExpenseCalculatorVM {
    constructor(trip = null) {
        this.trip = trip;
        this.currency = 'USD';
        this.exchangeRates = {};
        
        // Expense categories
        this.categories = {
            hotels: 0,
            entertainment: 0,
            estimated: {
                food: 0,
                transport: 0,
                misc: 0
            }
        };
        
        // Daily estimates (can be customized)
        this.dailyEstimates = {
            food: 50, // USD per day
            transport: 30, // USD per day
            misc: 20 // USD per day
        };
    }

    /**
     * Set the trip to calculate expenses for
     * @param {Trip} trip 
     */
    setTrip(trip) {
        this.trip = trip;
        this.calculate();
    }

    /**
     * Set currency for display
     * @param {string} currency 
     */
    setCurrency(currency) {
        this.currency = currency;
    }

    /**
     * Set daily estimate amount
     * @param {string} category 
     * @param {number} amount 
     */
    setDailyEstimate(category, amount) {
        if (this.dailyEstimates.hasOwnProperty(category)) {
            this.dailyEstimates[category] = amount;
            this.calculate();
        }
    }

    /**
     * Calculate all expenses
     * @returns {Object}
     */
    calculate() {
        if (!this.trip) {
            return this._getEmptyResult();
        }

        const duration = this.trip.getDuration();
        
        // Calculate hotel costs
        this.categories.hotels = this.trip.hotels.reduce((total, hotel) => {
            return total + (hotel.pricePerNight * hotel.nights);
        }, 0);

        // Calculate entertainment costs
        this.categories.entertainment = this.trip.entertainment.reduce((total, ent) => {
            return total + ent.price;
        }, 0);

        // Calculate estimated costs based on trip duration
        this.categories.estimated.food = this.dailyEstimates.food * duration;
        this.categories.estimated.transport = this.dailyEstimates.transport * duration;
        this.categories.estimated.misc = this.dailyEstimates.misc * duration;

        return this.getSummary();
    }

    /**
     * Get expense summary
     * @returns {Object}
     */
    getSummary() {
        const confirmedTotal = this.categories.hotels + this.categories.entertainment;
        const estimatedTotal = this.categories.estimated.food + 
                              this.categories.estimated.transport + 
                              this.categories.estimated.misc;
        const grandTotal = confirmedTotal + estimatedTotal;

        return {
            confirmed: {
                hotels: this.categories.hotels,
                entertainment: this.categories.entertainment,
                total: confirmedTotal
            },
            estimated: {
                food: this.categories.estimated.food,
                transport: this.categories.estimated.transport,
                misc: this.categories.estimated.misc,
                total: estimatedTotal
            },
            grandTotal,
            currency: this.currency,
            breakdown: this._getBreakdown(grandTotal)
        };
    }

    /**
     * Get expense breakdown by category
     * @param {number} total 
     * @returns {Array}
     */
    _getBreakdown(total) {
        if (total === 0) return [];

        return [
            {
                category: 'Hotels',
                amount: this.categories.hotels,
                percentage: (this.categories.hotels / total) * 100,
                color: '#2563eb'
            },
            {
                category: 'Entertainment',
                amount: this.categories.entertainment,
                percentage: (this.categories.entertainment / total) * 100,
                color: '#7c3aed'
            },
            {
                category: 'Food (Est.)',
                amount: this.categories.estimated.food,
                percentage: (this.categories.estimated.food / total) * 100,
                color: '#10b981'
            },
            {
                category: 'Transport (Est.)',
                amount: this.categories.estimated.transport,
                percentage: (this.categories.estimated.transport / total) * 100,
                color: '#f59e0b'
            },
            {
                category: 'Miscellaneous',
                amount: this.categories.estimated.misc,
                percentage: (this.categories.estimated.misc / total) * 100,
                color: '#6b7280'
            }
        ].filter(item => item.amount > 0);
    }

    /**
     * Get hotel expense breakdown by city
     * @returns {Array}
     */
    getHotelBreakdownByCity() {
        if (!this.trip) return [];

        const cityBreakdown = {};
        
        this.trip.hotels.forEach(hotel => {
            const cityId = hotel.cityId;
            if (!cityBreakdown[cityId]) {
                cityBreakdown[cityId] = {
                    cityId,
                    hotels: [],
                    total: 0
                };
            }
            const hotelTotal = hotel.pricePerNight * hotel.nights;
            cityBreakdown[cityId].hotels.push({
                name: hotel.hotelName,
                nights: hotel.nights,
                pricePerNight: hotel.pricePerNight,
                total: hotelTotal
            });
            cityBreakdown[cityId].total += hotelTotal;
        });

        return Object.values(cityBreakdown);
    }

    /**
     * Get entertainment expense breakdown by city
     * @returns {Array}
     */
    getEntertainmentBreakdownByCity() {
        if (!this.trip) return [];

        const cityBreakdown = {};
        
        this.trip.entertainment.forEach(ent => {
            const cityId = ent.cityId;
            if (!cityBreakdown[cityId]) {
                cityBreakdown[cityId] = {
                    cityId,
                    items: [],
                    total: 0
                };
            }
            cityBreakdown[cityId].items.push({
                name: ent.name,
                price: ent.price
            });
            cityBreakdown[cityId].total += ent.price;
        });

        return Object.values(cityBreakdown);
    }

    /**
     * Format amount with currency
     * @param {number} amount 
     * @returns {string}
     */
    formatAmount(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.currency
        }).format(amount);
    }

    /**
     * Get empty result structure
     * @returns {Object}
     */
    _getEmptyResult() {
        return {
            confirmed: { hotels: 0, entertainment: 0, total: 0 },
            estimated: { food: 0, transport: 0, misc: 0, total: 0 },
            grandTotal: 0,
            currency: this.currency,
            breakdown: []
        };
    }

    /**
     * Export expense report as JSON
     * @returns {string}
     */
    exportAsJSON() {
        return JSON.stringify({
            summary: this.getSummary(),
            hotelBreakdown: this.getHotelBreakdownByCity(),
            entertainmentBreakdown: this.getEntertainmentBreakdownByCity(),
            dailyEstimates: this.dailyEstimates,
            generatedAt: new Date().toISOString()
        }, null, 2);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExpenseCalculatorVM;
}
