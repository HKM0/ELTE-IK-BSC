feladat:

[X] - Adatbázis és modellek 3 pont 
[X] - Seeder 5 pont 
[X] - Főoldal 5 pont
[X] - Könyv adatainak megjelenítése 3 pont
[X] - Könyv létrehozása 4 pont
[X] - Könyv módosítása 3 pont
[X] - Könyv törlése 2 pont
[X] - Irányítópult, felhasználók listája 4 pont
[X] - Felhasználó adatainak módosítása 4 pont
[X] - Könyv kikölcsönzése 3 pont
[X] - Könyv visszahozása 3 pont
[X] - A felhasználó kölcsönzéseinek és előjegyzéseinek listája 3 pont
[X] - Könyv kölcsönzésének hosszabbítása 3 pont
[X] - Könyv előjegyzése és előjegyzés törlése 5 pont
[X] - Request és Policy használata (extra) +4 pont

leírások:
Minimumkövetelmények
Amennyiben a feladat nem felel meg BÁRMELYIK minimumkövetelménynek, úgy hibásnak tekintendő és nem elfogadható!
- Az alkalmazást Laravel 12/13 keretrendszerben, SQLite adatbázis használatával kell megvalósítani!
    Ha az ORM-et szabályosan használod, akkor egyébként nem számít, hogy milyen adatbázis fut a háttérben a fejlesztés során, de mi a teszteléshez és értékeléshez SQLite adatbázist fogunk használni.
- Minden megvalósított funkció értelmes módon elérhető kell legyen a frontendről is! (Értsd: nem nekünk kell kitalálni az útvonalakat, paramétereket a kipróbáláshoz.) Ezen kívül a frontendre nincs elvárás, pontot nem ér, akár fekete-fehér HTML oldalakkal is lehet maximális pontos feladatot írni, ha a szerveroldali funkciók mindegyike elkészül.
- Az alkalmazás nem dobhat kritikus hibát a beüzemelés és barátságos használat során! Ha az átlag felhasználó kritikus hibát tud okozni, akkor a feladat automatikusan sikertelen!

Általános elvárások
Az egyes részfeladatok korrekt megvalósításához a következők is hozzátartoznak akkor is, ha az adott feladatnál nem részleteztük:
- Minden esetben a Laravel által biztosított validációs lehetőségeket kötelező alkalmazni! A kizárólag kliensoldali validációért pontlevonás jár, hiszen nem erre vagyunk kíváncsiak ezen a tárgyon!
- Az űrlapoknak állapottartóknak kell lenniük, azaz ha hiba történik, akkor a felhasználó által megadott adatokat vissza kell tölteni az űrlapba, illetve a pontos hibaüzeneteket kell jeleníteni, amelyből kiderül a hiba oka.
- Szerkesztés esetén a szerkesztő űrlapot ki ke ll tölteni a meglévő adatokkal.
- Ha valamilyen hiba történik, akkor azt minden esetben érthetően kell jelezni a felhasználó számára. Ha normál használattól a kód teljesen "elszáll", végzetes hiba történik, akkor a feladat pontozás nélkül elutasítható.
- A jogosultságkezelésnél nem elegendő csak a frontendhez kötődő végpontokat levédeni, hanem a műveletet végző végpontnál is kell ellenőrzés.
- A frontendhez használt technológia szabadon választható, de nem érdemes túlbonyolítani, mivel pontot nem ér. Ajánlott az órán tanultakat alkalmazni, de nem kötelező. A frontendnek nem kell szépnek lennie, csak használhatónak.

Értékelési szempontok: 
- Nem értékelünk olyan beadásokat, amik nem felelnek meg hiánytalanul MINDEN minimumkövetelménynek!
- Az adatbázis kivételével az alkalmazást elsősorban (de nem kizárólag) funkcionálisan értékeljük, ezért minden funkció elérhető kell legyen a frontendről is értelmes helyről!
- A kikommentelt vagy használatlan kódrészletekre nem jár pont akkor sem, ha egyébként helyes lenne.

