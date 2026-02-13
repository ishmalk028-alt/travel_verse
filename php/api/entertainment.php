<?php
/**
 * Entertainment API Endpoint
 * Trip Planner Website
 * 
 * GET /api/entertainment.php - Get all entertainment
 * GET /api/entertainment.php?id=1 - Get single entertainment
 * GET /api/entertainment.php?city_id=1 - Get entertainment by city
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
$type = getInput('type');
$popular = getInput('popular');
$maxPrice = getInput('max_price');

// Load mock data
$entertainmentFile = __DIR__ . '/../../data/entertainment.json';

if (!file_exists($entertainmentFile)) {
    $entertainment = getDefaultEntertainment();
} else {
    $entertainment = json_decode(file_get_contents($entertainmentFile), true);
    if ($entertainment === null) {
        $entertainment = getDefaultEntertainment();
    }
}

// Get single entertainment
if ($id !== null) {
    $found = null;
    foreach ($entertainment as $item) {
        if ($item['id'] == $id) {
            $found = $item;
            break;
        }
    }
    
    if ($found) {
        successResponse(['entertainment' => $found]);
    } else {
        notFoundResponse('Entertainment not found');
    }
}

// Filter by city
if ($cityId !== null) {
    $entertainment = array_filter($entertainment, function($item) use ($cityId) {
        return $item['city_id'] == $cityId;
    });
}

// Filter by type
if ($type !== null) {
    $entertainment = array_filter($entertainment, function($item) use ($type) {
        return strtolower($item['type']) === strtolower($type);
    });
}

// Filter by popular
if ($popular !== null) {
    $isPopular = filter_var($popular, FILTER_VALIDATE_BOOLEAN);
    $entertainment = array_filter($entertainment, function($item) use ($isPopular) {
        return $item['is_popular'] === $isPopular;
    });
}

// Filter by max price
if ($maxPrice !== null) {
    $entertainment = array_filter($entertainment, function($item) use ($maxPrice) {
        return $item['price'] <= (float)$maxPrice;
    });
}

// Return entertainment
successResponse(['entertainment' => array_values($entertainment)]);

/**
 * Get default entertainment data
 * @return array
 */
function getDefaultEntertainment() {
    return [
        // Paris entertainment
        [
            'id' => 1,
            'city_id' => 1,
            'name' => 'Eiffel Tower Visit',
            'type' => 'attraction',
            'price' => 26,
            'duration' => '2-3 hours',
            'description' => 'Visit the iconic Eiffel Tower with access to the top floor.',
            'image_url' => 'assets/images/entertainment/eiffel.jpg',
            'rating' => 4.7,
            'review_count' => 12453,
            'is_popular' => true,
            'requires_booking' => true
        ],
        [
            'id' => 2,
            'city_id' => 1,
            'name' => 'Louvre Museum Tour',
            'type' => 'museum',
            'price' => 17,
            'duration' => '3-4 hours',
            'description' => 'Explore the world\'s largest art museum and see the Mona Lisa.',
            'image_url' => 'assets/images/entertainment/louvre.jpg',
            'rating' => 4.8,
            'review_count' => 8932,
            'is_popular' => true,
            'requires_booking' => true
        ],
        [
            'id' => 3,
            'city_id' => 1,
            'name' => 'Seine River Cruise',
            'type' => 'tour',
            'price' => 15,
            'duration' => '1 hour',
            'description' => 'Scenic boat cruise along the Seine River.',
            'image_url' => 'assets/images/entertainment/seine.jpg',
            'rating' => 4.5,
            'review_count' => 3421,
            'is_popular' => true,
            'requires_booking' => false
        ],
        // Tokyo entertainment
        [
            'id' => 4,
            'city_id' => 3,
            'name' => 'Tokyo Skytree',
            'type' => 'attraction',
            'price' => 18,
            'duration' => '1-2 hours',
            'description' => 'Visit the tallest tower in Japan with panoramic views.',
            'image_url' => 'assets/images/entertainment/skytree.jpg',
            'rating' => 4.6,
            'review_count' => 5647,
            'is_popular' => true,
            'requires_booking' => false
        ],
        [
            'id' => 5,
            'city_id' => 3,
            'name' => 'Senso-ji Temple',
            'type' => 'attraction',
            'price' => 0,
            'duration' => '1-2 hours',
            'description' => 'Tokyo\'s oldest temple with beautiful grounds and shopping street.',
            'image_url' => 'assets/images/entertainment/sensoji.jpg',
            'rating' => 4.7,
            'review_count' => 7823,
            'is_popular' => true,
            'requires_booking' => false
        ],
        [
            'id' => 6,
            'city_id' => 3,
            'name' => 'Robot Restaurant Show',
            'type' => 'show',
            'price' => 80,
            'duration' => '1.5 hours',
            'description' => 'Wild and colorful robot and dancer performance show.',
            'image_url' => 'assets/images/entertainment/robot.jpg',
            'rating' => 4.3,
            'review_count' => 2156,
            'is_popular' => true,
            'requires_booking' => true
        ],
        // Rome entertainment
        [
            'id' => 7,
            'city_id' => 6,
            'name' => 'Colosseum Tour',
            'type' => 'attraction',
            'price' => 16,
            'duration' => '2-3 hours',
            'description' => 'Explore the ancient Roman amphitheater with skip-the-line access.',
            'image_url' => 'assets/images/entertainment/colosseum.jpg',
            'rating' => 4.8,
            'review_count' => 9876,
            'is_popular' => true,
            'requires_booking' => true
        ],
        [
            'id' => 8,
            'city_id' => 6,
            'name' => 'Vatican Museums',
            'type' => 'museum',
            'price' => 20,
            'duration' => '3-4 hours',
            'description' => 'Visit the Vatican Museums and the stunning Sistine Chapel.',
            'image_url' => 'assets/images/entertainment/vatican.jpg',
            'rating' => 4.9,
            'review_count' => 11234,
            'is_popular' => true,
            'requires_booking' => true
        ],
        // Bangkok entertainment
        [
            'id' => 9,
            'city_id' => 11,
            'name' => 'Grand Palace',
            'type' => 'attraction',
            'price' => 15,
            'duration' => '2-3 hours',
            'description' => 'Thailand\'s most sacred and spectacular royal complex.',
            'image_url' => 'assets/images/entertainment/grandpalace.jpg',
            'rating' => 4.6,
            'review_count' => 6543,
            'is_popular' => true,
            'requires_booking' => false
        ],
        [
            'id' => 10,
            'city_id' => 11,
            'name' => 'Floating Market Tour',
            'type' => 'tour',
            'price' => 35,
            'duration' => '4-5 hours',
            'description' => 'Experience authentic Thai floating markets by boat.',
            'image_url' => 'assets/images/entertainment/floating.jpg',
            'rating' => 4.4,
            'review_count' => 3254,
            'is_popular' => true,
            'requires_booking' => true
        ],
        [
            'id' => 11,
            'city_id' => 11,
            'name' => 'Thai Cooking Class',
            'type' => 'adventure',
            'price' => 45,
            'duration' => '4 hours',
            'description' => 'Learn to cook authentic Thai dishes with local chefs.',
            'image_url' => 'assets/images/entertainment/cooking.jpg',
            'rating' => 4.8,
            'review_count' => 1876,
            'is_popular' => true,
            'requires_booking' => true
        ]
    ];
}
