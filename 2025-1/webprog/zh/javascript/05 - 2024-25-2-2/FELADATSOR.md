# Évfolyam ZH

## Tudnivalók

### Kezdőcsomag
Letölthető erről a linkről: [https://webprogramozas.inf.elte.hu:8081/attachments/114](https://webprogramozas.inf.elte.hu:8081/attachments/114)

### Meddig írhatom?
- A zárthelyi dolgozat **19:30-ig** írható, amely **magába foglalja** a feladatok megoldása mellett: a kiinduló állományok letöltését; a `README` file kitöltését, mely nélkül a megoldás **elégtelen**; a kész megoldás tömörítését és feltöltését. Idő utólagos bővítésére **nincs lehetőség**. 
- A feladatokat a [ZH rendszeren](https://webprogramozas.inf.elte.hu/zh) keresztül kell beadni. A rendszer pontban 19:30-kor lezár. A zárthelyi dolgozat időtartamának **utolsó 10 percében már csak a tömörítéssel és feltöltéssel foglalkozz**! Az utolsó pillanatra hagyott sikertelen feltöltés ugyanúgy elégtelen érdemjeggyel jár.

### Mit használhatok?
- A [ZH rendszerbe](https://webprogramozas.inf.elte.hu/zh) előre feltöltött segédanyagaidat.
- [JavaScript dokumentációt](https://developer.mozilla.org/en-US/).
- [PHP dokumentációt](https://www.php.net/).
- Az [előadások diasorát](https://webprogramozas.inf.elte.hu/webprog/lectures-pdf/).

### Mit nem használhatok?
Többek közt:
- Emberi segítség (szinkron, aszinkron, chat, fórum, stb.), kivéve a felügyelőtanároktól történő segítségkérést.
- Mesterséges intelligencia (ChatGPT, Bing AI, GitHub Copilot, AI kódkiegészítést/segítséget tartalmazó VS code kiegészítők. stb.).  
**❗ A telepített kiegészítőid nem-ismerete nem mentesít a következmények alól.** Amennyiben valaminek a használatában bizonytalan vagy, inkább kérdezz rá nálunk.

Mindezek elfogadásáról a kezdőcsomagban található `README` fájlban kell nyilatkoznod.

### Mit kell még tudnom?
- A feladatok (1, 2, 3...) nem épülnek egymásra, **tetszőleges sorrendben** megoldhatók. A részfeladatok (a, b, c...) feladaton belül esetenként egymásra épülhetnek, vagy egy korábbi részfeladat megoldása segítheti egy későbbi megoldását – de ettől függetlenül érdemes végigolvasni őket, mert előfordulhat, hogy bár az *a* és *b* feladatot épp nem tudod megoldani valahol, de a *c-e* részfeladatokhoz viszont beugrik a megoldás. Ezen felül javasoljuk, hogy ha elakadsz egy részfeladattal, akkor ne azzal tölts el egy órát, hanem haladj tovább (a következő feladat első pár részfeladata több pontot érhet, mint az az egy részfeladat, amin épp elakadtál).
- A feladatok megoldásához először töltsd le az általunk készített keretprogramot. Ebben minden feladat külön könyvtárban helyezkedik el. Minden könyvtárban előkészítettük a HTML, CSS, JavaScript, PHP állományokat. Ezekben dolgozz! A kliensoldali feladatokban általában csak a `.js` fájlhoz kell hozzányúlni, de ha kell, akkor a HTML is módosítható, sőt több `.js` fájlra is szétoszthatod a megoldásodat, de ez egyáltalán nem elvárás.
- A letöltött keretprogramban lévő `README` fájlba írd be a Neptun kódodat és a nevedet! **A megfelelően kitöltött `README` állomány nélküli megoldásokat nem értékeljük!**
- Minden feladat könyvtárában találsz egy `TASKS.md` fájlt. Ezekben az egyes `[ ]` közötti szóközt cseréld le `x`-re azoknál a részfeladatoknál, amiket sikerült (akár részben) megoldanod! Ez segít nekünk abban, hogy miket kell néznünk az értékeléshez.
- Mindenképpen telepítsd a PHP-t a gépre: [https://webprogramozas.inf.elte.hu:8081/attachments/104](https://webprogramozas.inf.elte.hu:8081/attachments/104)

### Adatok
❗ Ebben a ZH-ban az összes feladat ugyanazokkal az adatokkal fog dolgozni, hogy ne kelljen újra és újra megérteni a különböző sémákat. Az adatokat számos formátumban megtalálod a `data` mappában. Bármelyiket használhatod bármely feladatnál, bátran másold bele a feladat mappájába a szimpatikus filet, vagy másold ki a tartalmát és illeszd be a kódodba egy az egyben. Az adatokhoz bármilyen segédattribútumot hozzáadhatsz, ha szükséges.

Az egyes elemek mind koncertvideók (élő fellépések felvételeinek) adatai:
- `id`: Egyedi azonosító, ami csak angol kisbetűkből és számjegyekből áll.
- `yt`: YouTube azonosító, ami az élő fellépésre mutat. Tartalmazhat kis- és nagy angol betűket, számjegyeket, kötőjeleket, alulvonásokat (és bármelyikkel kezdődhet).
- `title`: A videó címe `Előadó Neve - Zene Címe` formátumban. Ez pontosan egy darab kötőjelet (`-`) tartalmaz, ami elválasztja az előadó nevét a zeneszám címétől.
- `year`: A felvétel éve (ebben az évben szerepelt a szám az Eurovízión).
- `views`: A videó nézettsége (millió) az Eurovízió YouTube csatornáján. Nem feltétlen egész szám.
- `nation`: Csak az utolsó PHP feladatban lesz releváns. Megadja, melyik ország színeiben lépett fel az előadó ezzel a dallal.

## Lore
Az Eurovíziós dalfesztiválok után a fellépések újranézhetőek online. Mivel nincs elég videó/zenemegosztó felület, mi is belevágunk, hogy készítsünk egyet.

## JavaScript feladatok

### 1. Videók adatai (js-1-videodata, 10 pont)
Először is szeretnénk tudni pár információt a kedvenc Eurovíziós dalainkról. A feladatokat **ne beégetve oldd meg, hanem programozottan**, hiszen később lehet, hogy új dalok is megtetszenek!

- a. (1 pont) A `taskA` azonosítójú elembe írd ki egy 2000 előtti videó címét.
    - Feltételezheted, hogy létezik ilyen.
- b. (2 pont) A `taskB` azonosítójú elembe sorold fel, hogy mely videók szereztek 100 milliónál több megtekintést!
- c. (2 pont) A `taskC` azonosítójú elembe írd ki, hogy hány videó címében szerepel a `Love` szó!
    - Feltételezheted, hogy mindegyikben pontosan így szerepel (nagy `L`, kis `ove`).
- d. (3 pont) A `taskD` azonosítójú elembe írd ki, átlagosan hány megtekintése van a 2024-es videóknak! Az eredményt kerekítsd két tizedes pontosságra!
    - Feltételezheted, hogy nem 0 db ilyen van.
    - Részpontért: Kerekítés nélkül.
- e. (2 pont) A `taskE` azonosítójú elembe írd ki, hogy van-e olyan zeneszám, aminek a címében szerepel számjegy.
    - Nem a videó teljes címe a kérdés, hanem a videó címében a kötőjel utáni "Zene Címe" rész.
    - A válasz lehet `Igen / Nem`, `true / false`, `0 / 1` vagy hasonló, logikus és beszédes eredmény.
    - Ne ragadj le ennél a részfeladatnál, ha nem jön az ötlet, inkább lépj tovább a következő feladatra.

![JavaScript task1](https://webprogramozas.inf.elte.hu:8081/attachments/98)

### 2. Videók (js-2-videolist, 15 pont)
Mivel még nem tudjuk, hogyan kell lekérdezni egy YouTube videó aktuális nézettségét, kézzel kell megejtenünk az adatok frissen tartását.

- a. (2 pont) A `#video-table` táblázatba listázd a videókat a mintának megfelelően (év, cím, nézettség millió)!
- b. (2 pont) A videókat (táblázat sorokat `tr`) lehessen kijelölni.
    - Ha rákattintunk egy videóra (táblázat sorra `tr`), alkalmazd rá a `selected` stílusosztályt!
    - Ha egy már kijelölt videóra (táblázat sorra `tr`) kattintunk, vedd le róla a `selected` stílusosztályt!
- c. (1 pont) A `#sum` elembe írd ki a videók össz nézettségét.
- d. (2 pont) Ha van kijelölt videó, a `#sum` elemben csak a kijelölt videók össz nézettsége legyen (egyébként az összes videóé).
- e. (4 pont) A `#controls` elemben lévő gombok működjenek értelemszerűen: a `#btn-add` megnyomására az összes kijelölt elemben növeld a nézettséget az `#amount` elem értékével; a `#btn-sub` pedig csökkentse őket, de az érték negatívra nem csökkenhet, helyette nullán marad.
    - Részpontért (ha a kijelölés nem megy): Fixen az első két sor értékét változtasd.
    - Részpontért (ha az input mező nem megy): Fixen 1-gyel növeld/csökkentsd az értékeket.
    - Ha semmi nincs kijelölve, semmit ne növelj!
    - A d. részfeladat összegét tartsd frissen!
- f. (4 pont) A fejléc cellákra kattintva rendezd a táblázatot a kattintott oszlop szerint csökkenően!
    - Mindegy, hogy ilyenkor a kijelölések megmaradnak vagy eltűnnek.
    - Részpontért: Kigeneráláskor rendezd nézettség szerint csökkenő sorrendbe. Nincs kattintás/intreraktivitás a rendezésben.
    - Igen, valóban, ha jól csináltad, az ABC sorrendbe rendezés W-től indul és A felé megy. Nem kell bonyolítani azzal, hogy a cím növekvő, a nézettség és év csökkenő.
    - Azzal se nehezítsd az életed, hogy újra ugyanazon oszlopra kattintásnál a másik irányba rendezed.

![JavaScript task2](https://webprogramozas.inf.elte.hu:8081/attachments/99)

### 3. Népszerűség (js-3-popularity 11 pont)
A videók nézettségét érdemes kirajzolnunk valamilyen vizualizációba, hiszen az ilyen megjelenítések nagyon népszerűek szoktak lenni.

*A kódban nem neked kell a háttérműködést megírni, azt mi biztosítjuk a kiinduló kóddal. A te feladatod, hogy a `drawColumn` és a `drawCircleSector` (circle sector = körcikk = tortaszelet) függvényeket kiegészítsd, és ezzel a háttérben tárolt modellt megjelenítsd.*

```JS
/**
 * Kirajzol egy darab oszlopot az oszlopdiagramra.
 * @param video A videó adatai a feladatsor elején meghatározott attribútumokkal (pl. id, views).
 * @param index Hanyadik oszlopot rajzoljuk éppen ki.
 * @param columnWidth Az oszlopszélesség a diagramon.
 */
function drawColumn(video, index, columnWidth)
```

```JS
/**
 * 
 * @param video A videó adatai a feladatsor elején meghatározott attribútumokkal (pl. id, views).
 * @param totalViews A videók össz nézettsége.
 * @param centerX A kör középpontjának X koordinátája.
 * @param centerY A kör középpontjának Y koordinátája.
 * @param radius A kör sugara.
 */
function drawCircleSector(video, totalViews, centerX, centerY, radius)
```

- a. (3 pont) A `drawColumn` függvényben rajzold ki a videóhoz tartozó oszlopot.
    - Használd a `fillRect` függvényt!
    - A téglalap bal felső sarka az `x: index × oszlopszélesség`, `y: 400 - nézettség` pontban található.
    - A téglalap szélességét a paraméterként kapott `columnWidth` változó adja meg.
    - A téglalap magasságát a videó nézettsége adja meg.
- b. (1 pont) A kirajzolt téglalap színe legyen a videó `id` attribútumának első 6 karaktere.
    - Használd a `substring` függvényt.
    - Ne felejts el egy `#` jelet tenni a szín elejére, hiszen ez egy hexadecimális szám.
- c. (2 pont) Írd ki az oszlop tetejére a videó nézettségét.
    - Javasolt szövegattribútumok: `fillStyle: black`, `font: 12px Arial`, `textAlign: center`
    - A szöveg helyzete legyen `x: index × oszlopszélesség + index × oszlopszélesség/2`, `y: 400 - nézettség - 5`
- d. (3 pont) A `drawCircleSector` függvényben rajzold ki a körcikket.
    - A "tortaszelet" körvonala a középpontból (`centerX, centerY`) indul.
    - Ez után egy `centerX, centerY` pontból induló `radius` sugaró körív következik, ami a `kiinduló szög -> kiinduló szög + körcikk szög` ívet fedi le.
    - Ezt követően pedig lezárjuk az útvonalat a középpontba.
- e. (1 pont) A kirajzolt körcikk színe legyen a videó `id` attribútumának első 6 karaktere.
    - Használd a `substring` függvényt.
    - Ne felejts el egy `#` jelet tenni a szín elejére, hiszen ez egy hexadecimális szám.

![JavaScript task3](https://webprogramozas.inf.elte.hu:8081/attachments/100)

## PHP feladatok
A PHP feladatok megoldásához ne használj JavaScriptet.

### 4. Videók adatai, de most PHP-val (php-4-videodata, 10 pont)

- a. (2 pont) Rajzolj ki annyi `card` stylusosztályú `a` elemet a `#main` elembe, ahány videó van az adatokban. A linkek mutassanak a `https://www.youtube.com/watch?v=abc123` oldalra, ahol az `abc123` a videó `yt` attribútuma. Minden link új oldalon nyíljon meg.
- b. (1 pont) Minden kártyába helyezz el egy `h2` elemet, aminek tartalma a videó címe. 
- c. (1 pont) A link alá egy `year` stílusosztályú `span` elembe írd ki a felvétel évét; egy `views` stílusosztályú `span` elembe pedig a nézettségét és a `millió` szót.
- d. (2 pont) A link fölé helyezz el egy képet, melynek forrása az `img` mappából a videó előképe. Minden kép neve a videó `id` attribútuma `jpg` kiterjesztésben.
- e. (2 pont) A kártyákra alkalmazz egy extra stílusosztályt a nézettségük alapján:
    - 100 millió vagy több: `very-popular` (ez fogja a cím köré tenni a `⭐` emojit)
    - 10 millió vagy több, 100 milliónál kevesebb: `slightly-popular`
    - 10 milliónál kevesebb: `partially-popular`
- f. (2 pont) A kártyák legyenek a videó címe szerint ABC sorrendben!
    - *Megoldás lehet például az* `usort` *és* `strcmp` *függvények együttes használata.*

![PHP task4](https://webprogramozas.inf.elte.hu:8081/attachments/101)

### 5. Új zeneszám megadása (php-5-newmusic, 14 pont)


*Validáld az űrlap helyességét elküldést követően szerveroldalon! (Tehát nem szabad beépített HTML/JS validációt használni, hanem PHP-t kell írni.)* **Teljes pont akkor jár egy-egy részfeladatra, ha az adott hiba kiírásra is kerül, egyébként csak az adott pont fele kapható!** *Az `#errors` div használata nem kötelező, a hibákat más módon is kiírhatod, például közvetlen az input mezők után, de az oldal első betöltésekor ne jelenjenek meg hibák! Érdemes lehet az állapottartást és hibakiírást az elején megírnod, hiszen utána könnyebb lesz ellenőrizned a megoldásod.*

- a. (2 pont) Minden mezőt kötelező kitölteni.
- b. (1 pont) A cím minimum 5 karakter hosszú.
- c. (1 pont) A cím kötelezően tartalmaz egy "szóköz kötőjel szóköz" triót (` - `).
- d. (1 pont) A megjelenés éve egy egész szám, értéke legalább `1956`, az első Eurovíziós Dalfesztivál éve.
    - A szöveges értéket és a tört számokat is szűrnöd kell.
- e. (1 pont) A nézettség egy (akár tört) szám, értéke legalább `0.01`.
    - A szöveges értéket kell szűrnöd.
- f. (1 pont) A kézi ID értéke csak `yes` vagy `no` lehet.
- g. (1 pont) Ha a kézi ID értéke `yes`, az ID megadása kötelező.
- h. (1 pont) Az ID nem létezhet már az adatokban.
    - Válaszd ki bármely adatforrás filet, vagy használd a csak ID-kat tartalmazót.
- i. (2 pont) Az ID csak számjegyeket és a kis `a, b, c, d, e, f` betűket tartalmazhatja (hexadecimális szám).
- j. (2 pont) Az űrlap állapottartó.
- k. (1 pont) A `success` azonosítójú `div` elem megjelenítését tedd feltételessé úgy, hogy csak hibátlanul kitöltött űrlap esetén jelenjen meg! Ilyenkor az `errors` mező ne jelenjen meg!

Hibaüzenetek (nem kötelező pont ezeket használni):
```
A cím megadása kötelező!
A cím legalább 5 betű!
A cím tartalmazzon egy kötőjelet, körülötte szóközökkel! ( - )
A megjelenés éve csak egész szám lehet!
A legkorábbi megjelenés 1956 lehet!
A nézettség csak szám lehet!
A nézettség minimum 0.01 millió (10,000)!
Ismeretlen "Kézi ID" érték!
Kézi ID esetén az ID megadása kötelező!
Az ID már létezik!
Az ID csak számjegyeket és a kis "a", "b", "c", "d", "e" és "f" betűket tartalmazhatja.
```

### 6. Országok (php-6-nations, 12 pont)
Jaj, kihagytuk az adatokból, hogy melyik országból származik az adott szám. Mivel nem szeretnénk közvetlen a fájlt szerkeszteni, felületet csinálunk hozzá.

*Használhatod a kiinduló JSON fileok egyikét, vagy csinálhatsz sajátot is, amelyik neked egyszerűbben használható. Az űrlap legürdölő listájának generálásához egy `videos.php` file már adott, de ezt akár törölheted is, ha menet közben leváltottad.*

- a. (3 pont) Listázd ki az ország nélküli videók címét a bal oldali oszlopba; az országgal már rendelkezőket a jobb oldaliba a mintának megfelelően!
- b. (2 pont) Az űrlappal adhassunk meg új videó - ország kapcsolatot!
    - Az űrlap egy `nation` attribútumban továbbítja az ország nevét, és `id` attribútumban a videó ID-ját.
    - Ha az előző részfeladatot megcsináltad, ez után a videónak a jobb oldalon kéne megjelennie.
- c. (3 pont) Legyen lehetőség ország hozzárendelést törölni. Ilyenkor a videó `nation` attribútuma üres lesz.
    - Ha az előző részfeladatot megcsináltad, ez után a videónak a bal oldalon kéne megjelennie.
- d. (2 pont) Ha egy videóhoz már van ország rendelve, ne jelenjen meg a videók listájában az űrlapon.
    - Ehhez bele kell nyúlnod a kiinduló űrlapos kódrészletbe.
- e. (2 pont) A videók mindkét oszlopban és a legördülő listában is cím szerint legyenek rendezve.
    - *Segítségedre lehet az* `usort` *függvény.*

![PHP rask6](https://webprogramozas.inf.elte.hu:8081/attachments/102)
