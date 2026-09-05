 # 1. gyakorlat - PWA: landing page

**2025-02-13** • 6 perc olvasási idő • [GitHub]()

## Bevezetés

Ezen a gyakorlaton progresszív webes alkalmazások (PWA) alapelveivel ismerkedtünk meg. A PWA központi gondolata, hogy a weboldalnak működnie kell akkor is, ha a JavaScript ki van kapcsolva, de ha elérhető, akkor a JavaScript javíthatja, gazdagíthatja a felhasználói élményt.

A gyakorlat során egy Bootstrap-alapú landing page-t fejlesztettünk tovább, amelyen három fő fejlesztést valósítottunk meg:

- Belső navigáció simított görgetéssel
- Dinamikus navigációs sáv görgetéskor
- Megjelenési animációk görgetés közben

## A kiindulópont: Bootstrap template

A gyakorlathoz a Start Bootstrap - Creative sablont használtuk alapként. Ez egy modern, reszponzív landing page Bootstrap 4 keretrendszerrel, Font Awesome ikonokkal és Google Fonts betűtípusokkal.
### Projekt struktúra

```
gyak1/
├── landing_page.html      # Sablon HTML fájl
├── style.css              # Saját CSS stílusok
└── main.js                # JavaScript funkcionalitás
```

## 1. feladat: Simított görgetés belső linkekhez

> **Feladat:** A landing page oldalon a navigációs fejlécben lévő belső linkekre kattintva az oldal gördülve menjen az adott helyre.

### A probléma

