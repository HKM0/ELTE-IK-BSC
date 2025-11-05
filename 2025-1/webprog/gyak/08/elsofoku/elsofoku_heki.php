<?php
declare(strict_types=1);
print_r($_GET);

$hibak = [];
$a = null;
$b = null;

function feldolgoz(array $q, array &$hibak): ?float {
    $a = null;
    $b = null;

    if (!isset($q["a"]) || $q["a"] === "") {
        $hibak[] = "Hiányzik az a param.";
    } else {
        $a = (float) $q["a"];
    }

    if (!isset($q["b"]) || $q["b"] === "") {
        $hibak[] = "Hiányzik a b param.";
    } else {
        $b = (float) $q["b"];
    }

    if (!empty($hibak)) {
        return null;
    }

    if ($a === 0.0&& $hibak ===[]) {
        if ($b === 0.0 && $hibak === []) {
            $hibak[] = "Az egyenletnek végtelen sok megoldása van.";
        } else {
            $hibak[] = "Az egyenletnek nincs megoldása.";
        }
        return null;
    }

    return -$b / $a;
}

$x = feldolgoz($_GET, $hibak);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php if (!empty($hibak)): ?>
    <ul>
    <?php foreach ($hibak as $h): ?>
        <li><?php echo $h; ?></li>
    <?php endforeach; ?>
    </ul>
<?php else: ?>
    x=<?php echo (string)$x; ?>
<?php endif; ?>
</body>
</html>
