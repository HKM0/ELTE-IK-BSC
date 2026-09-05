### 2026. április 8.

## Az óra anyaga (Összefoglaló)

A 8. gyakorlat során befejeztük a webes felülethez tartozó jogosultságkezelést (Policy), továbbfejlesztettük a képfeltöltés validációját, és megkezdtük az alkalmazás API (alkalmazásprogramozási felület) alapjainak lefektetését. A legfontosabb lépések a következők voltak:

1. **Jogosultságok kezelése (Policies)**
   - Létrehoztunk egy `PostPolicy` osztályt, amellyel központosítva kezeljük a bejegyzésekhez tartozó jogosultságokat.
   - Megszabtuk, hogy posztot bárki létrehozhat (`create`), aki be van jelentkezve.
   - Módosítani (`update`) és törölni (`delete`) azonban csak az a felhasználó tud, aki a poszt szerzője (`$post->author_id === $user->id`), vagy aki adminisztrátor (`$user->is_admin`).

2. **Képfeltöltés validációja**
   - A `PostStoreOrUpdateRequest` osztályban kiegészítettük a szabályokat: az `image_file` mező opcionális, de ha van, akkor csak kép (`image`) lehet, formátuma `jpeg, png` vagy `gif` lehet (`mimetypes`), és maximum mérete 2 MB lehet (`max:2048`).
   - Ezekhez a feltételekhez egyedi, magyar nyelvű hibaüzeneteket társítottunk a `messages` metódusban, amiket a nézetekben (`@error('image_file')`) meg is jelenítünk.

3. **Visszajelző üzenetek bővítése**
   - A bejegyzések listájánál (`index.blade.php`) a sikeres létrehozás mellett felkészítettük a felületet a sikeres módosítás (`post-updated`) és a sikeres törlés (`post-deleted`) után megjelenő flash üzenetek kezelésére is.

4. **API Fejlesztés Alapjai (Sanctum Autentikáció)**
   - Telepítettük a Laravel API és Sanctum komponenseit (`php artisan install:api`), ami legenerálta a szükséges konfigurációkat (`sanctum.php`), migrációkat (`personal_access_tokens` tábla) és az API útvonalfájlt (`routes/api.php`).
   - A `User` modellt kibővítettük a `HasApiTokens` trait-tel, ami képessé tette a felhasználókat tokenek generálására.
   - Készítettünk egy `ApiController`-t, amiben megírtuk a `login` végpont logikáját. Ez email és jelszó alapján hitelesíti a felhasználót, siker esetén pedig legenerál és visszaad egy **Sanctum API tokent** JSON formátumban.

5. **JSON API Válaszok Kikényszerítése (Middleware)**
   - Létrehoztunk egy egyedi `ForceJsonApiResponseMiddleware` middleware-t. 
   - Ez biztosítja, hogy minden `/api/*` végpontra érkező kérés (még ha a kliens nem is kéri kifejezetten) megkapja az `Accept: application/json` fejlécet. Ez azért fontos, mert így validációs hibák vagy jogosultsági problémák esetén a Laravel nem egy webes HTML hibaoldalt, hanem szabályos JSON hibaüzenetet fog visszaadni.
   - Ezt a middleware-t a `bootstrap/app.php` fájlban regisztráltuk a rendszerbe.

6. **API Erőforrások (Resources)**
   - Előkészítettük a `PostResource` osztályt (`php artisan make:resource`), amivel a jövőben formázni fogjuk a posztok adatait, mielőtt API válaszként JSON-ben kiküldenénk azokat.