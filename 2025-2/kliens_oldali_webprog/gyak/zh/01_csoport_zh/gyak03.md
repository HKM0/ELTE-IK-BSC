 # 3. gyakorlat - Web Components: Custom Elements és Shadow DOM

**2025-02-27** • 4 perc olvasási idő

## Bevezetés

Ezen a gyakorlaton a Web Components API-val ismerkedtünk meg, ami lehetővé teszi saját, újrafelhasználható HTML elemek létrehozását. A Web Components két fő alaptechnológiájával foglalkoztunk:

- **Custom Elements** – saját HTML tagek definiálása JavaScript osztályokkal
- **Shadow DOM** – elkülönített DOM fa egy elemen belül, stílus-enkapszulációval

### A Custom Elements API kétféle elemet különböztet meg:

| Típus | Leírás | Öröklés | HTML szintaxis |
|---|---|---|---|
| Autonomous | Teljesen új elem típus | extends HTMLElement | `<my-element>` |
| Customized Built-in | Meglévő elem kibővítése | extends HTMLTableElement stb. | `<table is="my-table">` |
## Az egyedi elemek életciklusa

A Custom Elements legfontosabb jellemzője az automatikus életciklus-kezelés: a böngésző hív meg speciális metódusokat a megfelelő pillanatokban.
| Életciklus metódus | Mikor hívódik meg? |
|---|---|
| `constructor()` | Elem példányosításakor – NE végezzünk itt DOM-manipulációt! |
| `connectedCallback()` | Elem DOM-ba illesztésekor – itt inicializáljunk |
| `disconnectedCallback()` | Elem DOM-ból eltávolításakor – itt takarítsunk el |

A legfontosabb szabály: a konstruktorban ne manipuláljuk a DOM-ot! Az elem gyermek elemei a konstruktor futásakor még nem feltétlenül érhetők el. A connectedCallback() a biztonságos hely az inicializálásra.
## 1. feladat: Karakterszámláló input

> **Feladat:** Készíts egy `<char-count-input>` nevű autonomous custom elementet, amely automatikusan hozzáad egy karakterszámlálót a benne lévő `<input>` mezőhöz! A maximális karakterszámot az input maxlength attribútuma határozza meg.

### HTML használat

```html
<char-count-input>
    <input type="text" maxlength="100" placeholder="Ide írj valamit" />
</char-count-input>
```

Implementáció

```javascript
class CharCountInput extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.input = this.querySelector("input");

        if (!this.input) { // ha nincs input
            return;
        }

        this.maxlength = this.input.getAttribute("maxLength") || 99;

        this.createDiv();
        this.appendChild(this.div);

        this.input.addEventListener("input", this.onInput.bind(this));
    }

    disconnectedCallback() {
        // .bind(this) új referenciát ad vissza, ezért ugyanazt a bound függvényt
        // kellene tárolni az eltávolításhoz
        this.input.removeEventListener("input", this.onInput.bind(this));
    }

    onInput(e) {
        const currentLength = e.target.value.length;
        this.div.innerText = `${currentLength}/${this.maxlength}`;
    }

    createDiv() {
        this.div = document.createElement("div");
        this.div.classList.add("char-counter");
        this.div.innerText = `0/${this.maxlength}`;
    }
}

customElements.define("char-count-input", CharCountInput);
```

### .bind(this) és eseménykezelők

Az előző órán a SortableTable osztálynál már megismertük a .bind(this) szükségességét. Ugyanaz a probléma áll fenn itt is: amikor egy metódust eseménykezelőként adunk át, a this elveszíti a kontextusát.

```javascript
// ❌ Kontextus elvész – a this az <input> elemre mutatna, nem a CharCountInput példányra
this.input.addEventListener("input", this.onInput);

// ✅ .bind(this) visszaköti az osztálypéldányra
this.input.addEventListener("input", this.onInput.bind(this));
```

### A .bind(this) és removeEventListener csapdája

A .bind(this) minden híváskor új függvényreferenciát ad vissza:

```javascript
this.onInput.bind(this) === this.onInput.bind(this) // false! Különböző referenciák!
```

A removeEventListener-nek pontosan ugyanazt a referenciát kell megkapnia, amellyel az addEventListener-t hívtuk. Ha nem tároljuk el a bound függvényt, a `disconnectedCallback`-beli eltávolítás nem fog működni:

```javascript
// ❌ Nem működik – különböző referenciák
connectedCallback() {
    this.input.addEventListener("input", this.onInput.bind(this));
}
disconnectedCallback() {
    this.input.removeEventListener("input", this.onInput.bind(this)); // új referencia!
}

// ✅ Helyes megoldás – elmentjük a bound referenciát
connectedCallback() {
    this.boundOnInput = this.onInput.bind(this); // eltároljuk
    this.input.addEventListener("input", this.boundOnInput);
}
disconnectedCallback() {
    this.input.removeEventListener("input", this.boundOnInput); // ugyanaz a referencia
}
```

