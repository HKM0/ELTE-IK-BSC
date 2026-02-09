<?php
session_start();

require_once './src/userstorage.php';
require_once './src/projectstorage.php';

#  ezek fixek szoval csak ide raktam hardkodolva
define('CATEGORIES', [
    0 => 'Helyi kis projekt',
    1 => 'Helyi nagy projekt',
    2 => 'Esélyteremtő Budapest',
    3 => 'Zöld Budapest'
]);

define('STATUSES', [
    0 => 'pending',
    1 => 'rejected',
    2 => 'rework',
    3 => 'approved'
]);

function isLoggedIn() {
    return isset($_SESSION['user']);
}

function isAdmin() {
    return isLoggedIn() && $_SESSION['user']['is_admin'];
}

function redirect($url) {
    header("Location: $url");
    exit();
}

function validateUsername($username) {
    if (strpos($username, ' ') !== false) {
        return "A felhasználónévben nem lehet szóköz.";
    }
    return null;
}

function validateEmail($email) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return "Helytelen e-mail formátum.";
    }
    return null;
}

function validatePassword($password) {
    if (strlen($password) < 8) {
        return "A jelszó legalább 8 karakter kell legyen.";
    }
    if (!preg_match('/[a-z]/', $password)) {
        return "A jelszónak tartalmaznia kell kisbetűt.";
    }
    if (!preg_match('/[A-Z]/', $password)) {
        return "A jelszónak tartalmaznia kell nagybetűt.";
    }
    if (!preg_match('/[0-9]/', $password)) {
        return "A jelszónak tartalmaznia kell számot.";
    }
    return null;
}

function validateProjectTitle($title) {
    if (strlen($title) < 10) {
        return "A projekt címe legalább 10 karakter kell legyen.";
    }
    return null;
}

function validateProjectDescription($description) {
    if (strlen($description) < 150) {
        return "A projekt leírása legalább 150 karakter kell legyen.";
    }
    return null;
}

function validateCategory($category) {
    if (!array_key_exists($category, CATEGORIES)) {
        return "Érvénytelen kategória.";
    }
    return null;
}

function validatePostalCode($postalCode) {
    if ($postalCode === '1007') {
        return null;
    }
    if (!preg_match('/^1(0[1-9]|1[0-9]|2[0-3])[1-9]$/', $postalCode)) {
        return "Érvénytelen irányítószám.";
    }
    return null;
}

function validateImageUrl($url) {
    if (empty($url)) {
        return null;
    }
    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        return "Érvénytelen URL formátum.";
    }
    return null;
}

function canVoteOnProject($project) {
    if ($project['status'] != 3) {
        return false;
    }
    $approvedDate = strtotime($project['approved']);
    $twoWeeksLater = strtotime('+2 weeks', $approvedDate);
    return time() <= $twoWeeksLater;
}
