# TripPlanner - Travel Planning Website

A comprehensive trip planning website built with HTML5, CSS, JavaScript, and PHP following the MVVM architecture pattern.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [User Flow](#user-flow)
7. [Architecture](#architecture)
8. [API Documentation](#api-documentation)
9. [Components Guide](#components-guide)
10. [Styling Guide](#styling-guide)
11. [Contributing](#contributing)

---

## Project Overview

TripPlanner is a web application that allows users to plan complete trips including:
- Selecting travel dates
- Choosing destination countries and cities
- Booking hotels with flexible night allocations
- Pre-booking entertainment and activities
- Calculating total trip expenses

---

## Features

### Core Features
- **Date Selection**: Pick start and end dates for your trip
- **Multi-Country Support**: Select one or multiple countries to visit
- **City Planning**: Choose cities within each country with customizable nights
- **Hotel Booking**: Browse and select hotels with pricing per night
- **Entertainment Booking**: Pre-book activities and attractions (optional)
- **Expense Calculator**: Real-time total cost calculation
- **Trip Summary**: Complete itinerary overview before checkout
- **Checkout System**: Contact form and payment method selection

### Technical Features
- Responsive design (mobile-first approach)
- Local storage for trip data persistence
- Clean MVVM architecture
- Reusable UI components
- BEM CSS methodology

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling with CSS Variables and BEM |
| JavaScript (ES6+) | Client-side logic and state management |
| PHP | Backend API and database operations |
| LocalStorage | Client-side data persistence |

---

## Project Structure

```
website/
├── index.html                 # Landing page
├── README.md                  # This documentation
├── .github/
│   └── copilot-instructions.md # Development guidelines
│
├── assets/                    # Static assets
│   ├── images/               # Images and photos
│   ├── icons/                # SVG/PNG icons
│   └── fonts/                # Custom fonts
│
├── css/                       # Stylesheets
│   ├── base/                 # Foundation styles
│   │   ├── _reset.css        # Browser reset
│   │   ├── _variables.css    # CSS custom properties
│   │   └── _typography.css   # Font styles
│   ├── components/           # Component styles
│   │   ├── _buttons.css      # Button variants
│   │   ├── _cards.css        # Card components
│   │   ├── _forms.css        # Form elements
│   │   └── _modals.css       # Modal dialogs
│   ├── pages/                # Page-specific styles
│   │   └── _home.css         # Landing page styles
│   ├── utils/                # Utility classes
│   │   └── _helpers.css      # Helper classes
│   └── main.css              # Main entry (imports all)
│
├── js/                        # JavaScript
│   ├── models/               # Data models
│   │   ├── Trip.js           # Trip entity
│   │   ├── Country.js        # Country entity
│   │   ├── City.js           # City entity
│   │   ├── Hotel.js          # Hotel entity
│   │   └── Entertainment.js  # Entertainment entity
│   ├── viewmodels/           # UI logic controllers
│   │   ├── TripPlannerVM.js  # Main trip planning logic
│   │   └── ExpenseCalculatorVM.js # Cost calculations
│   ├── services/             # Data services
│   │   ├── ApiService.js     # HTTP requests
│   │   ├── StorageService.js # LocalStorage wrapper
│   │   └── ValidationService.js # Input validation
│   ├── utils/                # Utilities
│   │   ├── constants.js      # App constants
│   │   ├── helpers.js        # Helper functions
│   │   └── formatters.js     # Data formatters
│   └── app.js                # Application entry point
│
├── php/                       # Backend
│   ├── config/               # Configuration
│   │   ├── database.php      # Database connection
│   │   └── constants.php     # PHP constants
│   ├── api/                  # REST API endpoints
│   │   ├── countries.php     # GET /api/countries
│   │   ├── cities.php        # GET /api/cities
│   │   ├── hotels.php        # GET /api/hotels
│   │   └── entertainment.php # GET /api/entertainment
│   └── helpers/              # Helper functions
│       ├── response.php      # JSON response helpers
│       └── validation.php    # Server-side validation
│
├── components/                # Reusable HTML components
│   ├── widgets/              # Small UI components
│   │   ├── country-card.html
│   │   ├── city-card.html
│   │   ├── hotel-card.html
│   │   ├── entertainment-card.html
│   │   ├── progress-stepper.html
│   │   ├── date-range-picker.html
│   │   ├── price-display.html
│   │   ├── rating-stars.html
│   │   └── loading-spinner.html
│   └── layouts/              # Page layouts
│       ├── header.html
│       └── footer.html
│
├── pages/                     # Application pages
│   ├── select-dates.html     # Step 1: Date selection
│   ├── select-countries.html # Step 2: Country selection
│   ├── select-cities.html    # Step 3: City selection
│   ├── select-hotels.html    # Step 4: Hotel booking
│   ├── select-entertainment.html # Step 5: Activities
│   ├── trip-summary.html     # Step 6: Review
│   └── checkout.html         # Step 7: Payment
│
└── data/                      # Static/Mock data
    ├── countries.json
    ├── cities.json
    ├── hotels.json
    └── entertainment.json
```

---

## Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Local web server (XAMPP, WAMP, MAMP, or VS Code Live Server)
- PHP 7.4+ (for backend API)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **For static pages only (no PHP)**
   - Open `index.html` directly in browser, or
   - Use VS Code Live Server extension

3. **For full functionality with PHP**
   - Place project in your web server's document root
   - For XAMPP: `C:\xampp\htdocs\website`
   - For WAMP: `C:\wamp64\www\website`
   - Access via `http://localhost/website`

### Running the Project

1. Open `index.html` in your browser
2. Click "Start Planning" to begin the booking flow
3. Follow the 6-step process:
   - Select dates → Countries → Cities → Hotels → Activities → Checkout

---

## User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        LANDING PAGE                              │
│                      (index.html)                                │
│                           │                                      │
│                    [Start Planning]                              │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ STEP 1: SELECT DATES                                     │    │
│  │ - Pick start date                                        │    │
│  │ - Pick end date                                          │    │
│  │ - See trip duration                                      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ STEP 2: SELECT COUNTRIES                                 │    │
│  │ - Browse available countries                             │    │
│  │ - Select one or multiple                                 │    │
│  └─────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ STEP 3: SELECT CITIES                                    │    │
│  │ - View cities for each selected country                  │    │
│  │ - Choose cities to visit                                 │    │
│  │ - Set number of nights per city                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ STEP 4: SELECT HOTELS                                    │    │
│  │ - Browse hotels in each city                             │    │
│  │ - View prices, ratings, amenities                        │    │
│  │ - Select hotel for each city                             │    │
│  └─────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ STEP 5: SELECT ENTERTAINMENT (Optional)                  │    │
│  │ - Browse activities and attractions                      │    │
│  │ - Pre-book desired activities                            │    │
│  │ - Can skip this step                                     │    │
│  └─────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ STEP 6: TRIP SUMMARY                                     │    │
│  │ - Review complete itinerary                              │    │
│  │ - See expense breakdown                                  │    │
│  │ - Hotels total + Activities total + Service fee          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ STEP 7: CHECKOUT                                         │    │
│  │ - Enter contact information                              │    │
│  │ - Select payment method                                  │    │
│  │ - Complete booking                                       │    │
│  │ - Receive confirmation                                   │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Architecture

### MVVM Pattern (Model-View-ViewModel)

```
┌─────────────────────────────────────────────────────────────┐
│                          VIEW                                │
│                    (HTML + CSS)                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  • HTML pages (index.html, pages/*.html)            │    │
│  │  • Component templates (components/*)               │    │
│  │  • CSS styling (css/*)                              │    │
│  └─────────────────────────────────────────────────────┘    │
│                           ▲                                  │
│                           │ Data Binding                     │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    VIEWMODEL                         │    │
│  │                  (JavaScript)                        │    │
│  │  • TripPlannerVM.js - Main booking logic            │    │
│  │  • ExpenseCalculatorVM.js - Cost calculations       │    │
│  │  • Observer pattern for state changes               │    │
│  └─────────────────────────────────────────────────────┘    │
│                           ▲                                  │
│                           │ Data Access                      │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                      MODEL                           │    │
│  │              (JavaScript + PHP)                      │    │
│  │  • JS Models: Trip, Country, City, Hotel, etc.      │    │
│  │  • PHP API endpoints for data                       │    │
│  │  • LocalStorage for persistence                     │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → ViewModel → Model → Storage/API
                ↓
            Update State
                ↓
            Notify Observers
                ↓
            Update View
```

### LocalStorage Keys

| Key | Description | Data Type |
|-----|-------------|-----------|
| `tripDates` | Start and end dates | `{ startDate, endDate }` |
| `tripCountries` | Selected countries | `Array<Country>` |
| `tripCities` | Selected cities with nights | `Array<{ id, name, nights }>` |
| `tripHotels` | Booked hotels | `Array<{ cityId, hotelId, ... }>` |
| `tripEntertainment` | Selected activities | `Array<{ id, name, price }>` |
| `tripTotal` | Cost breakdown | `{ hotels, activities, serviceFee, total }` |

---

## API Documentation

### GET /php/api/countries.php

Returns list of available countries.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "France",
      "code": "FR",
      "continent": "Europe",
      "description": "The land of art, fashion, and cuisine",
      "imageUrl": "https://..."
    }
  ]
}
```

### GET /php/api/cities.php

Returns cities, optionally filtered by country.

**Query Parameters:**
- `countryId` (optional): Filter by country ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "countryId": 1,
      "name": "Paris",
      "description": "The City of Light",
      "imageUrl": "https://..."
    }
  ]
}
```

### GET /php/api/hotels.php

Returns hotels with filtering options.

**Query Parameters:**
- `cityId` (optional): Filter by city ID
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `stars` (optional): Star rating filter
- `sortBy` (optional): `price_asc`, `price_desc`, `rating`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "cityId": 1,
      "name": "Hotel Le Marais",
      "starRating": 4,
      "pricePerNight": 189,
      "amenities": ["WiFi", "Pool", "Spa"],
      "imageUrl": "https://..."
    }
  ]
}
```

### GET /php/api/entertainment.php

Returns entertainment options.

**Query Parameters:**
- `cityId` (optional): Filter by city ID
- `type` (optional): Activity type filter

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "cityId": 1,
      "name": "Eiffel Tower Tour",
      "type": "Landmark",
      "price": 35,
      "duration": "2 hours",
      "description": "...",
      "imageUrl": "https://..."
    }
  ]
}
```

