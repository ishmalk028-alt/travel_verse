<?php
/**
 * GET /php/api/hotels.php
 * Returns hotels with optional filtering and sorting
 *
 * Query params:
 *   cityId    (int, optional)
 *   minPrice  (int, optional)
 *   maxPrice  (int, optional)
 *   stars     (int, optional)
 *   sortBy    (string: price_asc|price_desc|rating|name)
 */
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validation.php';

handleOptions();

try {
    $pdo    = getDBConnection();
    $sql    = 'SELECT * FROM hotels';
    $params = [];
    $where  = [];

    if ($cityId = sanitizeId(getParam('cityId'))) {
        $where[]  = 'city_id = ?';
        $params[] = $cityId;
    }
    if ($minPrice = getParam('minPrice')) {
        $where[]  = 'price_per_night >= ?';
        $params[] = (int)$minPrice;
    }
    if ($maxPrice = getParam('maxPrice')) {
        $where[]  = 'price_per_night <= ?';
        $params[] = (int)$maxPrice;
    }
    if ($stars = getParam('stars')) {
        $where[]  = 'star_rating = ?';
        $params[] = (int)$stars;
    }

    if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);

    $sortBy = validateSortBy(getParam('sortBy', 'name'));
    $orderMap = [
        'price_asc'  => 'price_per_night ASC',
        'price_desc' => 'price_per_night DESC',
        'rating'     => 'rating DESC',
        'name'       => 'name ASC',
    ];
    $sql .= ' ORDER BY ' . $orderMap[$sortBy];

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $rows = array_map(function($row) {
        $row['cityId']       = (int)($row['city_id']       ?? $row['cityId']);
        $row['starRating']   = (int)($row['star_rating']   ?? $row['starRating']);
        $row['pricePerNight']= (float)($row['price_per_night'] ?? $row['pricePerNight']);
        $row['reviewCount']  = (int)($row['review_count']  ?? $row['reviewCount']);
        $row['amenities']    = json_decode($row['amenities'] ?? '[]', true);
        return $row;
    }, $rows);

    sendSuccess($rows);
} catch (PDOException $e) {
    // Fallback
    $json = file_get_contents(__DIR__ . '/../../data/hotels.json');
    $data = json_decode($json, true) ?? [];

    $cityId   = sanitizeId(getParam('cityId'));
    $minPrice = getParam('minPrice');
    $maxPrice = getParam('maxPrice');
    $stars    = getParam('stars');
    $sortBy   = getParam('sortBy', '');

    if ($cityId)   $data = array_values(array_filter($data, fn($h) => $h['cityId'] === $cityId));
    if ($minPrice) $data = array_values(array_filter($data, fn($h) => $h['pricePerNight'] >= (int)$minPrice));
    if ($maxPrice) $data = array_values(array_filter($data, fn($h) => $h['pricePerNight'] <= (int)$maxPrice));
    if ($stars)    $data = array_values(array_filter($data, fn($h) => $h['starRating'] === (int)$stars));

    if ($sortBy === 'price_asc')  usort($data, fn($a,$b) => $a['pricePerNight'] <=> $b['pricePerNight']);
    if ($sortBy === 'price_desc') usort($data, fn($a,$b) => $b['pricePerNight'] <=> $a['pricePerNight']);
    if ($sortBy === 'rating')     usort($data, fn($a,$b) => $b['rating'] <=> $a['rating']);

    sendSuccess($data);
} catch (Throwable $e) {
    sendError('Failed to load hotels: ' . $e->getMessage(), 500);
}
