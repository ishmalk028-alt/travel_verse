<?php
/**
 * GET /php/api/entertainment.php
 * Returns entertainment/activities with optional filtering
 *
 * Query params:
 *   cityId  (int, optional)
 *   type    (string, optional)
 *   sortBy  (string: price_asc|price_desc|rating|name)
 */
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validation.php';

handleOptions();

try {
    $pdo    = getDBConnection();
    $sql    = 'SELECT * FROM entertainment';
    $params = [];
    $where  = [];

    if ($cityId = sanitizeId(getParam('cityId'))) {
        $where[]  = 'city_id = ?';
        $params[] = $cityId;
    }
    if ($type = getParam('type')) {
        $where[]  = 'type = ?';
        $params[] = $type;
    }
    if ($category = getParam('category')) {
        $where[]  = 'category = ?';
        $params[] = $category;
    }

    if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);

    $sortBy = validateSortBy(getParam('sortBy', 'name'));
    $orderMap = [
        'price_asc'  => 'price ASC',
        'price_desc' => 'price DESC',
        'rating'     => 'rating DESC',
        'name'       => 'name ASC',
    ];
    $sql .= ' ORDER BY ' . $orderMap[$sortBy];

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $rows = array_map(function($row) {
        $row['cityId']   = (int)($row['city_id'] ?? $row['cityId']);
        $row['price']    = (float)$row['price'];
        $row['rating']   = (float)$row['rating'];
        return $row;
    }, $rows);

    sendSuccess($rows);
} catch (PDOException $e) {
    // Fallback
    $json = file_get_contents(__DIR__ . '/../../data/entertainment.json');
    $data = json_decode($json, true) ?? [];

    $cityId   = sanitizeId(getParam('cityId'));
    $type     = getParam('type');
    $category = getParam('category');
    $sortBy   = getParam('sortBy', '');

    if ($cityId)   $data = array_values(array_filter($data, fn($e) => $e['cityId'] === $cityId));
    if ($type)     $data = array_values(array_filter($data, fn($e) => $e['type'] === $type));
    if ($category) $data = array_values(array_filter($data, fn($e) => $e['category'] === $category));

    if ($sortBy === 'price_asc')  usort($data, fn($a,$b) => $a['price'] <=> $b['price']);
    if ($sortBy === 'price_desc') usort($data, fn($a,$b) => $b['price'] <=> $a['price']);
    if ($sortBy === 'rating')     usort($data, fn($a,$b) => $b['rating'] <=> $a['rating']);

    sendSuccess($data);
} catch (Throwable $e) {
    sendError('Failed to load entertainment: ' . $e->getMessage(), 500);
}