---

## Components Guide

### Button Component

```html
<!-- Primary Button -->
<button class="btn btn--primary">Click Me</button>

<!-- Secondary Button -->
<button class="btn btn--secondary">Secondary</button>

<!-- Outline Button -->
<button class="btn btn--outline">Outline</button>

<!-- Button Sizes -->
<button class="btn btn--primary btn--sm">Small</button>
<button class="btn btn--primary btn--lg">Large</button>

<!-- Full Width -->
<button class="btn btn--primary btn--block">Full Width</button>
```

### Card Component

```html
<div class="card">
  <img src="image.jpg" class="card__image">
  <div class="card__body">
    <h3 class="card__title">Title</h3>
    <p class="card__text">Description text</p>
  </div>
  <div class="card__footer">
    <button class="btn btn--primary">Action</button>
  </div>
</div>
```

### Form Elements

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="form-input" placeholder="Enter email">
</div>

<div class="form-group">
  <label class="form-label">Country</label>
  <select class="form-select">
    <option>Select country</option>
  </select>
</div>
```

---

## Styling Guide

### CSS Variables

Located in `css/base/_variables.css`:

```css
/* Colors */
--color-primary: #2563eb;      /* Blue */
--color-secondary: #7c3aed;    /* Purple */
--color-accent: #f59e0b;       /* Amber */
--color-success: #10b981;      /* Green */
--color-error: #ef4444;        /* Red */

