### 2026. április 29.

## Az óra anyaga (Összefoglaló)

A 11. gyakorlat során elmélyedtünk a GraphQL (Lighthouse) világában, és az API-nkat felkészítettük komplex lekérdezések (Queries), egyedi üzleti logikák (Resolverek), valamint adatbázis módosítások (Mutations) kiszolgálására. A legfontosabb lépések:

1. **Egyedi Resolverek (Lekérdezések, Mezők) generálása**
   - Bővítettük a `help.md` fájlt a Lighthouse kódgeneráló parancsaival (`php artisan lighthouse:query`, `:field`, `:mutation`), hogy a saját logikákat külön PHP osztályokba (Separation of Concerns) szervezhessük.
   - **Egyszerű lekérdezés (`Square`):** Készítettünk egy `square(x: Float!)` lekérdezést, amelynek üzleti logikáját a `Square.php` resolver végzi az `__invoke` metódusban (kiszámítja a szám négyzetét).
   - **Összetett lekérdezés (`Stats`):** Létrehoztunk egy `Stats` típust és a hozzá tartozó lekérdezést. A `Stats.php` resolver az adatbázis alapján statisztikai mutatókat ad vissza (összes poszt, publikus posztok, poszt/kategória átlag).

2. **Kiszámított (Computed) mezők bevezetése**
   - A `Post` típusnál szükségünk volt egy olyan adattagra, ami fizikailag nincs az adatbázisban. Bevezettük a `length: Int!` mezőt, amit a `Length.php` Field resolver számol ki dinamikusan az aktuális poszt szövegén (az `mb_strlen` függvény segítségével, garantálva a megfelelő karakterhossz-számítást ékezetek esetén is).

3. **Adatbázis relációk bekötése a sémába**
   - A GraphQL sémában (`graphql/schema.graphql`) leképeztük az Eloquent modellek közötti kapcsolatokat. A `Post` ezentúl közvetlenül vissza tudja adni a hozzá tartozó `author`-t és a `categories` (kategóriák) listáját, a `User` és a `Category` pedig a hozzájuk tartozó `posts` (bejegyzések) tömbjét. A Lighthouse a háttérben automatikusan kezeli a relációkat.
   - Hozzáadtuk a `posts: [Post!]! @all` és `post(id: ID! @eq): Post @find` lekérdezéseket is, amik kódolás nélkül, direktívákkal hozzák le a posztokat.

4. **Adatmódosító műveletek (Mutations)**
   - Elkészítettük az első GraphQL adatmódosításunkat, egy poszt-létrehozó mutációt (`Mutation -> createPost1: Post @create`).
   - Annak érdekében, hogy a paramétereket könnyen tudjuk átadni és validálni, létrehoztunk egy dedikált bemeneti típust (`input CreateUserInput`).
   - Az input mezőit (`title`, `content`, `author_id`, `is_public`) elláttuk a korábbról már ismert Laravel validációs `@rules` direktívákkal (pl. `required`, `exists:users,id`).
   - A mutációnál a `@spread` direktívát alkalmaztuk, ami biztosítja, hogy a beérkező objektum mezői közvetlenül, kicsomagolva jussanak el a modell létrehozásához.