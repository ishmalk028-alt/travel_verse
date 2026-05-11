/**
 * ValidationService – client-side validation helpers
 */
export class ValidationService {
  static validateDates(startDate, endDate) {
    const errors = [];
    if (!startDate) errors.push('Please select a start date.');
    if (!endDate)   errors.push('Please select an end date.');
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end   = new Date(endDate);
      if (start >= end)          errors.push('End date must be after start date.');
      if (start < new Date())    errors.push('Start date cannot be in the past.');
      const days = Math.ceil((end - start) / 86400000);
      if (days > 365)            errors.push('Trip duration cannot exceed 365 days.');
    }
    return errors;
  }

  static validateCountries(countries) {
    if (!countries || countries.length === 0) {
      return ['Please select at least one country.'];
    }
    return [];
  }

  static validateCities(cities) {
    if (!cities || cities.length === 0) {
      return ['Please select at least one city.'];
    }
    const invalid = cities.filter(c => !c.nights || c.nights < 1);
    if (invalid.length) {
      return ['Each city must have at least 1 night allocated.'];
    }
    return [];
  }

  static validateHotels(hotels, cities) {
    const cityIds = cities.map(c => c.id);
    const hotelCityIds = hotels.map(h => h.cityId);
    const missing = cityIds.filter(id => !hotelCityIds.includes(id));
    if (missing.length > 0) {
      return [`Please select a hotel for all cities. ${missing.length} city/cities missing a hotel.`];
    }
    return [];
  }

  static validateCheckout(formData) {
    const errors = [];
    if (!formData.fullName?.trim())                      errors.push('Full name is required.');
    if (!formData.email?.trim())                         errors.push('Email is required.');
    if (formData.email && !ValidationService.isValidEmail(formData.email)) {
      errors.push('Please enter a valid email address.');
    }
    if (!formData.phone?.trim())                         errors.push('Phone number is required.');
    if (!formData.paymentMethod)                         errors.push('Please select a payment method.');
    return errors;
  }

  static isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static isValidPhone(phone) {
    return /^\+?[\d\s\-().]{7,}$/.test(phone);
  }
}
