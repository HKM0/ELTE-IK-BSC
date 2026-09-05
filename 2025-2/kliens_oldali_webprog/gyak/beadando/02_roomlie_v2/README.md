```
titkos ember
titkos neptun
Kliensoldali webprogramozás - beadandó
Ezt a megoldást a fent írt hallgató küldte be és készítette a Kliensoldali webprogramozás kurzus számonkéréséhez.
Kijelentem, hogy ez a megoldás a saját munkám. Nem másoltam vagy használtam harmadik féltől
származó megoldásokat. Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé.
Az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere
(ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja, hogy mindaddig,
amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét -
saját munkájaként mutatja be, az fegyelmi vétségnek számít.
A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.

```
## Pontozás

- [x] React használata (kötelező)
- [x] Redux használata (kötelező)
- [x] README.md fájl kitöltve

- [x] Terem (4pt)
    - [x] az asztalok megfelelően megjelennek a teremben az API-ból lekérve (2pt)
    - [x] Kiválasztott asztal esetén tudunk lépkedni a napok között, látjuk a dátumokat, az elérhető/foglalt időpontokat (2pt)

- [x] Felhasználókezelés (3pt)
    - [x] Működik a regisztráció (1pt)
    - [x] Működik a bejelentkezés (1pt)
    - [x] Működik a kijelentkezés (1pt)

- [x] Navigáció (3pt)
    - [x] Navigációs sáv tartalma megfelelően változik a be- és kijelentkezésnek megfelelően, bejelentkezés után a felhasználó neve megjelenik a navigációs sávban (2pt)
    - [x] Navigációs sáv tartalma megfelelően változik a felhasználó 'role' attribútuma alapján, adminként megjelennek a releváns opciók (1pt)

- [x] Foglalás (7pt)
    - [x] Foglalás esetén a szerverről ellenőrizzük, hogy az adott hely még elérhető-e (2pt)
    - [x] A felhasználó által lefoglalt asztalok az adatbázisban mentésre kerülnek a REST API segítségével (2pt)
    - [x] A felhasználó visszajelzést kap a sikeres/sikertelen foglalásról (1pt)
    - [x] A foglalásokat részletező oldalon a felhaszáló foglalásai és annak információi listázásra kerülnek (2pt)

- [x] Admin funkciók (11pt)
    - [x] Asztal létrehozása működik, a létrehozott asztal eltárolódik az adatbázisban (2pt)
    - [x] Asztal szerkesztése működik, a módosítások eltárolódnak az adatbázisban (2pt)
    - [x] Az admin visszajelzést kap a sikeres/sikertelen hozzáadásról/módosításról (1pt)
    - [x] A beérkezett foglalások felületen a foglalások és azok információi listázásra kerülnek (2pt)
    - [x] Az admin elfogadhatja/elutasíthatja a beérkezett foglalásokat (2pt)
    - [x] Az admin mozgathatja `drag&drop` segítségével az asztalokat a teremben, az asztal lehelyezését követően (tehát nem folyamatosan, mozgatás közben) annak pozíciója frissül az adatbázisban (2pt)

- [x] Mobilbarát reszponzív megjelenés, mobilnézetben is jól használható az oldal (2pt)

- [x] Plusz pontok (5pt):
    - [x] Sötét/világos mód: Az oldalon tudunk váltani sötét/világos módra, ezt a teljes oldal kinézete leköveti (2pt)
    - [x] Modal komponens: Az admin felületen a vetítések hozzáadása és szerkesztése azonos oldalon, modal komponensben történik (1pt)
    - [x] Toastok: Az alkalmazás toast üzenetekkel jelzi a következő műveleteket (2pt):
        - Sikeres/sikertelen bejelentkezés
        - Sikeres kijelentkezés
        - Sikeres/sikertelen létrehozás/szerkesztés
        - Sikeres/sikertelen foglalás
