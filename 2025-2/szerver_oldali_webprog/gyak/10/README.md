### 2026. április 22.

## Az óra anyaga (Összefoglaló)

A 10. gyakorlat fókuszában a REST API továbbfejlesztése – azon belül is a több-a-többhöz relációk összetett kezelése –, valamint a GraphQL API alapjainak gyakorlati lefektetése állt. A legfontosabb lépések:

1. **Relációk módosítása REST API-n (Kategóriák csatolása/eltávolítása)**
   - Létrehoztunk egy új végpontot (`PATCH /posts/{post}/categories`) a `routes/api.php` fájlban, ami dedikáltan egy poszt kategóriáinak szerkesztésére szolgál.
   - Az `ApiController`-ben elkészítettük a hozzá tartozó `updateCategories` metódust. Ez képes egyetlen kérésen belül, tömbökön keresztül új kategóriákat hozzáadni (`add`), illetve meglévőket levenni (`remove`).
   - Szigorú validációt vezettünk be: ellenőriztük, hogy az átadott azonosítók léteznek-e az adatbázisban (`exists:categories,id`), és a `not_in` szabály segítségével meggátoltuk, hogy ugyanazt a kategóriát egyszerre próbáljuk hozzáadni és eltávolítani.
   - **Eloquent okosságok:** Az esetleges duplikációkból (és adatbázis hibákból) fakadó problémákat megelőzendő az `attach` helyett a `syncWithoutDetaching` metódust használtuk a biztonságos csatoláshoz, míg a leválasztásra a `detach` metódust.
   - Egyedi és informatív API választ készítettünk a művelet végén: az `array_diff` és `array_intersect` függvényekkel pontos kimutatást (JSON) adunk vissza arról, hogy mi lett újonnan hozzáadva, mi volt már amúgy is rajta, és mik lettek ténylegesen eltávolítva.

2. **GraphQL API implementálása (Lighthouse)**
   - A gyakorlatban is feltelepítettük (a `composer.json`-ban rögzítve) a Lighthouse GraphQL szervert (`nuwave/lighthouse`) és a lekérdezéseket segítő webes felületet (`mll-lab/laravel-graphiql`).
   - Generáltunk és elkezdtünk írni egy GraphQL sémát (`graphql/schema.graphql`).
   - A sémában leírtuk az adatstruktúráinkat (típusokat): `User`, `Post`, `Category`. Ezek automatikusan összekapcsolódnak a Laravel modelljeinkkel.
   - A `Query` gyökértípusban definiáltuk az első lekérdezéseket a Lighthouse speciális direktíváinak felhasználásával:
     - Lapozás és szűrés LIKE operátorral: `users(name: String @where(operator: "like")): [User!]! @paginate(...)`
     - Keresés pontos egyezés alapján: `user(id: ID @eq, email: String @eq): User @find`
   - Bemeneti validáció GraphQL-ben: a `@rules` direktíva segítségével előírtuk, hogy egy felhasználó keresésekor megadhatunk ID-t vagy email-t, de a kettőt egyszerre (vagy egyiket sem) tilos megadni (`prohibits`, `required_without`).