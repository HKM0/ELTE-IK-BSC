# Gyakorló feladatsor: Okos regisztrációs űrlap

A feladatokat a kiadott `main.js` fájlban készítsd el. Az `index.html`-ben lévő kommentek (illetve `TODO` jelzések) segítenek a tájékozódásban.

## 1. Komplex jelszó input

Készíts egy egyedi komponenst (`<password-input>`), amely egyrészt képes egy gombnyomásra megjeleníteni vagy elrejteni a beírt jelszót, másrészt folyamatosan validálja azt!

1. Készíts egy `PasswordInput` osztályt, ami a `HTMLElement`-ből származik (Autonomous custom element).
2. A komponenst a `connectedCallback` életciklus metódusban építsd fel: 
   * Keresd meg a komponensen belüli `<input>` elemet (`this.querySelector('input')`).
   * Keresd meg a komponensen belüli validációs listaelemeket is (pl. `this.reqLength = this.querySelector('#req-length')`).
   * Dinamikusan hozz létre egy `<a>` elemet (pl. `Mutat` felirattal), és illeszd be közvetlenül az input mező után (`this.input.after(gomb)`).
3. **Kattintás esemény (Rejtés/Mutatás):** Adj egy kattintás eseménykezelőt a létrehozott gombhoz, ami rákattintáskor váltogatja a belső input mező `type` attribútumát `password` és `text` között (cseréld a szöveget indulástól függően `Mutat` és `Rejt` között).
4. **Input esemény (Validáció):** Iratkozz fel az `<input>` elem `input` eseményére is! Amikor a felhasználó gépel, alakítsd át a mező aktuális értékét egy karaktertömbbé (pl. `split`). *Figyelj a `.bind(this)` használatára és mindkét eseménykezelő eltávolítására a `disconnectedCallback`-ben!*
5. Az `input` eseményen belül **tömbfüggvényekkel** (`length`, `.some`, `.includes`) ellenőrizd a következő négy feltételt, majd cseréld a Bootstrap osztályokat (`text-danger` vs `text-success`) a kiolvasott listaelemeken!
   * **Hosszúság:** Van-e legalább 8 karakter hosszú?
   * **Nagybetű:** Tartalmaz-e legalább egy nagybetűt?
   * **Szám:** Tartalmaz-e legalább egy számjegyet? (Tipp: használd a `!isNaN(karakter)` vizsgálatot!)
   * **Speciális karakter:** Tartalmaz-e legalább egyet a speciális karakterekből?
*(Tipp: A JS fájl tetején hozz létre globális tömböket a kisbetűknek/nagybetűknek és speciális karaktereknek, majd ehhez viszonyíts!)*
6. Regisztráld be a custom elementet `password-input` néven az elemek közé, és ellenőrizd, hogy az `index.html`-ben mind a jelszó input, mind a validációs lista megfelelően be van-e burkolva a `<password-input>` taggel!

## 2. ÁSZF "Elolvastam" (Intersection Observer)

A *Regisztráció* gomb (`#submitBtn`) alapértelmezetten le van tiltva a JavaScript fájl elején (`submitBtn.disabled = true`). A felhasználót rá kell kényszeríteni, hogy görgessen a Felhasználási Feltételek végére.

1. Használd az **Intersection Observer API**-t! A megfigyelendő célpont a `#termsBox` görgethető területének legalján lévő `#termsEndAnchor` (egy szöveges `span` elem).

2. Az observer-t úgy paraméterezd fel, hogy a `#termsBox`-on belüli görgetést figyelje (`root` beállítása), és csak akkor jelezzen, ha a horgonyelem 100%-ban láthatóvá vált a dobozon belül (`threshold`).
```javascript
const observer = new IntersectionObserver(onObserve, {
    root: document.getElementById('termsBox'), // Ezzel  megmondjuk, hogy csak a termsBox-on belüli görgetést figyelje
    threshold: 1
});

```
3. Ha a célpont láthatóvá válik (a felhasználó teljesen legörgetett), oldd fel a Regisztráció gombot (`submitBtn.disabled = false`).