Feladat (50 pont)
A feladat során egy egyszerűsített könyvtári nyilvántartó rendszert kell elkészítened Laravel keretrendszer használatával. A rendszerben nem csak könyvek szerepelhetnek (lásd: Book modell type mező), azonban a feladat leírásánál az egyszerűség kedvéért az összes dokumentumra "könyvként" hivatkozunk.
Szeretnénk, ha a feladatot alapvetően kellő alkotói szabadsággal fognátok meg, nem pedig kőbe vésett dologként. Lényegében minden (tiszta módon keletkezett) megoldás elfogadható, amíg az alább részletezett követelményeket teljesíti; tehát abban, ami nincs a továbbiakban specifikálva, teljesen szabadon mozoghattok. Érdemes jól tanulmányozni az elvárásokat, ugyanis csak az ér pontot, amit expliciten leírtunk a pontozásban; a kurzus teljesítése szempontjából tehát felesleges egy túlgondolt/bonyolultabb feladatot megoldani, persze mindig örülünk, ha extra szorgalmasak vagytok. :
A feladathoz kötelező kiinduló csomag nincs, azonban erősen javasolt a Laravel Breeze (vagy valamely Laravel 12 Starter Kit) használata.

Adatbázis és modellek (3 pont)

Készítsd el a megfelelő adatbázis táblákat és modelleket az alábbiak szerint (az alapvető mezők (id, created_at, updated_at) minden táblában szerepeljenek):

