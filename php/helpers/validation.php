<?php
/**
 * Server-side Validation Helpers
 */

/**
 * Validate and sanitize date string (YYYY-MM-DD)
 */
function validateDate(string $dateStr): bool {
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateStr)) return false;
    [$y, $m, $d] = explode('-', $dateStr);
    return checkdate((int)$m, (int)$d, (int)$y);
}

/**
 * Sanitize integer ID parameter
 */
function sanitizeId(mixed $value): ?int {
    $int = filter_var($value, FILTER_VALIDATE_INT);
    return ($int !== false && $int > 0) ? (int)$int : null;
}

/**
 * Sanitize string for SQL LIKE queries
 */
function sanitizeSearch(string $value): string {
    return '%' . str_replace(['%', '_'], ['\%', '\_'], trim($value)) . '%';
}

/**
 * Validate sort_by parameter
 */
function validateSortBy(string $value): string {
    $allowed = ['price_asc', 'price_desc', 'rating', 'name'];
    return in_array($value, $allowed, true) ? $value : 'name';
}

/**
 * Validate email
 */
function validateEmail(string $email): bool {
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Sanitize output for JSON (strip potential XSS)
 */
function sanitizeOutput(array $data): array {
    return array_map(fn($v) => is_string($v) ? htmlspecialchars($v, ENT_QUOTES, 'UTF-8') : $v, $data);
}
