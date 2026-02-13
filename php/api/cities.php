<?php
/**
 * Cities API Endpoint
 * Trip Planner Website
 * 
 * GET /api/cities.php - Get all cities
 * GET /api/cities.php?id=1 - Get single city
 * GET /api/cities.php?country_id=1 - Get cities by country
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
$countryId = getInput('country_id');
$popular = getInput('popular');
$search = getInput('search');

// Load mock data
$citiesFile = __DIR__ . '/../../data/cities.json';

if (!file_exists($citiesFile)) {
    $cities = getDefaultCities();
} else {
    $cities = json_decode(file_get_contents($citiesFile), true);
    if ($cities === null) {
        $cities = getDefaultCities();
    }
}

// Get single city
if ($id !== null) {
    $found = null;
    foreach ($cities as $city) {
        if ($city['id'] == $id) {
            $found = $city;
            break;
        }
    }
    
    if ($found) {
        successResponse(['city' => $found]);
    } else {
        notFoundResponse('City not found');
    }
}

// Filter by country
if ($countryId !== null) {
    $cities = array_filter($cities, function($city) use ($countryId) {
        return $city['country_id'] == $countryId;
    });
}

// Filter by popular
if ($popular !== null) {
    $isPopular = filter_var($popular, FILTER_VALIDATE_BOOLEAN);
    $cities = array_filter($cities, function($city) use ($isPopular) {
        return $city['is_popular'] === $isPopular;
    });
}

// Search by name
if ($search !== null) {
    $searchLower = strtolower($search);
    $cities = array_filter($cities, function($city) use ($searchLower) {
        return strpos(strtolower($city['name']), $searchLower) !== false;
    });
}

// Return cities
successResponse(['cities' => array_values($cities)]);

/**
 * Get default cities data
 * @return array
 */
function getDefaultCities() {
    return [
        // France cities
        [
            'id' => 1,
            'country_id' => 1,
            'name' => 'Paris',
            'image_url' => 'assets/images/cities/paris.jpg',
            'description' => 'The City of Light, known for the Eiffel Tower and Louvre Museum.',
            'is_capital' => true,
            'is_popular' => true,
            'population' => 2148000,
            'average_hotel_price' => 180
        ],
        [
            'id' => 2,
            'country_id' => 1,
            'name' => 'Nice',
            'image_url' => 'assets/images/cities/nice.jpg',
            'description' => 'Beautiful French Riviera city with stunning beaches.',
            'is_capital' => false,
            'is_popular' => true,
            'population' => 340000,
            'average_hotel_price' => 150
        ],
        // Japan cities
        [
            'id' => 3,
            'country_id' => 2,
            'name' => 'Tokyo',
            'image_url' => 'assets/images/cities/tokyo.jpg',
            'description' => 'Japan\'s bustling capital, mixing ultramodern and traditional.',
            'is_capital' => true,
            'is_popular' => true,
            'population' => 13960000,
            'average_hotel_price' => 200
        ],
        [
            'id' => 4,
            'country_id' => 2,
            'name' => 'Kyoto',
            'image_url' => 'assets/images/cities/kyoto.jpg',
            'description' => 'Famous for classical Buddhist temples and traditional geishas.',
            'is_capital' => false,
            'is_popular' => true,
            'population' => 1475000,
            'average_hotel_price' => 160
        ],
        [
            'id' => 5,
            'country_id' => 2,
            'name' => 'Osaka',
            'image_url' => 'assets/images/cities/osaka.jpg',
            'description' => 'Known for modern architecture, nightlife and street food.',
            'is_capital' => false,
            'is_popular' => true,
            'population' => 2691000,
            'average_hotel_price' => 140
        ],
        // Italy cities
        [
            'id' => 6,
            'country_id' => 3,
            'name' => 'Rome',
            'image_url' => 'assets/images/cities/rome.jpg',
            'description' => 'The Eternal City with ancient ruins and Vatican City.',
            'is_capital' => true,
            'is_popular' => true,
            'population' => 2873000,
            'average_hotel_price' => 170
        ],
        [
            'id' => 7,
            'country_id' => 3,
            'name' => 'Venice',
            'image_url' => 'assets/images/cities/venice.jpg',
            'description' => 'Romantic city built on water with beautiful canals.',
            'is_capital' => false,
            'is_popular' => true,
            'population' => 261000,
            'average_hotel_price' => 200
        ],
        [
            'id' => 8,
            'country_id' => 3,
            'name' => 'Florence',
            'image_url' => 'assets/images/cities/florence.jpg',
            'description' => 'Birthplace of the Renaissance, filled with art museums.',
            'is_capital' => false,
            'is_popular' => true,
            'population' => 382000,
            'average_hotel_price' => 160
        ],
        // USA cities
        [
            'id' => 9,
            'country_id' => 4,
            'name' => 'New York',
            'image_url' => 'assets/images/cities/newyork.jpg',
            'description' => 'The Big Apple - iconic skyline and cultural melting pot.',
            'is_capital' => false,
            'is_popular' => true,
            'population' => 8336000,
            'average_hotel_price' => 250
        ],
        [
            'id' => 10,
            'country_id' => 4,
            'name' => 'Los Angeles',
            'image_url' => 'assets/images/cities/losangeles.jpg',
            'description' => 'City of Angels, home to Hollywood and beautiful beaches.',
            'is_capital' => false,
            'is_popular' => true,
            'population' => 3979000,
            'average_hotel_price' => 200
        ],
        // Thailand cities
        [
            'id' => 11,
            'country_id' => 6,
            'name' => 'Bangkok',
            'image_url' => 'assets/images/cities/bangkok.jpg',
            'description' => 'Vibrant capital known for ornate shrines and street life.',
            'is_capital' => true,
            'is_popular' => true,
            'population' => 10539000,
            'average_hotel_price' => 80
        ],
        [
            'id' => 12,
            'country_id' => 6,
            'name' => 'Phuket',
            'image_url' => 'assets/images/cities/phuket.jpg',
            'description' => 'Beautiful island with stunning beaches and resorts.',
            'is_capital' => false,
            'is_popular' => true,
            'population' => 416000,
            'average_hotel_price' => 100
        ]
    ];
}
