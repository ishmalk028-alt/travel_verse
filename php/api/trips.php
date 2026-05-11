<?php
/**
 * Trips API Endpoint
 *
 * POST /php/api/trips.php - Save completed booking
 * GET /php/api/trips.php?id=1 - Get booking by numeric ID
 * GET /php/api/trips.php?booking_code=TP-000000 - Get booking by code
 */

require_once __DIR__ . '/../config/constants.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validation.php';
require_once __DIR__ . '/../helpers/api.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200);
    exit;
}

$db = getDatabaseOrFail();
ensureTripsTable($db);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = getInput('id', null, 'GET');
    $bookingCode = getInput('booking_code', null, 'GET');

    if ($id === null && $bookingCode === null) {
        validationErrorResponse(['trip' => 'Provide id or booking_code']);
    }

    if ($id !== null) {
        if (!validatePositiveInteger($id)) {
            validationErrorResponse(['id' => 'Trip ID must be a positive integer']);
        }

        $trip = $db->fetchOne('SELECT * FROM trips WHERE id = :id', ['id' => (int) $id]);
    } else {
        $trip = $db->fetchOne('SELECT * FROM trips WHERE booking_code = :booking_code', [
            'booking_code' => trim($bookingCode)
        ]);
    }

    if (!$trip) {
        notFoundResponse('Trip booking not found');
    }

    successResponse(['trip' => formatTripRow($trip)]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    methodNotAllowedResponse();
}

$input = getJsonInput();
$contact = isset($input['contact']) && is_array($input['contact']) ? $input['contact'] : [];
$totals = isset($input['totals']) && is_array($input['totals']) ? $input['totals'] : [];
$dates = isset($input['dates']) && is_array($input['dates']) ? $input['dates'] : [];
$countries = isset($input['countries']) && is_array($input['countries']) ? $input['countries'] : [];
$cities = isset($input['cities']) && is_array($input['cities']) ? $input['cities'] : [];
$hotels = isset($input['hotels']) && is_array($input['hotels']) ? $input['hotels'] : [];
$entertainment = isset($input['entertainment']) && is_array($input['entertainment']) ? $input['entertainment'] : [];

$firstName = trim($contact['firstName'] ?? $input['firstName'] ?? '');
$lastName = trim($contact['lastName'] ?? $input['lastName'] ?? '');
$email = sanitizeEmail($contact['email'] ?? $input['email'] ?? '');
$phone = trim($contact['phone'] ?? $input['phone'] ?? '');
$paymentMethod = trim($input['paymentMethod'] ?? $input['payment_method'] ?? 'card');

$errors = [];
if ($firstName === '') {
    $errors['firstName'] = 'First name is required';
}
if ($lastName === '') {
    $errors['lastName'] = 'Last name is required';
}
if ($email === '' || !validateEmail($email)) {
    $errors['email'] = 'A valid email address is required';
}
if ($phone === '') {
    $errors['phone'] = 'Phone number is required';
}
if (!in_array($paymentMethod, ['card', 'paypal'], true)) {
    $errors['paymentMethod'] = 'Payment method must be card or paypal';
}

$startDate = normalizeSqlDate($dates['startDate'] ?? $input['startDate'] ?? null);
$endDate = normalizeSqlDate($dates['endDate'] ?? $input['endDate'] ?? null);
if ($startDate !== null && $endDate !== null && $endDate < $startDate) {
    $errors['date_range'] = 'End date must be after start date';
}

if (empty($countries)) {
    $errors['countries'] = 'At least one country must be selected';
}
if (empty($cities)) {
    $errors['cities'] = 'At least one city must be selected';
}
if (empty($hotels)) {
    $errors['hotels'] = 'Select a hotel for each city before checkout';
}

if ($errors) {
    validationErrorResponse($errors);
}

$hotelTotal = array_reduce($hotels, function ($sum, $hotel) {
    $total = $hotel['total'] ?? null;
    if ($total === null) {
        $total = (float) ($hotel['pricePerNight'] ?? $hotel['price_per_night'] ?? 0)
            * (int) ($hotel['nights'] ?? 1);
    }

    return $sum + (float) $total;
}, 0.0);

$activityTotal = array_reduce($entertainment, function ($sum, $item) {
    return $sum + (float) ($item['price'] ?? 0);
}, 0.0);

$subtotal = $hotelTotal + $activityTotal;
$serviceFee = isset($totals['serviceFee']) && is_numeric($totals['serviceFee'])
    ? (float) $totals['serviceFee']
    : round($subtotal * 0.05);
