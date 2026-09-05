# Socket.io szerver

A szerver egy publikus verziója elérhető itt: `http://webprogramozas.inf.elte.hu:3031`

Több játékos kapcsolattartására szolgáló függvényeket definiál. A szobakezeléshez és az állapotszinkronizáláshoz adnak eszközöket. Ez utóbbit többféleképpen meg lehet tenni. Alapvetően két üzenet van, és ez is kétféleképpen használható. A `sync-state` üzenet az egész állapottér szinkronizálsára szolgál. A `sync-action` üzenet egy action továbbítására szolgál. Mindkettő meghívható úgy, hogy csak a többi játékos kapja meg a szervertől a továbbított adatot, de úgy is, hogy mindenki (azaz a küldő is) megkapja. 

Erre többféle szinkronizálási stratégia építhető fel. Pl. minden action dispatch-elésekor azt egy middleware nem engedi a store-ig eljutni, hanem a `sync-action`-nel fellövi a szervernek úgy, hogy mindenki (azaz a küldő kliens is) megkapja. Az `action-sent` eseményt figyelő függvény pedig dispatcheli a store felé az actiont. Persze a dispatch-et újra elkaphatja az első middleware, ezért a kapott action-be elhelyezhetünk egy metaadatot, hogy a szerverről érkezett, és ezt a middleware-ben megadjuk, hogy ne küldje újra a szervernek.

Az is lehet, hogy egy külön modullal feliratkozunk a store változására és olyankor az egész state-et a `sync-state` üzenettel felküldjük. A többiek megkapják a `state-changed` eseményt, és le tudják cserélni az egész állapotterüket. Azaz, ha valahol van változás, akkor azt mindenki megkapja. Ebben van egy kis rizikó: ha éppen egyidőben van változtatás két kliensen, akkor a szinkronizálás során az utolsó nyer, ami nem tartalmazza az elsőt. A valószínűsége kicsi, de ott van.

Ezen kívül még számos megoldás létezik.

## Kliens által küldhető üzenetek

### `create-room`

Ezzel az üzenettel lehet új szobát létrehozni a szerveren. A létrehozó kliens automatikusan bekerül a szobába. A visszaigazolásban megkapjuk a szobaazonosítót.

Paraméterek:
- `roomSize`: hány játékos lehet a szobában
- `ack`: választ megkapó visszaigazoló függvény

Válasz (acknowledgement):
- Helyes: `{ status: 'ok', roomId: ''}`
- Hibás: `{ status: 'error', message: '' }`

Események: --

### `join-room`

Ezzel az üzenettel lehet egy szobához csatlakozni. Ha a szoba ezzel megtelt, akkor `room-is-full` üzenetet kapunk.

Paraméterek:
- `roomId`: szobaazonosító
- `ack`: választ megkapó visszaigazoló függvény

Válasz (acknowledgement):
- Helyes: `{ status: 'ok', state: ''}`
- Hibás: `{ status: 'error', message: '' }`

Események:
- `player-joined`
- `room-is-full`

### `close-room`

Szoba lezárására szolgáló üzenet. Nem kell feltétlenül megvárni, míg megtelik a szoba, ezzel az üzenettel le lehet zárni a szobát, további csatlakozás nem lehetséges. A válaszban a szoba állapotát is megkapjuk. Minden résztvevő `room-is-full` eseményt kap.

Paraméterek:
- `roomId`: szobaazonosító
- `ack`: választ megkapó visszaigazoló függvény

Válasz (acknowledgement):
- Helyes: `{ status: 'ok'. state: '' }`
- Hibás: `{ status: 'error', message: ''}`

Események:
- `room-is-full`

### `leave-room`

Szoba elhagyására szolgáló üzenet. Játék végén érdemes a szobát elhagyni.

Paraméterek:
- `roomId`: szobaazonosító
- `ack`: választ megkapó visszaigazoló függvény

Válasz (acknowledgement):
- Helyes: `{ status: 'ok' }`
- Hibás: `{ status: 'error', message: ''}`

Események:
- `player-left`

### `sync-state`

A kliensek állapotterének szinkronizálására szolgáló üzenet. A felküldött állapottér tárolásra is kerül adatbázisban.

