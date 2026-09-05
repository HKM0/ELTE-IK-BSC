 # 2. gyakorlat - PWA: folyamatsáv és rendezhető táblázat

**2025-02-20** • 4 perc olvasási idő • [GitHub]()

## Bevezetés

Ezen a gyakorlaton az előző órai landing page projektet bővítettük tovább, majd egy teljesen új PWA-alkalmazást kezdtünk el: egy rendezhető táblázatot.

A gyakorlat két nagyobb részre osztható:

- **Folyamatsáv (progress bar):** az előző órai kód folytatása - görgetés mértékét jelezzük egy animált sávval az oldal tetején
- **Rendezhető táblázat:** először a hagyományos, „procedurális” megközelítéssel építettük fel a logikát, majd ugyanezt refaktoráltuk JavaScript osztályok segítségével

## 1. feladat: Olvasási folyamatsáv

> **Feladat:** Helyezz el egy olvasási folyamatsávot az oldal tetején. A gördítés mértéke szerint változzon 0 és 100% között a szélessége!

### A sáv létrehozása JavaScript-ből

A sávot teljes egészében JavaScript-ből hozzuk létre, ez azt demonstrálja, hogy a DOM-ban nemcsak meglévő elemeket módosíthatunk, hanem újakat is injektálhatunk:

```javascript
const progressWrapper = document.createElement("div");
progressWrapper.style = "position: fixed; width: 100%; z-index: 2000;";

progressWrapper.innerHTML = `
    <div
        id="progressBar"
        style="height: 4px; background-color: red; width: 0%"
    ></div>
`;

document.body.prepend(progressWrapper);
```

**Miért prepend?** A `document.body.prepend()` az elem elejére szúrja be az új Node-ot, így a sáv a többi tartalom fölé, az oldal legtetejére kerül. A `position: fixed` és a magas `z-index` gondoskodik arról, hogy görgetéskor is látható maradjon.
### A görgetési arány kiszámítása

```javascript
const progressBar = document.querySelector("#progressBar");

function onScrollProgress() {
    const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercent + "%";
}

document.addEventListener("scroll", _.throttle(onScrollProgress, 10));
```

**Miért scrollHeight - innerHeight?** Az oldal teljes magassága `document.body.scrollHeight`, de a viewport maga `window.innerHeight` magas. Ennyi „nem görgetendő” terület van. Ha ezeket nem vonnánk ki egymásból, a sáv soha nem érné el a 100%-ot, mert az utolsó innerHeight pixelnyi mr nem lehet legörgetni.

$$scrollPercent = \frac{scrollY}{scrollHeight - innerHeight} \times 100$$
## 2. feladat: Rendezhető táblázat (hagyományos megközelítés)

A következő feladathoz egy új projektet hoztunk létre: `gyak2/`. A HTML kiindulópont egy egyszerű állatokat tartalmazó táblázat:

```html
<table id="animals-table">
    <thead>
        <tr>
            <th>Állat</th>
            <th>Név</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Kutya</td><td>Kodi</td></tr>
        <tr><td>Macska</td><td>Cirmi</td></tr>
        <tr><td>Kutya</td><td>Csutak</td></tr>
    </tbody>
</table>
```

> **Feladat:** Ha a felhasználó a táblázat fejlécére kattint, a táblázat rendeződjön az adott oszlop szerint!

### A logika lépései

Mielőtt kódot írunk, gondoljuk végig a logikát:

1. **Kinyerjük az adatokat** a DOM-ból egy JavaScript tömbbe
2. **Rendezzük a tömböt** a kívánt oszlop szerint
3. **Újrarendereljük a táblázatot** a rendezett tömb alapján

Ez egy fontos minta: az igazi adatot a JavaScript-ben tartjuk (az a “source of truth”), és a DOM csak ennek a tükörképe.
### 1. lépés: Elemek és adatok kinyerese

```javascript
const table = document.querySelector("#animals-table");
const thead = table.querySelector("thead");
const tbody = table.querySelector("tbody");
const rows = tbody.querySelectorAll("tr");

const data = [];
rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const rowData = [];
    cells.forEach((cell) => {
        rowData.push(cell.innerText);
    });
    data.push(rowData);
});
```

