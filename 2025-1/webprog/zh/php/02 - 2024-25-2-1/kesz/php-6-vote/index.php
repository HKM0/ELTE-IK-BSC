<?php
require_once 'nations.php';
$votes = json_decode(file_get_contents('votes.json'));

foreach($votes as $vote){
    $nations[$vote->nation]['points'] += intval($vote->vote);
}
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
            <?php foreach($nations as $index => $nation): ?>
                <option value="<?=$index?>"><?= $nation['flag'] ?> <?=$nation['name'] ?></option>
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
            <?php foreach($votes as $index => $vote): ?>
            <?php $nation = $nations[$vote->nation] ?>
            <div class="vote-card">
                <span><?=$nation['flag']?> <?=$nation['name']?> +<?=$vote->vote?> pont</span>
                <a class="delete" href="vote_delete.php?id=<?=$index?>">🗑️</a>
            </div>
            <?php endforeach ?>
        </div>

        <?php
            usort($nations, function($a, $b) {
                return $b['points'] <=> $a['points'];
            });
        ?>
        <div id="contestants">
            <h2>Fellépők</h2>
            <?php foreach($nations as $index => $nation): ?>
                <div class="vote-card"><?= $nation['flag'] ?> <?=$nation['name'] ?> – <?= $nation['points'] ?></div>
            <?php endforeach ?>
        </div>
    </div>
</body>


</html>