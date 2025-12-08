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
// main
$data = [];
$errors = [];
if (count($_POST) > 0) {
  if (validate($_POST, $data, $errors)) {
    // Beolvasás: $data
    $name = $data["name"];
    $emails = $data["emails"];
    // Feldolgozás
    $cs = new ContactStorage();
    $cs->add([
      "name" => $name,
      "emails" => $emails,
    ]);
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
  <h2>Új névjegy</h2>
  <form action="" method="post" novalidate>
    Név: <input type="text" name="name" value="<?= $_POST['name'] ?? '' ?>" required> <br>
    <?php if (isset($errors["name"])) : ?>
      <span><?= $errors["name"] ?></span>
    <?php endif ?>
    <br>
    Email címek: <br>
    <input type="email" name="emails[]" value="<?= $_POST['emails'][0] ?? '' ?>" required> <br>
    <input type="email" name="emails[]" value="<?= $_POST['emails'][1] ?? '' ?>"> <br>
    <input type="email" name="emails[]" value="<?= $_POST['emails'][2] ?? '' ?>"> <br>
    <?php if (isset($errors["emails"])) : ?>
      <span><?= $errors["emails"] ?></span>
    <?php endif ?>
    <br>
    <button>Új névjegy</button>
  </form>
</body>

</html>