Az eredmény egy kétdimenziós tömb, ahol minden sor maga is egy tömb:

```javascript
data = [
    ["Kutya", "Kodi"],
    ["Macska", "Cirmi"],
    ["Kutya", "Csutak"]
];
```

Ezt az adatszerkezetet fogjuk rendezni és újra HTML-lé alakítani.
#### Alternatív megoldás: spread operátor és array függvények

A fenti ciklusalapú megoldás helyett ugyanezt tömörebben is megírhatjuk a spread operátor és a .map() segítségével:

```javascript
const data2 = [...rows].map((row) =>
    [...row.querySelectorAll("td")].map((cell) => cell.innerText)
);
```

Ez elsőre bonyolultnak tűnhet, bontsuk szét:

1. `[...rows]` – a querySelectorAll egy NodeList-et ad vissza, ami nem valódi tömb, ezért nem hívható rajta .map(). A spread operátor egy valódi JavaScript tömbé alakítja:

```javascript
let t = [1, 2, 3];
let t2 = [4, 5, 6];
let t3 = [...t, ...t2]; // [1, 2, 3, 4, 5, 6]
```

A ... operátor „kiteríti” a tömb (vagy bármely iterable) elemeit. [...rows] tehát létrehoz egy tömböt, amelynek elemei a NodeList elemei.

2. `.map((row) => ...)` – minden sorhoz létrehoz egy új értéket (a visszatérési értéket)

3. `[...row.querySelectorAll("td")].map((cell) => cell.innerText)` – ugyanez a belső cellákra: NodeList → tömb → csak a szövegek tömbje

A két megoldás ugyanazt az eredményt adja, a tömörebb inkább tapasztaltabb fejlesztőknek olvasható könnyedén, a ciklusalapú pedig sokak számára átláthatóbb.
### 2. lépés: A renderelési logika

A renderTable függvény feladata, hogy a data tömböt HTML-lé alakítsa:

```javascript
function renderTable(data) {
    return data
        .map(
            (row) => `<tr>
                ${row.map((cell) => `<td>${cell}</td>`).join("")}
            </tr>`
        )
        .join("");
}
```

Nézzük meg pontosan, mi történik itt:

Külső `.map()`: a data tömb minden sorát (`["Kutya", "Kodi"]`) egy `<tr>...</tr>` HTML-stringgé alakítja
Belső .map(): a soron belüli cellatömb minden elemét (`"Kutya"`) egy `<td>Kutya</td>` stringgé alakítja
`.join("")`: a map által visszaadott stringek tömbjét összefűzi egy darab stringgé (szóköz vagy elválasztó nélkül)
Külső `.join("")`: az összes sor-stringet szintén összefűzi

Szemléltetés:

```js
data = [["Kutya", "Kodi"], ["Macska", "Cirmi"]]

belső .map() → ["<td>Kutya</td>", "<td>Kodi</td>"]
belső .join("") → "<td>Kutya</td><td>Kodi</td>"

külső .map() → ["<tr><td>Kutya</td><td>Kodi</td></tr>", "<tr><td>Macska</td><td>Cirmi</td></tr>"]
külső .join("") → "<tr>...<tr>..."

Az tbody.innerHTML-t erre az összefűzött stringre állítjuk, így a böngésző az egész táblázat tartalmát újra rendereli.
3. lépés: Rendezés és eseménykezelés

function sortTable(event) {
    if (event.target.matches("th")) {
        const colIndex = event.target.cellIndex;
        data.sort((a, b) => (a[colIndex] < b[colIndex] ? -1 : 1));
        tbody.innerHTML = renderTable(data);
    }
}

thead.addEventListener("click", sortTable);
```

Eseménydelegálás

Az eseménykezelőt nem az egyes `<th>` elemekre, hanem azok szülőjére, a `<thead>`-re tesszük. Ez az eseménydelegálás (event delegation) mintája.

Miért jó ez?

- Egyetlen eseménykezelő helyett nem kell minden `<th>`-re külön regisztrálni
- Ha dinamikusan adódnak hozzá új fejlécek, azokra is automatikusan működik
- Kevesebb memória és karbantartandó kód

