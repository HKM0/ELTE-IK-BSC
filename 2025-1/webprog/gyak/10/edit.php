<?php
include_once("contactstorage.php");

print_r($_POST);
// functions
function validate($post, &$data, &$errors): bool
{
    $data = $post;

    // name
    $name = trim($post['name'] ?? '');
    if ($name === '') {
        $errors['name'] = 'A név nem lehet üres!';
    } else {
        $data['name'] = filter_var($name, FILTER_SANITIZE_SPECIAL_CHARS);
    }

    // emails
    $raw = $post['emails'] ?? null;

    if (!is_array($raw)) {
        $errors['emails'] = 'Az email nem tömb!';
    } else {

        // trim minden elemre
        $trimmed = array_map('trim', $raw);

        // üres stringek kiszűrése
        $nonEmpty = array_values(array_filter($trimmed, function ($e) {
            return $e !== '';
        }));

        if ($nonEmpty === []) {
            $errors['emails'] = 'Legalább 1 email megadása kötelező!';
        } else {

            // email formátum ellenőrzése
            $valid = array_values(array_filter($nonEmpty, function ($e) {
                return filter_var($e, FILTER_VALIDATE_EMAIL);
            }));
            //A sor azt ellenőrzi, hogy a megtisztított nem-üres email címek közül mindegyik érvényes volt-e. Ha nem, akkor hibaüzenetet ad hozzá az $errors tömbhöz.
            if (count($valid) !== count($nonEmpty)) {
                $errors['emails'] = 'Valamelyik email rossz formátumú!';
            } else {
                // minden rendben → valid adatok
                $data['emails'] = $valid;
            }
        }
    }

    return count($errors) === 0;
}

//*
if (!isset($_GET["id"])) {
    header("Location: index.php");
    exit();
}
$id = $_GET["id"];
$cs = new ContactStorage();
$contact = $cs->findById($id);
if (!$contact) {
    header("Location: index.php");
    exit();
}
//*

// main
$data = [];
$errors = [];
if (count($_POST) > 0) {
    if (validate($_POST, $data, $errors)) {
        // Beolvasás: $data
        //*
        $contact["name"] = $data["name"];
        $contact["emails"] = $data["emails"];
        //*
        $cs->update($id, $contact);
        //*
        //így nincs duplikált mentés F5re
        header("Location: index.php");
        exit();
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        input~span {
            color: red;
            font-size: smaller;
        }
    </style>
</head>

<body>

    <h1>Névjegyek</h1>
    <h2>Névjegy módosítása</h2>
    <form action="" method="post" novalidate>
        Név: <input type="text" name="name" required value="<?= $_POST["name"] ?? $contact["name"] ?>"> <br>
        <?php if (isset($errors["name"])) : ?>
            <span><?= $errors["name"] ?></span>
        <?php endif ?>
        <br>
        Email címek: <br>
        <!--Töltsd be az input mezőbe azt az értéket, amely sorrendben az elsőként létező és nem null érték:
        - $_POST["emails"][0] – a felhasználó által most beküldött érték (állapottartás)
        - ha nincs POST adat → $contact["emails"][0] – a névjegy eredeti email címe
        - ha ez sincs → "" – üres string-->
        <input type="email" name="emails[]" value="<?= $_POST["emails"][0] ?? $contact["emails"][0] ?? "" ?>" required><br>
        <input type="email" name="emails[]" value="<?= $_POST["emails"][1] ?? $contact["emails"][1] ?? "" ?>"><br>
        <input type="email" name="emails[]" value="<?= $_POST["emails"][2] ?? $contact["emails"][2] ?? "" ?>">
        <?php if (isset($errors["emails"])) : ?>
            <span><?= $errors["emails"] ?></span>
        <?php endif ?>
        <br>
        <button>Névjegy módosítása</button>
    </form>
</body>

</html>