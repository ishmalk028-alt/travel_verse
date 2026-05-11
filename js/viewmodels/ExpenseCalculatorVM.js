/**
 * ExpenseCalculatorVM – ViewModel for real-time expense calculations
 */
import { StorageService } from '../services/StorageService.js';
import { formatCurrency } from '../utils/formatters.js';

export class ExpenseCalculatorVM {
  constructor() {
    this._observers = [];
    this._breakdown = this._recalculate();
  }

  subscribe(callback) {
    this._observers.push(callback);
    return () => { this._observers = this._observers.filter(cb => cb !== callback); };
  }

  _emit() {
    this._observers.forEach(cb => cb(this._breakdown));
  }

  _recalculate() {
    const hotels        = StorageService.getHotels();
    const entertainment = StorageService.getEntertainment();

    const hotelsCost = hotels.reduce((sum, h) => {
      return sum + (h.hotel?.pricePerNight || 0) * (h.nights || 1);
    }, 0);

    const entertainmentCost = entertainment.reduce((sum, e) => sum + (e.price || 0), 0);
    const serviceFee = Math.round((hotelsCost + entertainmentCost) * 0.05);
    const total      = hotelsCost + entertainmentCost + serviceFee;

    return { hotelsCost, entertainmentCost, serviceFee, total };
  }

  recalculate() {
    this._breakdown = this._recalculate();
    this._emit();
    return this._breakdown;
  }

  get breakdown() { return this._breakdown; }

  /**
   * Render expense sidebar into target element
   */
  renderSidebar(containerEl) {
    if (!containerEl) return;
    const { hotelsCost, entertainmentCost, serviceFee, total } = this._breakdown;
    const hotels        = StorageService.getHotels();
    const entertainment = StorageService.getEntertainment();

    containerEl.innerHTML = `
      <div class="expense-sidebar">
        <div class="expense-sidebar__header">
          <div class="expense-sidebar__title">💰 Trip Expenses</div>
        </div>
        <div class="expense-sidebar__body">
          <div class="expense-row">
            <span class="expense-row__label">🏨 Hotels (${hotels.length})</span>
            <span class="expense-row__value">${formatCurrency(hotelsCost)}</span>
          </div>
          <div class="expense-row">
            <span class="expense-row__label">🎭 Activities (${entertainment.length})</span>
            <span class="expense-row__value">${formatCurrency(entertainmentCost)}</span>
          </div>
          <div class="expense-row">
            <span class="expense-row__label">🔧 Service Fee (5%)</span>
            <span class="expense-row__value">${formatCurrency(serviceFee)}</span>
          </div>
        </div>
        <div class="expense-total">
          <span class="expense-total__label">Total</span>
          <span class="expense-total__amount">${formatCurrency(total)}</span>
        </div>
      </div>
    `;
  }
}
