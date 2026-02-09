<?php
require_once 'nations.php';
?>

<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>6. feladat</title>
    <link rel="stylesheet" href="index.css" />
</head>

<body>
    <h1>6. Szavazás</h1>

    <form id="vote-form" method="post" action="vote_save.php">
        <select name="nation">
            <?php foreach ($nations as $index => $nation): ?>
                <option value="<?= $index ?>"><?= $nation['flag'] ?> <?= $nation['name'] ?></option>
            <?php endforeach ?>
        </select>
        <select name="vote">
            <option value="12">Legjobb</option>
            <option value="8">Nagyon jó</option>
            <option value="5">Jó</option>
        </select>
        <button type="submit">Küldés</button>
    </form>

    <div id="main">
        <div id="voting">
            <h2>Leadott szavazatok</h2>
            <div class="vote-card">
                <span>🇦🇹 Austria +12 pont</span>
                <a class="delete">🗑️</a>
            </div>
            <div class="vote-card">
                <span>🇩🇪 Germany +8 pont</span>
                <a class="delete">🗑️</a>
            </div>
            <div class="vote-card">
                <span>🇦🇹 Austria +8 pont</span>
                <a class="delete">🗑️</a>
            </div>
        </div>

        <div id="contestants">
            <h2>Fellépők</h2>
            <div class="vote-card">🇦🇹 Austria – 20</div>
            <div class="vote-card">🇩🇪 Germany – 8</div>
            <div class="vote-card">🇭🇺 Hungary – 0</div>
            <div class="vote-card">...</div>
        </div>
    </div>
</body>


</html>