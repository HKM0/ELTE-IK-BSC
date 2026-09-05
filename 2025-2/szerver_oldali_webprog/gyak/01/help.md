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
