# JavaScript Tömbfüggvények Összefoglaló

Ez a dokumentum összefoglalja a feladatokban használt JavaScript tömbkezelő függvényeket példákkal.

---

## 1. **filter()** - Szűrés

A `filter()` metódus egy új tömböt hoz létre azokkal az elemekkel, amelyek megfelelnek egy adott feltételnek.

### Szintaxis:
```javascript
tomb.filter(elem => feltétel)
```

### Példák:

#### Bizonyos tulajdonságú elemek kiválasztása:
```javascript
// Holstein-fríz fajta tehenek:
tehenek.filter(x => x["fajta"] === "Holstein-fríz")

// 2000 előtti videók:
data.filter(x => x.year < 2000)

// 2010 után készült filmek:
searchResults["Search"].filter(result => result["Year"] > 2010 && result["Type"] === "movie")
```

#### Összetett szűrések:
```javascript
// Csupa 5-ös jegyű diákok:
students.filter(x => x["grades"].every(y => y === 5))

// Legalább 3 darab 1-es jegyű diákok:
students.filter(x => x["grades"].filter(y => y === 1).length >= 3)

// 100 millió feletti megtekintésű videók:
data.filter(x => x.views > 100)
```

---

## 2. **map()** - Átalakítás

A `map()` metódus egy új tömböt hoz létre úgy, hogy minden elemre alkalmaz egy függvényt.

### Szintaxis:
```javascript
tomb.map(elem => átalakítás)
```

### Példák:

#### Egyszerű átalakítások:
```javascript
// Számok négyzetre emelése:
numbers.map(x => x * x)

// Életkorok kiválasztása:
tehenek.map(x => x["kor"])

// Nevek kigyűjtése:
students.filter(x => x["grades"].every(y => y === 5)).map(x => x["name"])
```

#### Összetett átalakítások:
```javascript
// Videók címének kiválasztása:
data.filter(x => x.views > 100).map(x => x.title)

// IMDB azonosítók:
searchResults["Search"].filter(result => result["Year"] > 2010).map(x => x["imdbID"])

// Sorok hosszának megállapítása:
game.map(x => x.length)
```

---

## 3. **reduce()** - Összegzés/Redukálás

A `reduce()` metódus a tömb elemeit egyetlen értékké redukálja egy megadott művelettel.

### Szintaxis:
```javascript
tomb.reduce((accumulator, aktualis_elem) => művelet, kezdőérték)
```

### Példák:

#### Maximum/minimum keresés:
```javascript
// Legidősebb boci:
tehenek.map(x => x["kor"]).reduce((acc, a) => a > acc ? a : acc, 0)

// Legkisebb szám:
numbers.reduce((szam, ujszam) => szam > ujszam ? ujszam : szam)
```

#### Ellenőrzések:
```javascript
// Minden sor ugyanolyan hosszú?
game.map(x => x.length).reduce((mind_jo, kovetkezo) => 
  kovetkezo === game[0].length && mind_jo == true ? true : false, true)
```

#### Számlálás objektumba:
```javascript
// X és O karakterek számlálása:
game.join('').replace(" ", "").split("").reduce((a, b) => {
  b === "X" ? a.x++ : a.o++
  return a     
}, {x: 0, o: 0})
```

#### Összegzés:
```javascript
// Megtekintések összege:
ketezer_huszon_negyesek.map(x => x.views).reduce((sum, a) => sum + a)
```

---

## 4. **every()** - Minden elem megfelel?

Az `every()` metódus `true`-t ad vissza, ha minden elem megfelel a feltételnek.

### Szintaxis:
```javascript
tomb.every(elem => feltétel)
```

### Példák:

```javascript
// Minden tehén idősebb mint 2 éves?
tehenek.filter(x => parseInt(x["kor"])).every(x => x > 2)

// Csupa 5-ös jegyű diákok:
students.filter(x => x["grades"].every(y => y === 5))

// Mátrix sorában csupa 0?
matrix.findIndex(x => x.every(y => y === 0))
```

---

## 5. **some()** - Van legalább egy elem?

A `some()` metódus `true`-t ad vissza, ha legalább egy elem megfelel a feltételnek.

### Szintaxis:
```javascript
tomb.some(elem => feltétel)
```

### Példák:

