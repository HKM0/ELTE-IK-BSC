# Roomlie REST API

A Roomlie webalkalmazás backendje. [Hono](https://hono.dev/), Prisma és SQLite alapokon.

---

## Előfeltételek

- **Node.js 20+**, ellenőrzés: `node -v`. Letöltés: [nodejs.org](https://nodejs.org)
- **npm**, a Node.js-sel együtt települ.

---

## Gyors kezdés

Az alábbi parancsokat a `restapi/` mappában futtasd:

```bash
# 1. Függőségek telepítése
npm install

# 2. .env fájl létrehozása (másold át az example-t)
cp .env.example .env        # Mac/Linux
copy .env.example .env      # Windows

# 3. Adatbázis előkészítése (SQLite fájl létrehozása + teszt adatok betöltése)
npm run db:setup

# 4. Fejlesztői szerver indítása
npm run dev
```

A szerver ezután elérhető: **http://localhost:3000**

Nyisd meg a **http://localhost:3000/docs** oldalt a böngészőben, itt az összes végpontot kipróbálhatod kód írása nélkül is (Swagger UI).

Az adatbázis tartalmát vizuálisan böngészheted a Prisma Studio segítségével (egy külön terminálban):

```bash
npm run db:studio
```

A `restapi/` mappában található egy **Postman kollekció** (`Roomlie API.postman_collection.json`), amelyet importálhatsz Postmanbe. Ez tartalmazza az összes végpontot előre beállított kérésekkel, így gyorsan kipróbálhatod az API-t anélkül, hogy kézzel kellene felépíteni a kéréseket.



---

## Környezeti változók

A `.env` fájl (2. lépésben létrehozva) három változót tartalmaz:

| Változó | Alapérték | Mire való |
|---|---|---|
| `DATABASE_URL` | `file:./dev.db` | Az SQLite adatbázis fájl elérési útja. Nem kell módosítani. |
| `PORT` | `3000` | A szerver portja. |
| `FRONTEND_URL` | `http://localhost:5173` | Az engedélyezett CORS origin. Állítsd be a React app URL-jére. |

Ha a React dev szervered más porton fut, frissítsd a `FRONTEND_URL` értékét, majd indítsd újra az API-t.

---

## Teszt fiókok (automatikusan létrehozva)

Az `npm run db:setup` után két fiók áll rendelkezésre:

| Szerepkör | Email | Jelszó |
|---|---|---|
| Admin | `admin@example.com` | `admin` |
| Normál felhasználó | `user@example.com` | `password` |

---

## API áttekintés

Alap URL: `http://localhost:3000/api/v1`

A táblázatokban a **Védett útvonal** oszlop értékei:

- `-` : bárki elérheti, bejelentkezés nélkül
- `User` : bejelentkezett felhasználó szükséges
- `Admin` : csak `ADMIN` szerepkörű felhasználó érheti el (normál user `403 Forbidden` választ kap)

### Auth: `/api/v1/auth`

| Metódus | Útvonal | Védett útvonal | Leírás |
|---|---|---|---|
| `POST` | `/register` | - | Új fiók létrehozása |
| `POST` | `/login` | - | Bejelentkezés, token visszaadása |
| `POST` | `/logout` | User | Aktuális token érvénytelenítése |
| `GET` | `/me` | User | Bejelentkezett felhasználó adatai |

### Asztalok: `/api/v1/tables`

| Metódus | Útvonal | Védett útvonal | Leírás |
|---|---|---|---|
| `GET` | `/` | - | Összes asztal listázása |
| `POST` | `/` | Admin | Asztal létrehozása |
| `PATCH` | `/:id` | Admin | Asztal adatainak módosítása |
| `PATCH` | `/:id/position` | Admin | Asztal pozíciójának frissítése (drag & drop) |
| `DELETE` | `/:id` | Admin | Asztal törlése |
| `GET` | `/:id/timeslots?date=ÉÉÉÉ-HH-NN` | - | Szabad időszakok egy adott napra |

### Foglalások: `/api/v1/bookings`

| Metódus | Útvonal | Védett útvonal | Leírás |
|---|---|---|---|
| `GET` | `/my` | User | Saját foglalások listája |
| `GET` | `/` | Admin | Összes foglalás listája |
| `POST` | `/` | User | Új foglalás létrehozása |
| `PATCH` | `/:id/status` | Admin | Foglalás elfogadása vagy elutasítása |

A teljes kérés/válasz sémákért látogasd meg a Swagger UI-t: http://localhost:3000/docs

---

## Hogyan működik a hitelesítés?

A szerver kétféle hitelesítési módot fogad el, bármelyiket választhatod:

### 1. lehetőség: Bearer token (manuális)

A bejelentkezés után visszakapott tokent mentsd el `localStorage`-ban vagy Redux state-ben, majd minden védett kérésnél csatold az `Authorization` fejlécben:

```
Authorization: Bearer <a-te-tokened>
```

> **Swagger és Postman Bearer tokent használ.** Jelentkezz be az `/api/v1/auth/login` végponton, másold ki a kapott tokent, és illeszd be a Swagger "Authorize" gombnál, illetve Postman-ben bearerToken változóként tárold.

### 2. lehetőség: HttpOnly süti (egyszerűbb)

A szerver bejelentkezéskor automatikusan beállít egy `HttpOnly` sütit (`auth_token`). A böngésző ezt minden kérésnél automatikusan elküldi, neked csak `credentials: 'include'`-ot kell megadni az API hívásokban. Ebben az esetben tokent nem kell tárolni, fejlécet nem kell kezelni.

---

## Elérhető parancsok

| Parancs | Mit csinál |
|---|---|
| `npm run dev` | Fejlesztői szerver indítása automatikus újratöltéssel |
| `npm run db:setup` | Migráció + seed futtatása (első indításhoz vagy teljes resethez) |
| `npm run db:migrate` | Csak a migrációk futtatása |
| `npm run db:seed` | Adatbázis újraseedelése (⚠️ törli az összes meglévő adatot) |
| `npm run db:studio` | Prisma Studio megnyitása, vizuális adatbázis böngésző |
| `npm run build` | TypeScript fordítása `dist/` mappába |
| `npm run start` | A lefordított build futtatása |

---

## Projektstruktúra

```
restapi/
├── prisma/
│   ├── schema.prisma       # Adatbázis séma (User, Token, Table, Booking)
│   ├── seed.ts             # Teszt felhasználók és asztalok létrehozása
│   └── migrations/         # Automatikusan generált SQL migrációk
├── src/
│   ├── index.ts            # Belépési pont, HTTP szerver indítása
│   ├── app.ts              # Hono app, middleware-ek, route-ok, Swagger
│   ├── db.ts               # Prisma kliens singleton
│   ├── schemas.ts          # Zod/OpenAPI sémák (kérés és válasz alakok)
│   ├── types.ts            # Megosztott TypeScript típusok
│   ├── routes/
│   │   ├── auth.ts         # /api/v1/auth
│   │   ├── tables.ts       # /api/v1/tables
│   │   └── bookings.ts     # /api/v1/bookings
│   ├── middleware/
│   │   └── auth.ts         # requireAuth és requireAdmin middleware
│   └── lib/
│       ├── mappers.ts      # DB sor -> API válasz konverziók
│       └── timeslots.ts    # Időszak-generálási logika
```

---

## Éles rendszerre kapcsolás

Az éles rendszer elérhetősége: **https://roomlie-api.gkrisz.space/api/v1/**.
> **Fontos!** Minden kérésnél el kell küldened az `X-Neptun-Code` fejlécet, melyben a Neptun kódod szerepel (pl. `X-Neptun-Code: ABC123`).

> **Megjegyzés:** A szerver csak *.vercel.app domainről engedélyezi a kéréseket.

## Hibakeresés

**"Cannot find module" vagy Prisma kliens hiba**
A Prisma kliensnek generálva kell lennie a sémából. Futtasd:
```bash
npm run db:generate
```

**CORS hiba a böngészőben**
A React app URL-jének meg kell egyeznie a `.env`-ben lévő `FRONTEND_URL` értékével. Például ha a Vite a 5174-es porton fut:
```
FRONTEND_URL="http://localhost:5174"
```
Ezután indítsd újra az API szervert.

**A port már foglalt**
Módosítsd a `PORT` értékét a `.env`-ben egy szabad portra (pl. `3001`), és frissítsd a React-ban lévő fetch hívásokat is.

**Tiszta lappal szeretnél kezdeni?**
Az `npm run db:setup` újrafuttatása törli az összes adatot és újra betölti a seed adatokat.
