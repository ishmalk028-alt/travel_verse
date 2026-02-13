/**
 * Application Constants
 * Trip Planner Website
 */
const APP_CONFIG = {
    // App Info
    APP_NAME: 'TripPlanner',
    APP_VERSION: '1.0.0',
    
    // API Configuration
    API_BASE_URL: '/php/api',
    API_TIMEOUT: 30000, // 30 seconds
    
    // Storage Keys
    STORAGE_KEYS: {
        CURRENT_TRIP: 'currentTrip',
        USER_PREFERENCES: 'userPreferences',
        RECENT_SEARCHES: 'recentSearches',
        SELECTED_CURRENCY: 'selectedCurrency'
    },
    
    // Planning Steps
    PLANNING_STEPS: {
        DATES: 1,
        COUNTRIES: 2,
        CITIES: 3,
        HOTELS: 4,
        ENTERTAINMENT: 5,
        SUMMARY: 6,
        CHECKOUT: 7
    },
    
    // Step Names
    STEP_NAMES: [
        'Select Dates',
        'Choose Countries',
        'Select Cities',
        'Book Hotels',
        'Entertainment',
        'Review Trip',
        'Checkout'
    ],
    
    // Default Daily Estimates (in USD)
    DAILY_ESTIMATES: {
        FOOD: 50,
        TRANSPORT: 30,
        MISCELLANEOUS: 20
    }
};

// Supported Currencies
const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
    EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
    GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
    JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    CHF: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
    INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    PKR: { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee' }
};

// Hotel Star Ratings
const HOTEL_RATINGS = {
    1: 'Economy',
    2: 'Budget',
    3: 'Standard',
    4: 'Superior',
    5: 'Luxury'
};

// Entertainment Types
const ENTERTAINMENT_TYPES = {
    MUSEUM: { id: 'museum', name: 'Museums', icon: 'museum' },
    ADVENTURE: { id: 'adventure', name: 'Adventure', icon: 'hiking' },
    SHOW: { id: 'show', name: 'Shows & Events', icon: 'theater' },
    TOUR: { id: 'tour', name: 'Tours', icon: 'map' },
    ATTRACTION: { id: 'attraction', name: 'Attractions', icon: 'star' },
    RESTAURANT: { id: 'restaurant', name: 'Dining', icon: 'utensils' },
    PARK: { id: 'park', name: 'Parks', icon: 'tree' },
    BEACH: { id: 'beach', name: 'Beaches', icon: 'umbrella-beach' },
    SHOPPING: { id: 'shopping', name: 'Shopping', icon: 'shopping-bag' },
    NIGHTLIFE: { id: 'nightlife', name: 'Nightlife', icon: 'moon' }
};

// Hotel Amenities
const HOTEL_AMENITIES = {
    WIFI: { id: 'wifi', name: 'Free WiFi', icon: 'wifi' },
    PARKING: { id: 'parking', name: 'Parking', icon: 'car' },
    POOL: { id: 'pool', name: 'Swimming Pool', icon: 'swimming-pool' },
    GYM: { id: 'gym', name: 'Fitness Center', icon: 'dumbbell' },
    RESTAURANT: { id: 'restaurant', name: 'Restaurant', icon: 'utensils' },
    SPA: { id: 'spa', name: 'Spa', icon: 'spa' },
    AC: { id: 'ac', name: 'Air Conditioning', icon: 'snowflake' },
    BAR: { id: 'bar', name: 'Bar', icon: 'cocktail' },
    BREAKFAST: { id: 'breakfast', name: 'Breakfast Included', icon: 'coffee' },
    ROOM_SERVICE: { id: 'room_service', name: 'Room Service', icon: 'concierge-bell' }
};

// Continents
const CONTINENTS = {
    AFRICA: 'Africa',
    ASIA: 'Asia',
    EUROPE: 'Europe',
    NORTH_AMERICA: 'North America',
    SOUTH_AMERICA: 'South America',
    OCEANIA: 'Oceania',
    ANTARCTICA: 'Antarctica'
};

// Trip Statuses
const TRIP_STATUS = {
    DRAFT: 'draft',
    CONFIRMED: 'confirmed',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
};

// Animation Durations
const ANIMATION = {
    FAST: 150,
    NORMAL: 250,
    SLOW: 350
};

// Breakpoints
const BREAKPOINTS = {
    SM: 480,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        APP_CONFIG,
        CURRENCIES,
        HOTEL_RATINGS,
        ENTERTAINMENT_TYPES,
        HOTEL_AMENITIES,
        CONTINENTS,
        TRIP_STATUS,
        ANIMATION,
        BREAKPOINTS
    };
}
