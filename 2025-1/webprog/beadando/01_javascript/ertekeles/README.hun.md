Hallgató neve: *titok*
Hallgató Neptun kódja: *ez is titok*

Ezt a megoldást a fent nevezett hallgató küldte be és készítette a Webprogramozás kurzus "JavaScript beadandó" számonkéréséhez.

Kijelentem, hogy ez a megoldás a saját munkám. Nem másoltam vagy használtam harmadik féltől származó megoldásokat. Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé. Az ELTE HKR 377/A. § értelmében, ha nem megengedett segédeszközt veszek igénybe, vagy más hallgatónak nem megengedett segítséget nyújtok, a tantárgyat nem teljesíthetem.

ELTE Hallgatói Követelményrendszer, IK kari különös rész, 377/A. §: "Az a hallgató, aki olyan tanulmányi teljesítménymérés (vizsga, zárthelyi, beadandó feladat) során, amelynek keretében számítógépes program vagy programmodul elkészítése a feladat, az oktató által meghatározottakon kívül más segédeszközt vesz igénybe, illetve más hallgatónak meg nem engedett segítséget nyújt, tanulmányi szabálytalanságot követ el, ezért az adott félévben a tantárgyat nem teljesítheti és a tantárgy kreditjét nem szerezheti meg."

Budapest, 2025.

## Önértékelés

Jelöld [X]-szel a teljesített feladatokat! Emlékeztető: a minimálisan teljesítendő feladatok mindegyikét maradéktalanul teljesíteni kell, különben a beadandó feladatot elutasítjuk.

### Minimálisan teljesítendő (enélkül nem fogadjuk el, 8 pont)

- **Környezet**
  - [X] A kiinduló állományban lévő README.hun.md fájl kitöltése (nyilatkozat, pontok).
  - [X] A játékot JavaScript keretrendszerek használata nélkül készítette el.
  - [X] A megoldás során teljesen elkerülte a bad practice cím alatt megadott rossz gyakorlatokat.
- **Menü**
  - [X] A főmenüben megadhatjuk a nevünket új játék kezdése előtt.
  - [X] A Start gombra való kattintáskor átkerülünk a játéktér képernyőjére.
  - [X] A menüből elérhető a játék működésének leírása, különös tekintettel az irányításra (hogyan húzunk be szakaszt: húzás/kattintgatás/nyilak...).
**- Játék**
  - [X] A játéktéren megjelenik a játékos neve, és egy másodpercenként frissülő időmérő, és hogy melyik az aktuális metróvonal (név/szín), amit építünk.
  - [X] A játéktéren kirajzolódik a tábla és a megállóhelyek.
  - [X] Két megállóhely közé szakasz húzható a négyzetrács szabályainak betartásával (90 vagy 45 fok).

### Alap feladatok (12 pont)

- **Kártyák (1,5 pont)**
  - [X] 0,5 pont: Véletlenszerű megállóhely kártyát húzhatunk a pakliból (ez tartalmazza azt is, hogy rajzolás nélkül is húzhatunk következőt).
  - [X] 0,5 pont: A pakliban csak a megadott számú kártya található (A-B-C-D-Joker középső és A-B-C-D-Joker szélső megállóra).
  - [X] 0,5 pont: A Joker kártya megfelelően működik.
- **Szakaszépítés (5,5 pont)**
  - [X] 0,5 pont: Szakasz csak az aktuális metróvonal végéből az aktuális megállókártyán jelzett betűjelű megállóba húzható.
  - [X] 0,5 pont: A Joker állomás megfelelően működik.
  - [X] 1,0 pont: Szakaszok nem keresztezhetik egymást.
  - [X] 0,5 pont: Szakaszok nem haladhatnak párhuzamosan (két megállóhely közé csak egy szakasz húzható).
  - [X] 0,5 pont: Szakasz nem húzható olyan megállóhelybe, ahol már járt ez a metróvonal (kör/hurok elkerülése).
  - [X] 1,0 pont: Szakasz nem haladhat át megállóhelyen (minden szakasz pontosan két megállóhelyet érint)
  - [X] 1,5 pont: Szakasz 45 fokban átlósan is építhető.
- **Fordulók (1.5 points)**
  - [X] 0,5 pont: A fordulók (színek/metróvonalak) sorrendje előre ki lett generálva és megjelenítésre kerül (látszik, hol tartunk).
  - [X] 1,0 pont: A 8. kártyafordítás után vége a fordulónak és új színt kezdünk.
    - [ ] _Vagy 0,5 részpontért: Egy gombbal lehet bármikor a következő fordulóra lépni (új metróvonal/szín elkezdése)._
- **Pontozás (3,5 pont)**
  - Forduló pontozás működik
    - [X] 0,5 pont: Hány kerületet érintett (PK)
    - [X] 0,5 pont: Mennyi a legtöbb megállóhely amit egy kerületben érintett (PM)
    - [X] 0,5 pont: Hányszor kelt át a dunán (PD)
    - [X] 0,5 pont: Forduló pont FP = (PK x PM) + PD
    - [ ] _Vagy 0,5 részpontért: Ha a fentebbieket nem sikerül megvalósítani, részpont kapható azért, ha a forduló összpontja az érintett megállóhelyek száma._
  - Játék pontozás működik
    - [X] 0,5 pont: Csomópontok, azaz hány megállóhelyet érint két vonal (P2); három vonal (P3); négy vonal (P4)
    - [X] 0,5 pont: A pályaudvarok érintéséért járó pontok menet közben vannak jelezve egy "csúszkán" (PP)
    - [X] 0,5 pont: Össz pontszám = Sum(FP) + (PP) + (2 x P2) + (5 x P3) + (9 x P4)

### Extra feladatok (5 pont)

- [X] 0,5 pont: Alternatív fordulóvége-feltétel: Kétféle megállókártyánk van (szélső peron és középső peron). Ha valamelyikből felhúzzuk az ötödiket, nem húzhatunk már új lapot, csak egy "forduló vége" gombot nyomhatunk meg helyette.
- [X] 1,0 pont: A játék végén a játékos neve, pontjai és a teljesítési idő elmentésre kerül (local storage) és a menüben az eredmények (név, pont, idő) pont szerint csökkenő sorrendben megtekinthetőek
- [X] 1,5 pont: A váltókártya megfelelően működik.
- [ ] 2,0 pont: Ceruza képességek (ld. Játékmenet > Extra feladat: játékmód)