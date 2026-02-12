# Szerver oldali webprogramozás - 01. gyakorlat

## Composer használata

### Projekt inicializálása

```bash
composer init
```

A Composer config generátor végigvezet a `composer.json` fájl létrehozásán:

```
Welcome to the Composer config generator  

This command will guide you through creating your composer.json config.

Package name (<vendor>/<name>) [herce/test]: 
Description []: 
Author [HK <179970062+HKM0@users.noreply.github.com>, n to skip]: heki
Minimum Stability []: dev
Package Type (e.g. library, project, metapackage, composer-plugin) []: project
License []: proprietary

Define your dependencies.

Would you like to define your dependencies (require) interactively [yes]? no
Would you like to define your dev dependencies (require-dev) interactively [yes]? no
Add PSR-4 autoload mapping? Maps namespace "Herce\Test" to the entered relative path. [src/, n to skip]: n

{
    "name": "herce/test",
    "type": "project",
    "license": "proprietary",
    "authors": [
        {
            "name": "heki"
        }
    ],
    "minimum-stability": "dev",
    "require": {}
}

Do you confirm generation [yes]? yes
```

### Külső csomag telepítése

GitHub repo importálása:

```bash
composer require alrik11es/cowsayphp
```

### Fontos megjegyzések

- **vendor** és **node_modules** mappákat nem módosítod, nem adod be beadandóban és nem töltöd fel sehova
- A **vendor** mappa törlése után a `composer install` parancs rekonstruálja
- `.gitignore` fájlt használunk, hogy ne kerüljön fel verziókezelésre

---

## Node.js projekt inicializálása

```bash
npm init
```

Mindenre **Enter**-t nyomunk, csak az utolsó volt **yes**, hogy elfogadjuk.

---

## Fake teszt adatok generálása

### Faker.js telepítése

Dokumentáció: https://www.npmjs.com/package/@faker-js/faker

```bash
npm install --save-dev @faker-js/faker
```

> **Megjegyzés:** Itt vagy talál vagy nem talál sérülékenységet, ha talál, a csomagot frissíteni kell.

### Példa használat

A gyökérben létrehoztuk az `index.js` fájlt:

```javascript
const {fakerHU: faker} = require("@faker-js/faker");

for (let i = 0; i < 10; i++) {
    console.log(faker.person.fullName());
    console.log(faker.location.city());
}
```

Ez 10 darab random embert és várost ad meg.

---

## Futtatás

### PHP fájl futtatása
```bash
php src/cow.php
```

### Node.js fájl futtatása
```bash
node ./index.js
```

---

## Feladatok

1. **Telefonszámok hozzáadása:** Telefonszámokat is random generálj.
2. **Új ASCII art:** A tehén mintájára rajzolj ki mást is.