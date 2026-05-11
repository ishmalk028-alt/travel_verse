/**
 * StorageService – LocalStorage wrapper with JSON serialization
 */
export class StorageService {
  static KEYS = {
    TRIP_DATES:        'tripDates',
    TRIP_COUNTRIES:    'tripCountries',
    TRIP_CITIES:       'tripCities',
    TRIP_HOTELS:       'tripHotels',
    TRIP_ENTERTAINMENT:'tripEntertainment',
    TRIP_TOTAL:        'tripTotal',
    TRIP_STATE:        'tripState',
  };



  static get(key) {

    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    } catch {
      return null;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      console.error('StorageService: failed to write', key);
      return false;
    }
  }

  static clear() {
    try {
      Object.values(StorageService.KEYS).forEach(key => localStorage.removeItem(key));
      return true;
    } catch {
      console.error('StorageService: failed to clear trip data');
      return false;
    }
  }



  // Convenience helpers
  static getDates()          { return StorageService.get(StorageService.KEYS.TRIP_DATES); }
  static setDates(v)         { return StorageService.set(StorageService.KEYS.TRIP_DATES, v); }
  static getCountries()      { return StorageService.get(StorageService.KEYS.TRIP_COUNTRIES) || []; }
  static setCountries(v)     { return StorageService.set(StorageService.KEYS.TRIP_COUNTRIES, v); }
  static getCities()         { return StorageService.get(StorageService.KEYS.TRIP_CITIES) || []; }
  static setCities(v)        { return StorageService.set(StorageService.KEYS.TRIP_CITIES, v); }
  static getHotels()         { return StorageService.get(StorageService.KEYS.TRIP_HOTELS) || []; }
  static setHotels(v)        { return StorageService.set(StorageService.KEYS.TRIP_HOTELS, v); }
  static getEntertainment()  { return StorageService.get(StorageService.KEYS.TRIP_ENTERTAINMENT) || []; }
  static setEntertainment(v) { return StorageService.set(StorageService.KEYS.TRIP_ENTERTAINMENT, v); }
  static getTripState()      { return StorageService.get(StorageService.KEYS.TRIP_STATE) || {}; }
  static setTripState(v)     { return StorageService.set(StorageService.KEYS.TRIP_STATE, v); }
}
