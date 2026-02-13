# Trip Planner Website - Copilot Instructions

## Project Overview
A comprehensive trip planning website where customers can plan their trips to specific countries, manage travel dates, select destinations, book hotels, and pre-book entertainment spots with total expense calculation.

## Developer Background
- **Developer**: 4th Semester Computer Science Student
- **Background**: Flutter Developer familiar with MVVM pattern
- **Technologies**: HTML5, CSS, JavaScript, PHP

---

## Architecture Guidelines

### MVVM Pattern (Adapted for Web)
```
├── Model (Data Layer)
│   ├── PHP Models - Database entities and data structures
│   ├── JS Models - Client-side data objects
│   └── Data validation and business rules
│
├── View (Presentation Layer)
│   ├── HTML Templates - Page structure
│   ├── CSS - Styling and layouts
│   └── Reusable Components/Widgets
│
└── ViewModel (Logic Layer)
    ├── JS ViewModels - UI logic and state management
    ├── Data binding between View and Model
    └── Event handling and user interactions
```

### Clean Architecture Principles
1. **Separation of Concerns**: Each file/module has single responsibility
2. **Dependency Rule**: Inner layers don't depend on outer layers
3. **Reusability**: Create components that can be used across pages
4. **Testability**: Code should be modular and testable
5. **Scalability**: Easy to add new features without breaking existing code

---

## Project Structure

```
website/
├── index.html                 # Landing page
├── .github/
│   └── copilot-instructions.md
│
├── assets/                    # Static assets
│   ├── images/               # Images and photos
│   ├── icons/                # SVG/PNG icons
│   └── fonts/                # Custom fonts
│
├── css/                       # Stylesheets
│   ├── base/                 # Reset, variables, typography
│   │   ├── _reset.css
│   │   ├── _variables.css
│   │   └── _typography.css
│   ├── components/           # Component-specific styles
│   │   ├── _buttons.css
│   │   ├── _cards.css
│   │   ├── _forms.css
│   │   └── _modals.css
│   ├── pages/                # Page-specific styles
│   │   ├── _home.css
│   │   ├── _booking.css
│   │   └── _checkout.css
│   ├── utils/                # Utility classes
│   │   └── _helpers.css
│   └── main.css              # Main stylesheet (imports all)
│
├── js/                        # JavaScript
│   ├── models/               # Data models
│   │   ├── Trip.js
│   │   ├── Country.js
│   │   ├── City.js
│   │   ├── Hotel.js
│   │   └── Entertainment.js
│   ├── viewmodels/           # ViewModel classes
│   │   ├── TripPlannerVM.js
│   │   ├── CountrySelectionVM.js
│   │   ├── HotelBookingVM.js
│   │   └── ExpenseCalculatorVM.js
│   ├── services/             # API and data services
│   │   ├── ApiService.js
│   │   ├── StorageService.js
│   │   └── ValidationService.js
│   ├── utils/                # Utility functions
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── formatters.js
│   ├── components/           # JS component logic
│   │   ├── DatePicker.js
│   │   ├── CountrySelector.js
│   │   └── HotelCard.js
│   └── app.js                # Main application entry
│
├── php/                       # Backend
│   ├── config/               # Configuration
│   │   ├── database.php
│   │   └── constants.php
│   ├── models/               # PHP Models/Entities
│   │   ├── TripModel.php
│   │   ├── CountryModel.php
│   │   ├── CityModel.php
│   │   ├── HotelModel.php
│   │   └── EntertainmentModel.php
│   ├── controllers/          # Business logic
│   │   ├── TripController.php
│   │   ├── BookingController.php
│   │   └── ExpenseController.php
│   ├── api/                  # API endpoints
│   │   ├── countries.php
│   │   ├── cities.php
│   │   ├── hotels.php
│   │   └── entertainment.php
│   └── helpers/              # Helper functions
│       ├── response.php
│       └── validation.php
│
├── components/                # Reusable HTML Components
│   ├── widgets/              # Small reusable widgets
│   │   ├── custom-input.html
│   │   ├── custom-button.html
│   │   ├── date-range-picker.html
│   │   ├── country-card.html
│   │   ├── city-card.html
│   │   ├── hotel-card.html
│   │   ├── entertainment-card.html
│   │   ├── price-display.html
│   │   ├── rating-stars.html
│   │   └── loading-spinner.html
│   └── layouts/              # Page layouts
│       ├── header.html
│       ├── footer.html
│       ├── sidebar.html
│       └── navbar.html
│
├── pages/                     # Main pages
│   ├── select-dates.html
│   ├── select-countries.html
│   ├── select-cities.html
│   ├── select-hotels.html
│   ├── select-entertainment.html
│   ├── trip-summary.html
│   └── checkout.html
│
└── data/                      # Static/Mock data
    ├── countries.json
    ├── cities.json
    ├── hotels.json
    └── entertainment.json
```