$totalCost = $subtotal + $serviceFee;
$bookingCode = generateBookingCode();

try {
    $tripId = $db->insert(
        'INSERT INTO trips (
            booking_code, first_name, last_name, email, phone, payment_method,
            start_date, end_date, countries_json, cities_json, hotels_json,
            entertainment_json, subtotal, service_fee, total_cost, status
        ) VALUES (
            :booking_code, :first_name, :last_name, :email, :phone, :payment_method,
            :start_date, :end_date, :countries_json, :cities_json, :hotels_json,
            :entertainment_json, :subtotal, :service_fee, :total_cost, :status
        )',
        [
            'booking_code' => $bookingCode,
            'first_name' => sanitizeString($firstName),
            'last_name' => sanitizeString($lastName),
            'email' => $email,
            'phone' => sanitizeString($phone),
            'payment_method' => $paymentMethod,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'countries_json' => jsonEncodeForDatabase($countries),
            'cities_json' => jsonEncodeForDatabase($cities),
            'hotels_json' => jsonEncodeForDatabase($hotels),
            'entertainment_json' => jsonEncodeForDatabase($entertainment),
            'subtotal' => $subtotal,
            'service_fee' => $serviceFee,
            'total_cost' => $totalCost,
            'status' => TRIP_STATUS_CONFIRMED
        ]
    );
} catch (Exception $e) {
    error_log('Trip insert failed: ' . $e->getMessage());
    serverErrorResponse('Could not save the trip booking. Please check the MySQL trips table.');
}

createdResponse([
    'booking' => [
        'id' => (int) $tripId,
        'bookingCode' => $bookingCode,
        'subtotal' => $subtotal,
        'serviceFee' => $serviceFee,
        'totalCost' => $totalCost,
        'status' => TRIP_STATUS_CONFIRMED
    ]
], 'Booking confirmed');

function normalizeSqlDate($value) {
    if ($value === null || trim((string) $value) === '') {
        return null;
    }

    try {
        return (new DateTime($value))->format('Y-m-d');
    } catch (Exception $e) {
        return null;
    }
}

function ensureTripsTable($db) {
    $db->query(
        "CREATE TABLE IF NOT EXISTS trips (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            booking_code VARCHAR(24) NOT NULL,
            first_name VARCHAR(80) NOT NULL,
            last_name VARCHAR(80) NOT NULL,
            email VARCHAR(160) NOT NULL,
            phone VARCHAR(40) NOT NULL,
            payment_method VARCHAR(40) NOT NULL DEFAULT 'card',
            start_date DATE NULL,
            end_date DATE NULL,
            countries_json LONGTEXT NOT NULL,
            cities_json LONGTEXT NOT NULL,
            hotels_json LONGTEXT NOT NULL,
            entertainment_json LONGTEXT NOT NULL,
            subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
            service_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
            total_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
            status VARCHAR(30) NOT NULL DEFAULT 'confirmed',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY uq_trips_booking_code (booking_code),
            KEY idx_trips_email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
}

function generateBookingCode() {
    return 'TP-' . date('ymd') . '-' . strtoupper(bin2hex(random_bytes(3)));
}

function formatTripRow($trip) {
    $trip = normalizeApiRow(
        $trip,
        [],
        ['countries_json', 'cities_json', 'hotels_json', 'entertainment_json'],
        ['subtotal', 'service_fee', 'total_cost'],
        ['id']
    );

    $trip['bookingCode'] = $trip['booking_code'];
    $trip['firstName'] = $trip['first_name'];
    $trip['lastName'] = $trip['last_name'];
    $trip['paymentMethod'] = $trip['payment_method'];
    $trip['startDate'] = $trip['start_date'];
    $trip['endDate'] = $trip['end_date'];
    $trip['countries'] = $trip['countries_json'];
    $trip['cities'] = $trip['cities_json'];
    $trip['hotels'] = $trip['hotels_json'];
    $trip['entertainment'] = $trip['entertainment_json'];
    $trip['serviceFee'] = $trip['service_fee'];
    $trip['totalCost'] = $trip['total_cost'];

    unset(
        $trip['booking_code'],
        $trip['first_name'],
        $trip['last_name'],
        $trip['payment_method'],
        $trip['start_date'],
        $trip['end_date'],
        $trip['countries_json'],
        $trip['cities_json'],
        $trip['hotels_json'],
        $trip['entertainment_json'],
        $trip['service_fee'],
        $trip['total_cost']
    );

    return $trip;
}
