/**
 * ApiService – handles HTTP requests to PHP API and falls back to local JSON data
 */
export class ApiService {
  static BASE_URL = '/trip/php/api';
  static DATA_URL = '/trip/data';

  /**
   * Generic fetch with error handling and PHP/JSON fallback.
   * If PHP is unavailable (no server), falls back to local JSON files.
   */
  static async fetch(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${ApiService.BASE_URL}/${endpoint}${queryString ? '?' + queryString : ''}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.success) return json.data;
      throw new Error(json.message || 'API error');
    } catch {
      // Fallback to local JSON
      return ApiService.fetchLocal(endpoint, params);
    }
  }

  static async fetchLocal(endpoint, params = {}) {
    // Map endpoint to data file
    const fileMap = {
      'countries.php':     'countries.json',
      'cities.php':        'cities.json',
      'hotels.php':        'hotels.json',
      'entertainment.php': 'entertainment.json',
    };
    const file = fileMap[endpoint];
    if (!file) throw new Error(`No local data for ${endpoint}`);

    const res = await fetch(`${ApiService.DATA_URL}/${file}`);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    let data = await res.json();

    // Apply filters from params
    if (params.countryId) {
      data = data.filter(d => d.countryId === parseInt(params.countryId));
    }
    if (params.cityId) {
      data = data.filter(d => d.cityId === parseInt(params.cityId));
    }
    if (params.minPrice) {
      data = data.filter(d => (d.pricePerNight || d.price || 0) >= parseInt(params.minPrice));
    }
    if (params.maxPrice) {
      data = data.filter(d => (d.pricePerNight || d.price || 0) <= parseInt(params.maxPrice));
    }
    if (params.stars) {
      data = data.filter(d => d.starRating === parseInt(params.stars));
    }
    if (params.type) {
      data = data.filter(d => d.type === params.type);
    }
    if (params.sortBy) {
      if (params.sortBy === 'price_asc')  data.sort((a, b) => (a.pricePerNight || a.price) - (b.pricePerNight || b.price));
      if (params.sortBy === 'price_desc') data.sort((a, b) => (b.pricePerNight || b.price) - (a.pricePerNight || a.price));
      if (params.sortBy === 'rating')     data.sort((a, b) => b.rating - a.rating);
    }

    return data;
  }

  // Convenience methods
  static getCountries()                        { return ApiService.fetch('countries.php'); }
  static getCities(countryId)                  { return ApiService.fetch('cities.php', countryId ? { countryId } : {}); }
  static getHotels(cityId, filters = {})       { return ApiService.fetch('hotels.php', { ...(cityId ? { cityId } : {}), ...filters }); }
  static getEntertainment(cityId, filters = {}) { return ApiService.fetch('entertainment.php', { ...(cityId ? { cityId } : {}), ...filters }); }
}
