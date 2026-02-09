<?php
/* ===========================================
   PHP KIMENET GENERÁLÁS & ADATFELDOLGOZÁS
   Vizsgasegédlet
   =========================================== */

// 1. KIMENET GENERÁLÁS
// ---------------------

// Echo - szöveg kiírás
$nev="hk";
echo "Hello World";
echo "Név: " . $nev;

// Print - hasonló mint echo
print "Valami szöveg";

// printf - formázott kimenet
printf("Szám: %d, Float: %.2f, String: %s", 10, 3.14, "text");

// HTML kimenet
echo "<h1>Cím</h1>";
echo "<p>Bekezdés</p>";

//html-be inline php: 
//    <?php 
//        echo "Hello World";
/*    ?>                                                        
*/


// 2. VÁLTOZÓK & TÍPUSOK
// ----------------------
$szoveg = "Hello";           // string
$szam = 42;                  // integer
$tort = 3.14;                // float
$logikai = true;             // boolean
$tomb = [1, 2, 3];           // array


// 3. TÖMB FELDOLGOZÁS
// -------------------

// Egyszerű tömb
$szinek = ["piros", "kék", "zöld"];
echo $szinek[0];  // "piros"

// Asszociatív tömb
$szemely = [
    "nev" => "Kiss János",
    "kor" => 25,
    "varos" => "Budapest"
];
echo $szemely["nev"];  // "Kiss János"

// Tömb bejárás foreach-el
foreach ($szinek as $szin) {
    echo $szin . "<br>";
}

foreach ($szemely as $kulcs => $ertek) {
    echo "$kulcs: $ertek<br>";
}


// 4. ŰRLAP ADATOK FELDOLGOZÁSA
// -----------------------------

// GET kérés
$nev = $_GET['nev'] ?? 'Vendég';
$kor = $_GET['kor'] ?? 0;

// POST kérés
$email = $_POST['email'] ?? '';
$uzenet = $_POST['uzenet'] ?? '';


// 5. FÜGGVÉNYEK
// -------------

function osszead($a, $b) {
    return $a + $b;
}

function udvozles($nev = "Vendég") {
    return "Helló, $nev!";
}

echo osszead(5, 3);        // 8
echo udvozles("Anna");     // "Helló, Anna!"


// 6. FELTÉTELES UTASÍTÁSOK
// -------------------------

if ($kor >= 18) {
    echo "Felnőtt";
} elseif ($kor >= 14) {
    echo "Tinédzser";
} else {
    echo "Gyerek";
}

// Ternary operátor
$statusz = ($kor >= 18) ? "Felnőtt" : "Kiskorú";


// 7. CIKLUSOK
// ------------

// For ciklus
for ($i = 0; $i < 5; $i++) {
    echo $i . " ";
}

// While ciklus
$i = 0;
while ($i < 5) {
    echo $i . " ";
    $i++;
}

// Foreach (tömbökhöz)
foreach ($tomb as $elem) {
    echo $elem;
}


// 8. STRING MŰVELETEK
// --------------------

$szoveg = "Hello World";
echo strlen($szoveg);              // 11
echo strtoupper($szoveg);          // "HELLO WORLD"
echo strtolower($szoveg);          // "hello world"
echo substr($szoveg, 0, 5);        // "Hello"
echo str_replace("World", "PHP", $szoveg);  // "Hello PHP"

$darabok = explode(" ", $szoveg);  // ["Hello", "World"]
$osszeallitva = implode("-", $darabok);  // "Hello-World"


// 9. TÖMB FÜGGVÉNYEK
// ------------------

$szamok = [3, 1, 4, 1, 5, 9];

count($szamok);               // 6
sort($szamok);                // Rendezés növekvő
rsort($szamok);               // Rendezés csökkenő
array_push($szamok, 10);      // Elem hozzáadás végére
array_pop($szamok);           // Utolsó elem törlése
in_array(5, $szamok);         // true/false elem benne van-e
array_sum($szamok);           // Összeg
array_unique($szamok);        // Duplikátumok eltávolítása


// 10. KOMPLETT PÉLDA - ŰRLAP + FELDOLGOZÁS
// -----------------------------------------
?>

<!DOCTYPE html>
<html>
<head>
    <title>Példa űrlap</title>
</head>
<body>
    <!-- ŰRLAP -->
    <form method="POST" action="">
        <label>Név:</label>
        <input type="text" name="nev" required><br>
        
        <label>Email:</label>
        <input type="email" name="email" required><br>
        
        <label>Kor:</label>
        <input type="number" name="kor" required><br>
        
        <button type="submit" name="submit">Küldés</button>
    </form>

    <?php
    // FELDOLGOZÁS
    if (isset($_POST['submit'])) {
        $nev = $_POST['nev'];
        $email = $_POST['email'];
        $kor = intval($_POST['kor']);
    ?>
        
        <h3>Beküldött adatok:</h3>
        <p><strong>Név:</strong> <?php echo $nev; ?></p>
        <p><strong>Email:</strong> <?php echo $email; ?></p>
        <p><strong>Kor:</strong> <?php echo $kor; ?></p>
        
        <?php if ($kor >= 18): ?>
            <p style='color: green;'>Felnőtt felhasználó</p>
        <?php else: ?>
            <p style='color: orange;'>Kiskorú felhasználó</p>
        <?php endif; ?>
        
    <?php
    }
    ?>
</body>
</html>

<?php
// 11. HASZNOS TIPPEK
// ------------------

// Változó típus ellenőrzés
is_string($valtozo);
is_int($valtozo);
is_array($valtozo);
isset($valtozo);    // Létezik-e
empty($valtozo);    // Üres-e

// Típus konverzió
$szam = intval("42");
$tort = floatval("3.14");
$szoveg = strval(42);

// Dátum és idő
echo date("Y-m-d H:i:s");  // 2025-12-18 14:30:00

// JSON
$tomb = ["a" => 1, "b" => 2];
$json = json_encode($tomb);      // Tömb -> JSON
$vissza = json_decode($json, true);  // JSON -> Tömb
?>
