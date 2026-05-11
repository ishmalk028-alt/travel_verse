<?php
/**
 * Hotels API Endpoint
 *
 * GET /php/api/hotels.php
 * GET /php/api/hotels.php?id=1
 * GET /php/api/hotels.php?city_id=1
 */

require_once __DIR__ . '/../config/constants.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validation.php';
require_once __DIR__ . '/../helpers/api.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    methodNotAllowedResponse();
}

$db = getDatabaseOrFail();

$id = getInput('id', null, 'GET');
$cityId = getInput('city_id', null, 'GET');
$minPrice = getInput('min_price', null, 'GET');
$maxPrice = getInput('max_price', null, 'GET');
$stars = getInput('stars', null, 'GET');
$sortBy = getInput('sort_by', 'price', 'GET');

$select = 'SELECT h.id, h.city_id, h.name, h.star_rating, h.price_per_night,
                  h.image_url, h.description, h.address, h.amenities,
                  h.rating, h.review_count, c.name AS city_name
           FROM hotels h
           INNER JOIN cities c ON c.id = h.city_id';

if ($id !== null) {
    if (!validatePositiveInteger($id)) {
        validationErrorResponse(['id' => 'Hotel ID must be a positive integer']);
    }

    $hotel = $db->fetchOne($select . ' WHERE h.id = :id', ['id' => (int) $id]);

    if (!$hotel) {
        notFoundResponse('Hotel not found');
    }

    successResponse([
        'hotel' => normalizeApiRow(
            $hotel,
            [],
            ['amenities'],
            ['price_per_night', 'rating'],
            ['id', 'city_id', 'star_rating', 'review_count']
        )
    ]);
}

$conditions = [];
$params = [];

if ($cityId !== null) {
    if (!validatePositiveInteger($cityId)) {
        validationErrorResponse(['city_id' => 'City ID must be a positive integer']);
    }

    $conditions[] = 'h.city_id = :city_id';
    $params['city_id'] = (int) $cityId;
}

if ($minPrice !== null && $minPrice !== '') {
    if (!validateNumeric($minPrice, 0)) {
        validationErrorResponse(['min_price' => 'Minimum price must be a positive number']);
    }

    $conditions[] = 'h.price_per_night >= :min_price';
    $params['min_price'] = (float) $minPrice;
}

if ($maxPrice !== null && $maxPrice !== '') {
    if (!validateNumeric($maxPrice, 0)) {
        validationErrorResponse(['max_price' => 'Maximum price must be a positive number']);
    }

    $conditions[] = 'h.price_per_night <= :max_price';
    $params['max_price'] = (float) $maxPrice;
}

if ($stars !== null && $stars !== '') {
    if (!validateInteger($stars) || (int) $stars < 1 || (int) $stars > 5) {
        validationErrorResponse(['stars' => 'Stars must be between 1 and 5']);
    }

    $conditions[] = 'h.star_rating = :stars';
    $params['stars'] = (int) $stars;
}

$sortSql = 'h.price_per_night ASC';
switch ($sortBy) {
    case 'price_desc':
        $sortSql = 'h.price_per_night DESC';
        break;
    case 'rating':
        $sortSql = 'h.rating DESC, h.review_count DESC';
        break;
    case 'stars':
        $sortSql = 'h.star_rating DESC, h.rating DESC';
        break;
    case 'price':
    case 'price_asc':
    default:
        $sortSql = 'h.price_per_night ASC';
        break;
}

$where = $conditions ? ' WHERE ' . implode(' AND ', $conditions) : '';
$hotels = $db->fetchAll($select . $where . ' ORDER BY ' . $sortSql . ', h.name', $params);

successResponse([
    'hotels' => normalizeApiRows(
        $hotels,
        [],
        ['amenities'],
        ['price_per_night', 'rating'],
        ['id', 'city_id', 'star_rating', 'review_count']
    )
]);
