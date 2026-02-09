<?php
$finalists = [
    ['country' => 'France',         'flag' => '🇫🇷', 'contestant' => 'Slimane', 'method' => 'big5'],
    ['country' => 'Norway',         'flag' => '🇳🇴', 'contestant' => 'Gåte', 'method' => 'qualified'],
    ['country' => 'Italy',          'flag' => '🇮🇹', 'contestant' => 'Angelina Mango', 'method' => 'big5'],
    ['country' => 'Spain',          'flag' => '🇪🇸', 'contestant' => 'Nebulossa', 'method' => 'big5'],
    ['country' => 'Hungary',        'flag' => '🇭🇺', 'contestant' => 'Carson Coma', 'method' => 'qualified'],
    ['country' => 'United Kingdom', 'flag' => '🇬🇧', 'contestant' => 'Olly Alexander', 'method' => 'big5'],
    ['country' => 'Sweden',         'flag' => '🇸🇪', 'contestant' => 'Marcus and Martinus', 'method' => 'qualified'],
    ['country' => 'Austria',        'flag' => '🇦🇹', 'contestant' => 'Conchita Wurst', 'method' => 'host'],
    ['country' => 'Greece',         'flag' => '🇬🇷', 'contestant' => 'Marina Satti', 'method' => 'qualified'],
    ['country' => 'Germany',        'flag' => '🇩🇪', 'contestant' => 'Isaak Guderian', 'method' => 'big5'],
    ['country' => 'Germany',        'flag' => '🇩🇪', 'contestant' => 'Isaak Guderian', 'method' => 'big5'],
];
usort($finalists, function($a, $b) {
    return strcmp($a['country'], $b['country']);
});

$tasks = [
    'big5' => 0,
    'qualified' => 0,
    'host' => 0
];
foreach($finalists as $finalist){
    $tasks[$finalist['method']]++;
}

?>

<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>4. feladat</title>
    <link rel="stylesheet" href="index.css" />
</head>

<body>
    <h1>4. Döntő</h1>
    <div id="main">
        <div id="information">
            <div id="qualified">Bejutott: <?= $tasks['qualified'] ?></div>
            <div id="big5"><?= $tasks['big5'] == 5 ? 'Minden Big5 jelen van.' : 'Hiányos Big5!' ?></div>
            <div id="host"><?= $tasks['host'] == 1 ? 'A rendező is fellép.' : 'A rendező nem indít versenyzőt!' ?></div>
        </div>
        <div id="contestants">
            <?php foreach ($finalists as $finalist): ?>
                <div class="card <?= $finalist['method'] ?>">
                    <span class="flag"><?= $finalist['flag'] ?></span>
                    <h2><?= $finalist['country'] ?></h2>
                    <span class="contestant"><?= $finalist['contestant'] ?></span>
                    <span class="method"><?= $finalist['method'] ?></span>
                </div>
            <?php endforeach ?>
        </div>
    </div>
</body>

</html>