Modellek:

    User
        ez a Laravel alapértelmezett táblája
        a felhasználó regisztrációt követően nem rendelkezik tagsággal (membership), adminisztrátor felhasználó tudja ezt átállítani (bővebben: Felhasználó adatainak módosítása)
        egészítsd ki egy mezővel:
            member_until_date [dátum] - Nem adminisztrátor felhasználóknál a tagságuk vége, adminisztrátor felhasználónál legyen valahogyan lekezelve (pl.: NULL vagy egy nagyon távoli dátum: 9999-12-31 stb.)
    Membership
        ez a tábla tartalmazza a tagsági szinteket, melyekre a felhasználó elő tud fizetni
        a seedelésnél hozz létre egy technikai adminisztrátor rekordot, amit az admin felhasználókhoz tudsz hozzávenni (a max_reservations és max_loans mezők értéke tetszőleges lehet ennél a mezőnél); ennek a rekordnak a nevét az egyszerűség kedvéért beégetheted
        az adminisztrátor rekordon kívül seedelj fel még néhány rekordot (pl.: bronz, ezüst, arany stb.)
            name [szöveg] - A tagsági szint elnevezése
                nem lehet NULL
                maximum 50 karakter hosszú lehet
            max_reservations [egész szám] - A tagsági szinten egyidejűleg előjegyezhető könyvek száma (az előjegyzett, de már kikölcsönzött könyv nem számít előjegyzésnek)
            max_loans [egész szám] - A tagsági szintent egyidejűleg kikölcsönözhető könyvek száma (az előjegyzés nem számít kölcsönzésnek)
    Book
        ez a tábla tartalmazza a könyvtár könyveinek fizikai példányait
        használj soft delete-et ezen a modellen
            title [szöveg] - A könyv címe
                nem lehet NULL
                maximum 255 karakter hosszú lehet
            writer [szöveg] - A könyv szerzője
                nem lehet NULL
                maximum 255 karakter hosszú lehet
            type [szöveg] - A dokumentum típusa
                nem lehet NULL
                lehetséges értékek:
                    könyv
                    folyóirat
                    kotta
                    térkép
                    képregény
            year [egész szám] - A könyv megjelenésének évszáma
                nem lehet NULL
                nem lehet nagyobb, mint 2026
            language [szöveg] - A könyv nyelve az ISO 639 (Set 1) (Linkek egy külső oldalra) szabványának megfelelő (2 karakteres) kódja alapján
                nem lehet NULL
                lehetséges értékek:
                    hu - magyar
                    en - angol
                    de - német
                    fr - francia
                    it - olasz
                    ru - orosz
                    es - spanyol
                    la - latin
                    pl - lengyel
            isbn [szöveg] - A könyv ISBN száma (Linkek egy külső oldalra), az egyszerűség kedvéért a 2007-ben bevezetett, 13 számjegyű verziót kell használni és a Book modell összes rekordjához ISBN számot lehet csak rendelni (tehát nem kell külön lekezelni az ISSN, ISMN stb. eseteket)
                nem lehet NULL
                a validációhoz segítség: Regular expression validation rule (Linkek egy külső oldalra)
            borítókép - A könyvhöz opcionálisan fel lehet tölteni borítóképet, ehhez a fájl nevét és elérési útját valamilyen módon tárold el ebben a táblában
                A borítókép fájlt fizikailag fel kell tudni tölteni, tehát URL hivatkozásért nem jár pont!
                ha nincs feltöltve borítókép, akkor ez(ek) a mező(k) legyen(ek) NULL-ok
                maximális fájlméret: 1 MB
                engedélyezett fájlkiterjesztések: jpg/jpeg, png, bmp, webp
    book_user
        ez egy kapcsolótábla, nem tartozik hozzá modell
        kapcsolótábla a felhasználók és a könyvek között, ez a tábla reprezentálja a kölcsönzéseket és előjegyzéseket
        start_date [dátum] - A kikölcsönzés dátuma
            lehet NULL (előjegyzés esetén)
            nem lehet jövőbeli dátum
            nem lehet később mint a deadline_date vagy az end_date
        deadline_date [dátum] - A kölcsönzés aktuális határideje, mely egy alkalommal hosszabbítható
            lehet NULL (előjegyzés esetén)
            nem lehet előbbi, mint a start_date
        end_date [dátum] - A kölcsönzés záró dátuma, ekkor hozta vissza a felhasználó a könyvet
            lehet NULL
            nem lehet előbbi, mint a start_date
        is_extended [logika] - A kölcsönzést egy alkalommal lehet hosszabbítani, hamis esetén még nem volt hosszabbítva, igaz esetén már volt hosszabbítva
            nem lehet NULL
            alapértelmezetten hamis
        is_reserved [logika] - Egy könyvet elő lehet jegyezni, azaz le lehet foglalni, hamis esetén a rekord nem lefoglaláshoz tartozik, igaz esetén a rekord lefoglaláshoz tartozik
            nem lehet NULL
            alapértelmezetten hamis
        payed_total_fee [egész szám] - A kölcsönzés során felhalmozódott díjak összege (előjegyzés díja, késedelmi díjak)
            nem lehet NULL
            alapértelmezetten 0
            nem lehet negatív

Kapcsolatok:

A relációk helyes kialakításához egészítsd ki a fenti modellek tábláit a megfelelő külső kulcsokkal. Ne felejtsd el beállítani a megfelelő constraint-eket is!

    User N : M Book
        egy felhasználó több könyvet is kikölcsönözhet és egy könyvet több felhasználó is kikölcsönözhet (természetesen nem egy időben)
    Membership 1 : N User
        egy felhasználóhoz csak egy szerepkört lehet hozzárendelni, de egy szerepkör több felhasználóhoz is hozzárendelhető


Seeder (5 pont)

Készíts egy seedert, ami feltölti az adatbázist!

Ügyelj arra, hogy a seeder:

    minden eshetőségre fel legyen készítve, tehát kezelje a kapcsolatokat, illetve
    konzisztens adatokat generáljon, tehát pl. egy könyv ne legyen egyszerre több felhasználó által kikölcsönözve, a kikölcsönzés kezdete ne legyen később mint a visszahozás dátuma stb.

Fontos továbbá, hogy:

    ne beégetett adatokat használj, hanem generáld őket pl. faker használatával
    nem kell rengeteg adatot generálni - csak néhányat, amennyi elég a teszteléshez

Segítség a kölcsönzés és előjegyzés implementálásához és lekérdezésekhez

