### 2026. május 6.

## Az óra anyaga (Összefoglaló)

A 12., egyben utolsó gyakorlaton a GraphQL (Lighthouse) adatmódosító műveleteinek (Mutations) mélyebb, manuális implementációjával foglalkoztunk, bemutatva, hogyan vehetjük át az irányítást a beépített direktíváktól. A legfontosabb lépések a következők voltak:

1. **Egyedi Módosító Resolver (Mutation Resolver) készítése**
   - Míg a korábbi órán a poszt létrehozását teljes egészében a GraphQL sémára (`@create` és `@rules` direktívák) bíztuk, most megismerkedtünk a "színfalak mögötti", manuális megközelítéssel.
   - Létrehoztuk a `CreatePost1.php` osztályt a `GraphQL\Mutations` névtéren belül, amely egy egyedi resolverként működik a posztok létrehozására.

2. **Kézi validáció (Validation) a Resolveren belül**
   - Az osztály `__invoke` metódusában átvettük a bejövő argumentumokat (`$args`), és manuálisan meghívtuk rajtuk a Laravel beépített `validator()` segédfüggvényét.
   - A PHP kódban explicit módon definiáltuk a validációs szabályokat (például `required|string|min:1`, `exists:users,id`, `boolean`). Ezzel a módszerrel olyan komplex üzleti logikát vagy ellenőrzéseket is be lehet építeni, amiket a séma direktíváival (pl. `@rules`) nehézkes lenne megoldani.
   - A `validate()` függvény meghívása után – ha minden szabály teljesült – a `Post::create($args)` utasítással véglegesítettük a rekordot az adatbázisban.

3. **GraphQL séma dokumentálása**
   - A `schema.graphql` fájlban részletes kommentekkel tisztáztuk a kétféle megközelítés közötti különbséget: megmutatva, hogy hogyan lehet egy mutációt külön paraméterekkel definiálva egy saját PHP osztályra (resolverre) bízni, szemben a gyorsabb, de kötöttebb `@spread` és `@create` alapú automatizmussal.