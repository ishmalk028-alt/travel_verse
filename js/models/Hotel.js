/** Hotel Model */
export class Hotel {
  constructor(data = {}) {
    this.id             = data.id;
    this.cityId         = data.cityId;
    this.name           = data.name           || '';
    this.starRating     = data.starRating     || 3;
    this.pricePerNight  = data.pricePerNight  || 0;
    this.description    = data.description    || '';
    this.imageUrl       = data.imageUrl       || '';
    this.amenities      = data.amenities      || [];
    this.rating         = data.rating         || 0;
    this.reviewCount    = data.reviewCount    || 0;
    this.address        = data.address        || '';
  }

  get starsDisplay() {
    return '★'.repeat(this.starRating) + '☆'.repeat(5 - this.starRating);
  }
}