Az event.target.matches("th") vizsgálja meg, hogy tényleg egy `<th>`-re kattintottak-e (és nem a `<thead>` más részére).
A rendezési komparátor

A `data.sort()` egy komparátor függvényt vár, amely megmondja két elemről, melyik kerüljön előrébb:

```js
data.sort((a, b) => (a[colIndex] < b[colIndex] ? -1 : 1));
```

- `a` és `b` a rendezendő tömb egy-egy eleme (esetünkben egy-egy sor-tömb, pl. `["Kutya", "Kodi"]`)
- `a[colIndex]` és `b[colIndex]` az adott oszlop értéke a két sorban
- Ha `a[colIndex] < b[colIndex]`, visszaadunk `-1` → `a` kerül `b` elé
- Különben visszaadunk `1` → `b` kerül `a` elé

#### Miért jobb a localeCompare?

```javascript
// Egyszerű összehasonlítás: karakterkódok alapján hasonlít
data.sort((a, b) => (a[colIndex] < b[colIndex] ? -1 : 1));

// localeCompare: nyelvi szabályok alapján hasonlít
data.sort((a, b) => a[colIndex].localeCompare(b[colIndex]));
```

A karakterkód-alapú összehasonlítás az Unicode-sorrendet követi. Ez azt jelenti, hogy az ékezetes karakterek (á, é, ő, ü, stb.) a latin Z után kerülnek: pl. "Álmos" az "Zebra" után rendezne. A localeCompare figyelembe veszi a nyelvi szabályokat (pl. a magyar ABC-t), ezért ékezetes szövegek esetén mindig azt érdemes használni.
## Osztályok JavaScriptben

Mielőtt refaktorálnánk a kódot osztályokra, gyorsan áttekintjük az osztályok szintaxisát JavaScriptben. Ha ismered a C# vagy Java osztályokat, akkor ez ismerős lesz, a fogalmak azonosak, csak a szintaxis különbözik egy kicsit.
### Osztályok szintaxisa

```javascript
class SortableTable {
    constructor(table) {  // Konstruktor: az osztály példányosításakor hívódik meg
        this.table = table;  // this.* → az osztály példányának mezői/tulajdonságai
        this.data = [];
    }

    initTable() {  // Metódus (nincs "function" kulcsszó!)
        // ...
    }

    renderTable() {
        // ...
    }
}

// Példányosítás
const myTable = new SortableTable(tableElement);
```

### Párhuzam más nyelvekkel:

| C# / Java | JavaScript |
|---|---|
| `public class Foo { }` | `class Foo { }` |
| `public Foo(int x) { }` | `constructor(x) { }` |
| `this.x = x;` | `this.x = x;` |
| `public void Bar() { }` | `Bar() { }` |
| `new Foo(42)` | `new Foo(42)` |

