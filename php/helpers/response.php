<?php
/**
 * Response Helper
 * Trip Planner Website
 */

/**
 * Send JSON response
 * @param mixed $data
 * @param int $statusCode
 * @param array $headers
 */
function jsonResponse($data, $statusCode = 200, $headers = []) {
    http_response_code($statusCode);
    
    // Set default headers
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    // Set additional headers
    foreach ($headers as $key => $value) {
        header("$key: $value");
    }
    
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/**
 * Send success response
 * @param mixed $data
 * @param string $message
 * @param int $statusCode
 */
function successResponse($data = null, $message = 'Success', $statusCode = 200) {
    $response = [
        'success' => true,
        'message' => $message
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    jsonResponse($response, $statusCode);
}

/**
 * Send error response
 * @param string $message
 * @param int $statusCode
 * @param array $errors
 */
function errorResponse($message = 'An error occurred', $statusCode = 400, $errors = []) {
    $response = [
        'success' => false,
        'message' => $message
    ];
    
    if (!empty($errors)) {
        $response['errors'] = $errors;
    }
    
    jsonResponse($response, $statusCode);
}

/**
 * Send paginated response
 * @param array $data
 * @param int $total
 * @param int $page
 * @param int $perPage
 */
function paginatedResponse($data, $total, $page = 1, $perPage = 20) {
    $totalPages = ceil($total / $perPage);
    
    jsonResponse([
        'success' => true,
        'data' => $data,
        'pagination' => [
            'total' => $total,
            'per_page' => $perPage,
            'current_page' => $page,
            'total_pages' => $totalPages,
            'has_more' => $page < $totalPages
        ]
    ]);
}

/**
 * Send created response
 * @param mixed $data
 * @param string $message
 */
function createdResponse($data, $message = 'Created successfully') {
    successResponse($data, $message, 201);
}

/**
 * Send no content response
 */
function noContentResponse() {
    http_response_code(204);
    exit;
}

/**
 * Send not found response
 * @param string $message
 */
function notFoundResponse($message = 'Resource not found') {
    errorResponse($message, 404);
}

/**
 * Send validation error response
 * @param array $errors
 */
function validationErrorResponse($errors) {
    errorResponse('Validation failed', 422, $errors);
}

/**
 * Send unauthorized response
 * @param string $message
 */
function unauthorizedResponse($message = 'Unauthorized') {
    errorResponse($message, 401);
}

/**
 * Send forbidden response
 * @param string $message
 */
function forbiddenResponse($message = 'Forbidden') {
    errorResponse($message, 403);
}

/**
 * Send method not allowed response
 */
function methodNotAllowedResponse() {
    errorResponse('Method not allowed', 405);
}

/**
 * Send server error response
 * @param string $message
 */
function serverErrorResponse($message = 'Internal server error') {
    errorResponse($message, 500);
}
