<?php
session_start(); //kapsolat a többi fájlal
// 1. A kidobó átveszi a számot, ami az "eletkor" címkével érkezett
$kor = $_GET['eletkor']; 

if ($kor < 18) {
    // Ha kisebb mint 18:
    $_SESSION["errors"] = "Sajnos nem jöhetsz be, túl fiatal vagy!";
    header('Location: index.php');
    exit();
}

echo "Jó szórakozást, bemehetsz!";

?>