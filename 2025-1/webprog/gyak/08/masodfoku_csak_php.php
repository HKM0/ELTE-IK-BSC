<?php
// ref.php

// tema valt kezel
if (isset($_GET['color']) && in_array($_GET['color'], ['white', 'black', 'system'])) {
    setcookie('theme', $_GET['color'], time() + (86400 * 30), "/"); 
    header("Location: ref.php"); 
    exit;
}

// tema beolv. bongeszo sutikekbol
$theme = $_COOKIE['theme'] ?? 'system';
$themeClass = '';
if ($theme === 'black') {
    $themeClass = 'theme-black';
} elseif ($theme === 'white') {
    $themeClass = 'theme-white';
}

function solveQuadratic($a, $b, $c) {
    if ($a == 0) {
        if ($b == 0) {
            return ['type' => 'none']; 
        }
        // lineáris egyenlet kiir
        return ['type' => 'linear', 'x' => -$c / $b];
    }

    $d = $b*$b - 4*$a*$c;
    if ($d > 0) {
        $r1 = (-$b + sqrt($d)) / (2*$a);
        $r2 = (-$b - sqrt($d)) / (2*$a);
        return ['type' => 'two_real', 'r1' => $r1, 'r2' => $r2, 'd' => $d];
    } elseif ($d == 0) {
        $r = -$b / (2*$a);
        return ['type' => 'one_real', 'r' => $r, 'd' => $d];
    } else {
        // komplex gyök hell naaah
        $re = -$b / (2*$a);
        $im = sqrt(-$d) / (2*$a);
        return ['type' => 'complex', 're' => $re, 'im' => $im, 'd' => $d];
    }
}

$a = $_POST['a'] ?? null;
$b = $_POST['b'] ?? null;
$c = $_POST['c'] ?? null;
$result = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($a === '' || $b === '' || $c === '' || !is_numeric($a) || !is_numeric($b) || !is_numeric($c)) {
        $error = "Adj meg számokat a megoldásokhoz (a, b, c).";
    } else {
        $result = solveQuadratic((float)$a, (float)$b, (float)$c);
    }
}
?>
<!doctype html>
<html lang="hu">
<head>
<meta charset="utf-8">
<title>Másodfokú egyenlet megoldó</title>
<style>
body{font-family: Arial, sans-serif;max-width:600px;margin:2rem auto;padding:1rem; transition: background-color 0.3s, color 0.3s;}

/* def sys tema */
body { background-color: #fff; color: #000; }
@media (prefers-color-scheme: dark) {
    body:not(.theme-white):not(.theme-black) { background-color: #121212; color: #eee; }
    body:not(.theme-white):not(.theme-black) .output { background: #333; }
    body:not(.theme-white):not(.theme-black) input { background: #444; color: #eee; border-color: #555; }
}

.theme-white { background-color: #fff; color: #000; }
.theme-white .output { background: #f5f5f5; }
.theme-white input { background: #fff; color: #000; }

.theme-black { background-color: #121212; color: #eee; }
.theme-black .output { background: #333; }
.theme-black input { background: #444; color: #eee; border-color: #555; }

label,input{display:block;margin:0.5rem 0}
input[type="text"]{width:100%;padding:0.4rem; border: 1px solid #ccc; border-radius: 4px;}
button{padding:0.5rem 1rem}
.output{margin-top:1rem;padding:0.8rem;background:#f5f5f5;border-radius:4px}
.theme-switcher { margin-top: 2rem; text-align: center; border-top: 1px solid #ccc; padding-top: 1rem; }
.theme-switcher a { margin: 0 10px; text-decoration: none; }
</style>
</head>
<body class="<?php echo $themeClass; ?>">
<h2>Másodfokú egyenlet: ax² + bx + c = 0</h2>
<form method="post" novalidate>
    <label>a: <input type="text" name="a" value="<?php echo htmlspecialchars($a ?? ''); ?>"></label>
    <label>b: <input type="text" name="b" value="<?php echo htmlspecialchars($b ?? ''); ?>"></label>
    <label>c: <input type="text" name="c" value="<?php echo htmlspecialchars($c ?? ''); ?>"></label>
    <button type="submit">Számol</button>
</form>

<?php if (!empty($error)): ?>
<div class="output"><?php echo htmlspecialchars($error); ?></div>
<?php elseif ($result !== null): ?>
<div class="output">
<?php
switch ($result['type']) {
    case 'none':
        echo "Nincs egyértelmű megoldás (a=0 és b=0).";
        break;
    case 'linear':
        echo "Lineáris egyenlet. Megoldás: x = " . round($result['x'], 6);
        break;
    case 'two_real':
        echo "Két valós gyök: x1 = " . round($result['r1'], 6) . ", x2 = " . round($result['r2'], 6);
        break;
    case 'one_real':
        echo "Dupla gyök: x = " . round($result['r'], 6);
        break;
    case 'complex':
        echo "Komplex gyökök: x = " . round($result['re'], 6) . " ± " . round($result['im'], 6) . "i";
        break;
}
// https://regex101.com/

?>
</div>
<?php endif; ?>

<div class="theme-switcher">
    <a href="?color=white">Fehér</a>
    <a href="?color=black">Fekete</a>
    <a href="?color=system">Rendszer</a>
</div>

</body>

</html>
