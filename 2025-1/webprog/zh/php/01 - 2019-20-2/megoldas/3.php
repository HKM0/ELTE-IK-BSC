<?php

session_start();

include("word_diff.php");

$a = "";
$b = "";
$o = "";

if (isset($_POST["input"])) {
  $a = $_POST["input"];
  $b = $_SESSION["prev"] ?? "";
  $d = word_diff($b, $a);

  $o = implode(" ", array_map(function ($i) {
    if (is_string($i)) {
      return $i;
    } else {
      return "<del>" . $i["del"] . "</del><ins>" . $i["ins"] . "</ins>";
    }
  }, $d));

  $_SESSION["prev"] = $a;
}

?>
<style>
  form {
    display: flex;
  }

  textarea,
  div,
  button {
    flex: 1 1;
    height: 100px;
  }
</style>
<form method="post">
  <textarea name="input"><?= $a ?></textarea>
  <div disabled><?= $o ?></ins></div>
  <button>Send</button>
</form>