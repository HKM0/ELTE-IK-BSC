# Programozási nyelvek Java 2024-25/2 – Beadandó feladat

## Feltételek

- A megoldást a gyakorlat TMS-csoportjába kell feltölteni.  
    A leírás az előadás TMS-csoportjában olvasható, de nem ott kell beadni a megoldást.
- **Beadás formátuma:** zip  
    Csak a megoldás forrásfájljait tartalmazza, a megfelelő könyvtárszerkezetben.
        - Más fájlokat (pl. `.class`) ne tartalmazzon a zip.
        - Ha a megoldás működtetéséhez szükségesek további (pl. bemeneti) fájlok, azok a zip gyökerében legyenek.
        - ⚠️ Ne tartalmazzon szükségtelen könyvtárakat. Ha például a megoldás fájljai bekerülnek egy beadandó könyvtárba, amit a feladat nem kért, az automatikus tesztelő elutasíthatja a megoldást.
    - Amennyiben a 7Zip program telepítve van, a `check.cmd` előkészíti a feltölthető fájlt `solution.zip` néven.
    - Feltöltés után pár perccel egy autotesztelő fut le. Ha hibát jelez, a megoldás javítandó.
- A beadandó általános feltételei az előadás Canvasében, a Tematika oldalon olvashatók.
    - **Csalni tilos.** Aki mégis megteszi, és kiderül, elesik a tárgy teljesítésétől.
    - További részletek: lásd a Tematika oldal megfelelő aloldalát.
- A megoldás legyen a lehető legjobb minőségű.
    - A feladatban megadott neveket pontosan úgy kell használni, ahogy meg vannak adva.
    - Kövesd a Java nyelv szokásos konvencióit.
    - A kód szerkezete, a változók nevei legyenek megfelelők.
- **Beadás határideje**
    - A megoldás a határidőn belül többször is beadható.
        - Aki egyáltalán nem tölt fel megoldást, elesik a tárgy teljesítésétől.
        - Az utoljára beadott megoldás kerül értékelésre.
    - A határidő éles.
        - Nem célszerű kicentizni az időt. Aki mégis megteszi, és lekésik akár pár perccel, csak magára vethet.

---

## Parkolóház feladat

Készíts egy egyszerűsített parkolóház szimulációt Java nyelven, amely tartalmazza a következő alapvető funkciókat:
- járművek regisztrációja,
- parkolóhelyek kiosztása,
- autók visszakeresése.

Ez egy egyszerűsített változat; egy valódi rendszer fejlettebb funkciókat és optimalizációkat tartalmazna.

### Parkolóhelyek

A `Space` osztály segítségével hozható létre a `ParkingLot`, amely a hozzárendelt `Car` objektum hivatkozását tárolja.

#### Space osztály műveletei

- `addOccupyingCar()`: A paraméterként kapott `Car` objektum hivatkozását rendeli hozzá a parkolóhelyhez, másolat készítése nélkül.
- `removeOccupyingCar()`: A tárolt `Car` hivatkozást `null`-ra állítja, ezzel eltávolítva az ott parkoló autót.
- `isTaken()`: Ellenőrzi, hogy tartozik-e már a helyhez egy `Car` hivatkozás, azaz foglalt-e az adott parkolóhely. Ha igen, igaz értéket ad vissza.

> **Fontos:** Ha egy nagyméretű autó érkezik, az két szomszédos helyet foglal el, és mindkét helyen ugyanaz a `Car` hivatkozás tárolódik.

---

### Jármű

A `Car` osztály a parkolóházba érkező járműveket ábrázolja. A `ticketId`-t csak a kapu állíthatja be, jelezve, hogy az autó be lett engedve. A további funkciókat a strukturális tesztekben leírtak szerint kell megvalósítani.

A `Size` enum csak két értéket tartalmazzon: `SMALL` és `LARGE`.

---

### Tesztelés

A `ParkingLotTestSuite` tartalmazza az egész feladat tesztjeit. Győződj meg arról, hogy minden teszt sikeresen lefut, beleértve a strukturális és funkcionális teszteket is.

- A funkcionális tesztek célja annak ellenőrzése, hogy a program valóban a kívánt módon működik.

---

### A kapu

A `Gate` osztály az autók regisztrálásának és eltávolításának fő kezelője, a parkolási műveleteket a megadott `ParkingLot` segítségével végzi.

#### Gate osztály műveletei

