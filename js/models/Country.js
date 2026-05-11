/** Country Model */
export class Country {
  constructor(data = {}) {
    this.id          = data.id;
    this.name        = data.name        || '';
    this.code        = data.code        || '';
    this.continent   = data.continent   || '';
    this.capital     = data.capital     || '';
    this.currency    = data.currency    || '';
    this.description = data.description || '';
    this.imageUrl    = data.imageUrl    || '';
    this.flag        = data.flag        || '🌍';
    this.popular     = data.popular     || false;
    this.highlights  = data.highlights  || [];
  }
}
