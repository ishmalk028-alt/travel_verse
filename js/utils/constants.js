/**
 * App Constants
 */
export const STEPS = {
  DATES:          1,
  COUNTRIES:      2,
  CITIES:         3,
  HOTELS:         4,
  ENTERTAINMENT:  5,
  SUMMARY:        6,
  CHECKOUT:       7,
};

export const STEP_META = [
  { step: 1, label: 'Dates',         icon: '📅', page: 'pages/select-dates.html' },
  { step: 2, label: 'Countries',     icon: '🌍', page: 'pages/select-countries.html' },
  { step: 3, label: 'Cities',        icon: '🏙️', page: 'pages/select-cities.html' },
  { step: 4, label: 'Hotels',        icon: '🏨', page: 'pages/select-hotels.html' },
  { step: 5, label: 'Activities',    icon: '🎭', page: 'pages/select-entertainment.html' },
  { step: 6, label: 'Summary',       icon: '📋', page: 'pages/trip-summary.html' },
  { step: 7, label: 'Checkout',      icon: '💳', page: 'pages/checkout.html' },
];

export const SERVICE_FEE_RATE = 0.05;   // 5%

export const SORT_OPTIONS = [
  { value: '',            label: 'Default' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Highest Rated' },
];

export const PAYMENT_METHODS = [
  { id: 'credit_card',  label: 'Credit / Debit Card',  icon: '💳', desc: 'Visa, Mastercard, Amex' },
  { id: 'paypal',       label: 'PayPal',                icon: '🅿️', desc: 'Pay with your PayPal account' },
  { id: 'bank',         label: 'Bank Transfer',         icon: '🏦', desc: 'Direct bank transfer' },
  { id: 'crypto',       label: 'Cryptocurrency',        icon: '₿',  desc: 'Bitcoin, Ethereum, USDC' },
];
