<?php
/**
 * Countries API Endpoint
 *
 * GET /php/api/countries.php
 * GET /php/api/countries.php?id=1
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
$continent = getInput('continent', null, 'GET');
$popular = getBooleanInput('popular');
$search = getInput('search', null, 'GET');

if ($id !== null) {
    if (!validatePositiveInteger($id)) {
        validationErrorResponse(['id' => 'Country ID must be a positive integer']);
    }

    $country = $db->fetchOne(
        'SELECT id, name, code, continent, image_url, description, currency, language, is_popular
         FROM countries
         WHERE id = :id',
        ['id' => (int) $id]
    );

    if (!$country) {
        notFoundResponse('Country not found');
    }

    successResponse([
        'country' => normalizeApiRow($country, ['is_popular'], [], [], ['id'])
    ]);
}

$conditions = [];
$params = [];

if ($continent !== null && $continent !== '') {
    $conditions[] = 'LOWER(continent) = LOWER(:continent)';
    $params['continent'] = $continent;
}

if ($popular !== null) {
    $conditions[] = 'is_popular = :popular';
    $params['popular'] = $popular ? 1 : 0;
}

if ($search !== null && trim($search) !== '') {
    $conditions[] = 'name LIKE :search';
    $params['search'] = '%' . trim($search) . '%';
}

$where = $conditions ? ' WHERE ' . implode(' AND ', $conditions) : '';
$countries = $db->fetchAll(
    'SELECT id, name, code, continent, image_url, description, currency, language, is_popular
     FROM countries' . $where . '
     ORDER BY name',
    $params
);

successResponse([
    'countries' => normalizeApiRows($countries, ['is_popular'], [], [], ['id'])
]);
