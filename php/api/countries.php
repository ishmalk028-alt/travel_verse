<?php
/**
 * Countries API Endpoint
 * Trip Planner Website
 * 
 * GET /api/countries.php - Get all countries
 * GET /api/countries.php?id=1 - Get single country
 */

// Include required files
require_once __DIR__ . '/../config/constants.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validation.php';

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    methodNotAllowedResponse();
}

// Get parameters
$id = getInput('id');
$continent = getInput('continent');
$popular = getInput('popular');
$search = getInput('search');

// Load mock data (replace with database queries later)
$countriesFile = __DIR__ . '/../../data/countries.json';

if (!file_exists($countriesFile)) {
    // Return default data if file doesn't exist
    $countries = getDefaultCountries();
} else {
    $countries = json_decode(file_get_contents($countriesFile), true);
    if ($countries === null) {
        $countries = getDefaultCountries();
    }
}

// Get single country
if ($id !== null) {
    $found = null;
    foreach ($countries as $country) {
        if ($country['id'] == $id) {
            $found = $country;
            break;
        }
    }
    
    if ($found) {
        successResponse(['country' => $found]);
    } else {
        notFoundResponse('Country not found');
    }
}

// Filter by continent
if ($continent !== null) {
    $countries = array_filter($countries, function($country) use ($continent) {
        return strtolower($country['continent']) === strtolower($continent);
    });
}

// Filter by popular
if ($popular !== null) {
    $isPopular = filter_var($popular, FILTER_VALIDATE_BOOLEAN);
    $countries = array_filter($countries, function($country) use ($isPopular) {
        return $country['is_popular'] === $isPopular;
    });
}

// Search by name
if ($search !== null) {
    $searchLower = strtolower($search);
    $countries = array_filter($countries, function($country) use ($searchLower) {
        return strpos(strtolower($country['name']), $searchLower) !== false;
    });
}

// Return countries
successResponse(['countries' => array_values($countries)]);

/**
 * Get default countries data
 * @return array
 */
function getDefaultCountries() {
    return [
        [
            'id' => 1,
            'name' => 'France',
            'code' => 'FR',
            'continent' => 'Europe',
            'image_url' => 'assets/images/countries/france.jpg',
            'description' => 'Known for its art, cuisine, and the iconic Eiffel Tower.',
            'currency' => 'EUR',
            'language' => 'French',
            'is_popular' => true
        ],
        [
            'id' => 2,
            'name' => 'Japan',
            'code' => 'JP',
            'continent' => 'Asia',
            'image_url' => 'assets/images/countries/japan.jpg',
            'description' => 'A blend of ancient traditions and cutting-edge technology.',
            'currency' => 'JPY',
            'language' => 'Japanese',
            'is_popular' => true
        ],
        [
            'id' => 3,
            'name' => 'Italy',
            'code' => 'IT',
            'continent' => 'Europe',
            'image_url' => 'assets/images/countries/italy.jpg',
            'description' => 'Home to ancient ruins, Renaissance art, and world-class cuisine.',
            'currency' => 'EUR',
            'language' => 'Italian',
            'is_popular' => true
        ],
        [
            'id' => 4,
            'name' => 'United States',
            'code' => 'US',
            'continent' => 'North America',
            'image_url' => 'assets/images/countries/usa.jpg',
            'description' => 'From bustling cities to natural wonders, the land of diversity.',
            'currency' => 'USD',
            'language' => 'English',
            'is_popular' => true
        ],
        [
            'id' => 5,
            'name' => 'Australia',
            'code' => 'AU',
            'continent' => 'Oceania',
            'image_url' => 'assets/images/countries/australia.jpg',
            'description' => 'Known for unique wildlife, stunning beaches, and the Outback.',
            'currency' => 'AUD',
            'language' => 'English',
            'is_popular' => true
        ],
        [
            'id' => 6,
            'name' => 'Thailand',
            'code' => 'TH',
            'continent' => 'Asia',
            'image_url' => 'assets/images/countries/thailand.jpg',
            'description' => 'Famous for tropical beaches, ornate temples, and rich cuisine.',
            'currency' => 'THB',
            'language' => 'Thai',
            'is_popular' => true
        ],
        [
            'id' => 7,
            'name' => 'Spain',
            'code' => 'ES',
            'continent' => 'Europe',
            'image_url' => 'assets/images/countries/spain.jpg',
            'description' => 'A country of vibrant culture, beautiful architecture, and fiestas.',
            'currency' => 'EUR',
            'language' => 'Spanish',
            'is_popular' => true
        ],
        [
            'id' => 8,
            'name' => 'United Kingdom',
            'code' => 'GB',
            'continent' => 'Europe',
            'image_url' => 'assets/images/countries/uk.jpg',
            'description' => 'Rich history, royal heritage, and iconic landmarks.',
            'currency' => 'GBP',
            'language' => 'English',
            'is_popular' => true
        ]
    ];
}
