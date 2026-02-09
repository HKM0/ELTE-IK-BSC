# JavaScript DOM Műveletek és Függvények Összefoglaló

## 1. Elem Kiválasztás (Selector Functions)

### `document.querySelector()`
Egyetlen elemet választ ki CSS szelektor alapján.

```javascript
const form = document.querySelector("form");
const divContainer = document.querySelector(".container");
const inputGuess = document.querySelector("#inputGuess");
```

### `document.querySelectorAll()`
Minden egyező elemet kiválaszt, NodeList-et ad vissza.

```javascript
const szelektorok = document.querySelectorAll("input[type=range]");
const selectedRows = videoTableBody.querySelectorAll('tr.selected');
```

### `element.querySelector()` / `element.querySelectorAll()`
Elemeken belüli keresés.

```javascript
divContainer.querySelector(`label[for=${e.id}]`);
const tableHeader = videoTable.querySelector('thead');
```

### `element.closest()`
Megkeresi a legközelebbi szülő elemet, amely megfelel a szelektornak.

```javascript
const row = e.target.closest('tr');
const th = e.target.closest('th');
```

---

## 2. Eseménykezelés (Event Handling)

### `addEventListener()`
Eseményfigyelő hozzáadása elemhez.

```javascript
// Submit esemény
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Alapértelmezett művelet megakadályozása
    // ...
});

// Input esemény
form.addEventListener("input", update);

// Click esemény
videoTable.addEventListener("click", (e) => {
    const row = e.target.closest('tr');
    // ...
});

// Gomb kattintás
btnAdd.addEventListener('click', () => {
    // ...
});
```

---

## 3. Elem Tulajdonságok és Attribútumok

### `element.value`
Input mező értékének lekérdezése/beállítása.

```javascript
const amount = parseFloat(viewInput.value) || 0;
if (inputGuess.value.length !== 5) {
    // ...
}
```

### `element.innerHTML`
HTML tartalom lekérdezése/beállítása.

```javascript
divTheWord.innerHTML = selected_word;
spanError.innerHTML = "The length of the word is not 5!";
videoTable.innerHTML += `<tr><td>${data[i].year}</td>...`;
```

### `element.style`
CSS stílus tulajdonságok beállítása.

```javascript
divContainer.querySelector(`label[for=${e.id}]`).style.width = `${ci_ertekek[i]/M*100}%`;
divEndOfGame.style.display = "block";
```

### `element.dataset`
Data attribútumok elérése.

```javascript
M = M + parseInt(elem.dataset.consumption); // data-consumption attribútum
const ci = (e.value/e.max) * Number(e.dataset.consumption);
```

### `element.classList`
CSS osztályok kezelése.

```javascript
row.classList.toggle('selected'); // Osztály hozzáadása/eltávolítása
```

### Egyéb attribútumok
```javascript
e.max          // Input max attribútum
e.id           // Elem azonosító
row.cells[2]   // Táblázat cella elérése
```

---

## 4. Tömb Műveletek (Array Methods)

### `forEach()`
Tömb elemeinek bejárása.

```javascript
szelektorok.forEach(elem => {
    M = M + parseInt(elem.dataset.consumption);
});

selectedRows.forEach(row => {
    // ...
});
```

### `map()`
Tömb átalakítása új tömbbé.

```javascript
sum = data.map(x => x.views).reduce((acc, a) => acc + a, 0);
```

### `reduce()`
Tömb összesítése egyetlen értékké.

```javascript
sum = data.map(x => x.views).reduce((acc, a) => acc + a, 0);
// acc: akkumulátor, a: aktuális érték
```

### `split()`
String felosztása tömbbé.

```javascript
const tipplet = inputGuess.value.split("");
const kitalalt = selected_word.split("");
```

### `join()`
Tömb összefűzése stringgé.

```javascript
const newRow = `<tr><td>${tipplet.join("")}</td>...`;
```

### `includes()`
Ellenőrzi, hogy egy érték szerepel-e a tömbben.

```javascript
if (!wordList.includes(inputGuess.value)) {
    spanError.innerHTML = "The word is not considered acceptable!";
}
```

### `sort()`
Tömb rendezése.

```javascript
// Számok szerint csökkenő
data.sort((a, b) => b.year - a.year);
data.sort((a, b) => b.views - a.views);

// Szöveg szerint csökkenő (Z-A)
data.sort((a, b) => b.title.localeCompare(a.title));
```

### `Array.from()`
NodeList vagy más iterálható objektum tömbbé alakítása.

```javascript
const rowIndex = Array.from(allRows).indexOf(row);
const columnIndex = Array.from(cells).indexOf(th);
```

---

## 5. Matematikai és Számítási Függvények

### `Math.random()`, `Math.floor()`
Véletlen számok generálása.

```javascript
function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

selected_word = wordList[random(0, wordList.length - 1)];
```

### `parseInt()`, `parseFloat()`, `Number()`
String számmá alakítása.

```javascript
M = M + parseInt(elem.dataset.consumption);
const amount = parseFloat(viewInput.value) || 0;
const ci = (e.value/e.max) * Number(e.dataset.consumption);
```

---

## 6. String Műveletek

### Template Literals (Backtick strings)
Dinamikus string létrehozása.

```javascript
const newRow = `<tr><td>${tipplet.join("")}</td><td>${count}</td></tr>`;
divContainer.querySelector(`label[for=${e.id}]`).style.width = `${ci_ertekek[i]/M*100}%`;
```

