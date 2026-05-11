/** City Model */
export class City {
  constructor(data = {}) {
    this.id          = data.id;
    this.countryId   = data.countryId;
    this.name        = data.name        || '';
    this.description = data.description || '';
    this.imageUrl    = data.imageUrl    || '';
    this.highlights  = data.highlights  || [];
    this.timezone    = data.timezone    || '';
    this.bestFor     = data.bestFor     || '';
    // User-set fields
    this.nights      = data.nights      || 1;
  }
}
