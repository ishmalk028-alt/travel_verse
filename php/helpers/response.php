<?php
/**
 * JSON Response Helpers
 */

/**
 * Send a successful JSON response
 */
function sendSuccess(mixed $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    echo json_encode([
        'success' => true,
        'data'    => $data,
        'count'   => is_array($data) ? count($data) : null,
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/**
 * Send an error JSON response
 */
function sendError(string $message, int $status = 400, array $details = []): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    $payload = ['success' => false, 'message' => $message];
    if ($details) $payload['details'] = $details;
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Handle preflight OPTIONS requests
 */
function handleOptions(): void {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        http_response_code(204);
        exit;
    }
}

/**
 * Get query parameter with default
 */
function getParam(string $key, mixed $default = null): mixed {
    return isset($_GET[$key]) && $_GET[$key] !== '' ? $_GET[$key] : $default;
}