A landing page navigációs menüjében belső linkek találhatók (#about, #services, #portfolio, #contact), amelyek az oldal különböző szekciójára mutatnak. Alapértelmezetten a böngésző azonnal “ugrik” ezekre a pozíciókra, ami nem túl elegáns.
### PWA megközelítés: CSS-alapú megoldás

A legegyszerűbb és legtöbb böngészőben támogatott megoldás egyetlen CSS tulajdonságot igényel:

```css
html {
    scroll-behavior: smooth;
}
```

A scroll-behavior: smooth tulajdonság gondoskodik róla, hogy minden görgetési művelet (beleértve a hash linkeket is, #about, #services, stb.) animálva történjen.
## 2. feladat: Dinamikus navigációs sáv

> **Feladat:** Ha elgördült az oldal 200px-nyit, akkor alkalmazzuk a navbar-scrolled stílusosztályt a nav elemen. Ügyelj arra, hogy a scroll esemény nagyon sokszor hívódik meg!

### JavaScript implementáció

```javascript
const nav = document.querySelector("#mainNav");

/**
 * Görgetés eseménykezelője
 */
function onScroll() {
    console.log("Görgetek");
    
    // Elegáns megoldás: classList.toggle
    nav.classList.toggle("navbar-scrolled", window.scrollY > 200);
}
```

### Fontos koncepciók

#### 1. classList.toggle() paraméter

A classList.toggle() metódus második paraméterként egy feltételt is elfogad:

```javascript
// Hosszabb forma:
if(window.scrollY > 200) {
    nav.classList.add("navbar-scrolled");
} else {
    nav.classList.remove("navbar-scrolled");
}

// Rövidebb forma:
nav.classList.toggle("navbar-scrolled", window.scrollY > 200);
```

Ha a feltétel true, hozzáadja az osztályt; ha false, eltávolítja.
#### 2. Performance optimalizálás: Throttling

A scroll esemény nagyon gyakran hívódik meg (akár 60-szor másodpercenként vagy többször). Ez teljesítményproblémákat okozhat, különösen ha az eseménykezelő nehéz műveleteket végez.

**Megoldás: Throttling (fojtás)**

A throttling korlátozza, hogy egy függvény milyen gyakran futhat le. Ehhez a Lodash könyvtár _.throttle() függvényét használjuk:

```javascript
document.addEventListener("scroll", _.throttle(onScroll, 200));
```

Ez azt jelenti, hogy az onScroll függvény maximum 200 milliszecondumonként egyszer fut le, függetlenül attól, hogy a scroll esemény hányszor aktiválódik.
#### Lodash betöltése CDN-ről

```html
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.23/lodash.min.js" 
        integrity="sha256-DKH2PDz8+ISlnyrd8XrVfHzbEzMd0T7xENnVNBlbhLI=" 
        crossorigin="anonymous"></script>
```

#### Mi az integrity attribútum?

Ez egy hash érték, ami a fájl tartalmából generálódik. Ez egy biztonsági mechanizmus (SRI - Subresource Integrity):

- Ha valaki megváltoztatja a CDN-en a fájlt (támadás), a hash nem egyezik meg
- A böngésző nem tölti be a kompromittált fájlt
- Véd bennünket a CDN elleni támadásoktól

## 3. feladat: Megjelenési animációk görgetéskor

> **Feladat:** Ha egy elem gördítés közben a viewportba ér, akkor valamilyen animáció segítségével jelenjen meg! Az elemeket deklaratívan jelöljük meg HTML5 data attribútumokat használva, pl. data-scroll. Az animáció nevét is eltárolhatod data attribútumban, pl. data-scroll-animation="fadeInUp". Animációhoz használhatod az animate.css könyvtárat. Ügyelj arra, hogy a scroll esemény nagyon sokszor hívódik meg!

### ### Deklaratív megközelítés: Data attribútumok

A HTML5-ben custom data attribútumokat definiálhatunk, amelyek data- prefixszel kezdődnek:

```html
```html
<h2 data-scroll data-scroll-animation="fadeInUp">
    At Your Service
</h2>

<div class="col-lg-3 col-md-6 text-center" 
     data-scroll 
     data-scroll-animation="fadeInRightBig">
    <!-- tartalom -->
</div>
```
```

Data attribútumok előnyei:

- Deklaratív és olvasható kód
- HTML-ben látható, melyik elem animált
- JavaScript-ben könnyen elérhető: element.dataset.scrollAnimation

Animate.css könyvtár

Az animációkhoz az Animate.css könyvtárat használjuk, amely előre definiált CSS animációkat tartalmaz:

```html
<link rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
```

Az Animate.css osztályai:

- `animate__animated` - alaposztály minden animációhoz
- `animate__fadeInUp`, `animate__fadeInRightBig` stb. - konkrét animációk

IntersectionObserver API

A modern megoldás görgetési animációkhoz az IntersectionObserver API, amely figyeli, hogy egy elem mikor kerül a viewport-ba.
Viewport illusztráció - a böngésző aktuálisan látható területe
A viewport a böngésző látható területe. Az IntersectionObserver figyeli, amikor elemek be- vagy kilépnek ebből a területből.

A viewport a böngésző ablakának az a része, ahol a weboldal tartalma látható. Amikor görgetünk, az elemek be- és kilépnek a viewport-ból. Az IntersectionObserver pontosan ezt figyeli.

```javascript
// Az observer callback függvénye
function onObserve(entries) {
    entries.forEach((elem) => {
        if(elem.isIntersecting) { // Ha az elem látható
            // Lekérjük az animáció nevét a data attribútumból
            const anim = elem.target.dataset.scrollAnimation;
            
            // Hozzáadjuk az Animate.css osztályokat
            elem.target.classList.add("animate__animated", "animate__" + anim);
        }
    });
}

// Observer példány létrehozása
const observer = new IntersectionObserver(onObserve, {
    threshold: 1 // 100%-ban látható legyen az elem
});
```

// Összes animálandó elem lekérése
const animatedElements = document.querySelectorAll("[data-scroll]");

// Minden elemet megfigyelünk
animatedElements.forEach((animElem) => {
    observer.observe(animElem);
});

### IntersectionObserver működése

- **Inicializálás:** Létrehozunk egy observer példányt callback függvénnyel és beállításokkal
- **Megfigyelés:** Megmondjuk, mely elemeket figyelje (observer.observe(elem))
- **Callback:** Amikor egy elem belép/kilép a viewport-ból, a callback meghívódik
- **Feldolgozás:** Az entries tömbben megkapjuk az összes változást
- **Animáció:** Ha isIntersecting === true, az elem látható → animálunk

### Threshold paraméter

A threshold beállítás meghatározza, hogy az elem hány százalékának kell láthatónak lennie:

- `threshold: 0` - bármely része látható
- `threshold: 0.5` - 50%-a látható
- `threshold: 1` - 100%-a látható (teljes mértékben)

#### Miért jobb mint a scroll event?

| Scroll Event | IntersectionObserver |
|---|---|
| Gyakran hívódik (teljesítmény) | Csak változáskor hívódik |
| Manuálisan számolni kell | Böngésző végzi a számolást |
| getBoundingClientRect() költséges | Natív optimalizált |
| Throttling szükséges | Nem kell throttling |
JavaScript modulok: type=“module”

A JavaScript-et type="module" attribútummal töltjük be:

```html
<script type="module" src="./main.js"></script>
```

A module scriptek előnyei
1. Modern JavaScript szintaxis

// Használhatunk import/export-ot (későbbi órán)
import { something } from './other.js';
export const myFunction = () => { ... };

2. Scope izoláció

A változók és függvények nem szennyezik a globális scope-ot:

// main.js (module)
const nav = document.querySelector("#mainNav"); 
// Ez csak a main.js-ben látható!

// Másik script-ből nem érhető el
// window.nav === undefined ✓

3. Automatikus defer

A module scriptek automatikusan defer módban futnak:

    Az oldal HTML-je teljesen betöltődik először
    Nincs undefined hiba, mert az elemek már léteznek a DOM-ban
    Nem kell DOMContentLoaded eseményre várni

### Függvény deklarációk variációi

A gyakorlaton láthattuk a különböző függvénydeklarációs módokat:

```javascript
// 1. Klasszikus függvénydeklaráció
function onScroll() {
    // ...
}

// 2. Arrow function konstansban
const onScroll2 = () => {
    // ...
};

// 3. Function expression
const onScroll3 = function() {
    // ...
};
```

**Különbségek:**

- Az első hoisted (feljebb hívható, mint ahol deklarálva van)
- A 2. és 3. csak deklaráció után hívható
- Arrow function-nek nincs saját this kontextusa

## Progresszív fejlesztés összefoglalása

A gyakorlaton implementált megoldások tükrözik a PWA alapelveit:
### Alapréteg (HTML/CSS)

- Szemantikus HTML struktúra
- Reszponzív Bootstrap layout
- CSS smooth scrolling (működik JS nélkül!)

### Fejlesztési réteg (JavaScript)

- Dinamikus navbar viselkedés
- Görgetési animációk
- Performance optimalizálás

### Best practices

- Data attribútumok a deklaratív kódhoz
- Modern API használata (IntersectionObserver)
- Performance figyelembe vétele (throttling)
- Biztonságos külső források (SRI)
- Module scriptek a jobb kódszervezéshez

## Összefoglalás

Ezen a gyakorlaton megtanultuk:

- Progressive Enhancement alapelvét: az oldal CSS-sel is működőképes, JavaScript javítja az élményt
- Data attribútumok használatát deklaratív animációkhoz
- Throttling technikát a scroll event optimalizálásához
- IntersectionObserver API-t hatékony viewport detektáláshoz
- Animate.css integrálását CDN-ről
- Module scriptek előnyeit
- SRI (Subresource Integrity) biztonsági mechanizmust

A létrehozott landing page progresszív: alapfunkcionalitás mindenki számára elérhető, modern böngészőkben pedig élvezhetőbb élményt nyújt.
## Házi feladat

> **Feladat:** Landing page – aktív menüpont jelzése. Az oldal gördítése közben jelezd a navigációs sorban, hogy melyik menüpontnál tartunk éppen. Az adott menüpont linkjének stílusosztályai közé adjuk az active stílusosztályt.

### Segítség és tippek

#### 1. IntersectionObserver újrafelhasznlása

Az órai gyakorlatból már ismered az IntersectionObserver API-t! Használhatod hasonló elven:

- Figyeld meg az összes szekciót (#about, #services, #portfolio, #contact)
- Amikor egy szekció láthatóvá válik, jelezd a megfelelő menüpontot

#### 2. Threshold érték beállítása

A threshold értékét érdemes alacsonyabbra állítani (pl. 0.3 vagy 0.5), hogy a szekció már akkor aktívnak számítson, amikor részben látható:

```javascript
const observer = new IntersectionObserver(callback, {
    threshold: 0.5 // A szekció 50%-a legyen látható
});
```

#### 3. Szekciók és menüpontok összekapcsolása

Minden menüpont linkje tartalmazza az ID-t hash formájában:

```html
<a class="nav-link" href="#about">About</a>
<a class="nav-link" href="#services">Services</a>
```

A szekciók pedig ezekkel az ID-kkal rendelkeznek:

```html
<section id="about">...</section>
<section id="services">...</section>
```

Gondolj arra, hogyan tudod összekapcsolni az ID-kat!
#### 4. Active osztály kezelése

- **Eltávolítás:** Először távolítsd el az active osztályt minden menüpontról
- **Hozzáadás:** Majd csak a megfelelő menüpontra add hozzá

```javascript
// Példa pszeudokód:
// 1. Minden nav-link-ről levesszük az active osztályt
// 2. Megkeressük azt a nav-link-et, amelyik href-je megegyezik a szekció ID-jával
// 3. Rátesszük az active osztályt
```

#### 5. querySelector és attribute selectorok

Hasznos lehet az attribútum szelektorok használata:

```javascript
// Példa: link keresése href alapján
const link = document.querySelector(`a[href="#${sectionId}"]`);
```