## 2. feladat: Megerősítéses link

> **Feladat:** Készíts egy `confirm-link` nevű customized built-in elementet, amely egy `<a>` elemet bővít ki megerősítő dialógussal! Ha a felhasználó a „Mégsem” gombot nyomja, a link ne navigáljon.

```html
<a href="https://example.com" is="confirm-link">BREAKING NEWS</a>
```

### Autonomous vs Customized Built-in – miért számít?

Ha `<confirm-link>` autonomous elemet hoznánk létre a `<a is="confirm-link">` helyett, elveszítenénk:

- A link szemantikáját (SEO, képernyőolvasók)
- A jobb klikk menüt („Megnyitás új lapon")
- Ha a böngésző nem támogatja a custom elementet, a `<a is="confirm-link">` visszaesik egyszerű linkre – a tartalom nem tűnik el

### Implementáció

```javascript
class ConfirmLink extends HTMLAnchorElement {
    // FONTOS: HTMLAnchorElement-ből származunk, nem HTMLElement-ből!

    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener("click", this.openLink);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.openLink);
    }

    openLink(e) {
        if (!confirm("Megnyitod?")) {
            e.preventDefault();
        }
    }
}

// KÖTELEZŐ a harmadik paraméter: { extends: "a" }
customElements.define("confirm-link", ConfirmLink, { extends: "a" });
```

### e.preventDefault()

Az `e.preventDefault()` megakadályozza az alapértelmezett böngésző viselkedést. Különböző eseményeknél más-mást jelent:

```javascript
// Link kattintásnál: nem követi a linket
linkEl.addEventListener("click", (e) => e.preventDefault());

// Form submit-nál: nem küldi el az űrlapot
formEl.addEventListener("submit", (e) => e.preventDefault());
```

### A confirm() visszatérési értéke

A `confirm()` natív böngésző dialógust nyit meg, és szinkron módon vár a felhasználó válaszára:

```javascript
const result = confirm("Hello");
if (result) {
    console.log("OK");
} else {
    console.log("Mégsem");
}
```

### Regisztráció különbsége

```javascript
// Autonomous custom element – nincs harmadik paraméter
customElements.define("my-element", MyElement);

// Customized built-in element – KÖTELEZŐ a harmadik paraméter!
customElements.define("confirm-link", ConfirmLink, { extends: "a" });
```

## Shadow DOM

A Shadow DOM egy elkülönített DOM fa, amely egy elemhez csatolható. A külső oldal CSS-je nem befolyásolja a Shadow DOM-ot, és a Shadow DOM CSS-e nem szivárog ki.

```
document (Light DOM)
├── <button>LIGHT DOM BUTTON</button>  ← globális CSS befolyásolja (piros)
└── <shadow-button>
    └── #shadow-root (Shadow DOM)
        ├── <style>button { background: blue; }</style>  ← csak belül érvényes
        └── <button>From Shadow</button>  ← külső CSS NEM hat rá (kék marad)
```

## 3. feladat: Shadow gomb

> **Feladat:** Készíts egy `<shadow-button>` nevű autonomous custom elementet, amely Shadow DOM-ban renderel egy gombot saját belső CSS-sel! A külső oldal stílusai ne befolyásolják a komponenst.

### HTML

```html
<style>
    button { background-color: red; } /* NEM hat a shadow-button belsejére */
</style>

<button>LIGHT DOM BUTTON</button>   <!-- piros lesz -->
<shadow-button></shadow-button>      <!-- kék marad -->
```

### Implementáció

```javascript
class ShadowButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Shadow DOM létrehozása
        // mode: "open" → kívülről elérhető: elem.shadowRoot
        this.attachShadow({ mode: "open" });

        this._createButton();

        this.styleTag = document.createElement("style");
        this.styleTag.innerHTML = `
            button {
                background-color: blue;
            }
        `;

        this.shadowRoot.append(this.styleTag);
        this.shadowRoot.append(this.button);
    }

    disconnectedCallback() {}

    _createButton() {
        this.button = document.createElement("button");
        this.button.textContent = "From Shadow";
    }
}

customElements.define("shadow-button", ShadowButton);
```

### this.shadowRoot.append() vs this.appendChild()

- `this.appendChild(elem)` → a Light DOM-ba szúr be (látható, külső CSS befolyásolja)
- `this.shadowRoot.append(elem)` → a Shadow DOM-ba szúr be (izolált, saját CSS érvényes rá)

## 4. feladat: Rendezhető táblázat – Web Components megközelítéssel

A múlt órai rendezhető táblázatot tovább fejlesztettük: ugyanazt a logikát két újabb megközelítésben valósítottuk meg.

### A négy megközelítés összehasonlítása

| Megközelítés | Fájl | Leírás |
|---|---|---|
| Funkcionális | main.js | Globális scope, egyszerű, nem újrafelhasználható |
| Osztály alapú | main-class.js | new SortableTable(el) – kódszervezés, manuális példányosítás |
| Autonomous Custom Element | main-custom.js | `<sortable-table>` – új HTML tag, automatikus életciklus |
| Customized Built-in | main-builtin.js | `<table is="sortable-table">` – meglévő `<table>` bővítve |
### Autonomous Custom Element

```html
<sortable-table>
    <thead>
        <tr><th>Állat</th><th>Név</th></tr>
    </thead>
    <tbody>
        <tr><td>Kutya</td><td>Kodi</td></tr>
        <tr><td>Macska</td><td>Cirmi</td></tr>
        <tr><td>Kutya</td><td>Csutak</td></tr>
    </tbody>
</sortable-table>
```

```javascript
class SortableTable extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.thead = this.querySelector("thead");
        this.tbody = this.querySelector("tbody");
        this.sorok = this.tbody.querySelectorAll("tr");

        this.data = [];
        this.initTable();

        this.thead.addEventListener("click", this.onHeaderClick.bind(this));
    }

    disconnectedCallback() {
        this.thead.removeEventListener("click", this.onHeaderClick.bind(this));
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
        this.sorok.forEach((row) => {
            const cells = row.querySelectorAll("td");
            const rowData = [];
            cells.forEach((cell) => {
                rowData.push(cell.innerText);
            });
            this.data.push(rowData);
        });
    }
}

customElements.define("sortable-table", SortableTable);
```

#### Mi változott az osztály alapú megközelítéshez képest?

- Az osztály HTMLElement-ből örököl
- A logika a connectedCallback()-be kerül (nem a konstruktorba!)
- A disconnectedCallback() gondoskodik a takarításról
- Nincs manuális new SortableTable(elem) – a HTML-be írás elég

### Customized Built-in Element

```html
<table is="sortable-table" id="animals-table">
    <thead>...</thead>
    <tbody>...</tbody>
</table>
```

```javascript
class SortableTable extends HTMLTableElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.thead = this.querySelector("thead");
        this.tbody = this.querySelector("tbody");
        this.trows = this.tbody.querySelectorAll("tr");

        this.data = [];
        this.initTable();

        this.thead.addEventListener("click", this.onHeaderClick.bind(this));
    }

    disconnectedCallback() {
        this.thead.removeEventListener("click", this.onHeaderClick.bind(this));
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
        this.trows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            const rowData = [];
            cells.forEach((cell) => {
                rowData.push(cell.innerText);
            });
            this.data.push(rowData);
        });
    }
}

// KÖTELEZŐ a harmadik paraméter!
customElements.define("sortable-table", SortableTable, { extends: "table" });
```

#### Miben különbözik az autonomous változattól?

- `extends HTMLTableElement` (nem HTMLElement)
- HTML-ben `<table is="sortable-table">` (nem `<sortable-table>`)
- `customElements.define()` harmadik paramétere `{ extends: "table" }` – kötelező!

### A customElements.define() összefoglalása

```javascript
// Autonomous custom element – nincs harmadik paraméter
customElements.define("my-element", MyElement);

// Customized built-in element – KÖTELEZŐ a harmadik paraméter
customElements.define("confirm-link", ConfirmLink, { extends: "a" });
customElements.define("sortable-table", SortableTable, { extends: "table" });
```

**Miért kell a kötőjel a névben?** Az egyedi elem neve kötelezően kötőjelet kell tartalmazzon (char-count-input, confirm-link, stb.). Ez különbözteti meg a jelenlegi és jövőbeli natív HTML elemektől, megelőzve a névütközéseket.
## Összefoglalás

Ezen a gyakorlaton megtanultuk:

- **Custom Elements életciklus-callback-jeit:** constructor (NEM DOM!), connectedCallback (inicializálás), disconnectedCallback (takarítás)
- **Autonomous custom element létrehozását** (extends HTMLElement, `<my-element>` szintaxis)
- **Customized built-in element létrehozását** (extends HTMLXyzElement, `<xyz is="...">`, `{ extends: "..." }` harmadik paraméter)
- **Shadow DOM-ot:** attachShadow({ mode: "open" }), this.shadowRoot.append() – stílus-enkapsziláció
- **.bind(this) csapdáját:** minden hívás új referenciát ad – removeEventListener-hez el kell tárolni a bound függvényt
- **e.preventDefault() használatát** az alapértelmezett böngésző viselkedés megakadályozásához
- **A rendezhető táblázat mind a négy megközelítésben:** funkcionális → osztály → autonomous CE → built-in CE

