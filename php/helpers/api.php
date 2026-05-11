<?php
/**
 * Shared API helpers.
 */

function getDatabaseOrFail() {
    try {
        return Database::getInstance();
    } catch (Exception $e) {
        error_log($e->getMessage());
        serverErrorResponse('Database connection failed. Start MySQL in XAMPP and import database/trip_planner.sql.');
    }
}

function normalizeApiRow($row, $boolColumns = [], $jsonColumns = [], $numberColumns = [], $intColumns = []) {
    if (!$row) {
        return $row;
    }

    foreach ($boolColumns as $column) {
        if (array_key_exists($column, $row)) {
            $row[$column] = (bool) $row[$column];
        }
    }

    foreach ($jsonColumns as $column) {
        if (array_key_exists($column, $row)) {
            $decoded = json_decode($row[$column], true);
            $row[$column] = is_array($decoded) ? $decoded : [];
        }
    }

    foreach ($numberColumns as $column) {
        if (array_key_exists($column, $row)) {
            $row[$column] = (float) $row[$column];
        }
    }

    foreach ($intColumns as $column) {
        if (array_key_exists($column, $row)) {
            $row[$column] = (int) $row[$column];
        }
    }

    return $row;
}

function normalizeApiRows($rows, $boolColumns = [], $jsonColumns = [], $numberColumns = [], $intColumns = []) {
    return array_map(function ($row) use ($boolColumns, $jsonColumns, $numberColumns, $intColumns) {
        return normalizeApiRow($row, $boolColumns, $jsonColumns, $numberColumns, $intColumns);
    }, $rows);
}

function getBooleanInput($key) {
    $value = getInput($key, null, 'GET');
    if ($value === null) {
        return null;
    }

    return filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
}

function jsonEncodeForDatabase($value) {
    return json_encode($value ?: [], JSON_UNESCAPED_UNICODE);
}
