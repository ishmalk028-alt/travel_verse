<?php
/**
 * Hotels API Endpoint
 * Trip Planner Website
 * 
 * GET /api/hotels.php - Get all hotels
 * GET /api/hotels.php?id=1 - Get single hotel
 * GET /api/hotels.php?city_id=1 - Get hotels by city
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
$cityId = getInput('city_id');
$minPrice = getInput('min_price');
$maxPrice = getInput('max_price');
$stars = getInput('stars');
$sortBy = getInput('sort_by', 'price'); // price, rating, stars

// Load mock data
$hotelsFile = __DIR__ . '/../../data/hotels.json';

if (!file_exists($hotelsFile)) {
    $hotels = getDefaultHotels();
} else {
    $hotels = json_decode(file_get_contents($hotelsFile), true);
    if ($hotels === null) {
        $hotels = getDefaultHotels();
    }
}

// Get single hotel
if ($id !== null) {
    $found = null;
    foreach ($hotels as $hotel) {
        if ($hotel['id'] == $id) {
            $found = $hotel;
            break;
        }
    }
    
    if ($found) {
        successResponse(['hotel' => $found]);
    } else {
        notFoundResponse('Hotel not found');
    }
}

// Filter by city
if ($cityId !== null) {
    $hotels = array_filter($hotels, function($hotel) use ($cityId) {
        return $hotel['city_id'] == $cityId;
    });
}

// Filter by price range
if ($minPrice !== null) {
    $hotels = array_filter($hotels, function($hotel) use ($minPrice) {
        return $hotel['price_per_night'] >= (float)$minPrice;
    });
}

if ($maxPrice !== null) {
    $hotels = array_filter($hotels, function($hotel) use ($maxPrice) {
        return $hotel['price_per_night'] <= (float)$maxPrice;
    });
}

// Filter by star rating
if ($stars !== null) {
    $hotels = array_filter($hotels, function($hotel) use ($stars) {
        return $hotel['star_rating'] == (int)$stars;
    });
}

// Convert to array and sort
$hotels = array_values($hotels);

// Sort hotels
usort($hotels, function($a, $b) use ($sortBy) {
    switch ($sortBy) {
        case 'price':
            return $a['price_per_night'] - $b['price_per_night'];
        case 'price_desc':
            return $b['price_per_night'] - $a['price_per_night'];
        case 'rating':
            return $b['rating'] - $a['rating'];
        case 'stars':
            return $b['star_rating'] - $a['star_rating'];
        default:
            return 0;
    }
});

// Return hotels
successResponse(['hotels' => $hotels]);

/**
 * Get default hotels data
 * @return array
 */
