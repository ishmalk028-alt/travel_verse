<?php
/**
 * Application Constants
 * Trip Planner Website
 */

// App Info
define('APP_NAME', 'TripPlanner');
define('APP_VERSION', '1.0.0');
define('APP_ENV', 'development'); // development, production

// Paths
define('ROOT_PATH', dirname(dirname(__DIR__)));
define('PHP_PATH', ROOT_PATH . '/php');
define('DATA_PATH', ROOT_PATH . '/data');

// API Settings
define('API_RATE_LIMIT', 100); // requests per minute
define('API_TIMEOUT', 30); // seconds

// Default Values
define('DEFAULT_CURRENCY', 'USD');
define('DEFAULT_LANGUAGE', 'en');
define('DEFAULT_PAGE_SIZE', 20);
define('MAX_PAGE_SIZE', 100);

// Trip Limits
define('MAX_COUNTRIES_PER_TRIP', 10);
define('MAX_CITIES_PER_TRIP', 30);
define('MAX_HOTELS_PER_TRIP', 50);
define('MAX_ENTERTAINMENT_PER_TRIP', 100);

// Date Settings
define('MIN_BOOKING_ADVANCE_DAYS', 1);
define('MAX_BOOKING_ADVANCE_DAYS', 365);
define('MAX_TRIP_DURATION_DAYS', 90);

// File Upload Settings
define('MAX_UPLOAD_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_IMAGE_TYPES', ['jpg', 'jpeg', 'png', 'gif', 'webp']);

// Session Settings
define('SESSION_LIFETIME', 7200); // 2 hours
define('SESSION_NAME', 'tripplanner_session');

// Security
define('HASH_ALGO', PASSWORD_BCRYPT);
define('HASH_COST', 12);

// Trip Status Constants
define('TRIP_STATUS_DRAFT', 'draft');
define('TRIP_STATUS_CONFIRMED', 'confirmed');
define('TRIP_STATUS_COMPLETED', 'completed');
define('TRIP_STATUS_CANCELLED', 'cancelled');

// HTTP Status Codes
define('HTTP_OK', 200);
define('HTTP_CREATED', 201);
define('HTTP_NO_CONTENT', 204);
define('HTTP_BAD_REQUEST', 400);
define('HTTP_UNAUTHORIZED', 401);
define('HTTP_FORBIDDEN', 403);
define('HTTP_NOT_FOUND', 404);
define('HTTP_METHOD_NOT_ALLOWED', 405);
define('HTTP_CONFLICT', 409);
define('HTTP_UNPROCESSABLE_ENTITY', 422);
define('HTTP_INTERNAL_ERROR', 500);

// Error Messages
define('ERROR_MESSAGES', [
    'generic' => 'An error occurred. Please try again.',
    'not_found' => 'Resource not found.',
    'validation' => 'Validation failed.',
    'unauthorized' => 'Unauthorized access.',
    'forbidden' => 'Access forbidden.',
    'method_not_allowed' => 'Method not allowed.',
    'server_error' => 'Internal server error.'
]);