Az előjegyzések és kölcsönzések nyilvántartása a kapcsolótáblában történik, a lekérdezéseknél érdemes az alábbiakat figyelembe venni:

    Előjegyzés esetén az is_reserved mező igaz ÉS a start_date mező NULL
    Kölcsönzés esetén az is_reserved mező hamis ÉS a start_date mező nem NULL

Mivel többször szükséges leszűrni a kölcsönzött és előjegyzett könyveket, nagyban egyszerűsíthetjük a dolgunkat, ha definiálunk különböző szűréseket tartalmazó relációs metódusokat a modelleknél (Linkek egy külső oldalra).

Főoldal (5 pont)

    Legyen bejelentkezés nélkül elérhető
    Jeleníts meg egy listát a rendszerben tárolt könyvekről. A listában szerepeljen a könyv szerzőjének neve, címe, típusa és a kiadás évszáma.
    A lista legyen rendezve elsődlegesen a szerző neve, másodlagosan a könyv címe alapján és legyen lapozható, egy oldalon 10 rekord jelenjen meg.
    Az oldalon helyezz el egy form-ot aminek a segítségével lehet szűrni a megjelenített könyvek listáját az alábbi szempontok szerint:
        Szerző
        Cím
        Évszám
        Dokumentum típusa
        Nyelv

Könyv adatainak megjelenítése (3 pont)

    Legyen bejelentkezés nélkül elérhető
    Legyen lehetőség megtekinteni egy könyv összes adatát külön oldalon.
    Ha a könyv borítójának képe elérhető, jelenítsd meg, ha nincs feltöltve, jeleníts meg egy placeholder képet.
    Jelenítsd meg, hogy a könyv kikölcsönözhető-e. Ha nem, írd ki, hogy mikor lesz elérhető újra (aktuális kölcsönzés határideje).
    Adminisztrátor felhasználó esetén jelenítsd meg, hogy a könyvhöz tartozik-e előjegyzés.

Könyv létrehozása (4 pont)

    Csak adminisztrátor felhasználó érheti el
    Készíts egy felületet, ahol egy új könyv rögzíthető a rendszerben.
    Ne felejtkezz meg az adatok validációjáról, a borítóképet fájl alapon szükséges eltárolni.

Könyv módosítása (3 pont)

    Csak adminisztrátor felhasználó érheti el
    A könyv létrehozásához hasonlóan legyen lehetőség frissíteni egy könyv adatait, valamint új borítóképet feltölteni.
    Itt se felejtkezz meg az adatok validációjáról, valamint a fájlok között ne maradjon szemét borítókép csere esetén.

Könyv törlése (2 pont)

    Csak adminisztrátor felhasználó érheti el
    Legyen lehetőség archiválni (soft delete) vagy véglegesen törölni (hard delete) könyvet.
    Végleges törlés esetén ne felejtkezz el gondoskodni a könyvhöz kapcsoló adatok törléséről (ne legyen inkonzisztens az adatbázis és ne maradjon szemét a feltöltött fájlok között sem).
    Archivált könyv visszaállítását nem kell implementálni.

Irányítópult, felhasználók listája (4 pont)

    Csak adminisztrátor felhasználó érheti el
    Készíts egy egyszerű irányítópultot, ahol a következő statisztikákat jeleníted meg:
        A rendszerben tárolt könyvek száma.
        Az eddigi kölcsönzések (jelenlegi és múltbeli) száma.
        A kölcsönzéseknél felhalmozott díjak összege (a kapcsoló tábla payed_total_fee mező összege).
    Jeleníts meg egy listát a regisztrált felhasználókról, a lista legyen lapozható, egyszerre 10 felhasználó jelenjen meg.

Felhasználó adatainak módosítása (4 pont)

    Az aktuálisan bejelentkezett felhasználó és adminisztrátor felhasználó érheti el
    Készíts egy felületet, ahol a felhasználó adatai szerkeszthetőek.
    A tagságot (membership) és a tagság lejárati idejét normál felhasználóknál jelenítsd meg, de csak adminisztrátor felhasználó állíthatja. Erről gondoskodj a validáció során is!
    Vállalkozó kedvűek figyelmébe ajánljuk a Laravel Form Request (Linkek egy külső oldalra) és Policy (Linkek egy külső oldalra) funkcióit (részleteket lásd: Request és Policy használata).

