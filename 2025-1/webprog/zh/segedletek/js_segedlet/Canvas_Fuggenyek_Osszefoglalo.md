# Canvas API és JavaScript Függvények Összefoglaló

Ez az összefoglaló a **Parcel** és **Romeo and Juliet** projektekben használt függvényeket és metódusokat mutatja be példákkal.

---

## 📋 Tartalomjegyzék
1. [Canvas Alapok](#canvas-alapok)
2. [Rajzolási Függvények](#rajzolási-függvények)
3. [Képkezelés](#képkezelés)
4. [Szöveg Megjelenítés](#szöveg-megjelenítés)
5. [Animáció és Időkezelés](#animáció-és-időkezelés)
6. [Eseménykezelés](#eseménykezelés)
7. [Ütközésdetektálás](#ütközésdetektálás)
8. [Segédfüggvények](#segédfüggvények)

---

## Canvas Alapok

### `document.querySelector()`
Kiválaszt egy HTML elemet.

```javascript
const canvas = document.querySelector('canvas');
```

### `canvas.getContext("2d")`
Visszaadja a 2D rajzolási kontextust.

```javascript
const ctx = canvas.getContext("2d");
```

### Canvas Tulajdonságok
```javascript
canvas.width   // Canvas szélessége pixelben
canvas.height  // Canvas magassága pixelben
```

---

## Rajzolási Függvények

### `ctx.clearRect(x, y, width, height)`
Töröli a megadott területet a vásznon.

**Példa:**
```javascript
ctx.clearRect(0, 0, canvas.width, canvas.height); // Teljes vászon törlése
```

### `ctx.fillRect(x, y, width, height)`
Kitöltött téglalapot rajzol.

**Példa:**
```javascript
ctx.fillRect(10, 20, 100, 50); // Téglalap x:10, y:20, szélesség:100, magasság:50
```

### `ctx.beginPath()`
Új rajzolási útvonal kezdése.

**Példa:**
```javascript
ctx.beginPath();
```

### `ctx.moveTo(x, y)`
Az "ecset" mozgatása a megadott pozícióra rajzolás nélkül.

**Példa:**
```javascript
ctx.moveTo(arrow.fx, arrow.fy); // Kezdőponthoz mozgatás
```

### `ctx.lineTo(x, y)`
Vonal rajzolása az aktuális pozícióból a megadott pontba.

**Példa:**
```javascript
ctx.lineTo(arrow.tx, arrow.ty); // Vonal a végponthoz
```

### `ctx.stroke()`
Kirajzolja a definiált útvonalat kontúrral.

**Példa - Teljes vonal rajzolás:**
```javascript
ctx.beginPath();
ctx.strokeStyle = "red";
ctx.lineWidth = 3;
ctx.moveTo(arrow.fx, arrow.fy);
ctx.lineTo(arrow.tx, arrow.ty);
ctx.stroke();
```

### Rajzolási Stílusok

#### `ctx.fillStyle`
Kitöltési szín beállítása.

```javascript
ctx.fillStyle = "yellow";  // Sárga színnel tölt
ctx.fillStyle = "white";   // Fehér színnel tölt
```

#### `ctx.strokeStyle`
Vonal színének beállítása.

```javascript
ctx.strokeStyle = "red";   // Piros vonal
```

#### `ctx.lineWidth`
Vonal vastagságának beállítása.

```javascript
ctx.lineWidth = 3;         // 3 pixel vastag vonal
```

---

## Képkezelés

### `new Image()`
Új kép objektum létrehozása.

```javascript
const plane = {
  img: new Image()
};
```

### `image.src`
Kép forrásának beállítása (betöltés).

```javascript
plane.img.src = "plane.png";
house.img.src = "house.png";
bush.img.src = "bush.png";
```

### `ctx.drawImage(image, x, y, width, height)`
Kép kirajzolása a vászonra.

**Példa:**
```javascript
ctx.drawImage(plane.img, plane.x, plane.y, plane.width, plane.height);
ctx.drawImage(parcel.img, parcel.x, parcel.y, parcel.width, parcel.height);
ctx.drawImage(house.img, house.x, house.y, house.width, house.height);
```

---

## Szöveg Megjelenítés

### `ctx.font`
Betűtípus és méret beállítása.

```javascript
ctx.font = "48px Arial";
ctx.font = "48px serif";
```

### `ctx.textAlign`
Szöveg igazítása.

```javascript
ctx.textAlign = "right";   // Jobbra igazítás
ctx.textAlign = "center";  // Középre igazítás
```

### `ctx.fillText(text, x, y)`
Szöveg kiírása a vászonra.

**Példa:**
```javascript
ctx.font = "48px Arial";
ctx.fillStyle = "white";
ctx.textAlign = "right";
ctx.fillText("Delivered!", canvas.width/2, canvas.height/2);

ctx.fillText("Missed!", canvas.width/2, canvas.height/2);
ctx.fillText("Oooops!", canvas.width/3, canvas.height/2);
ctx.fillText("Come, my lover!", canvas.width/5, canvas.height/2);
```

---

## Animáció és Időkezelés

### `performance.now()`
Az aktuális időt adja vissza nagy pontossággal (milliszekundumban).

```javascript
let lastFrameTime = performance.now();
```

### `requestAnimationFrame(callback)`
A következő képkocka rajzolása előtt hívja meg a callback függvényt.

**Példa - Animációs hurok:**
```javascript
let lastFrameTime = performance.now();

function next(currentTime = performance.now()) {
  const dt = (currentTime - lastFrameTime) / 1000; // másodpercre váltás
  lastFrameTime = currentTime;

  update(dt);   // Állapot frissítése
  render();     // Képkocka újrarajzolása

  requestAnimationFrame(next); // Következő frame
}

// Animáció indítása
next();
```

### Delta Time (dt) Használata
Időalapú animációhoz használt változó (másodpercben).

**Példa - Mozgás dt-vel:**
```javascript
function update(dt) {
  // Sebesség frissítése gyorsulással
  ball.vy += ball.ay * dt;
  
  // Pozíció frissítése sebességgel
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;
  
  plane.x += plane.vx * dt;
}
```

**Fizika kalkulációk:**
- Gyorsulás → Sebesség: `vy += ay * dt`
- Sebesség → Pozíció: `y += vy * dt`

---

## Eseménykezelés

### Click Esemény

#### `document.addEventListener("click", callback)`
Kattintás kezelése az egész dokumentumon.

**Példa - Parcel projekt:**
```javascript
document.addEventListener("click", (e) => {
  gameState === 0 ? gameState = 1 : (gameState > 2 ? gameState = gameState : gameState = 2);
});
```

#### `canvas.addEventListener("click", callback)`
Kattintás kezelése a canvas elemen.

**Példa - Romeo projekt:**
```javascript
canvas.addEventListener("click", (e) => {
  if (gameState === 0) {
    gameState = 1;
    // Sebességek beállítása
    ball.vx = (arrow.tx - arrow.fx) * 3;
    ball.vy = (arrow.ty - arrow.fy) * 3;
    // Gravitáció
    ball.ay = 300;
  }
});
```

### Mouse Move Esemény

#### `canvas.addEventListener("mousemove", callback)`
Egérmozgás követése a canvas felett.

**Példa:**
```javascript
canvas.addEventListener("mousemove", (e) => {
  arrow.tx = e.offsetX;  // Egér X koordináta
  arrow.ty = e.offsetY;  // Egér Y koordináta
});
```

**Event tulajdonságok:**
- `e.offsetX` - Egér X pozíció a canvas-hoz képest
- `e.offsetY` - Egér Y pozíció a canvas-hoz képest

---

## Ütközésdetektálás

### `isCollision(box1, box2)`
Két téglalap alapú objektum ütközésének ellenőrzése (AABB - Axis-Aligned Bounding Box).

**Teljes függvény:**
```javascript
function isCollision(box1, box2) {
  return !(
    box2.y + box2.height < box1.y ||      // box2 box1 felett van
    box1.x + box1.width < box2.x ||       // box1 box2-től balra van
    box1.y + box1.height < box2.y ||      // box1 box2 felett van
    box2.x + box2.width < box1.x          // box2 box1-től balra van
  );
}
```

**Használat:**
```javascript
// Csomag és ház ütközése
if (isCollision(parcel, house)) {
  parcel.vy = 0;
  parcel.vx = 0;
  gameState = 3;
}

// Kő és bokor ütközése
if (isCollision(ball, bush)) {
  gameState = 3;
}

// Kő és ablak ütközése
if (isCollision(ball, windows[kivalasztott_ablak])) {
  gameState = 2;
}

// Több ablak ellenőrzése
for (let i = 0; i < windows.length; i++) {
  if (kivalasztott_ablak != i && isCollision(ball, windows[i])) {
    gameState = 3;
  }
}
```

**Objektum struktúra az ütközéshez:**
```javascript
const object = {
  x: 10,        // X pozíció
  y: 20,        // Y pozíció
  width: 50,    // Szélesség
  height: 30    // Magasság
};
```

---

## Segédfüggvények

### `random(a, b)`
Véletlen egész szám generálása a és b között (beleértve mindkettőt).

**Függvény:**
```javascript
function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}
```

**Használat:**
```javascript
let kivalasztott_ablak = random(0, 2); // 0, 1 vagy 2
```

---

## Projekt Szerkezet

### Alkalmazás Állapot (State)
Az objektumok tulajdonságai:

```javascript
const plane = {
  x: 0,           // X pozíció
  y: 20,          // Y pozíció
  width: 60,      // Szélesség
  height: 30,     // Magasság
  vx: 0,          // Vízszintes sebesség (px/s)
  img: new Image() // Kép objektum
};

const ball = {
  x: 10,          // X pozíció
  y: 290,         // Y pozíció
  width: 20,      // Szélesség
  height: 20,     // Magasság
  vx: 0,          // Vízszintes sebesség (px/s)
  vy: 0,          // Függőleges sebesség (px/s)
  ay: 0,          // Függőleges gyorsulás (px/s²)
  img: new Image() // Kép objektum
};
```

### Game State (Játék Állapot)
Állapotgép használata:

**Parcel projekt:**
```javascript
let gameState = 0;
// 0 - start (kezdés)
// 1 - moving (mozgás)
// 2 - dropping (ejtés)
// 3 - hit (találat)
// 4 - missed (elhibázva)
```

**Romeo projekt:**
```javascript
let gameState = 0;
// 0 - start (kezdés)
// 1 - moving (mozgás)
// 2 - hit (találat)
// 3 - missed (elhibázva)
```

---

## Tipikus Minta: Game Loop

```javascript
// 1. Állapot létrehozása
const player = {
  x: 0,
  y: 0,
  vx: 100,  // sebesség
  img: new Image()
};

// 2. Képek betöltése
player.img.src = "player.png";

// 3. Game loop
let lastFrameTime = performance.now();

function next(currentTime = performance.now()) {
  const dt = (currentTime - lastFrameTime) / 1000;
  lastFrameTime = currentTime;

  update(dt);
  render();

  requestAnimationFrame(next);
}

// 4. Update függvény - logika
function update(dt) {
  player.x += player.vx * dt;
  
  if (player.x > canvas.width) {
    player.x = 0;
  }
}

// 5. Render függvény - rajzolás
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(player.img, player.x, player.y, 50, 50);
}

// 6. Loop indítása
next();
```

---

## Matematikai Műveletek

### `Math.floor()`
Lefelé kerekítés.

```javascript
Math.floor(3.7); // 3
Math.floor(Math.random() * 10); // 0-9 közötti egész
```

### `Math.random()`
Véletlen szám 0 és 1 között.

```javascript
Math.random(); // pl: 0.7234...
Math.random() * 100; // 0-100 közötti tört szám
```

---

## Hasznos Canvas Határellenőrzések

```javascript
// Kilépés a vászon jobb széléről
if (plane.x > canvas.width) {
  // valami történik
}

// Elérte a vászon alját
if (parcel.y >= canvas.height) {
  parcel.vy = 0;
  parcel.vx = 0;
  gameState = 4;
}

// Kilépés bármelyik irányba
if (ball.x > canvas.width || ball.y > canvas.height || 
    ball.x <= 0 || ball.y <= 0) {
  gameState = 3;
}
```

---

## Tömbök és Ciklusok

### Tömb létrehozása
```javascript
const windows = [
  { x: 479, y: 122, width: 15, height: 30 },
  { x: 494, y: 240, width: 18, height: 42 },
  { x: 562, y: 240, width: 18, height: 42 }
];
```

### forEach Ciklus
```javascript
windows.forEach(ablak => {
  ctx.fillStyle = "yellow";
  ctx.fillRect(ablak.x, ablak.y, ablak.width, ablak.height);
});
```

### For Ciklus
```javascript
for (let i = 0; i < windows.length; i++) {
  let ablak = windows[i];
  ctx.fillStyle = kivalasztott_ablak === i ? "yellow" : "blue";
  ctx.fillRect(ablak.x, ablak.y, ablak.width, ablak.height);
}
```

---

## Összefoglalás

### Alapvető Canvas Workflow:
1. **Kiválasztás**: `querySelector` → Canvas elem
2. **Kontextus**: `getContext("2d")` → Rajzolási környezet
3. **Állapot**: Objektumok létrehozása (pozíció, sebesség, stb.)
4. **Képek**: `new Image()` és `img.src` → Betöltés
5. **Loop**: `requestAnimationFrame` → Folyamatos frissítés
6. **Update**: Fizikai számítások (dt alapú)
7. **Render**: `clearRect` → `drawImage`/`fillRect` → Újrarajzolás
8. **Események**: `addEventListener` → Felhasználói interakció

### Fizika Alapok:
- **Pozíció**: `x`, `y`
- **Sebesség**: `vx`, `vy` (pixel/másodperc)
- **Gyorsulás**: `ax`, `ay` (pixel/másodperc²)
- **Frissítés**: 
  - `vy += ay * dt` (sebesség változik a gyorsulással)
  - `y += vy * dt` (pozíció változik a sebességgel)

---

**Készítette:** Összefoglaló a Parcel és Romeo and Juliet Canvas projektekből  
**Dátum:** 2025. december 18.
