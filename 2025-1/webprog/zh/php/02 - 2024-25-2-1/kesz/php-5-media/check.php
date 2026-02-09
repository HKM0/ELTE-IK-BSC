<?php
session_start();
require_once 'nation_codes.php';

$data = (object)[
    'company' => trim($_GET['company'] ?? ''),
    'nation' => trim($_GET['nation'] ?? ''),
    'reporters' => trim($_GET['reporters'] ?? ''),
    'contract' => trim($_GET['contract'] ?? '')
];

$errors = [];

if ($data->company == '') {
    $errors[] = 'A cég nevének megadása kötelező!';
} else if (strlen($data->company) < 3) {
    $errors[] = 'A cég neve legalább 3 betű legyen!';
}

if ($data->nation == '') {
    $errors[] = 'A bejegyzett ország megadása kötelező!';
} else if (!in_array($data->nation, $nation_codes)) {
    $errors[] = 'Ismeretlen ország!';
}

if ($data->reporters == '') {
    $errors[] = 'Az újságírók számának megadása kötelező!';
} else if (
    !is_numeric($data->reporters) ||
    intval($data->reporters) != floatval($data->reporters)
) {
    $errors[] = 'Az újságírók száma egész szám legyen!';
} else {
    $repo = intval($data->reporters);
    if (in_array($data->nation, ['GBR', 'ITA', 'ESP', 'DEU', 'FRA'])) {
        if($repo < 1 || $repo > 20) {
            $errors[] = 'Az országod cégei 1-20 újságíróval érkezhetnek!';
        }
    } else {
        if($repo < 1 || $repo > 10) {
            $errors[] = 'Az országod cégei 1-10 újságíróval érkezhetnek!';
        }
    }
}

if ($data->contract == '') {
    $errors[] = 'A szerződés típusát kötelező kiválasztani!';
}else if(!in_array($data->contract, ['subsidiary', 'independent'])) {
    $errors[] = 'Ismeretlen szerződéstípus!';
} else if(
    in_array($data->nation, ['GBR', 'ITA', 'ESP', 'DEU', 'FRA']) &&
    $data->contract != 'subsidiary'
) {
    $errors[] = 'Big5 csak alvállalkozóként érkezhet!';
}

$_SESSION['errors'] = $errors;
$_SESSION['success'] = count($errors) == 0;
$_SESSION['data'] = $data;

header('Location: index.php');
