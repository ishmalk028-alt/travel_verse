/**
 * TripPlannerVM – Main ViewModel managing trip state and observer pattern
 */
import { StorageService } from '../services/StorageService.js';
import { ApiService } from '../services/ApiService.js';
import { Trip } from '../models/Trip.js';

export class TripPlannerVM {
  constructor() {
    this._observers = new Map();
    this._trip = this._loadTripFromStorage();
    this._isLoading = false;
  }

  // ─── Observer pattern ──────────────────────────────────────────────────────
  subscribe(event, callback) {
    if (!this._observers.has(event)) this._observers.set(event, []);
    this._observers.get(event).push(callback);
    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event, callback) {
    const list = this._observers.get(event) || [];
    this._observers.set(event, list.filter(cb => cb !== callback));
  }

  _emit(event, data) {
    (this._observers.get(event) || []).forEach(cb => cb(data));
    (this._observers.get('*') || []).forEach(cb => cb({ event, data }));
  }

  // ─── Getters ───────────────────────────────────────────────────────────────
  get trip()       { return this._trip; }
  get isLoading()  { return this._isLoading; }

  // ─── Storage ───────────────────────────────────────────────────────────────
  _loadTripFromStorage() {
    const state = StorageService.getTripState();
    return new Trip({
      startDate:     state.startDate,
      endDate:       state.endDate,
      countries:     StorageService.getCountries(),
      cities:        StorageService.getCities(),
      hotels:        StorageService.getHotels(),
      entertainment: StorageService.getEntertainment(),
    });
  }

  _saveTripToStorage() {
    const t = this._trip;
    StorageService.setTripState({ startDate: t.startDate, endDate: t.endDate });
    StorageService.setCountries(t.countries);
    StorageService.setCities(t.cities);
    StorageService.setHotels(t.hotels);
    StorageService.setEntertainment(t.entertainment);
  }

  // ─── Step 1: Dates ─────────────────────────────────────────────────────────
  setDates(startDate, endDate) {
    this._trip.startDate = startDate;
    this._trip.endDate   = endDate;
    StorageService.setDates({ startDate, endDate });
    StorageService.setTripState({ startDate, endDate });
    this._emit('datesChanged', { startDate, endDate });
  }

  getDates() {
    return { startDate: this._trip.startDate, endDate: this._trip.endDate };
  }

  // ─── Step 2: Countries ─────────────────────────────────────────────────────
  async loadCountries() {
    this._isLoading = true;
    this._emit('loadingChanged', true);
    try {
      const data = await ApiService.getCountries();
      this._emit('countriesLoaded', data);
      return data;
    } finally {
      this._isLoading = false;
      this._emit('loadingChanged', false);
    }
  }

  toggleCountry(country) {
    const idx = this._trip.countries.findIndex(c => c.id === country.id);
    if (idx >= 0) {
      this._trip.countries.splice(idx, 1);
      // Remove cities & hotels for this country
      this._trip.cities        = this._trip.cities.filter(c => c.countryId !== country.id);
      this._trip.hotels        = this._trip.hotels.filter(h => {
        const city = this._trip.cities.find(c => c.id === h.cityId);
        return city; // keep only hotels whose city still exists
      });
    } else {
      this._trip.countries.push(country);
    }
    this._saveTripToStorage();
    this._emit('countriesChanged', this._trip.countries);
  }

  isCountrySelected(countryId) {
    return this._trip.countries.some(c => c.id === countryId);
  }

  // ─── Step 3: Cities ────────────────────────────────────────────────────────
  async loadCities(countryId) {
    const data = await ApiService.getCities(countryId);
    this._emit('citiesLoaded', { countryId, cities: data });
    return data;
  }

  toggleCity(city) {
    const idx = this._trip.cities.findIndex(c => c.id === city.id);
    if (idx >= 0) {
      this._trip.cities.splice(idx, 1);
      this._trip.hotels = this._trip.hotels.filter(h => h.cityId !== city.id);
    } else {
      this._trip.cities.push({ ...city, nights: 1 });
    }
    this._saveTripToStorage();
    this._emit('citiesChanged', this._trip.cities);
  }

  setCityNights(cityId, nights) {
    const city = this._trip.cities.find(c => c.id === cityId);
    if (city) {
      city.nights = Math.max(1, nights);
      this._saveTripToStorage();
      this._emit('cityNightsChanged', { cityId, nights: city.nights });
    }
  }

  isCitySelected(cityId) {
    return this._trip.cities.some(c => c.id === cityId);
  }

  // ─── Step 4: Hotels ────────────────────────────────────────────────────────
  async loadHotels(cityId, filters = {}) {
    const data = await ApiService.getHotels(cityId, filters);
    this._emit('hotelsLoaded', { cityId, hotels: data });
    return data;
  }

  selectHotel(cityId, hotel) {
    const idx = this._trip.hotels.findIndex(h => h.cityId === cityId);
    const city = this._trip.cities.find(c => c.id === cityId);
    const nights = city?.nights || 1;
    if (idx >= 0) {
      this._trip.hotels[idx] = { cityId, hotel, nights };
    } else {
      this._trip.hotels.push({ cityId, hotel, nights });
    }
    this._saveTripToStorage();
    this._emit('hotelsChanged', this._trip.hotels);
  }

  getHotelForCity(cityId) {
    return this._trip.hotels.find(h => h.cityId === cityId)?.hotel || null;
  }

  // ─── Step 5: Entertainment ─────────────────────────────────────────────────
  async loadEntertainment(cityId, filters = {}) {
    const data = await ApiService.getEntertainment(cityId, filters);
    this._emit('entertainmentLoaded', { cityId, entertainment: data });
    return data;
  }

  toggleEntertainment(activity) {
    const idx = this._trip.entertainment.findIndex(e => e.id === activity.id);
    if (idx >= 0) {
      this._trip.entertainment.splice(idx, 1);
    } else {
      this._trip.entertainment.push(activity);
    }
    this._saveTripToStorage();
    this._emit('entertainmentChanged', this._trip.entertainment);
  }

  isEntertainmentSelected(activityId) {
    return this._trip.entertainment.some(e => e.id === activityId);
  }

  // ─── Cost summary ──────────────────────────────────────────────────────────
  getCostBreakdown() {
    return {
      hotels:         this._trip.hotelsCost,
      entertainment:  this._trip.entertainmentCost,
      serviceFee:     this._trip.serviceFee,
      total:          this._trip.totalCost,
    };
  }

  // ─── Reset ─────────────────────────────────────────────────────────────────
  reset() {
    StorageService.clear();
    this._trip = new Trip();
    this._emit('reset', null);
  }
}

// Singleton instance
export const tripPlannerVM = new TripPlannerVM();
