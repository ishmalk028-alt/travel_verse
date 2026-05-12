/**
 * Trip Model
 * Represents a complete trip plan
 */
export class Trip {
  constructor(data = {}) {
    this.startDate       = data.startDate       || null;
    this.endDate         = data.endDate         || null;
    this.countries       = data.countries       || [];
    this.cities          = data.cities          || []; // [{ cityId, name, nights, countryId }]
    this.hotels          = data.hotels          || []; // [{ cityId, hotel, nights }]
    this.entertainment   = data.entertainment   || []; // [{ ...activity }]
    this.totalNights     = data.totalNights     || 0;
    this.createdAt       = data.createdAt       || new Date().toISOString();
    this.updatedAt       = data.updatedAt       || new Date().toISOString();
  }

  get durationDays() {
    if (!this.startDate || !this.endDate) return 0;
    const diff = new Date(this.endDate) - new Date(this.startDate);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  get hotelsCost() {
    return this.hotels.reduce((sum, h) => {
      const nightly = toNumber(h.hotel?.pricePerNight);
      const nights = Math.max(1, toNumber(h.nights, 1));
      return sum + nightly * nights;
    }, 0);
  }

  get entertainmentCost() {
    return this.entertainment.reduce((sum, e) => sum + toNumber(e.price), 0);
  }

  get serviceFee() {
    return Math.round((this.hotelsCost + this.entertainmentCost) * 0.05);
  }

  get totalCost() {
    return this.hotelsCost + this.entertainmentCost + this.serviceFee;
  }

  toJSON() {
    return {
      startDate:     this.startDate,
      endDate:       this.endDate,
      countries:     this.countries,
      cities:        this.cities,
      hotels:        this.hotels,
      entertainment: this.entertainment,
      totalNights:   this.totalNights,
      createdAt:     this.createdAt,
      updatedAt:     new Date().toISOString(),
    };
  }
}

function toNumber(value, fallback = 0) {
  if (typeof value === 'string') {
    value = value.replace(/[^0-9.-]/g, '');
  }
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}
