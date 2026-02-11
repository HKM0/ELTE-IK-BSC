<?php
// A kérésben érkező "code" paramétert olvassuk ki (pl. js, php, py)
$code = $_GET['code'] ?? '';

// Egy egyszerű asszociatív tömb a nyelvek adatbázisaként
$languages = [
    'js' => [
        'name' => 'JavaScript',
        'first_release' => 1995,
        'typing' => 'dinamikus, gyengén típusos',
        'description' => 'A JavaScript elsősorban weboldalak kliensoldali programozására használt nyelv, de ma már szerveren (Node.js) is elterjedt.'
    ],
    'php' => [
        'name' => 'PHP',
        'first_release' => 1995,
        'typing' => 'dinamikus, gyengén típusos',
        'description' => 'A PHP egy szerveroldali szkriptnyelv, amelyet gyakran használnak dinamikus weboldalak és webalkalmazások készítésére.'
    ],
    'py' => [
        'name' => 'Python',
        'first_release' => 1991,
        'typing' => 'dinamikus, erősen típusos',
        'description' => 'A Python általános célú, könnyen olvasható nyelv, amelyet adatfeldolgozásra, gépi tanulásra, webfejlesztésre és sok más területen használnak.'
    ],
];

// Ha nincs ilyen kód, adjunk vissza egy "ismeretlen" objektumot
if (!array_key_exists($code, $languages)) {
    $data = [
        'name' => 'Ismeretlen nyelv',
        'first_release' => '-',
        'typing' => '-',
        'description' => 'Nincs információ a kért programozási nyelvről.'
    ];
} else {
    $data = $languages[$code];
}

// Fejléc: jelezzük, hogy JSON-t küldünk vissza
header('Content-Type: application/json; charset=utf-8');

// Az adatot JSON formában adjuk vissza
echo json_encode($data, JSON_UNESCAPED_UNICODE);