### `localeCompare()`
Stringek összehasonlítása (nyelvi szabályok szerint).

```javascript
data.sort((a, b) => b.title.localeCompare(a.title));
```

---

## 7. Feltételes Logika és Ciklusok

### For ciklus
```javascript
for (i = 0; i < szelektorok.length; i++) {
    const e = szelektorok[i];
    ci_ertekek[i] = (e.value/e.max) * Number(e.dataset.consumption);
}

for (let i = 0; i < 5; i++) {
    if (tipplet[i] === kitalalt[i]) {
        count++;
    }
}
```

### If-else feltételek
```javascript
if (inputGuess.value.length !== 5) {
    spanError.innerHTML = "The length of the word is not 5!";
    return;
}

if (data[rowIndex].views < 0) {
    data[rowIndex].views = 0;
}

if (selectedRows.length > 0) {
    // Van kijelölt videó
} else {
    // Nincs kijelölt videó
}
```

---

## 8. Függvény Definíciók

### Hagyományos függvény
```javascript
function update() {
    // ...
}

function updateSum() {
    let sum = 0;
    // számítások
    sumSpan.innerHTML = sum;
}
```

### Arrow function (nyíl függvény)
```javascript
btnAdd.addEventListener('click', () => {
    // ...
});

szelektorok.forEach(elem => {
    M = M + parseInt(elem.dataset.consumption);
});
```

---

## 9. Gyakorlati Példák Feladatonként

### 2022-23-1_savings (Energiafogyasztás diagram)
**Cél:** Dinamikus diagram készítése csúszkák alapján.

```javascript
// Összes input kiválasztása és összegzés
const szelektorok = document.querySelectorAll("input[type=range]");
var M = 0;
szelektorok.forEach(elem => {
    M = M + parseInt(elem.dataset.consumption);
});

// Diagram frissítése
for (i = 0; i < szelektorok.length; i++) {
    const e = szelektorok[i];
    const ci = (e.value/e.max) * Number(e.dataset.consumption);
    divContainer.querySelector(`label[for=${e.id}]`).style.width = `${ci/M*100}%`;
}

// Input esemény figyelése
form.addEventListener("input", update);
```

### 2022-23-1-jav_word-game (Wordle játék)
**Cél:** Szókitaláló játék implementálása.

```javascript
// Véletlen szó kiválasztása
selected_word = wordList[random(0, wordList.length - 1)];

// Validáció
if (inputGuess.value.length !== 5) {
    spanError.innerHTML = "The length of the word is not 5!";
    return;
}

// Egyezések számolása
const tipplet = inputGuess.value.split("");
const kitalalt = selected_word.split("");
let count = 0;
for (let i = 0; i < 5; i++) {
    if (tipplet[i] === kitalalt[i]) {
        count++;
    }
}

// Sor beszúrása táblázatba
const newRow = `<tr><td>${tipplet.join("")}</td><td>${count}</td></tr>`;
tableGuesses.innerHTML = newRow + tableGuesses.innerHTML;
```

### 2024-25-2-2_videolist (Videólista kezelés)
**Cél:** Interaktív táblázat kijelöléssel, szerkesztéssel és rendezéssel.

```javascript
// Táblázat generálása
for (let i = 0; i < data.length; i++) {
    videoTable.innerHTML += `<tr><td>${data[i].year}</td><td>${data[i].title}</td><td>${data[i].views} millió</td></tr>`;
}

// Kijelölés toggle-lel
videoTable.addEventListener("click", (e) => {
    const row = e.target.closest('tr');
    if (row && row.parentElement === videoTableBody) {
        row.classList.toggle('selected');
        updateSum();
    }
});

// Kijelölt sorok összegzése
const selectedRows = videoTableBody.querySelectorAll('tr.selected');
selectedRows.forEach((row, index) => {
    const allRows = videoTableBody.querySelectorAll('tr');
    const rowIndex = Array.from(allRows).indexOf(row);
    sum += data[rowIndex].views;
});

// Rendezés
data.sort((a, b) => b.year - a.year); // Csökkenő sorrend
```

---

## 10. Gyakori Minták és Tippek

### Delegált eseménykezelés
```javascript
// Szülő elemen figyelünk, gyerek elemre reagálunk
videoTable.addEventListener("click", (e) => {
    const row = e.target.closest('tr');
    if (row && row.parentElement === videoTableBody) {
        // ...
    }
});
```

### Korai kilépés (early return)
```javascript
if (inputGuess.value.length !== 5) {
    spanError.innerHTML = "The length of the word is not 5!";
    return; // Kilépés a függvényből
}
```

### Default érték beállítása
```javascript
const amount = parseFloat(viewInput.value) || 0; // Ha NaN, akkor 0
```

### Elem reset és kijelölés
```javascript
e.preventDefault();           // Alapértelmezett művelet megakadályozása
inputGuess.select();         // Szöveg kijelölése input mezőben
spanError.innerHTML = "";    // Elem tartalmának törlése
```

---

## Összefoglalás

Ez a dokumentum tartalmazza a három DOM gyakorlati feladatban használt legfontosabb JavaScript függvényeket és mintákat:
- Elem kiválasztás és manipuláció
- Eseménykezelés
- Tömb műveletek és adatfeldolgozás
- Dinamikus HTML generálás
- Feltételes logika és ciklusok

Minden példa valós feladatokból származik és működő kódot tartalmaz.
