<?php

declare(strict_types=1);
//print_r($_GET);

function elsofoku(float $a, float $b): float
{
    return  -$b / $a;
}
$hibak = [];
$data = [];
function validate($get, &$data, &$hibak)
{
    if (!isset($get["a"])) {
        $hibak[] = 'Hiányzik az "a" paraméter';
    } else if ((trim($get["a"]) === '')) {
        $hibak[] = 'Hiányzik az "a"';
    } else if (filter_var($get["a"], FILTER_VALIDATE_FLOAT) === false) {
        $hibak[] = '"a" nem szám';
    } else {
        $a = (float)$get["a"];
        if ($a === 0.0) {
            $hibak[] = '"a" nem lehet 0';
        } else {
            $data['a'] = $a;
        }
    }

    if (!isset($get["b"])) {
        $hibak[] = 'Hiányzik az "b" paraméter';
    } else if ((trim($get["b"]) === '')) {
        $hibak[] = 'Hiányzik az "b"';
    } else if (filter_var($get["b"], FILTER_VALIDATE_FLOAT) === false) {
        $hibak[] = '"b" nem szám';
    } else {
        $data['b'] = (float)$get["b"];
    }
    return count($hibak) === 0;
}
if(count($_GET) >0){
    if (validate($_GET, $data, $hibak)) {
        $a = $data["a"];
        $b = $data["b"];
        $x = elsofoku($a, $b);
    }
}
//print_r($hibak);


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
<h1>Elsőfokú egyenlet megoldása</h1>
    <form action="elsofoku.php" method="get">
        a=<input type="text" name="a" value="<?= $_GET['a']??'' ?>"><br>
        b=<input type="text" name="b" value="<?= $_GET['b']??'' ?>"><br>
        <button type="submit">Számol</button>
    </form>
<ul>
<?php if(($hibak)>0): ?>
    <?php foreach($hibak as $hiba): ?>
        <li><?= $hiba ?></li>
    <?php endforeach ?>
</ul>
<?php endif ?>
<?php if(isset($x)): ?>
A megoldás: <?= $x  ?>
<?php endif ?>
    <!--x=<?= $x ?>-->
</body>

</html>