### 2026. március 18.

## Az óra anyaga (Összefoglaló)

A mai óra során a Laravel keretrendszer több kényelmi és teljesítményoptimalizáló funkciójával ismerkedtünk meg, fókuszban a kód tisztításával és refaktorálásával. A legfontosabb megvalósított lépések:

1. **Adatbázis-lekérdezések optimalizálása (N+1 probléma és Eager Loading)**
   - A `PostController` `index` metódusában a `Post::all()` helyett a `with('author')` metódust használtuk. Ezzel elkerültük az N+1 lekérdezés problémáját, mert így a posztokkal együtt a szerzők (relációk) is egyetlen optimális lekérdezéssel (JOIN-hoz hasonlóan) töltődnek be.

2. **Lapozás (Pagination) bevezetése**
   - Az összes poszt egyidejű betöltése helyett a `paginate(10)` metódussal egy `Paginator` objektumot hoztunk létre, ami egyszerre csak 10 posztot ad vissza.
   - Az `index.blade.php` fájlban a `{{ $posts->links() }}` segítségével megjelenítettük a lapozó gombokat.

3. **Validáció kiszervezése (Form Request)**
   - A vezérlő (Controller) kódjának tisztítása érdekében létrehoztunk egy új `PostStoreOrUpdateRequest` osztályt (Form Request).
   - Ebbe az osztályba szerveztük át a `rules()` és a `messages()` logikákat. 
   - A `store` és `update` metódusok mostantól ezt az új osztályt használják típusjelzésként, így a validáció automatikusan lefut, anélkül hogy a Controllerben kellene manuálisan meghívni.

4. **Űrlapadatok megtartása hiba esetén (`old` helper)**
   - Az `old()` függvény alkalmazásával a `create.blade.php` és `edit.blade.php` űrlapokon biztosítottuk, hogy validációs hiba esetén a felhasználó korábbi bemenetei (lenyíló lista szerzőkhöz, checkboxok) ne vesszenek el, megtartsák a kiválasztott állapotukat.

5. **Autentikációhoz kötött menüpontok (Blade direktívák)**
   - A `bloglayout.blade.php` oldalsávjában a `@guest` és `@auth` direktívákkal dinamikusan jelenítjük meg a tartalmat. Vendégek számára Belépés/Regisztráció linkek, míg bejelentkezetteknek a felhasználónév és egy biztonságos (POST kérést küldő) Kijelentkezés gomb jelenik meg.

6. **Útvonalak (Routing) egyszerűsítése és átirányítás**
   - A `web.php` fájlban a 7 különálló CRUD útvonalat lecseréltük egyetlen kényelmes `Route::resource('/posts', PostController::class);` sorra.
   - A `/dashboard` végpontnál átirányítást állítottunk be, hogy bejelentkezés után a felhasználó rögtön a posztok listájára (`posts.index`) kerüljön az üres vezérlőpult helyett.