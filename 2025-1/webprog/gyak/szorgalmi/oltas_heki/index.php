<?php
$errors = [];
$values = ['name'=>'','taj'=>'','last_date'=>'','vaccine'=>'','consent'=>false];
$opts = ['ize','bize','oltogatas','olaj','valami'];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $values['name'] = trim($_POST['name'] ?? '');
    $values['taj'] = trim($_POST['taj'] ?? '');
    $values['last_date'] = trim($_POST['last_date'] ?? '');
    $values['vaccine'] = $_POST['vaccine'] ?? '';
    $values['consent'] = isset($_POST['consent']);

    if ($values['name'] === '') {
        $errors['name'] = 'Kötelező mező.';
    } elseif (preg_match('/\S+\s+\S+/', $values['name']) !== 1) {
        $errors['name'] = 'Adj meg legalább két szóból álló nevet pls   .';
    }

    // taj
    $taj_input = $values['taj'];
    if ($taj_input === '') {
        $errors['taj'] = 'Kötelező mező.';
    } elseif (preg_match('/^\d{3}\s?\d{3}\s?\d{3}$/', $taj_input) !== 1) {
        $errors['taj'] = 'A TAJ 9 számjegy (szóközök opcionálisak, pl. 123 456 789).';
    } else {
        $values['taj'] = preg_replace('/\s+/', '', $taj_input); 
    }

    // datum
    if ($values['last_date'] === '') {
        $errors['last_date'] = 'Kötelező mező.';
    } else {
        $parts = explode('-', $values['last_date']);
        if (count($parts) !== 3) {
            $errors['last_date'] = 'Érvénytelen dátum.';
        } else {
            [$y, $m, $d] = $parts;
            $dateTs = strtotime(sprintf('%04d-%02d-%02d', (int)$y, (int)$m, (int)$d));
            $limitTs = strtotime('-4 months');
            if ($dateTs > $limitTs) {
                $errors['last_date'] = 'Az utolsó oltásnak min 4 hónappal korábbinak kell lennie.';
            } else {
                $values['last_date'] = date('Y-m-d', $dateTs);
            }
        }
    }


    // oltas tipus
    //$opts = ['ize','bize','oltogatas','olaj','valami'];
    if ($values['vaccine'] === '') {
        $errors['vaccine'] = 'Kötelező mező.';
    }

    // hozzajarulas
    if (!$values['consent']) {
        $errors['consent'] = 'Hozzájárulás szükséges.';
    }

    if (empty($errors)) {
        $success = true;
    }
}
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="utf-8">
    <title>Oltás jelentkezés</title>
</head>
<body>

<?php if (!empty($success)): ?>
    <p><strong>Jelentkezés fogadva.</strong></p>
    <p>Köszönjük, <?= htmlspecialchars($values['name'] ?? '', ENT_QUOTES) ?>.</p>
    <p>TAJ: <?= htmlspecialchars(chunk_split($values['taj'],3,' '), ENT_QUOTES) ?></p>
<?php endif; ?>

<form method="post">
    <label>Név (két szó)
        <input name="name" type="text" value="<?= htmlspecialchars($values['name'] ?? '', ENT_QUOTES) ?>">
        <span style="color:#a00"><?= $errors['name'] ?? '' ?></span>
    </label>
    <br>

    <label>TAJ szám (9 szám, szóköz opcionális)
        <input name="taj" type="text" value="<?= htmlspecialchars(isset($taj_input) ? $taj_input : ($values['taj'] ?? ''), ENT_QUOTES) ?>">
        <span style="color:#a00"><?= $errors['taj'] ?? '' ?></span>
    </label>
    <br>

    <label>Utolsó oltás dátuma
        <input name="last_date" type="date" value="<?= htmlspecialchars($values['last_date'] ?? '', ENT_QUOTES) ?>">
        <span style="color:#a00"><?= $errors['last_date'] ?? '' ?></span>
    </label>
    <br>

    <label>Oltás típusa
        <select name="vaccine">
            <option value="">-- válassz! --</option>
            <?php foreach ($opts as $o): ?>
                <option value="<?= htmlspecialchars($o, ENT_QUOTES) ?>"<?= (isset($values['vaccine']) && $values['vaccine'] === $o) ? ' selected' : '' ?>><?= htmlspecialchars($o, ENT_QUOTES) ?></option>
            <?php endforeach; ?>
        </select>
        <span style="color:#a00"><?= $errors['vaccine'] ?? '' ?></span>
    </label>
    <br>

    <label>
        <input type="checkbox" name="consent" <?= !empty($values['consent']) ? 'checked' : '' ?>> Hozzájárulok az adatok tárolásához
        <span style="color:#a00"><?= $errors['consent'] ?? '' ?></span>
    </label>
    <br>

    <button type="submit">Jelentkezés</button>
</form>

</body>
</html>