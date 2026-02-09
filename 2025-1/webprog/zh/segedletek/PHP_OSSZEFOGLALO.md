# PHP Gyakorlatok Összefoglaló

## Tartalomjegyzék
1. [Alapvető PHP szintaxis és technikák](#1-alapvető-php-szintaxis-és-technikák)
2. [Űrlapkezelés és validáció](#2-űrlapkezelés-és-validáció)
3. [Adattárolás és Storage osztály](#3-adattárolás-és-storage-osztály)
4. [CRUD műveletek](#4-crud-műveletek)
5. [Session kezelés és autentikáció](#5-session-kezelés-és-autentikáció)
6. [Jogosultságkezelés (Authorization)](#6-jogosultságkezelés-authorization)
7. [AJAX és aszinkron kommunikáció](#7-ajax-és-aszinkron-kommunikáció)

---

## 1. Alapvető PHP szintaxis és technikák

### 1.1. PHP beágyazás HTML-be

```php
<!DOCTYPE html>
<html>
<body>
    <?php
        echo "Hello világ";
    ?>
</body>
</html>
```

**Magyarázat:** A PHP kódot `<?php` és `?>` tagek közé írjuk. A szerveroldali PHP kódot a szerver értelmezi, és az eredményt HTML-ként küldi vissza a böngészőnek.

### 1.2. Rövid echo szintaxis

```php
<p><?= $aktualisIdo ?></p>
```

**Magyarázat:** A `<?= ... ?>` rövidítés ugyanaz, mint a `<?php echo ... ?>`. Kényelmes változók kiírásához.

### 1.3. Alternatív PHP szintaxis (vezérlési szerkezetek)

```php
<?php foreach($categories as $c) : ?>
    <option value="<?= $c["id"] ?>">
        <?= $c["category"] ?>
    </option>
<?php endforeach ?>
```

**Magyarázat:** HTML környezetben olvashatóbb, ha kettősponttal (`:`) és `endforeach`, `endif`, `endwhile` stb. kulcsszavakkal zárjuk a blokkokat.

### 1.4. Tömbök és adatszerkezetek

```php
// Asszociatív tömb (kulcs-érték párok)
$categories = [
  [
    "id" => 1,
    "category" => "Akció",
  ],
  [
    "id" => 2,
    "category" => "Dráma",
  ],
];
```

**Magyarázat:** Az asszociatív tömbök kulcs-érték párokat tárolnak, hasonlóan a JavaScript objektumokhoz. Ideálisak strukturált adatok kezelésére.

### 1.5. Tömb műveletek

```php
// array_filter: elemek szűrése feltétel alapján
$negative = array_filter($numbers, function($e) use ($limit) {
    return $e < $limit;
});

// array_map: transzformáció minden elemre
$trimmed = array_map('trim', $raw);

// implode: tömb elemeinek összefűzése stringgé
$emailStr = implode(", ", $c["emails"]);
```

**Magyarázat:**
- `array_filter()`: csak azokat az elemeket hagyja meg, amelyekre a feltétel igaz
- `array_map()`: minden elemre alkalmaz egy függvényt
- `implode()`: tömböt stringgé alakít (JavaScript `join()`)

### 1.6. Dátum/idő kezelés

```php
$aktualisIdo = date("Y-m-d H:i:s");
```

**Magyarázat:** A `date()` függvény formázott dátumot/időt ad vissza. Az első paraméter a formátum string.

---

## 2. Űrlapkezelés és validáció

### 2.1. GET kérések kezelése

```php
$name = $_GET['name'] ?? 'Vendég';
```

**Magyarázat:** A `$_GET` globális tömb tartalmazza az URL paramétereket. A `??` null coalescing operátor alapértelmezett értéket ad, ha a kulcs nem létezik.

### 2.2. POST kérések kezelése

```php
if (count($_POST) > 0) {
    // Űrlap feldolgozása
}
```

**Magyarázat:** A `$_POST` tömb tartalmazza az űrlap POST kérésként elküldött adatait. Mindig ellenőrizzük, hogy érkeztek-e adatok.

### 2.3. Validációs minta

```php
function validate($post, &$data, &$errors): bool
{
    $data = $post;
    
    // név ellenőrzése
    $name = trim($post['name'] ?? '');
    if ($name === '') {
        $errors['name'] = 'A név nem lehet üres!';
    } else {
        $data['name'] = filter_var($name, FILTER_SANITIZE_SPECIAL_CHARS);
    }
    
    return count($errors) === 0;
}
```

**Magyarázat:** 
- Referenciával (`&`) adjuk át a `$data` és `$errors` tömbökét, hogy módosíthatók legyenek
- `trim()`: levágja a felesleges whitespace karaktereket
- `filter_var()`: biztonságossá teszi az adatokat (XSS védekezés)
- A függvény boolean-t ad vissza: sikeres-e a validáció

### 2.4. Típusellenőrzés

```php
// Strict types deklaráció (fájl elején)
declare(strict_types=1);

function elsofoku(float $a, float $b): float
{
    return -$b / $a;
}

// Float ellenőrzés
if (filter_var($get["a"], FILTER_VALIDATE_FLOAT) === false) {
    $hibak[] = '"a" nem szám';
}
```

**Magyarázat:**
- `declare(strict_types=1)`: szigorú típusellenőrzést kapcsol be
- Type hints (pl. `float $a`): meghatározzák a paraméterek típusát
- `FILTER_VALIDATE_FLOAT`: ellenőrzi, hogy az input float-e

### 2.5. Email validáció

```php
$valid = array_values(array_filter($nonEmpty, function ($e) {
    return filter_var($e, FILTER_VALIDATE_EMAIL);
}));
```

**Magyarázat:** A `FILTER_VALIDATE_EMAIL` ellenőrzi az email formátumot (tartalmaz-e @, stb.).

### 2.6. Regex validáció

```php
$re = '/^#[0-9a-f]{6}$/i';
if (preg_match($re, $str) === 1) {
    $bgcolor = $_GET["bgcolor"];
}
```

**Magyarázat:** A `preg_match()` regex mintával ellenőrzi a stringet. Itt egy hexadecimális színkód formátumot ellenőriz.

### 2.7. Űrlap állapottartás

```php
<input type="text" name="a" value="<?= $_GET['a'] ?? '' ?>">
```

**Magyarázat:** A korábban beírt értéket visszatesszük az input mezőbe, így a felhasználó nem veszíti el az adatait hiba esetén.

### 2.8. Hibák megjelenítése

```php
<?php if (count($hibak) > 0): ?>
    <ul>
        <?php foreach ($hibak as $hiba): ?>
            <li><?= $hiba ?></li>
        <?php endforeach ?>
    </ul>
<?php endif ?>
```

**Magyarázat:** A hibákat listában jelenítjük meg az űrlap felett, így a felhasználó látja, mit kell javítania.

---

## 3. Adattárolás és Storage osztály

### 3.1. Storage osztály szerkezete

```php
interface IStorage {
    function add($record): string;
    function findById(string $id);
    function findAll(array $params = []);
    function findOne(array $params = []);
    function update(string $id, $record);
    function delete(string $id);
}

class Storage implements IStorage {
    protected $contents;
    protected $io;
    
    public function __construct(IFileIO $io, $assoc = true) {
        $this->io = $io;
        $this->contents = (array)$this->io->load($assoc);
    }
    
    public function __destruct() {
        $this->io->save($this->contents);
    }
}
```

**Magyarázat:**
- **Interface:** Meghatározza, milyen metódusokat kell implementálni
- **Konstruktor (`__construct`):** Fájlból betölti az adatokat
- **Destruktor (`__destruct`):** Automatikusan elmenti a változtatásokat, amikor az objektum megsemmisül
- **Dependency Injection:** Az `IFileIO` objektumot kívülről kapja meg

### 3.2. JSON fájlkezelés

```php
class JsonIO extends FileIO {
    public function load($assoc = true) {
        $file_content = file_get_contents($this->filepath);
        return json_decode($file_content, $assoc) ?: [];
    }

    public function save($data) {
        $json_content = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents($this->filepath, $json_content);
    }
}
```

**Magyarázat:**
- `file_get_contents()`: beolvassa a fájl tartalmát stringként
- `json_decode()`: JSON stringet alakít PHP tömbbé/objektummá
- `json_encode()`: PHP adatot alakít JSON stringgé
- `JSON_PRETTY_PRINT`: formázott, olvasható JSON-t hoz létre

### 3.3. Storage használata

```php
include_once("contactstorage.php");
$cs = new ContactStorage();
$contacts = $cs->findAll();
```

**Magyarázat:** 
- `include_once()`: betölti a fájlt, de csak egyszer
- A Storage osztály egyszerű adatbázis-szerű műveletek elvégzését teszi lehetővé fájlban

### 3.4. CRUD műveletek Storage-dzsel

```php
// Create
$id = $cs->add([
    "name" => $name,
    "emails" => $emails,
]);

// Read (egy elem)
$contact = $cs->findById($id);

// Read (összes elem)
$contacts = $cs->findAll();

// Read (szűrt elemek)
$filtered = $cs->findMany(function ($contact) {
    return $contact["creator"] === $_SESSION["user"]["id"];
});

// Update
$cs->update($id, $contact);

// Delete
$cs->delete($id);
```

---

## 4. CRUD műveletek

### 4.1. Create (Létrehozás)

```php
// add.php
if (count($_POST) > 0) {
    if (validate($_POST, $data, $errors)) {
        $cs = new ContactStorage();
        $cs->add([
            "name" => $data["name"],
            "emails" => $data["emails"],
        ]);
        header("Location: index.php");
        exit();
    }
}
```

**Magyarázat:** 
- Validáljuk az adatokat
- Ha rendben van, elmentjük a Storage-ba
- `header("Location: ...")`: átirányítás másik oldalra
- `exit()`: fontos a redirect után, megállítja a script futását

### 4.2. Read (Olvasás)

```php
// index.php - Lista
$contacts = $cs->findAll();

// detail.php - Részletek
if (!isset($_GET["id"])) {
    header("Location: index.php");
    exit();
}
$id = $_GET["id"];
$contact = $cs->findById($id);
if (!$contact) {
    header("Location: index.php");
    exit();
}
```

**Magyarázat:** 
- `findAll()`: visszaadja az összes rekordot
- `findById()`: egy konkrét rekordot keres ID alapján
- Ha nincs ID vagy nem található az elem, visszairányítunk a főoldalra

### 4.3. Update (Módosítás)

```php
// edit.php
// Betöltjük a meglévő adatokat
$contact = $cs->findById($id);

// POST esetén feldolgozzuk
if (count($_POST) > 0) {
    if (validate($_POST, $data, $errors)) {
        $contact["name"] = $data["name"];
        $contact["emails"] = $data["emails"];
        $cs->update($id, $contact);
        header("Location: index.php");
        exit();
    }
}

// Űrlap alapértelmezett értékekkel
<input type="text" name="name" value="<?= $_POST["name"] ?? $contact["name"] ?>">
```

**Magyarázat:**
- Először betöltjük a meglévő adatokat
- A POST adatokat validáljuk
- Frissítjük a rekordot
- Az űrlapban: POST adat > meglévő adat > üres string (priorizálási sorrend)

### 4.4. Delete (Törlés)

```php
// delete.php
if (!isset($_GET["id"])) {
    header("Location: index.php");
    exit();
}
$id = $_GET["id"];
$cs = new ContactStorage();
$cs->delete($id);
header("Location: index.php");
exit();
```

**Magyarázat:** Egyszerűen töröljük az elemet ID alapján, majd visszairányítunk.

---

## 5. Session kezelés és autentikáció

### 5.1. Session indítása

```php
session_start();
```

**Magyarázat:** **MINDEN** olyan oldal tetején kell, amely használja a session-t. Ez biztosítja, hogy a szerver és kliens között session kapcsolat jöjjön létre.

### 5.2. Session adatok használata

```php
// Írás
$_SESSION["user"] = $user;

// Olvasás
if (isset($_SESSION["user"])) {
    $current_user = $_SESSION["user"];
}

// Törlés
unset($_SESSION["user"]);
```

**Magyarázat:** A `$_SESSION` egy globális asszociatív tömb, ami kérések között is megőrzi az adatokat. Ideális felhasználói adatok tárolására.

### 5.3. Auth osztály

```php
class Auth
{
    private $user_storage;
    private $user = NULL;

    public function __construct(IStorage $user_storage) {
        $this->user_storage = $user_storage;
        if (isset($_SESSION["user"])) {
            $this->user = $_SESSION["user"];
        }
    }
}
```

**Magyarázat:** 
- Az Auth osztály kezeli a bejelentkezést, regisztrációt, kijelentkezést
- Konstruktorban ellenőrzi, van-e már bejelentkezett felhasználó a session-ben

### 5.4. Regisztráció

```php
public function register($data)
{
    $user = [
        'username'  => $data['username'],
        'password'  => password_hash($data['password'], PASSWORD_DEFAULT),
        'fullname'  => $data['fullname'],
        "roles"     => ["user"],
    ];
    return $this->user_storage->add($user);
}
```

**Magyarázat:**
- **`password_hash()`**: Biztonságosan hash-eli a jelszót (bcrypt algoritmus)
- **SOHA** ne tároljunk plain text jelszót!
- Alapértelmezetten `user` szerepkört kap

### 5.5. Bejelentkezés (Authentication)

```php
public function authenticate($username, $password)
{
    $user = $this->user_storage->findOne(['username' => $username]);
    if (!$user || !password_verify($password, $user['password'])) {
        return NULL;
    }
    return $user;
}

public function login($user)
{
    $this->user = $user;
    $_SESSION["user"] = $user;
}
```

**Magyarázat:**
- `authenticate()`: ellenőrzi a username-password párost
- `password_verify()`: összehasonlítja a megadott jelszót a hash-elt változattal
- `login()`: beállítja a session-t

### 5.6. Kijelentkezés

```php
public function logout()
{
    $this->user = NULL;
    unset($_SESSION["user"]);
}
```

**Magyarázat:** Törli a felhasználót a session-ből és az objektum tulajdonságból.

### 5.7. Bejelentkezés ellenőrzése

```php
public function is_authenticated()
{
    return !is_null($this->user);
}

// Használat
if (!$auth->is_authenticated()) {
    redirect("login.php");
}
```

**Magyarázat:** Ellenőrzi, hogy van-e bejelentkezett felhasználó. Ha nincs, átirányítjuk a login oldalra.

### 5.8. Username ellenőrzés (foglaltsági ellenőrzés)

```php
public function user_exists($username)
{
    $user = $this->user_storage->findOne(['username' => $username]);
    return !is_null($user);
}
```

**Magyarázat:** Regisztráció előtt ellenőrzi, hogy a felhasználónév még szabad-e.

---

## 6. Jogosultságkezelés (Authorization)

### 6.1. Szerepkörök (Roles)

```php
$user = [
    'username'  => 'admin',
    'password'  => '...',
    'roles'     => ["user", "admin"],
];
```

**Magyarázat:** Egy felhasználónak több szerepköre is lehet (user, admin, moderator, stb.).

### 6.2. Jogosultság ellenőrzése

```php
public function authorize($roles = []): bool
{
    // Nincs bejelentkezve
    if (!$this->is_authenticated()) {
        return false;
    }

    // Nincs meghatározott szerepkör → elég a bejelentkezés
    if (empty($roles)) {
        return true;
    }

    $user = $this->authenticated_user();
    
    // Nincs roles mező
    if (!isset($user['roles']) || !is_array($user['roles'])) {
        return false;
    }

    // Van-e közös elem a két tömbben?
    return count(array_intersect($roles, $user['roles'])) > 0;
}
```

**Magyarázat:**
- `array_intersect()`: visszaadja a két tömb közös elemeit
- Ha van közös szerepkör, a felhasználó jogosult

### 6.3. Jogosultság használata

```php
// Csak bejelentkezettek számára
if (!$auth->authorize()) {
    redirect("login.php");
}

// Csak admin-ok számára
if (!$auth->authorize(['admin'])) {
    redirect("index.php");
}
```

### 6.4. Felhasználóhoz kötött adatok szűrése

```php
$contacts = $cs->findMany(function ($contact) {
    return $contact["creator"] === $_SESSION["user"]["id"];
});
```

**Magyarázat:** Csak azokat a névjegyeket jeleníti meg, amelyeket a bejelentkezett felhasználó hozott létre.

---

## 7. AJAX és aszinkron kommunikáció

### 7.1. AJAX alapok

**AJAX (Asynchronous JavaScript And XML):** Lehetővé teszi, hogy a böngésző a háttérben, az oldal újratöltése nélkül kommunikáljon a szerverrel.

### 7.2. Egyszerű AJAX kérés (fetch)

```javascript
fetch("index.php")
    .then(response => response.text())
    .then(data => {
        document.querySelector("#result").innerText = "Szerveridő: " + data;
    });
```

**Magyarázat:**
- `fetch()`: aszinkron HTTP kérést küld
- `response.text()`: a választ szövegként dolgozza fel
- Az oldal nem töltődik újra, csak a megadott elem tartalma frissül

### 7.3. PHP backend egyszerű válaszhoz

```php
// index.php
echo date("Y-m-d H:i:s");
```

**Magyarázat:** A PHP csak az aktuális időt adja vissza, amit a JavaScript megjelenít.

### 7.4. AJAX JSON adatokkal

```javascript
// JavaScript
const code = select.value;
const url = `language.php?code=${encodeURIComponent(code)}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const html = `
            <p><strong>Név:</strong> ${data.name}</p>
            <p><strong>Első megjelenés éve:</strong> ${data.first_release}</p>
        `;
        resultDiv.innerHTML = html;
    });
```

**Magyarázat:**
- `encodeURIComponent()`: biztonságosan kódolja az URL paramétert
- `response.json()`: a választ JSON-ként dolgozza fel (JavaScript objektum lesz belőle)
- Sablonliteral (template string) használata HTML generáláshoz

### 7.5. PHP JSON válasz

```php
// language.php
$languages = [
    'js' => [
        'name' => 'JavaScript',
        'first_release' => 1995,
        'typing' => 'dinamikus, gyengén típusos',
        'description' => '...',
    ],
];

$code = $_GET['code'] ?? '';
$data = $languages[$code] ?? ['name' => 'Ismeretlen'];

header('Content-Type: application/json; charset=utf-8');
echo json_encode($data, JSON_UNESCAPED_UNICODE);
```

**Magyarázat:**
- `header()`: beállítja a válasz Content-Type-ját JSON-re
- `JSON_UNESCAPED_UNICODE`: magyar ékezetes karakterek megjelennek helyesen
- A PHP JSON objektumot ad vissza, amit a JavaScript feldolgoz

### 7.6. AJAX előnyei

- **Nincs teljes oldalbetöltés:** Csak a szükséges adat frissül
- **Gyorsabb felhasználói élmény:** Nem kell várni az oldal teljes újratöltésére
- **Interaktivitás:** Modern, dinamikus webalkalmazások alapja
- **Csökkentett adatforgalom:** Csak a szükséges adatot kérjük le

---

## Összefoglalás: Legfontosabb technikák

| Technika | Használat | Lényeg |
|----------|-----------|--------|
| **PHP beágyazás** | `<?php ... ?>` | Szerveroldali kód HTML-ben |
| **Űrlapkezelés** | `$_GET`, `$_POST` | Adatok fogadása kliens felől |
| **Validáció** | `filter_var()`, `trim()` | Biztonságos adatkezelés |
| **Storage osztály** | JSON fájl mint adatbázis | Egyszerű adattárolás |
| **CRUD** | Create, Read, Update, Delete | Alapvető adatműveletek |
| **Session** | `$_SESSION` | Felhasználói adatok tárolása kérések között |
| **Auth** | `password_hash()`, `password_verify()` | Biztonságos bejelentkezés |
| **Authorization** | Roles + `authorize()` | Jogosultságkezelés |
| **AJAX** | `fetch()` + JSON | Aszinkron kommunikáció |

---

## Fájlstruktúra példa egy teljes alkalmazásra

```
projekt/
├── index.php              # Főoldal (listázás)
├── add.php                # Új elem hozzáadása
├── edit.php               # Elem módosítása
├── detail.php             # Elem részletei
├── delete.php             # Elem törlése
├── login.php              # Bejelentkezés
├── register.php           # Regisztráció
├── logout.php             # Kijelentkezés
├── storage.php            # Storage osztályok (JSON, Serialize)
├── contactstorage.php     # Konkrét ContactStorage osztály
├── userstorage.php        # UserStorage osztály
├── auth.php               # Auth osztály (bejelentkezés, regisztráció)
├── utils.php              # Segédfüggvények (pl. redirect())
├── contacts.json          # Névjegyek tárolása
└── users.json             # Felhasználók tárolása
```

---

## Hasznos PHP függvények összefoglaló

### String műveletek
- `trim()` - whitespace eltávolítása
- `strlen()` - string hossza
- `substr()` - részstring kivágása
- `str_contains()` - tartalmaz-e egy stringet (PHP 8+)
- `implode()` - tömb → string
- `explode()` - string → tömb

### Tömb műveletek
- `array_filter()` - szűrés feltétel alapján
- `array_map()` - transzformáció minden elemre
- `array_values()` - értékek újraindexelése
- `array_keys()` - kulcsok lekérése
- `array_intersect()` - közös elemek
- `count()` - tömb mérete
- `in_array()` - elem benne van-e

### Validáció és szűrés
- `filter_var($x, FILTER_VALIDATE_EMAIL)` - email ellenőrzés
- `filter_var($x, FILTER_VALIDATE_FLOAT)` - szám ellenőrzés
- `filter_var($x, FILTER_SANITIZE_SPECIAL_CHARS)` - XSS védelem
- `preg_match()` - regex illesztés

### Jelszó kezelés
- `password_hash($pass, PASSWORD_DEFAULT)` - jelszó hash-elés
- `password_verify($pass, $hash)` - jelszó ellenőrzés

### Fájl műveletek
- `file_get_contents()` - fájl beolvasása
- `file_put_contents()` - fájl írása
- `json_encode()` - PHP → JSON
- `json_decode()` - JSON → PHP

### HTTP műveletek
- `header("Location: ...")` - átirányítás
- `header("Content-Type: ...")` - válasz típus beállítása
- `exit()` - script futásának azonnali leállítása

---

**Készítette:** Összefoglaló a PHP gyakorlatok alapján  
**Utolsó frissítés:** 2025. december 18.