/* Typography */
--font-primary: 'Inter', sans-serif;
--font-secondary: 'Poppins', sans-serif;

/* Spacing */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-4: 1rem;      /* 16px */
--space-8: 2rem;      /* 32px */

/* Border Radius */
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 1rem;
--radius-xl: 1.5rem;
```

### BEM Naming Convention

```
.block {}
.block__element {}
.block--modifier {}

/* Examples */
.card {}
.card__title {}
.card--featured {}
```

### Responsive Breakpoints

```css
/* Mobile first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

---

## Contributing

### Development Guidelines

1. **Follow MVVM pattern** - Keep business logic in ViewModels
2. **Use BEM for CSS** - Maintain consistent naming
3. **Mobile-first** - Style for mobile, then enhance for larger screens
4. **Semantic HTML** - Use appropriate HTML5 elements
5. **Comment code** - Add JSDoc comments for functions

### File Naming

- HTML: `kebab-case.html` (e.g., `select-hotels.html`)
- CSS: `_kebab-case.css` (e.g., `_buttons.css`)
- JS: `PascalCase.js` for classes (e.g., `TripPlannerVM.js`)
- PHP: `snake_case.php` or `kebab-case.php`

### Git Commit Messages

```
feat: Add hotel filtering functionality
fix: Correct date calculation in trip summary
style: Update button hover states
docs: Add API documentation
refactor: Simplify expense calculation logic
```

---

## License

This project is created for educational purposes as part of a 4th semester web development course.

---

## Contact

For questions or support, please contact the development team.

---

*Last updated: February 2026*
