<?php
/**
 * PHP Application Constants
 */

define('API_VERSION',    '1.0.0');
define('SERVICE_FEE',    0.05);        // 5%
define('MAX_COUNTRIES',  10);
define('MAX_CITIES',     20);
define('DEFAULT_LIMIT',  100);

// Allowed origins for CORS (adjust in production)
define('ALLOWED_ORIGINS', ['http://localhost', 'http://127.0.0.1', 'http://localhost:5500']);

// Content type
define('JSON_CONTENT_TYPE', 'application/json; charset=utf-8');