function getDefaultHotels() {
    return [
        // Paris hotels
        [
            'id' => 1,
            'city_id' => 1,
            'name' => 'Hotel Le Marais',
            'star_rating' => 4,
            'price_per_night' => 180,
            'image_url' => 'assets/images/hotels/hotel1.jpg',
            'description' => 'Charming boutique hotel in the heart of Le Marais district.',
            'address' => '12 Rue de Rivoli, 75004 Paris',
            'amenities' => ['wifi', 'breakfast', 'ac', 'room_service'],
            'rating' => 4.5,
            'review_count' => 328
        ],
        [
            'id' => 2,
            'city_id' => 1,
            'name' => 'Paris Grand Hotel',
            'star_rating' => 5,
            'price_per_night' => 350,
            'image_url' => 'assets/images/hotels/hotel2.jpg',
            'description' => 'Luxury hotel with stunning views of the Eiffel Tower.',
            'address' => '2 Avenue des Champs-Élysées, 75008 Paris',
            'amenities' => ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'bar'],
            'rating' => 4.8,
            'review_count' => 512
        ],
        [
            'id' => 3,
            'city_id' => 1,
            'name' => 'Budget Inn Paris',
            'star_rating' => 2,
            'price_per_night' => 75,
            'image_url' => 'assets/images/hotels/hotel3.jpg',
            'description' => 'Clean and affordable accommodation near Metro station.',
            'address' => '45 Rue Montmartre, 75002 Paris',
            'amenities' => ['wifi', 'ac'],
            'rating' => 3.8,
            'review_count' => 156
        ],
        // Tokyo hotels
        [
            'id' => 4,
            'city_id' => 3,
            'name' => 'Shinjuku Sky Hotel',
            'star_rating' => 4,
            'price_per_night' => 200,
            'image_url' => 'assets/images/hotels/hotel4.jpg',
            'description' => 'Modern hotel with panoramic city views in Shinjuku.',
            'address' => '3-14-1 Shinjuku, Tokyo',
            'amenities' => ['wifi', 'restaurant', 'gym', 'ac'],
            'rating' => 4.4,
            'review_count' => 423
        ],
        [
            'id' => 5,
            'city_id' => 3,
            'name' => 'Traditional Ryokan Tokyo',
            'star_rating' => 4,
            'price_per_night' => 280,
            'image_url' => 'assets/images/hotels/hotel5.jpg',
            'description' => 'Authentic Japanese inn with tatami rooms and onsen.',
            'address' => '2-8-5 Asakusa, Tokyo',
            'amenities' => ['wifi', 'spa', 'breakfast'],
            'rating' => 4.7,
            'review_count' => 287
        ],
        // Rome hotels
        [
            'id' => 6,
            'city_id' => 6,
            'name' => 'Hotel Roma Centro',
            'star_rating' => 3,
            'price_per_night' => 120,
            'image_url' => 'assets/images/hotels/hotel6.jpg',
            'description' => 'Comfortable hotel walking distance from Colosseum.',
            'address' => 'Via del Corso 126, Roma',
            'amenities' => ['wifi', 'breakfast', 'ac'],
            'rating' => 4.1,
            'review_count' => 245
        ],
        [
            'id' => 7,
            'city_id' => 6,
            'name' => 'Palazzo Luxury Hotel',
            'star_rating' => 5,
            'price_per_night' => 420,
            'image_url' => 'assets/images/hotels/hotel7.jpg',
            'description' => 'Historic palace converted into an exclusive luxury hotel.',
            'address' => 'Piazza Navona 14, Roma',
            'amenities' => ['wifi', 'pool', 'spa', 'restaurant', 'bar', 'gym'],
            'rating' => 4.9,
            'review_count' => 189
        ],
        // Bangkok hotels
        [
            'id' => 8,
            'city_id' => 11,
            'name' => 'Bangkok River View',
            'star_rating' => 4,
            'price_per_night' => 95,
            'image_url' => 'assets/images/hotels/hotel8.jpg',
            'description' => 'Beautiful hotel overlooking the Chao Phraya River.',
            'address' => '123 Charoen Krung Road, Bangkok',
            'amenities' => ['wifi', 'pool', 'restaurant', 'spa', 'gym'],
            'rating' => 4.3,
            'review_count' => 567
        ],
        [
            'id' => 9,
            'city_id' => 11,
            'name' => 'Sukhumvit Budget Stay',
            'star_rating' => 2,
            'price_per_night' => 35,
            'image_url' => 'assets/images/hotels/hotel9.jpg',
            'description' => 'Simple, clean rooms in the heart of Sukhumvit.',
            'address' => 'Soi 11 Sukhumvit, Bangkok',
            'amenities' => ['wifi', 'ac'],
            'rating' => 3.6,
            'review_count' => 312
        ],
        // New York hotels
        [
            'id' => 10,
            'city_id' => 9,
            'name' => 'Manhattan Midtown Hotel',
            'star_rating' => 4,
            'price_per_night' => 280,
            'image_url' => 'assets/images/hotels/hotel10.jpg',
            'description' => 'Modern hotel in the heart of Manhattan.',
            'address' => '234 W 48th St, New York',
            'amenities' => ['wifi', 'gym', 'restaurant', 'bar'],
            'rating' => 4.2,
            'review_count' => 678
        ]
    ];
}