- `findTakenSpaceByCar()`: Segédfüggvény, visszaadja az adott autó által foglalt első helyet.
- `findAvailableSpaceOnFloor()`: Segédfüggvény, visszaadja az első elérhető helyet az adott autó számára. Nagyméretű autó esetén a második helyet adja vissza, biztosítva, hogy az első hely is üres legyen.
- `findAnyAvailableSpaceForCar()`: Visszaad egy tetszőleges elérhető helyet, amely alkalmas az autó befogadására, a segédfüggvény használatával.
- `findPreferredAvailableSpaceForCar()`: Visszaad egy olyan elérhető helyet, amely alkalmas az autó befogadására, a segédfüggvény használatával. Ha a preferált emeleten nincs hely, a keresés lefelé terjed a következő emeletre, majd felfelé, váltakozva, amíg egy elérhető helyet nem találunk, vagy minden emeletet átnéztünk.
- `registerCar()`: Egy autó hozzáadása a parkolóhoz, akár a preferált helyére, akár a következő legjobb szabad helyre. Sikeres hozzáadás esetén igaz értéket ad vissza.
- `registerCars()`: Több autó regisztrációja preferenciák figyelmen kívül hagyásával, megpróbál minden autó számára szabad helyet találni. Ha egy adott autó számára nem található hely, hibaüzenetet ír ki a hiba kimenetre, majd áttér a következő autóra.
- `deRegisterCar()`: Ellenőrzi az autó által megadott jegyet, és eltávolítja az autó hivatkozását a parkolóhelyéről.

---

### JUnit 5 tesztek

> **Megjegyzés:** A következő teszteknek minden járműtípusra (azaz nagy és kis autókra) ellenőrizniük kell a függvények működését.

- `testFindAnyAvailableSpaceForCar()`: Ellenőrzi, hogy a tetszőleges hely keresése megfelelően működik.
- `testFindPreferredAvailableSpaceForCar()`: A preferált hely keresést teszteli. Paraméteres teszteset vizsgálja a különböző autótípusokat.
- `testRegisterCar()`: Az autó regisztrációjának tesztelése. Itt is paraméterezett teszteset vizsgálja, hogy a különböző autók regisztrációja megfelelően működjön.
- `testDeRegisterCar()`: Az autók eltávolításának tesztelése. Paraméterezett teszteset ellenőrzi, hogy mind a nagyméretű, mind a kisméretű autók megfelelően eltávolíthatók.

---

## Parkolás

A `ParkingLot` osztály egy mátrix formájában ábrázolja a szintek alaprajzát, hasonlóan egy többszintes parkolóházhoz. A mátrix minden egyes eleme egy `Space`, ahol egy autó parkolhat.

- A `ParkingLot` inicializálásakor `IllegalArgumentException`-t dob, ha az emeletek vagy parkolóhelyek száma kisebb mint 1.
- A 0. emelet a földszintnek számít, és mind a 0. emelet, mind a 0. hely úgy funkcionál, mint az összes többi; nem alkalmazunk rájuk speciális feltételeket.

#### ParkingLot osztály műveletei

- `getFloorPlan`: Visszaadja a teljes emelet alaprajzát, egyszerű getter függvényként.

    Az alaprajz szöveges ábrázolásában:
    - `X` a szabad helyeket,
    - `S` a kis autók által foglalt helyeket,
    - `L` a nagy autók által foglalt helyeket jelöli.

    Példa:
    ```
    X X X S X
    X S S L L
    S X S L L
    L L L L X
    X S S X X
    ```

    - Az `L L`, azaz két egymás melletti `L` betű egyetlen nagy autót jelöl, mivel a nagy autók mindig két helyet foglalnak el.
    - Az 1. emeleten az `L L L L` azt jelenti, hogy két nagy autó parkol egymás mellett.
    - A 4. (legfelső) emeleten csak egy kis autó parkol.
    - A 0. (földszinti) emeleten két kis autó parkol.

---

### JUnit 5 tesztek

- `testConstructorWithInvalidValues()`: Azt ellenőrzi, hogy a konstruktor megfelelően működik.
- `testTextualRepresentation()`: A szöveges ábrázolás megfelelő működését ellenőrzi. Készíts egy hasonló alaprajzot (`floorPlan`), mint a fenti példa: regisztrálj és távolíts el néhány autót, majd ellenőrizd az eredményt.
