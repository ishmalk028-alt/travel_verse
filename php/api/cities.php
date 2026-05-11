<?php
/**
 * GET /php/api/cities.php
 * Returns cities, optionally filtered by countryId
 *
 * Query params:
 *   countryId (int, optional)
 *   search    (string, optional)
 */
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validation.php';

handleOptions();

try {
    $pdo = getDBConnection();

    $sql    = 'SELECT * FROM cities';
    $params = [];
    $where  = [];

    if ($countryId = sanitizeId(getParam('countryId'))) {
        $where[]  = 'country_id = ?';
        $params[] = $countryId;
    }

    if ($search = getParam('search')) {
        $where[]  = '(name LIKE ? OR description LIKE ?)';
        $params[] = sanitizeSearch($search);
        $params[] = sanitizeSearch($search);
    }

    if ($where) {
        $sql .= ' WHERE ' . implode(' AND ', $where);
    }

    $sql .= ' ORDER BY name ASC';

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $rows = array_map(function($row) {
        $row['countryId']  = (int)($row['country_id'] ?? $row['countryId']);
        $row['highlights'] = json_decode($row['highlights'] ?? '[]', true);
        return $row;
    }, $rows);

    sendSuccess($rows);
} catch (PDOException $e) {
    // Fallback to local JSON
    $json = file_get_contents(__DIR__ . '/../../data/cities.json');
    $data = json_decode($json, true) ?? [];

    $countryId = sanitizeId(getParam('countryId'));
    if ($countryId) {
        $data = array_values(array_filter($data, fn($c) => $c['countryId'] === $countryId));
    }

    sendSuccess($data);
} catch (Throwable $e) {
    sendError('Failed to load cities: ' . $e->getMessage(), 500);
}