Paraméterek:
- `roomId`: szobaazonosító
- `state`: tárolandó állapot, JSON sorosítással kerül tárolásra
- `broadcast`: logikai, igaz érték esetén csak a többi játékos kapja meg a `state-changed` üzenetet, hamis érték esetén a hívó fél is kap erről üzenetet.
- `ack`: választ megkapó visszaigazoló függvény

Válasz (acknowledgement):
- Helyes: `{ status: 'ok' }`
- Hibás: `{ status: 'error', message: '' }`

Események:
- `state-changed`

### `sync-action`

A kliensek állapotterének szinkronizálására szolgáló üzenet, mely esetben az egyik kliens el tudja küldeni a többi kliensnek az action-jét. Nem tárolódik adatbázisban.

Paraméterek:
- `roomId`: szobaazonosító
- `action`: megosztandó action objektum, ahogy érkezik, úgy kerül továbbításra
- `broadcast`: logikai, igaz érték esetén csak a többi játékos kapja meg az `action-sent` üzenetet, hamis érték esetén a hívó fél is kap erről üzenetet.
- `ack`: választ megkapó visszaigazoló függvény

Válasz (acknowledgement):
- Helyes: `{ status: 'ok' }`
- Hibás: `{ status: 'error', message: '' }`

Események:
- `action-sent`

### `get-state`

A szoba állapotának lekérdezésére szolgál. Az adatbázisban sorosítva van tárolva az állapot, lekérdezés után ezt vissza kell alakítani.

Paraméterek:
- `roomId`: szobaazonosító
- `ack`: választ megkapó visszaigazoló függvény

Válasz (acknowledgement):
- Helyes: `{ status: 'ok', state: '' }`
- Hibás: `{ status: 'error', message: ''}`


## Szervertől kapott üzenetek

### `room-is-full`

Leírás:
Ha a szoba megtelt, akkor minden klienst meghív átadva a szobaazonosítót, a szobaállapotot, és egy játékosazonosítót, ami a jelentkezés sorrendjét mutatja, és ami alapján eldönthető, hogy ki melyik játékos legyen. (???Megjegyzés: nem kell feltétlenül ezt használni, mert az is feltételezhető, hogy aki a szobát készítette, az az 1. játékos, és aki csatlakozott, az a 2. játékos.)

Adatok: objektum
- `roomId`: szobaazonosító
- `state`: adatbázisban tárolt érték, szöveges formában, a kliensnek vissza kell sorosítania nagy valószínűséggel
- `player`: játékosazonosító (1, 2, ...)

### `player-joined`

Leírás:
Új játékosnak a szobához való csatlakozásakor hívódik meg.

Adatok: objektum
- `roomId`: szobaazonosító
- `socketId`: a csatlakozott játékos socket azonosítója

### `state-changed`

Leírás:
Egy játékos `sync-state` hívásra keletkezett üzenet az állapot szinkronizálására. Ez az egyik lehetőség a játékosok állapotterének összhangban tartására. A másik a `sync-action`.

Adatok: objektum
- `roomId`: szobaazonosító
- `state`: egy játékos által küldött nyers állapot, az adatbázisba sorosítva kerül.

### `action-sent`

Leírás:
Egy játékos `sync-action` hívásra keletkezett üzenet az üzenetek szinkronizálására. Ez az egyik lehetőség a játékosok állapotterének összhangban tartására. A másik a `sync-state`.

Adatok: objektum
- `roomId`: szobaazonosító
- `action`: egy játékos által küldött üzenet egy az egyben továbbítva.

### `player-left`

Leírás:
Játékos szobát elhagyásakor meghívódó üzenet.

Adatok: objektum
- `roomId`: szobaazonosító
- `socketId`: a távozó játékos socket azonosítója

## Docker

Dockerben való futtatáshoz:

1. `.env` fájl létrehozása, benne felhasználónév és bcrypt jelszó megadása
2. `docker build -t wsserver .`
3. `docker run -p 3031:3031 wsserver`

A `http://localhost:3031/` oldalon elérhető a Socket.io UI admin felülete.

Kipróbálni:
- Kliens: https://amritb.github.io/socketio-client-tool/