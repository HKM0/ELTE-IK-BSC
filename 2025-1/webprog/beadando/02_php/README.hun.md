Hallgató neve: heki
Hallgató Neptun kódja: *titok*

Ezt a megoldást a fent nevezett hallgató küldte be és készítette a Webprogramozás kurzus "PHP beadandó" számonkéréséhez.

Kijelentem, hogy ez a megoldás a saját munkám. Nem másoltam vagy használtam harmadik féltől származó megoldásokat. Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé. Az ELTE HKR 377/A. § értelmében, ha nem megengedett segédeszközt veszek igénybe, vagy más hallgatónak nem megengedett segítséget nyújtok, a tantárgyat nem teljesíthetem.

ELTE Hallgatói Követelményrendszer, IK kari különös rész, 377/A. §: "Az a hallgató, aki olyan tanulmányi teljesítménymérés (vizsga, zárthelyi, beadandó feladat) során, amelynek keretében számítógépes program vagy programmodul elkészítése a feladat, az oktató által meghatározottakon kívül más segédeszközt vesz igénybe, illetve más hallgatónak meg nem engedett segítséget nyújt, tanulmányi szabálytalanságot követ el, ezért az adott félévben a tantárgyat nem teljesítheti és a tantárgy kreditjét nem szerezheti meg."

Budapest, 2025.

## Önértékelés

Jelöld [X]-szel a teljesített feladatokat! Emlékeztető: a minimálisan teljesítendő feladatok mindegyikét maradéktalanul teljesíteni kell, különben a beadandó feladatot elutasítjuk.

### Minimálisan teljesítendő (enélkül nem fogadjuk el, 8 pont)

- **Környezet**
  - [X] A kiinduló állományban lévő README.hun.md fájl kitöltése (nyilatkozat, pontok).
  - [X] Az oldal PHP keretrendszerek (pl. Laravel) használata nélkül készült.
- **Főoldal, vendég felhasználó**
  - [X] A (közzétett/`approved` állapotú, ha vannak állapotok) projektek listája megjelenik.
  - [X] Egy projektre kattintva megnyithatók annak részletei.
  - [X] A projekteket szűrni lehet kategóriák szerint egy legördülő listával.
- **Hitelesítés**
  - [X] A felhasználónév legyen egyedi.
  - [X] A jelszó legyen legalább 8 karakter.
  - [X] A regisztrált felhasználóval be lehet jelentkezni.
  - [X] Ki lehet jelentkezni.
  - [X] Létezik egy admin felhasználó `admin` felhasználónévvel és `admin` jelszóval.
  - [X] A jelszavak hashelve kerülnek tárolásra.
- **Főoldal, felhasználó**
  - [X] A felhasználó leadhat új projektet (minimális pontért rögtön `approved` lehet / meg is jelenhet a listában; egyébként viszont `pending` státuszba kerüljön).
  - [X] A projekt neve (címe) minimum 10 karakter.
  - [X] A projekt leírása minimum 150 karakter.
  - [X] Az id, leadó felhasználó, leadás dátuma automatikusan kerül kitöltésre.

### Alap feladatok (12 pont)

- **Főoldal**
  - [X] 0,5 pont: A projektek kategóriánként szeparáltan rendezve jelennek meg.
  - [X] 0,5 pont: Bejelentkezett felhasználó szavazhat a projektekre a listában. A listában látszik, melyekre adott le szavazatot.
  - [X] 0,5 pont: Egy felhasználó egy projektre csak egyszer szavazhat.
  - [X] 1,0 pont: Egy kategóriában egy felhasználó legfeljebb 3 szavazatot adhat le. Kategóriánként látható, még hányat szavazhat a felhasználó.
  - [X] 0,5 pont: A szavazatok visszavonhatók.
  - [X] 1,0 pont: Szavazni (és a projektről szavazatot levenni) a projekt közzétételét követő 2 hétben lehet csak. Ez vizuálisan is megjelenik, látszik, mire nem lehet már szavazni/szavazatot levenni.
- **Űrlapok**
  - Regisztráció
    - [X] 0,5 pont: A felhasználónévben nem lehet szóköz.
    - [X] 0,5 pont: Az e-mail cím helyes formátumú.
    - [X] 0,5 pont: A jelszó tartalmaz kisbetűt, nagybetűt és számjegyet.
    - [X] 0,5 pont: A két jelszó mező tartalma megegyezik.
  - Új projekt / projekt módosítás:
    - [X] 0,5 pont: A kategória csak egy előre megadott listából választható: `Helyi kis projekt`, `Helyi nagy projekt`, `Esélyteremtő Budapest`, `Zöld Budapest`
    - [X] 1,0 pont: Az irányítószám helyes formátumú
      - [ ] _0,5 Részpontért: Ezernél nem kisebb 4 jegyű egész szám_
      - Teljes pontért: Az első számjegy `1`. A következő kettő `01`-`23`. A negyedik számjegy `1`-`9`. Ezen felül az `1007` szám önmagában érvényes.
    - [X] 0,5 pont: A kép linkje opcionális, de ha meg van adva, helyes URL formátumú legyen.
- **Nem közzétett projektek**
  - [X] 0,5 pont: A felhasználó egy oldalon láthatja a nem `approved` projektjeit (`pending`, `rework`, `rejected`), megnyithatja a részleteiket.
  - [X] 1,0 pont: A projekt részletei oldalt még a link ismeretében sem lehet meglátogatni, ha a felhasználó nem a projekt indítója / admin (vissza kell irányítani a jogosulatlan felhasználót a főoldalra).
- **Admin**
  - [X] 0,5 pont: Az admin egy oldalon láthatja a `pending` státuszú projekteket.
  - [X] 1,0 pont: Az admin a `pending` státuszú projekteket közzéteheti (`approved`) vagy visszautasíthatja (`rejected`).
  - [X] 0,5 pont: Az admin egy oldalon látja a legtöbb szavazatot kapó projektet.
  - [X] 0,5 pont: Az admin egy oldalon látja kategóriánként a 3-3 legtöbb szavazatot kapó projektet.

### Extra feladatok (5 pont)

- [ ] 1,0 pont: A szavazás AJAX/Fetch technológiával van megoldva, az oldal újratöltése nélkül működik.
- [X] 1,0 pont: Egy `pending` projektet az admin felhasználó visszaküldhet javításra (`rework`) kommenttel. A felhasználó, aki leadta, ezután szerkesztheti a projektet, majd újra elküldheti az adminnak (`peding`). Akárhányszor lehet ide-oda küldeni.
- [ ] 1,0 pont: A `pending`-`rework` során nem csak a legutóbbi admin komment látszik, hanem az összes sorban; illetve a változtatott mezők előző és új értéke is minden lépésben tárolásra és kiírásra kerül.
- [X] 2,0 pont: Az admin kategóriánként és státuszonként csoportosítva láthatja a projektek számát.
  - [X] _0,5 Részpontért:_ Lista vagy táblázat formájában.
  - _Teljes pontért:_ Két diagramon.  