```javascript
// Van fekete-fehér bika?
tehenek.some(x => x["szin"] === "fekete-fehér" && x["nem"] === "bika")

// Van fekete-fehér tehén?
tehenek.some(x => x["szin"] === "fekete-fehér" && x["nem"] === "tehén")

// Kombinált használat:
tehenek.some(x => x["szin"] === "fekete-fehér" && x["nem"] === "bika") && 
tehenek.some(x => x["szin"] === "fekete-fehér" && x["nem"] === "tehén")
```

---

## 6. **findIndex()** - Index keresése

A `findIndex()` metódus visszaadja az első olyan elem indexét, amely megfelel a feltételnek. Ha nincs ilyen, -1-et ad vissza.

### Szintaxis:
```javascript
tomb.findIndex(elem => feltétel)
```

### Példák:

```javascript
// Három O vagy három X egymás mellett:
const x = game.findIndex(x => x.includes("XXX"))
const y = game.findIndex(x => x.includes("OOO"))

// Csupa 0-ból álló sor:
matrix.findIndex(x => x.length == x.filter(y => y == 0).length)
// Vagy:
matrix.findIndex(x => x.every(y => y === 0))
```

---

## 7. **length** - Tömb hossza

A `length` tulajdonság megadja a tömb elemeinek számát.

### Példák:

```javascript
// Holstein-fríz tehenek száma:
tehenek.filter(x => x["fajta"] === "Holstein-fríz").length

// Megbukott diákok száma:
students.filter(x => x["grades"].filter(y => y === 1).length >= 3).length

// "Love" szót tartalmazó videók száma:
data.filter(x => x.title.includes("Love")).length

// Sorok hosszának ellenőrzése:
game.map(x => x.length)
```

---

## 8. **join()** - Tömb összefűzése stringgé

A `join()` metódus a tömb elemeit egyetlen stringgé fűzi össze.

### Szintaxis:
```javascript
tomb.join(elválasztó)
```

### Példák:

```javascript
// Nevek felsorolása vesszővel:
students.filter(x => x["grades"].every(y => y === 5)).map(x => x["name"]).join(", ")

// Videók címeinek felsorolása:
data.filter(x => x.views > 100).map(x => x.title).join(", ")

// Stringgé alakítás elválasztó nélkül:
game.join('')
```

---

## 9. **split()** - String darabolása tömbbé

A `split()` metódus egy stringet tömbbé alakít egy elválasztó karakter alapján.

### Szintaxis:
```javascript
string.split(elválasztó)
```

### Példák:

```javascript
// X és O karakterek számlálása:
game.join('').replace(" ", "").split("")

// Videó címének darabolása:
data.map(x => x.title.split("-")[1].replace(" ", "").split(""))

// Karakterenkénti feldolgozás:
game[0].split("").filter(x => x === 'X').length
```

---

## 10. **includes()** - Tartalmaz-e elemet?

Az `includes()` metódus `true`-t ad vissza, ha a tömb vagy string tartalmazza a keresett elemet.

### Szintaxis:
```javascript
tomb.includes(keresett_elem)
string.includes(keresett_string)
```

### Példák:

```javascript
// "Love" szó a címben:
data.filter(x => x.title.includes("Love"))

// Három azonos karakter keresése:
game.findIndex(x => x.includes("XXX"))
game.findIndex(x => x.includes("OOO"))

// Számjegy a címben:
video_kotojel_utan.filter(x => x.filter(y => szamok.includes(y) === true).length >= 1)
```

---

## 11. **replace()** - String csere

A `replace()` metódus egy stringben kicserél egy részletet.

### Szintaxis:
```javascript
string.replace(mit, mire)
```

### Példák:

```javascript
// Szóköz eltávolítása:
game.join('').replace(" ", "")

// Videó címének feldolgozása:
data.map(x => x.title.split("-")[1].replace(" ", "").split(""))
```

---

## 12. DOM Manipuláció

### querySelector / querySelectorAll

HTML elemek kiválasztása:

```javascript
// Egyetlen elem:
const task1 = document.querySelector('#task1')
const megjelenito_gomb = document.querySelector("button")
const hsl_kimenet = document.querySelector("input[type=text]")

// Több elem:
const csuszkak = document.querySelectorAll("input[type=range]")
hue = document.querySelectorAll("input[type=range]")[0]
```

### innerHTML - Tartalom beállítása

```javascript
task1.innerHTML = tehenek.filter(x => parseInt(x["kor"])).every(x => x > 2)
task2.innerHTML = tehenek.filter(x => x["fajta"] === "Holstein-fríz").length
taskA.innerHTML = data.filter(x => x.year < 2000)[0].title
```