---

## Core Website Flow

### User Journey
```
1. Landing Page (index.html)
   └── Hero section with CTA to start planning

2. Select Date Range (select-dates.html)
   └── User picks start and end dates for trip

3. Select Countries (select-countries.html)
   └── Choose one or multiple countries
   └── Set travel sequence and dates for each country

4. Select Cities (select-cities.html)
   └── For each selected country, choose cities to visit
   └── Set number of nights per city

5. Select Hotels (select-hotels.html)
   └── Browse hotels in selected cities
   └── View prices per night
   └── Can select different hotels for different nights in same city

6. Select Entertainment (select-entertainment.html)
   └── Pre-book entertainment spots/activities
   └── Tourist attractions, shows, adventures

7. Trip Summary (trip-summary.html)
   └── Review complete itinerary
   └── See total expected expense breakdown

8. Checkout (checkout.html)
   └── Finalize booking
   └── Payment processing
```

---

## Reusable Components/Widgets

### Form Widgets
- **custom-input**: Text input with validation, icons, labels
- **custom-button**: Styled buttons (primary, secondary, outline)
- **date-range-picker**: Select start and end dates
- **dropdown-select**: Custom styled dropdown

### Display Widgets
- **country-card**: Display country with image, name, basic info
- **city-card**: Display city information
- **hotel-card**: Hotel with image, rating, price, amenities
- **entertainment-card**: Activity/spot with details and pricing
- **price-display**: Formatted price with currency
- **rating-stars**: Star rating display (1-5)

### Utility Widgets
- **loading-spinner**: Loading state indicator
- **toast-notification**: Success/error messages
- **modal**: Reusable modal dialog
- **progress-stepper**: Shows booking progress steps

---

## Coding Standards

### HTML
- Use semantic HTML5 elements
- BEM naming convention for classes
- Data attributes for JS hooks (data-*)
- Accessible (ARIA labels, proper headings)

### CSS
- CSS Variables for theming
- Mobile-first responsive design
- BEM methodology: block__element--modifier
- Avoid !important

### JavaScript
- ES6+ syntax
- Class-based ViewModels
- Async/await for API calls
- JSDoc comments for documentation

### PHP
- PSR-4 autoloading style
- Prepared statements for database
- Input sanitization
- JSON API responses

---

## Database Schema (Reference)

```sql
-- Countries
countries(id, name, code, image_url, description)

-- Cities
cities(id, country_id, name, image_url, description)

-- Hotels
hotels(id, city_id, name, star_rating, price_per_night, amenities, image_url)

-- Entertainment
entertainment(id, city_id, name, type, price, duration, description, image_url)

-- Trips (User bookings)
trips(id, user_email, start_date, end_date, total_cost, created_at)

-- Trip Details
trip_countries(trip_id, country_id, visit_order, start_date, end_date)
trip_cities(trip_id, city_id, nights_count)
trip_hotels(trip_id, hotel_id, check_in, check_out, nights)
trip_entertainment(trip_id, entertainment_id, visit_date)
```

---

## Development Notes

- Start with static HTML/CSS, then add JS interactivity
- Use mock JSON data before implementing PHP backend
- Test responsiveness on mobile devices
- Implement one page/feature at a time
- Keep components small and focused

---

## Future Enhancements (Post-MVP)
- User authentication/accounts
- Save trip drafts
- Share trip with others
- Currency conversion
- Weather information
- Flight booking integration
- Reviews and ratings system
