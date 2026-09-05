titok ember
titkos neptun
Kliensoldali webprogramozás - beadandó
Ezt a megoldást a fent írt hallgató küldte be és készítette a Kliensoldali webprogramozás kurzus számonkéréséhez.
Kijelentem, hogy ez a megoldás a saját munkám. Nem másoltam vagy használtam harmadik féltől
származó megoldásokat. Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé.
Az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere
(ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja, hogy mindaddig,
amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét -
saját munkájájaként mutatja be, az fegyelmi vétségnek számít.
A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.


-[X] A projekt legalább 4 komponensből áll. (Enélkül a beadandót nem fogadjuk el.) (1pt) Tehát léteznek például a következő komponensek:
  - Terem
  - Asztal
  - Részletes nézet
  - Új asztal hozzáadása

-[X] Az projektben a komponenseket logikusan, funkciók szerint szétbontva hozta létre, ügyelve a tárgyon elsajátított alapelvekre. (2pt)

-[X] Terem (2pt)
  -[X] Megfeleleően elkülön egy terület, a `terem` az oldal többi részétől, ahova `drag and drop`-pal le tudjuk majd helyezni az asztalokat. (1pt)
  -[X] A terem mérete módosítható. A méret módosítását követően a terem alapállapotba kerül, tehát minden lehelyezett asztal törlődik. (1pt)

-[X] Asztalok megjelenítése (7pt)
  -[X] Az asztalok helyesen megjelennek a teremben a pozíciójuknak megfelelően. (2pt)
  -[X] Az asztalokhoz megfelelő szín és méret tartozik a típusuk alapján. (1pt)
  -[X] Az asztalok vizuálisan megkülönböztethetők kategóriájuk alapján. (1pt)
  -[X] Az asztalok színe az állapotuktól függően változik, minél rosszabb az állapot, annál fakóbb a szín. (1pt)
  -[X] Ha a már lehelyezett asztalok helyigénye sérül, akkor ezt vizuálisan jelöljük. (1pt)
  -[X] Megjelenik egy kijelző a lehelyezett asztalok számáról, illetve típusonként az átlagos állapotukról. (1pt)

-[X] Asztal részletei (9pt)
  -[X] Az asztalra kattintva kiválaszthatjuk azt, a kiválasztott asztalt vizuálisan megkülönböztetjük a többitől. (1pt)
  -[X] Egyszerre csak egy kiválasztott asztal lehet. (1pt)
  -[X] Megfelelően megjelennek a kiválasztott asztal adatai (típus, kategória, szín, állapot, pozíció). (1pt)
  -[X] Lehetőségünk van az asztal törlésére. (1pt)
  -[X] Lehetőségünk van az asztal állapotának módosítására, ekkora megfelelően frissül a szín és az átlagos állapot is. (2pt)
  -[X] Lehetőségünk van az asztal helyének megváltoztatására. Ez grafikus módon történik, tehát a kiválasztott asztalt a kívánt helyre húzzuk, majd ott lehelyezzük (`drag and drop`), figyelve a helyigényt. (2pt)
  -[X] Ha az asztal `is-locked` értéke `true`, az asztal helye nem változtatható. (1pt)

-[X] Új asztal hozzáadása (6pt)
  -[X] Lehetőség van új asztal hozzáadására, ekkor megjelenik a megfelelő űrlap. (1pt)
  -[X] Az adatok helyes megadását követően (típus, kategória, szín, állapot) le tudjuk helyezni az új asztalt a teremben. (1pt)
  -[X] A lehelyezés megfelelően működik: asztalok nem helyezhetők egymásra, a kijelölt terület határain kívülre, illetve betartjuk a helyigényt. (2pt)
  -[X] Ha lehelyezést követően valamelyik asztal helyigénye sérül, akkor azt vizuális jelezzük. (1pt)
  -[X] Az asztal lehelyezését követően a kijelző megfelelően változik (asztalok száma, átlagos állapota). (1pt)

-[X] Igényes, reszponzív, mobilra optimalizált megjelenés. (3pt)

-[X] Plusz pontok:
  -[X] LocalStorage: Egy gombra kattintva a lehelyezett asztalok adatait LocalStorage-ba mentjük. Ha már léteznek asztalok a LocalStorage-ban, akkor ezek automatikusan betöltődnek a komponens inicializálásakor. Ehhez készíts egy saját hookot, amivel kezeled a LocalStorage szinkronizálását. (3pt)
  -[X] Felugró ablak: Az új asztal hozzáadása egy felugró ablakban (modal) történik, helyes adatok megadását követően le tudjuk helyezni az asztalt a teremben. (2pt)