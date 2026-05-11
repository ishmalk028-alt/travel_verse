<?php
/**
 * Entertainment API Endpoint
 *
 * GET /php/api/entertainment.php
 * GET /php/api/entertainment.php?id=1
 * GET /php/api/entertainment.php?city_id=1
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
$type = getInput('type', null, 'GET');
$popular = getBooleanInput('popular');
$maxPrice = getInput('max_price', null, 'GET');

$select = 'SELECT e.id, e.city_id, e.name, e.type, e.price, e.duration,
                  e.description, e.image_url, e.rating, e.review_count,
                  e.is_popular, e.requires_booking, c.name AS city_name
           FROM entertainment e
           INNER JOIN cities c ON c.id = e.city_id';

if ($id !== null) {
    if (!validatePositiveInteger($id)) {
        validationErrorResponse(['id' => 'Entertainment ID must be a positive integer']);
    }

    $item = $db->fetchOne($select . ' WHERE e.id = :id', ['id' => (int) $id]);

    if (!$item) {
        notFoundResponse('Entertainment not found');
    }

    successResponse([
        'entertainment' => normalizeApiRow(
            $item,
            ['is_popular', 'requires_booking'],
            [],
            ['price', 'rating'],
            ['id', 'city_id', 'review_count']
        )
    ]);
}

$conditions = [];
$params = [];

if ($cityId !== null) {
    if (!validatePositiveInteger($cityId)) {
        validationErrorResponse(['city_id' => 'City ID must be a positive integer']);
    }

    $conditions[] = 'e.city_id = :city_id';
    $params['city_id'] = (int) $cityId;
}

if ($type !== null && trim($type) !== '') {
    $conditions[] = 'LOWER(e.type) = LOWER(:type)';
    $params['type'] = trim($type);
}

if ($popular !== null) {
    $conditions[] = 'e.is_popular = :popular';
    $params['popular'] = $popular ? 1 : 0;
}

if ($maxPrice !== null && $maxPrice !== '') {
    if (!validateNumeric($maxPrice, 0)) {
        validationErrorResponse(['max_price' => 'Maximum price must be a positive number']);
    }

    $conditions[] = 'e.price <= :max_price';
    $params['max_price'] = (float) $maxPrice;
}

$where = $conditions ? ' WHERE ' . implode(' AND ', $conditions) : '';
$entertainment = $db->fetchAll($select . $where . ' ORDER BY e.is_popular DESC, e.rating DESC, e.name', $params);

successResponse([
    'entertainment' => normalizeApiRows(
        $entertainment,
        ['is_popular', 'requires_booking'],
        [],
        ['price', 'rating'],
        ['id', 'city_id', 'review_count']
    )
]);
