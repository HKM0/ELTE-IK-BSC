<!-- index.php -->
<?php
// Ha a felhasználó rákattintott a gombra (POST kérés érkezett)
$serverTime = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $serverTime = date('Y-m-d H:i:s');
}
?>
<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <title>Szerveridő: AJAX nélkül</title>
</head>

<body>
    <h1>Szerveridő: AJAX nélkül</h1>

    <form method="post" action="">
        <button type="submit">Kérj időt a szervertől</button>
    </form>

    <div>
        <?php if ($serverTime === null): ?>
            Még nem kértél le időt.
        <?php else: ?>
            Szerveridő: <?= $serverTime ?>
        <?php endif; ?>
    </div>
</body>

</html>