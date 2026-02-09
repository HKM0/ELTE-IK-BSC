<?php
require_once 'nations.php';
session_start();
$data=$_SESSION["data"]?? (Object)[];
$errors = $_SESSION["errors"] ?? [];
$success = $_SESSION["success"] ?? false;

$_SESSION["errors"] = [];
$_SESSION["success"] = false;
$_SESSION["data"]=(Object)[]


?>

<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>5. feladat</title>
    <link rel="stylesheet" href="index.css" />
</head>

<body>
    <h1>5. Média</h1>
    <div id="main">
        <form>
            <label>
                Cég neve
                <input name="company">
            </label>
            <label>
                Ország
                <select name="nation">
                    <?php foreach ($nations as $nation): ?>
                        <!-- Országkódot fog továbbküldeni, pl. HUN -->
                        <option value="<?= $nation['id'] ?>">
                            <?= $nation['flag'] ?> <?= $nation['name'] ?>
                        </option>
                    <?php endforeach ?>
                </select>
            </label>
            <label>
                Újságírók száma
                <input name="reporters">
            </label>
            <div>
                Szerződés
                <label><input type="radio" name="contract" value="subsidiary"> EBU Alvállalkozó</label>
                <label><input type="radio" name="contract" value="independent"> Független</label>
            </div>
            <input type="submit">
        </form>

        <div id="success">Sikeres regisztráció!</div>
        <div id="errors">
            Hiba!
            <ul>
                <li>Példa hiba.</li>
            </ul>
        </div>
    </div>



    <hr>

    <div>
        Ha GET kérést használtál egy checks.php oldalon keresztül, akkor ezekkel a linkekkel tudod tesztelni az űrlapon keresztül körülményesen előidézhető hibákat:
        <ul><a href="check.php?nation=XXX">Nem létező ország (check.php?nation=XXX)</a></ul>
        <ul><a href="check.php?nation=DEU&reporters=25">Big5 túl sok újságíró (check.php?nation=DEU&reporters=25)</a></ul>
        <ul><a href="check.php?contract=taxevasion">Nem létező szerződés típus (check.php?contract=taxevasion)</a></ul>
        <ul><a href="check.php?nation=DEU&contract=independent">Big5 rossz szerződés (check.php?nation=DEU&contract=independent)</a></ul>
    </div>
    <div>
        Ha GET kérést használtál helyben, akkor ezekkel a linkekkel tudod tesztelni az űrlapon keresztül körülményesen előidézhető hibákat:
        <ul><a href="index.php?nation=XXX">Nem létező ország (index.php?nation=XXX)</a></ul>
        <ul><a href="index.php?nation=DEU&reporters=25">Big5 túl sok újságíró (index.php?nation=DEU&reporters=25)</a></ul>
        <ul><a href="index.php?contract=taxevasion">Nem létező szerződés típus (index.php?contract=taxevasion)</a></ul>
        <ul><a href="index.php?nation=DEU&contract=independent">Big5 rossz szerződés (index.php?nation=DEU&contract=independent)</a></ul>
    </div>
</body>

</html>