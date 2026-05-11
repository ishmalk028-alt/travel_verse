<?php
/**
 * GET /php/api/countries.php
 * Returns list of countries (optionally filtered)
 */
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validation.php';

handleOptions();

try {
    $pdo = getDBConnection();

    $sql    = 'SELECT * FROM countries';
    $params = [];

    // Optional search
    if ($search = getParam('search')) {
        $sql    .= ' WHERE name LIKE ? OR continent LIKE ?';
        $params  = [sanitizeSearch($search), sanitizeSearch($search)];
    }

    // Optional continent filter
    if ($continent = getParam('continent')) {
        $sql    .= (empty($params) ? ' WHERE' : ' AND') . ' continent = ?';
        $params[] = $continent;
    }

    $sql .= ' ORDER BY popular DESC, name ASC';

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    // Decode JSON fields
    $rows = array_map(function($row) {
        $row['highlights'] = json_decode($row['highlights'] ?? '[]', true);
        return $row;
    }, $rows);

    sendSuccess($rows);
} catch (PDOException $e) {
    // Fallback: serve from local JSON
    $json = file_get_contents(__DIR__ . '/../../data/countries.json');
    $data = json_decode($json, true);
    sendSuccess($data ?? []);
} catch (Throwable $e) {
    sendError('Failed to load countries: ' . $e->getMessage(), 500);
}
