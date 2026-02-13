<?php
/**
 * Validation Helper
 * Trip Planner Website
 */

/**
 * Validate required fields
 * @param array $data
 * @param array $fields
 * @return array Errors array
 */
function validateRequired($data, $fields) {
    $errors = [];
    
    foreach ($fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            $errors[$field] = ucfirst(str_replace('_', ' ', $field)) . ' is required';
        }
    }
    
    return $errors;
}

/**
 * Validate email
 * @param string $email
 * @return bool
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validate date format
 * @param string $date
 * @param string $format
 * @return bool
 */
function validateDate($date, $format = 'Y-m-d') {
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) === $date;
}

/**
 * Validate date is in future
 * @param string $date
 * @return bool
 */
function validateFutureDate($date) {
    $d = new DateTime($date);
    $today = new DateTime('today');
    return $d >= $today;
}

/**
 * Validate date range
 * @param string $startDate
 * @param string $endDate
 * @return bool
 */
function validateDateRange($startDate, $endDate) {
    $start = new DateTime($startDate);
    $end = new DateTime($endDate);
    return $end > $start;
}

/**
 * Validate numeric value
 * @param mixed $value
 * @param int|null $min
 * @param int|null $max
 * @return bool
 */
function validateNumeric($value, $min = null, $max = null) {
    if (!is_numeric($value)) {
        return false;
    }
    
    if ($min !== null && $value < $min) {
        return false;
    }
    
    if ($max !== null && $value > $max) {
        return false;
    }
    
    return true;
}

/**
 * Validate string length
 * @param string $value
 * @param int $min
 * @param int $max
 * @return bool
 */
function validateLength($value, $min = 0, $max = PHP_INT_MAX) {
    $length = strlen($value);
    return $length >= $min && $length <= $max;
}

/**
 * Validate array
 * @param mixed $value
 * @param int|null $minItems
 * @param int|null $maxItems
 * @return bool
 */
function validateArray($value, $minItems = null, $maxItems = null) {
    if (!is_array($value)) {
        return false;
    }
    
    $count = count($value);
    
    if ($minItems !== null && $count < $minItems) {
        return false;
    }
    
    if ($maxItems !== null && $count > $maxItems) {
        return false;
    }
    
    return true;
}

/**
 * Validate integer
 * @param mixed $value
 * @return bool
 */
function validateInteger($value) {
    return filter_var($value, FILTER_VALIDATE_INT) !== false;
}

/**
 * Validate positive integer
 * @param mixed $value
 * @return bool
 */
function validatePositiveInteger($value) {
    return validateInteger($value) && (int)$value > 0;
}

/**
 * Validate URL
 * @param string $url
 * @return bool
 */
function validateUrl($url) {
    return filter_var($url, FILTER_VALIDATE_URL) !== false;
}

/**
 * Sanitize string
 * @param string $string
 * @return string
 */
function sanitizeString($string) {
    return htmlspecialchars(trim($string), ENT_QUOTES, 'UTF-8');
}

/**
 * Sanitize email
 * @param string $email
 * @return string
 */
function sanitizeEmail($email) {
    return filter_var(trim($email), FILTER_SANITIZE_EMAIL);
}

/**
 * Sanitize integer
 * @param mixed $value
 * @return int
 */
function sanitizeInteger($value) {
    return (int) filter_var($value, FILTER_SANITIZE_NUMBER_INT);
}

/**
 * Sanitize float
 * @param mixed $value
 * @return float
 */
function sanitizeFloat($value) {
    return (float) filter_var($value, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
}

/**
 * Get validated input from request
 * @param string $key
 * @param mixed $default
 * @param string $method
 * @return mixed
 */
function getInput($key, $default = null, $method = 'REQUEST') {
    $source = $_REQUEST;
    
    switch (strtoupper($method)) {
        case 'GET':
            $source = $_GET;
            break;
        case 'POST':
            $source = $_POST;
            break;
    }
    
    return isset($source[$key]) ? $source[$key] : $default;
}

/**
 * Get JSON input from request body
 * @return array
 */
function getJsonInput() {
    $json = file_get_contents('php://input');
    return json_decode($json, true) ?: [];
}

/**
 * Validate trip data
 * @param array $data
 * @return array Errors array
 */
function validateTripData($data) {
    $errors = [];
    
    // Required fields
    $required = validateRequired($data, ['start_date', 'end_date']);
    $errors = array_merge($errors, $required);
    
    // Date validation
    if (isset($data['start_date']) && !validateDate($data['start_date'])) {
        $errors['start_date'] = 'Invalid start date format';
    }
    
    if (isset($data['end_date']) && !validateDate($data['end_date'])) {
        $errors['end_date'] = 'Invalid end date format';
    }
    
    if (empty($errors['start_date']) && empty($errors['end_date'])) {
        if (!validateDateRange($data['start_date'], $data['end_date'])) {
            $errors['date_range'] = 'End date must be after start date';
        }
    }
    
    // Countries validation
    if (isset($data['countries'])) {
        if (!validateArray($data['countries'], 1, MAX_COUNTRIES_PER_TRIP)) {
            $errors['countries'] = 'Please select between 1 and ' . MAX_COUNTRIES_PER_TRIP . ' countries';
        }
    }
    
    return $errors;
}