Könyv kikölcsönzése (3 pont)

    Csak adminisztrátor felhasználó érheti el
    Készíts egy felületet ahol az adminisztrátor rögzíthet egy kölcsönzést.
    A funkciót megvalósíthatod egy külön oldalon, de implementálhatod egy másik funkcióhoz tartozó oldalon is (pl.: Könyv adatainak megjelenítése vagy A felhasználó kölcsönzéseinek és előjegyzéseinek listája)
    Kölcsönzés speciális validációi és szabályai:
        Vedd figyelembe a felhasználó tagságát (ne kölcsönözhessen ki több könyvet, mint a tagságánál meghatározott maximum)
        Ellenőrizd, hogy a felhasználó tagsága aktív-e (User modell member_until_date mezője)
        Adminisztrátor felhasználó is kölcsönözhet ki könyvet (nem kell lekezelni)
        Csak elérhető könyvet lehet kikölcsönözni, tehát ha a könyv ki van kölcsönözve vagy elő van jegyezve dobj hibát
        Előjegyzett könyvet csak az a felhasználó kölcsönözhet ki, aki előjegyezte
        A kölcsönzés kezdő dátuma (start_date) legyen az aktuális dátum
        A kölcsönzés határideje (deadline_date) főszabály szerint legyen a kezdő dátum +30 nap, kivéve, ha a felhasználó tagságának dátuma ebbe az intervallumba esik (tehát kevesebb, mint 30 napig van még a felhasználónak tagsága), ebben az esetben a határidő legyen a tagság végdátuma (nem szükséges lekezelni a tagság hosszabbításánál a kölcsönzések határidejét)
            példa főszabályra
                member_until_date: 2026. április 10.
                start_date: 2026. március 1.
                deadline_date: 2026. március 31.
            példa kivételre
                member_until_date: 2026. március 10.
                start_date: 2026. március 1.
                deadline_date: 2026. március 10.

Könyv visszahozása (3 pont)

    Csak adminisztrátor felhasználó érheti el
    Készíts egy felületet ahol az adminisztrátor rögzíthet egy kölcsönzés lezárását.
    A funkciót megvalósíthatod egy külön oldalon, de implementálhatod egy másik funkcióhoz tartozó oldalon is (pl.: Könyv adatainak megjelenítése vagy A felhasználó kölcsönzéseinek és előjegyzéseinek listája)
    A kölcsönzés lezárásánál ellenőrizni kell, hogy lejárt-e már a határidő (deadline_date)
        Ha nem járt le, nincs késedelmi díj
        Ha lejárt az aktuális dátum és a határidő között eltelt napok számát be kell szorozni 100-zal (napi késedelmi díj) és az így kapott összeget hozzá kell adni a payed_total_fee mezőben lévő számhoz.
    A kölcsönzés lezárásának dátuma (end_date) legyen az aktuális dátum.

A felhasználó kölcsönzéseinek és előjegyzéseinek listája (3 pont)

    Csak adminisztrátor felhasználó érheti el
    Készíts egy felületet, ahol megjeleníted:
        A felhasználó aktuális kölcsönzéseit határidő (deadline_date) szerint növekvően rendezve és jelenítsd meg a következő adatokat:
            A könyv szerzője és címe
            Volt-e már hosszabbítva a kölcsönzés
            Kölcsönzés kezdő és záró dátuma
            A felhalmozott díjak (elég csak kiíratni a payed_total_fee mezőt)
            A határidőig hátralévő napok száma.
        A felhasználó múltbeli kölcsönzéseit záró dátum (end_date) szerint csökkenő sorrendben az alábbi adatokkal:
            A könyv szerzője és címe
            Kölcsönzés kezdő és záró dátuma
            A felhalmozott díjak (elég csak kiíratni a payed_total_fee mezőt)
        A felhasználó által előjegyzett könyvek listáját az alábbi adatokkal:
            A könyv szerzője és címe
    Vállalkozó kedvűek figyelmébe ajánljuk a Laravel Form Request (Linkek egy külső oldalra) és Policy (Linkek egy külső oldalra) funkcióit (részleteket lásd: Request és Policy használata).

