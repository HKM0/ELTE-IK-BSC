<?php
require_once 'nations.php';
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
    <h1>5. Új zeneszám</h1>
    <div id="main">
        <form>
            <label>
                Cím
                <input name="title">
            </label>
            <label>
                Megjelenés éve
                <input name="year">
            </label>
            <label>
                Nézettség
                <input name="views">
            </label>
            <div>
                Kézi ID
                <label><input type="radio" name="manualid" value="yes"> Igen</label>
                <label><input type="radio" name="manualid" value="no"> Nem</label>
            </div>
            <label>
                ID
                <input name="id">
            </label>
            <input type="submit">
        </form>

        <div id="success">Új zeneszám hozzáadva!</div>
        <div id="errors">
            Hiba!
            <ul>
                <li>Példa hiba.</li>
            </ul>
        </div>
    </div>
</body>

</html>