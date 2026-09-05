# Csomagkezelők

## Composer - PHP (fő repo: Packagist)

Új projekt: `composer init`

Projektleíró file: `composer.json`

Lock file (pontosabban rögzíti az állapotot - verzió, URL, checksum, stb.):`composer.lock`

Új függőség telepítése: `composer require (csomagnév)`

Függőségek letöltése (hiányzik a `vendor` mappa): `composer install`

**FONTOS!** A `vendor` mappában vannak a külső csomagok, így azt megpiszkálni TILOS, feltölteni bárhova pedig butaság! (.gitignore!!!)

A kódban a függőségek betöltése autoloader segítségével történik, a mágikus sor hozzá:
`require_once(__DIR__ . "/../vendor/autoload.php");`

## NPM - Node (fő repo: npmjs)

Új projekt:
`npm init`

Projektleíró file: `package.json`

Lock file (pontosabban rögzíti az állapotot - verzió, URL, checksum, stb.): `package-lock.json`

Új függőség telepítése:
`npm i (csomagnév)`

Függőségek letöltése (hiányzik a `node_modules` mappa):
`npm i` (igen, ugyanaz mint az előző, csak nem adunk meg csomagot)

**FONTOS!** A `node_modules` mappában vannak a külső csomagok, így azt megpiszkálni TILOS, feltölteni bárhova pedig butaság! (.gitignore!!!)

A kódban a függőségek betöltése tipikusan kézzel történik, a megfelelő modul CommonJs vagy ECMAScript modulként hivatkozásával. A két modulrendszert ne keverjük!

```js
// CommonJS (CJS) - régebbi, a Node.js eredeti modulrendszere
const { faker } = require('@faker-js/faker');

// ECMAScript Module (ESM) - újabb, a standard része
import { faker } from '@faker-js/faker';
```
## Laravel projekt (új, saját) elkezdése

```sh
composer global require laravel/installer
laravel new myblog
```
(válaszok az órán: none, Pest, sqlite, yes)

```sh
cd myblog
composer run dev
```

Breeze (elsősorban auth céljából):
```sh
composer require laravel/breeze
php artisan breeze:install
```
## SOS! Letöltöttem a repoból a projektet, de nem megy!

```sh
composer install
```
Letölti és telepíti a PHP függőségeket a `composer.json` és `composer.lock` alapján a `vendor/` mappába.

```sh
npm i
```
Letölti és telepíti a frontend (Node.js) függőségeket a `package.json` alapján a `node_modules/` mappába.

```sh
cp .env.example .env
```
Lemásolja a konfigurációs sablont `.env` néven, amelyben a helyi környezet beállításai találhatók.

```sh
php artisan key:generate
```
Generál egy egyedi alkalmazáskulcsot (`APP_KEY`) a `.env` fájlba.

```sh
php artisan migrate
```
Lefuttatja az adatbázis migrációkat, és létrehozza a szükséges táblákat.

```sh
php artisan db:seed
```
Feltölti az adatbázist kezdeti adatokkal a seederek alapján.

```sh
php artisan storage:link
```
Létrehoz egy szimbolikus linket a `public/storage` és a `storage/app/public` között.

```sh
composer run dev
```
Elindítja a fejlesztői környezetet (Laravel szerver + Vite).

## Artisan parancsok

### Modellek és migrációk generálása

Új modell generálása:

```sh
php artisan make:model
```

**Modell neve egyesszámban és nagy kezdőbetűvel van megállapodás szerint!** (pl. `Post`)

Válasszuk ki, hogy migrációt is kérünk, ha még nincs meg hozzá a tábla az adatbázisban.

Új migráció generálása: (pl. kapcsolótáblához kell migráció, de modell nem, mert a kapcsolatot be tudjuk járni a két összekötött modellben létrehozandó metódusokkal)

```sh
php artisan make:migration
```

Migráció neve pl. `create_foos_table` formátumú + elé teszi az aktuális időbélyeget automatikusan.

(Kapcsolótábla konvenció szerinti elnevezése: `bar_foo`, de ettől el lehet térni, csak tudni kell felparaméterezni a kapcsolatot.)

## Migrációk futtatása

Minden még nem futtatott migráció:

```sh
php artisan migrate
```

Vigyázzunk, ha időközben belemódosítunk egy már futtatott migrációba (bad practice), akkor az nem érvényesül!

Minden migráció tiszta lappal (szálljunk ki és be):

```sh
php artisan migrate:fresh
```

Migráció visszavonása:

```sh
php artisan migrate:rollback
```

Migrációk státuszának lekérdezése:

```sh
php artisan migrate:status
```
### Factory és seeder

Új factory generálása:

```sh
php artisan make:factory
```

Adatbázis seedelése DatabaseSeeder.php futtatásával:

```sh
php artisan db:seed
```

Migrációk tiszta lappal és DatabaseSeeder.php futtatása:

```sh
php artisan migrate:fresh --seed
```

