/** Entertainment Model */
export class Entertainment {
  constructor(data = {}) {
    this.id          = data.id;
    this.cityId      = data.cityId;
    this.cityName    = data.cityName    || '';
    this.name        = data.name        || '';
    this.type        = data.type        || '';
    this.category    = data.category    || '';
    this.price       = data.price       || 0;
    this.duration    = data.duration    || '';
    this.description = data.description || '';
    this.imageUrl    = data.imageUrl    || '';
    this.rating      = data.rating      || 0;
    this.emoji       = data.emoji       || '🎯';
  }
}