Könyv kölcsönzésének hosszabbítása (3 pont)

    Az aktuálisan bejelentkezett felhasználó és adminisztrátor felhasználó érheti el
    A felhasználónak egy alkalommal lehetősége van meghosszabbítani a könyv kölcsönzését. Ha a felhasználó már egyszer meghosszabbította a kölcsönzést (is_extended), nem teheti meg még egyszer.
    Ekkor a következő szabályok érvényesek:
        A határidő (deadline_date) kiszámítása:
            A főszabály szerint a kölcsönzés az aktuális dátumhoz képest meghosszabbodik 30 nappal (tehát nem a deadline_date-hez képest)
            Ha a felhasználó tagsága beleesik a hosszabbítás intervallumába, kezeld le a Könyv kikölcsönzése funkciónál írtak szerint.
            Ha a felhasználó késve hosszabbít (aktuális dátum későbbi mint az eredeti deadline_date), akkor az eredeti deadline_date-hez adódik hozzá a 30 nap.
        Ha a felhasználó a könyvet késve hosszabbítja meg, akkor számítsd ki a késedelmi díjat a Könyv visszahozása funkciónál írtak szerint.
        Az is_extended mezőt állítsd igazra.
    A funkciót implementálhatod külön oldalon vagy pl. a A felhasználó kölcsönzéseinek és előjegyzéseinek listája oldalon.
    Vállalkozó kedvűek figyelmébe ajánljuk a Laravel Form Request (Linkek egy külső oldalra) és Policy (Linkek egy külső oldalra) funkcióit (részleteket lásd: Request és Policy használata).

Könyv előjegyzése és előjegyzés törlése (5 pont)

    Az aktuálisan bejelentkezett felhasználó és adminisztrátor felhasználó érheti el
    A felhasználók előjegyezhetnek elérhető és kikölcsönzött könyveket.
    Egy könyv csak egy felhasználó által lehet előjegyezve.
    Vedd figyelembe a felhasználó tagsága alapján, hogy mennyi könyvet jegyezhet elő egy időben!
    Az előjegyzés menete:
        Létrejön egy rekord a kapcsolótáblában, ahol az is_reserved mező legyen igaz, a dátummezők (start_date, deadline_date, end_date) viszont legyenek NULL-ok.
        A payed_total_fee mezőt állítsd 300-ra (ez az előjegyzés díja).
    Az előjegyzés törlésének menete:
        Előjegyzés törlése esetén töröld a rekordot véglegesen a kapcsolótáblából.
    Vállalkozó kedvűek figyelmébe ajánljuk a Laravel Form Request (Linkek egy külső oldalra) és Policy (Linkek egy külső oldalra) funkcióit (részleteket lásd: Request és Policy használata).

Request és Policy használata (+4 extra pont)

A feladat megoldása során több esetben érdemes kiszervezni a validációkat és a jogosultságkezeléseket Form Request (Linkek egy külső oldalra)-ekbe, valamint Policy (Linkek egy külső oldalra)-kba.

A következő feladatoknál javasoljuk a funkciók használatát (ezen felül természetesen máshol is alkalmazható):

    Felhasználó adatainak módosítása
    A felhasználó kölcsönzéseinek és előjegyzéseinek listája
    Könyv kölcsönzésének hosszabbítása
    Könyv előjegyzése és előjegyzés törlése

A 4 extra pont az alap 50 ponton felül jár, de csak sikeres beadandó esetén adhatók hozzá az összpontszámhoz. Tehát az alap feladatokból meg kell  szerezni a pontok minimum 40%-át, azaz 20 pontot.