A legfontosabb különbség: JavaScriptben a mezőknek nincs típusdeklarációjuk, és a metódusoknak nincs public/private kulcsszavuk (van # jelölés a privát mezőkhöz, de ezt most nem használjuk).

3. feladat: Rendezhető táblázat osztályokkal
> **Feladat**: Refaktoráld a hagyományos megoldást egy SortableTable osztályba, amely önállóan kezeli a táblázat adatait, renderelését és rendezését!

```js
class SortableTable {
    constructor(table) {
        this.table = table;
        this.thead = table.querySelector("thead");
        this.tbody = table.querySelector("tbody");
        this.rows = this.tbody.querySelectorAll("tr");

        this.data = [];
        this.initTable();

        this.thead.addEventListener("click", this.onHeaderClick.bind(this));
    }

    onHeaderClick(event) {
        if (event.target.matches("th")) {
            const colIndex = event.target.cellIndex;
            this.data.sort((a, b) => (a[colIndex] < b[colIndex] ? -1 : 1));
            this.tbody.innerHTML = this.renderTable();
        }
    }

    renderTable() {
        return this.data.map((row) => `<tr>
            ${row.map((cell) => `<td>${cell}</td>`).join("")}
        </tr>`).join("");
    }

    initTable() {
        this.rows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            const rowData = [];
            cells.forEach((cell) => {
                rowData.push(cell.innerText);
            });
            this.data.push(rowData);
        });
    }
}
```

```javascript
// Használat
const table = document.querySelector("#animals-table");
const myTable = new SortableTable(table);
```

#### Mi változott?

- A szabad `const data`, `const thead`, stb. változók eltűntek; helyükre `this.data`, `this.thead` lépett
- A globális függvények (`renderTable`, `sortTable`) az osztály metódusai lettek
- A logika egy helyen van összezárva: a `SortableTable` egységbe foglalja az összetartozó állapotot és viselkedést

### A `this.thead.addEventListener("click", this.onHeaderClick.bind(this))` sor

Ez a sor tartalmazza az egyik legfontosabb JavaScript-specifikus fogalmat osztályoknál: a .bind(this)-t.
### `.bind(this)` – Kontextus kötés
#### A probléma

Vegyük az alábbi egyszerű példát:

```javascript
class MyClass {
    constructor() {
        this.name = "MyClass";
    }

    greet() {
        console.log(`Hello from ${this.name}`);
    }
}

const myObj = new MyClass();
myObj.greet(); // ✅ "Hello from MyClass"
```

Ez rendben van. De mi történik, ha az eseménykezelőként adjuk át a metódust?

```javascript
document.addEventListener("click", myObj.greet);
// ❌ "Hello from undefined"
```

**Miért `undefined`?** Amikor egy metódust átadunk (nem meghívunk), „leválasztdóik” az objektumáról. Az eseménykezelőn belül a `this` nem a `myObj` példányra mutat, hanem a hívó kontextusra – eseménykezelőknél általában a DOM-elemre (vagy `undefined` strict módban).
#### Szemléltetés: bind más objektumra

```javascript
const myObj = new MyClass();      // name = "MyClass"
const otherObj = { name: "OtherObject" };

// A greet metódust az otherObj kontextusához kötjük
const boundGreet = myObj.greet.bind(otherObj);
boundGreet(); // "Hello from OtherObject"
```

A `.bind(valami)` visszaad egy új függvényt, amelyen belül a `this` mindig a `bind`-nak átadott objektumra mutat.
#### Visszakötés saját példányra: `bind(this)`

Az osztályban a konstruktorban adjuk át az eseménykezelőt:

```javascript
constructor(table) {
    // ...
    this.thead.addEventListener("click", this.onHeaderClick.bind(this));
    //                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //                       Lefordítva: "az onHeaderClick futásakor
    //                       a this mindig EZ a SortableTable példány legyen"
}
```

Enélkül az onHeaderClick-en belüli this.data, this.tbody mind undefined lenne, mert a böngésző a DOM-elem kontextusában hívná meg a metódust.

**Mikor kell `.bind(this)`?** Szinte kizárólag akkor, amikor egy osztálymetódust átadunk valahova (eseménykezelőnek, callbacknek, setTimeout-nak stb.), és a metóduson belül `this.*`-ot használunk.

### Alternatíva: arrow function wrapper

```javascript
this.thead.addEventListener("click", (event) => this.onHeaderClick(event));
```

Az arrow function-nek nincs saját this-e: a körülvevő scope this-ét örökli (ami a konstruktorban az osztálypéldány). 
Ez egy elegáns alternatíva a `.bind(this)` helyett.
## Összefoglalás

Ezen a gyakorlaton megtanultuk:

- **Olvasási folyamatsáv implementálását:** DOM-elem dinamikus létrehozása és a görgetési arány kiszámítása
- **Spread operátor (`...`)** használatát `NodeList` → tömb konverzióhoz és tömör adat-kinyereshez
- **Renderelési mintát:** az adatot JavaScript tömbben tartjuk, a DOM-ot ebből regeneráljuk
- **Eseménydelegxálást:** eseménykezelőt a szülőre rakunk, majd `event.target.matches()` szűrővel kezeljük
- **Rendezési komparátort** és a `localeCompare` fontosságát ékezetes szövegeiknél
- **JavaScript osztályokat:** szintaxis, konstruktor, `this.*` mezők párhuzamban a C#/Java OOP-pal
- **`.bind(this)` működését:** miért veszti el a metódus a kontextusát, és hogyan köthetű vissza

