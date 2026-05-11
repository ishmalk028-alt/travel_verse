<?php
/**
 * POST /php/api/trips.php
 * Saves a completed booking to the `trips` table.
 *
 * Expected JSON body:
 * {
 *   "first_name":        string,
 *   "last_name":         string,
 *   "email":             string,
 *   "phone":             string,
 *   "payment_method":    string,
 *   "start_date":        string (YYYY-MM-DD),
 *   "end_date":          string (YYYY-MM-DD),
 *   "countries_json":    array,
 *   "cities_json":       array,
 *   "hotels_json":       array,
 *   "entertainment_json":array,
 *   "subtotal":          number,
 *   "service_fee":       number,
 *   "total_cost":        number
 * }
 */
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validation.php';

handleOptions();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed. Use POST.', 405);
}

// Parse JSON body
$body = json_decode(file_get_contents('php://input'), true);
if (!$body || json_last_error() !== JSON_ERROR_NONE) {
    sendError('Invalid JSON body.', 400);
}

// ─── Validate required fields ──────────────────────────────
$errors = [];

$firstName     = trim($body['first_name']     ?? '');
$lastName      = trim($body['last_name']      ?? '');
$email         = trim($body['email']          ?? '');
$phone         = trim($body['phone']          ?? '');
$paymentMethod = trim($body['payment_method'] ?? '');
$startDate     = trim($body['start_date']     ?? '');
$endDate       = trim($body['end_date']       ?? '');

if (!$firstName)                       $errors[] = 'first_name is required';
if (!$lastName)                        $errors[] = 'last_name is required';
if (!$email || !validateEmail($email)) $errors[] = 'valid email is required';
if (!$phone)                           $errors[] = 'phone is required';
if (!$paymentMethod)                   $errors[] = 'payment_method is required';
if ($startDate && !validateDate($startDate)) $errors[] = 'invalid start_date format';
if ($endDate   && !validateDate($endDate))   $errors[] = 'invalid end_date format';

if ($errors) {
    sendError('Validation failed', 422, $errors);
}

// ─── Encode JSON fields ────────────────────────────────────
$countriesJson    = json_encode($body['countries_json']     ?? []);
$citiesJson       = json_encode($body['cities_json']        ?? []);
$hotelsJson       = json_encode($body['hotels_json']        ?? []);
$entertainmentJson= json_encode($body['entertainment_json'] ?? []);

$subtotal   = round((float)($body['subtotal']    ?? 0), 2);
$serviceFee = round((float)($body['service_fee'] ?? 0), 2);
$totalCost  = round((float)($body['total_cost']  ?? 0), 2);

// ─── Generate unique booking code ─────────────────────────
function generateBookingCode(): string {
    $date = date('ymd');
    $rand = strtoupper(substr(bin2hex(random_bytes(3)), 0, 6));
    return "TP-{$date}-{$rand}";
}

try {
    $pdo = getDBConnection();

    // Ensure booking code is unique
    do {
        $bookingCode = generateBookingCode();
        $check = $pdo->prepare('SELECT id FROM trips WHERE booking_code = ?');
        $check->execute([$bookingCode]);
    } while ($check->fetch());

    $stmt = $pdo->prepare('
        INSERT INTO trips
            (booking_code, first_name, last_name, email, phone,
             payment_method, start_date, end_date,
             countries_json, cities_json, hotels_json, entertainment_json,
             subtotal, service_fee, total_cost, status)
        VALUES
            (?, ?, ?, ?, ?,
             ?, ?, ?,
             ?, ?, ?, ?,
             ?, ?, ?, \'confirmed\')
    ');

    $stmt->execute([
        $bookingCode,
        $firstName,
        $lastName,
        $email,
        $phone,
        $paymentMethod,
        $startDate ?: null,
        $endDate   ?: null,
        $countriesJson,
        $citiesJson,
        $hotelsJson,
        $entertainmentJson,
        $subtotal,
        $serviceFee,
        $totalCost,
    ]);

    $insertedId = (int) $pdo->lastInsertId();

    sendSuccess([
        'id'           => $insertedId,
        'booking_code' => $bookingCode,
        'status'       => 'confirmed',
        'total_cost'   => $totalCost,
    ], 201);

} catch (PDOException $e) {
    sendError('Database error: ' . $e->getMessage(), 500);
} catch (Throwable $e) {
    sendError('Server error: ' . $e->getMessage(), 500);
}
