### 2026. március 25.

## Az óra anyaga (Összefoglaló)

A 7. gyakorlat fókuszában a jogosultságkezelés, a fájlfeltöltés (képfeltöltés), valamint a bejegyzések törlésének implementálása állt. A legfontosabb megvalósított funkciók és módosítások a következők voltak:

1. **Jogosultságkezelés (Authorization / Gates)**
   - A `PostController` módosító metódusaiban (`create`, `store`, `edit`, `update`, `destroy`) bevezettük a `Gate::authorize()` hívásokat. Ezzel biztosítjuk, hogy csak a megfelelő jogosultsággal rendelkező felhasználók (például egy poszt létrehozásához engedéllyel rendelkezők, vagy a poszt szerzője) tudjanak műveleteket végrehajtani.
   - A nézetekben (pl. `show.blade.php`) a `@can` és `@endcan` Blade direktívák segítségével feltételesen jelenítjük meg a "Szerkesztés" és "Törlés" gombokat, így a felület csak azt mutatja, amihez az adott felhasználónak joga van.

2. **Fájlfeltöltés (Kép csatolása a bejegyzésekhez)**
   - **Adatbázis módosítás:** Készítettünk egy új migrációt, amellyel egy nullable `image` oszlopot adtunk a `posts` táblához, valamint a `Post` modellben ezt hozzáadtuk a `$fillable` tömbhöz.
   - **Űrlap módosítása:** A `create.blade.php` fájlban a form megkapta az `enctype="multipart/form-data"` attribútumot, ami elengedhetetlen a fájlok (bináris adatok) beküldéséhez.
   - **Feltöltés kezelése a Controllerben:** A `store` metódusban megvizsgáljuk, hogy érkezett-e fájl (`hasFile`). Ha igen, egy egyedi azonosító (`Str::uuid()`) és az eredeti kiterjesztés segítségével új fájlnevet generálunk, majd a `Storage` homlokzat (facade) segítségével elmentjük a `public` lemezre (disk).
   - **Kép megjelenítése:** A `show.blade.php` nézetben ellenőrizzük, hogy van-e kép, és ha igen, a `Storage::disk('public')->url()` metódussal generált URL-en keresztül jelenítjük meg azt. Ehhez szükséges a `php artisan storage:link` parancs futtatása is, ami egy szimbolikus link segítségével a szerver számára publikusan elérhetővé teszi a biztonságos privát tárat (storage).

3. **Biztonság és Refaktorálás**
   - **Szerző (Author) biztonságos rögzítése:** A poszt létrehozásakor (`store` metódus) már nem az űrlapról kapjuk a szerző azonosítóját (ami manipulálható lenne egy rosszindulatú felhasználó által), hanem szerveroldalon, biztonságosan állítjuk be az aktuálisan bejelentkezett felhasználó azonosítója alapján (`Auth::user()->id`).
   - **Kategóriák intelligens kijelölése:** Az `edit.blade.php`-ban a korábban már kiválasztott kategóriák checkboxainak visszapipálását Eloquent és Collection láncolt hívásokkal (`$post->categories->pluck('id')->toArray()`) oldottuk meg.

4. **Törlés (Delete) művelet implementálása**
   - A `PostController` `destroy` metódusában megvalósítottuk a bejegyzések tényleges törlését (`$post->delete()`), és egy *flash* üzenettel értesítjük a felhasználót a sikeres műveletről, miután átirányítottuk a listanézetre.
   - A `show.blade.php` nézetben a törlés gombot egy apró `<form>` segítségével hoztuk létre. Ez tartalmazza a CSRF tokent, és a HTTP metódus hamisítás (method spoofing) – `@method('DELETE')` – segítségével jelzi a szervernek a törlési szándékot.