<?php
  print_r($_GET);
    $bgcolor = '#888888';
if (isset($_GET["bgcolor"])) {
        $re = '/^#[0-9a-f]{6}$/i';
        $str = $_GET["bgcolor"];
        if (preg_match($re, $str) === 1)
            $bgcolor = $_GET["bgcolor"];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Háttérszín</title>
    <style>
        body {
            background-color: <?= $bgcolor ?>;
        }
        </style>
</head>
<body>
 <a href="hatterszin.php?bgcolor=%2300ff00">Zöld</a>
     <form action="" method="get">
        <input type="color" name="bgcolor" value="<?= $bgcolor ?>">
        <button>Háttérszín beállítása</button>
        <form>
</body>

</html>