### 2026. április 15.

## Az óra anyaga (Összefoglaló)

A 9. gyakorlat során folytattuk az API fejlesztését. Befejeztük a CRUD (létrehozás, lekérdezés, módosítás) műveleteket a REST API-n keresztül, finomítottuk a JSON formázást az API Resources (erőforrások) testreszabásával, és kitértünk az Eloquent relációk API-n keresztüli kiszolgálására is. A legfontosabb lépések:

1. **API Útvonalak (Routes) kiépítése**
   - A `routes/api.php` fájlban definiáltuk a posztok lekérdezéséhez, létrehozásához és szerkesztéséhez szükséges végpontokat (`GET /posts`, `GET /posts/{post}`, `POST /posts`, `PATCH /posts/{post}`).
   - A létrehozó és módosító végpontokat (`POST`, `PATCH`) levédtük az `auth:sanctum` middleware-rel, így ezeket csak hitelesített (érvényes tokennel rendelkező) felhasználók érhetik el.

2. **JSON adatformázás (API Resources)**
   - Készítettünk egy `CategoryResource` osztályt, amivel szabályozzuk, hogy a kategóriákból pontosan mely adatok (id, név, szín) kerüljenek be a válaszba.
   - Testreszabtuk a `PostResource` osztályt: itt is pontosan meghatároztuk a visszaadott mezőket (id, title, content, is_public, author_id, dátumok).
   - A `PostResource`-ban alkalmaztuk a `whenLoaded('categories')` módszert. Ez egy feltételes adatközlés: a poszthoz tartozó kategóriák (Resourceként megformázva) csak akkor kerülnek bele a JSON válaszba, ha azokat a lekérdezés során szándékosan betöltöttük (Eager Loading). Ezzel rengeteg felesleges adatbázis lekérdezést (N+1 probléma) spórolhatunk meg.

3. **ApiController felkészítése (REST műveletek)**
   - **`index` és `show`:** A posztok listázása és egy adott poszt lekérése (`findOrFail` segítségével). Ha az azonosító (ID) nem létezik, automatikusan 404-es hibát kap a kliens. A bejövő ID típusát `validator()` segítségével validáljuk, biztosítva, hogy csak szám lehessen.
   - **`store`:** Új poszt létrehozása a webes felületnél megírt `PostStoreOrUpdateRequest` újrahasznosításával. A poszt szerzőjét (`author_id`) itt is a tokennel hitelesített felhasználóból (`$request->user()->id`) azonosítjuk be, megelőzve a visszaéléseket.
   - **`update`:** Egy adott poszt frissítése. Itt egy dedikált jogosultság-ellenőrzést is bevezettünk: megvizsgáljuk, hogy a hívó fél azonos-e a poszt szerzőjével, vagy adminisztrátor-e (`$request->user()->is_admin`). Ha nem, a rendszer egy **403 Forbidden** hibával válaszol (`"You cannot do this."`).
   - **Relációk lekérése (`indexCategories`, `indexWithCategories`):** Külön végpontokat írtunk arra, hogy lekérdezzük egy adott poszt kategóriáit (`/posts/{post}/categories`), vagy az összes posztot a kategóriáikkal együtt (Eager Loading: `Post::with('categories')->get()`).

4. **GraphQL API előkészítése**
   - A `help.md` dokumentációba bekerültek a Lighthouse GraphQL csomag és a GraphiQL felület telepítéséhez szükséges Composer parancsok (`nuwave/lighthouse`, `mll-lab/laravel-graphiql`), ami az API fejlesztés egy új, modernebb megközelítését készíti elő a jövőbeli órákra.