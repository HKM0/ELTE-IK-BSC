<?php
//PHP-ban dinamikusan generált legördülő menüre példa
//alternatív php szintaxist használjunk, dinamikusan generáljuk az option-öket
//asszociatív tömb, ahol a kulcs a kategória azonosító (id), az érték pedig a kategória neve (name)
$categories = [
  [
    "id" => 1,
    "category" => "Akció",
  ],
  [
    "id" => 2,
    "category" => "Dráma",
  ],
  [
    "id" => 13,
    "category" => "Vígjáték",
  ],
];
// print_r($categories);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <form action="" method="post">
    <select name="category">
      <?php foreach($categories as $c) : ?>
        <option value="<?= $c["id"] ?>">
          <?= $c["category"] ?>
        </option>
      <?php endforeach ?>
    </select>
    <button>Küldés</button>
  </form>
</body>
</html>