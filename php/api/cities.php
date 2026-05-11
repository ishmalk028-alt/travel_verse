<?php
/**
 * Cities API Endpoint
 *
 * GET /php/api/cities.php
 * GET /php/api/cities.php?id=1
 * GET /php/api/cities.php?country_id=1
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
$countryId = getInput('country_id', null, 'GET');
$popular = getBooleanInput('popular');
$search = getInput('search', null, 'GET');

$select = 'SELECT c.id, c.country_id, c.name, c.image_url, c.description,
                  c.is_capital, c.is_popular, c.population, c.average_hotel_price,
                  co.name AS country_name
           FROM cities c
           INNER JOIN countries co ON co.id = c.country_id';

if ($id !== null) {
    if (!validatePositiveInteger($id)) {
        validationErrorResponse(['id' => 'City ID must be a positive integer']);
    }

    $city = $db->fetchOne($select . ' WHERE c.id = :id', ['id' => (int) $id]);

    if (!$city) {
        notFoundResponse('City not found');
    }

    successResponse([
        'city' => normalizeApiRow(
            $city,
            ['is_capital', 'is_popular'],
            [],
            ['average_hotel_price'],
            ['id', 'country_id', 'population']
        )
    ]);
}

$conditions = [];
$params = [];

if ($countryId !== null) {
    if (!validatePositiveInteger($countryId)) {
        validationErrorResponse(['country_id' => 'Country ID must be a positive integer']);
    }

    $conditions[] = 'c.country_id = :country_id';
    $params['country_id'] = (int) $countryId;
}

if ($popular !== null) {
    $conditions[] = 'c.is_popular = :popular';
    $params['popular'] = $popular ? 1 : 0;
}

if ($search !== null && trim($search) !== '') {
    $conditions[] = 'c.name LIKE :search';
    $params['search'] = '%' . trim($search) . '%';
}

$where = $conditions ? ' WHERE ' . implode(' AND ', $conditions) : '';
$cities = $db->fetchAll($select . $where . ' ORDER BY co.name, c.name', $params);

successResponse([
    'cities' => normalizeApiRows(
        $cities,
        ['is_capital', 'is_popular'],
        [],
        ['average_hotel_price'],
        ['id', 'country_id', 'population']
    )
]);