### addEventListener - Eseménykezelés

```javascript
// Gomb kattintás:
megjelenito_gomb.addEventListener("click", update_hsl)

// Input változás:
hue.addEventListener("input", update_hsl)

// Delegált eseménykezelés:
document.querySelector("#contacts").addEventListener("click", function(event) {
    if (event.target.matches("button")) {
        // ...
    }
})
```

### Stílus változtatás:

```javascript
document.body.style.background = hsl_string
```

### Dataset és closest:

```javascript
// Data attribútum olvasása:
button.dataset.toggle

// Szülő elem keresése:
const section = button.closest("section")
```

### Hidden attribútum:

```javascript
emailField.hidden = false
```

---

## 13. Matematikai Műveletek

### Math.round() - Kerekítés

```javascript
// Két tizedesre kerekítés:
Math.round(megtekintesek_ossz / (ketezer_huszon_negyesek.length) * 100) / 100
```

---

## 14. Típuskonverziók

### parseInt() - String számmá alakítása

```javascript
tehenek.filter(x => parseInt(x["kor"]))
```

---

## Összetett példák kombinált használatra:

### 1. Átlag számítás:
```javascript
// 2024-es videók átlagos megtekintése:
ketezer_huszon_negyesek = data.filter(x => x.year === 2024)
megtekintesek_ossz = ketezer_huszon_negyesek.map(x => x.views).reduce((sum, a) => sum + a)
atlag = Math.round(megtekintesek_ossz / (ketezer_huszon_negyesek.length) * 100) / 100
```

### 2. Maximum elem keresése ciklussal:
```javascript
// Ki kapta a legtöbb egyest?
max_id = 0
for (let i = 0; i < students.length; i++) {
  max_student = students[max_id]["grades"].filter(x => x === 1).length
  most_student = students[i]["grades"].filter(x => x === 1).length
  max_student < most_student ? max_id = i : ""
}  
students[max_id]["name"]
```

### 3. Feltételes logika:
```javascript
// Sor index keresése háromból:
const x = game.findIndex(x => x.includes("XXX"))
const y = game.findIndex(x => x.includes("OOO"))
if (x != -1) {
  task4.innerHTML = x
} else if (y != -1) {
  task4.innerHTML = y
} else {
  task4.innerHTML = "Nincs ilyen"
}
```

### 4. Többlépéses szűrés és átalakítás:
```javascript
// 2010 utáni movie típusú elemek IMDB azonosítói:
searchResults["Search"]
  .filter(result => result["Year"] > 2010 && result["Type"] === "movie")
  .map(x => x["imdbID"])
```

---

## Tippek és trükkök:

1. **Láncolt metódusok**: A legtöbb tömbfüggvény újabb tömböt ad vissza, így láncolhatók:
   ```javascript
   tomb.filter(...).map(...).reduce(...)
   ```

2. **Ternary operátor**: Rövid feltételes kifejezések:
   ```javascript
   feltétel ? igaz_ág : hamis_ág
   ```

3. **Arrow függvények**: Rövid szintaxis:
   ```javascript
   x => x * 2  // egyetlen kifejezés
   (a, b) => { return a + b }  // törzs blokkal
   ```

4. **Objektum property elérés**:
   ```javascript
   obj["property"]  // szögletes zárójellel
   obj.property     // pont notációval
   ```

5. **Boolean műveletek**: `&&` (és), `||` (vagy), `!` (nem)
   ```javascript
   cond1 && cond2  // mindkettő igaz
   cond1 || cond2  // legalább egy igaz
   ```

---

## Összefoglalás - Mikor mit használj?

- **filter()** - Ha ki akarod válogatni azokat az elemeket, amelyek megfelelnek egy feltételnek
- **map()** - Ha minden elemet át akarsz alakítani valamilyen formában
- **reduce()** - Ha egyetlen értékké akarsz összegezni/redukálni egy tömböt
- **every()** - Ha meg akarod tudni, hogy **minden** elem megfelel-e egy feltételnek
- **some()** - Ha meg akarod tudni, hogy **van-e legalább egy** elem, ami megfelel
- **findIndex()** - Ha az **első** megfelelő elem indexére van szükséged
- **length** - Ha a tömb hosszára vagy elemszámára vagy kíváncsi
- **join()** - Ha tömböt akarsz stringgé alakítani
- **split()** - Ha stringet akarsz tömbbé alakítani
- **includes()** - Ha egy elem vagy substring meglétét akarod ellenőrizni
