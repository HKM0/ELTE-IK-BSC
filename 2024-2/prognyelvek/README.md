# Programozási nyelvek Java

---

## A tárgy célja

A tárgy célja programozási nyelvek általános fogalmainak, a nyelvi eszközök használatának megismertetése, elsősorban az imperatív, objektumelvű programozási paradigmán belül mozogva. Illusztrációként a Java nyelvet használjuk.

## Tematika

---

### Főbb témakörök

- **Imperatív programozás eszközei**: típusok, változók, operátorok, kifejezések, utasítások, vezérlési szerkezetek, megjegyzések
- **Procedurális programozás**: alprogramok/metódusok, paraméterátadás, túlterhelés, végrehajtási verem, rekurzió
- **Objektumelvű programozás** (legnagyobb hangsúllyal):
  - Osztály, objektum, tagok
  - Példányosítás és inicializáció
  - Öröklődés, altípusos polimorfizmus
  - Felüldefiniálás és felüldeklarálás
  - Statikus és dinamikus kötés
  - Absztrakt típusok
  - Objektumok összehasonlítása és másolása

---

### Részletes tananyag

- Programszerkezet: csomag, típusdefiníció, tag
- Primitív és referenciatípusok, csomagoló osztályok, auto-(un)boxing
- Objektumok ábrázolása, heap, referenciák, aliasing
- Objektumok élettartama, szemétgyűjtés
- Alprogramok hívása, végrehajtási verem, aktivációs rekord
- Alprogramok paraméterei, `this`, `static`
- Érték és megosztás szerinti paraméterátadás
- Láthatósági módosítószavak, belső állapot és kiszökése, getter/setter
- Kifejezések és kiértékelésük, számábrázolás, operátorok
- Utasítások, strukturált programozás
- Típuskonverziók, up- és downcast, instanceof
- Blokk, hatókör, láthatóság
- Objektumok létrehozása és inicializálása
- Öröklődés mechanizmusa, többszörös öröklődés
- Típushierarchia, altípusosság, helyettesítési elv
- Öröklődés kiváltása kompozícióval
- Altípusos polimorfizmus
- Absztrakt osztályok és `interface`ek
- A felüldefiniálás és a túlterhelés fogalma, szabályai
- Statikus és dinamikus típus, szerepük, dinamikus kötés
- Final változók, metódusok és osztályok
- Generikus és paraméterezett típusok
- Altípus reláció paraméterezett típusok között
- Korlátos (bounded) parametrikus polimorfizmus
- Tömb típusok
- **Kivételkezelés**:
  - Kivétel fogalma, célja, szerepe
  - Kivételek fellépése, terjedése és lekezelése
  - Erőforráskezelés, `finally` és try-with-resources
  - Kivételfajták osztályozása, (nem) ellenőrzött kivételek
  - Kivételek definiálása és kiváltása
- A `java.lang.Object` műveletei, a `java.lang.Class` osztály szerepe
- Objektumok összehasonlítása (egyenlő, kisebb-nagyobb), másolása
- Programozási nyelv szabályai, fordítás, futtatás
- A Java Virtuális Gép működése, osztálybetöltés, bájtkód

## Koncepciók és módszertan

---

### Elvárások
- Tudatos nyelvielem-használat
- Jó minőségű kód írása
- Kódolási konvenciók betartása
- Megfelelő tördelés és kommentezés
- Olvashatóság és karbantarthatóság biztosítása

---

### Eszközök
- **Előadásokon**: kötelező részvétel
- **Gyakorlatokon**: gyakorlatvezetővel segített önálló munka
- **Fejlesztői környezet**: 
  - ❌ Integrált fejlesztői környezet (IntelliJ IDEA, Eclipse, NetBeans) - TILOS
  - ✅ Programozói szövegszerkesztők (VS Code, Codium, geany, notepad++, gedit, vim, emacs)
  - ✅ Parancssoros fordítás és futtatás

---

### Munkaórák eloszlása (180 óra / 6 ECTS)
- 52 óra: tantermi tanórák (2+2 óra/hét × 13 hét)
- 26 óra: előadás anyagának átnézése, felkészülés gyakorlatra
- 52 óra: önálló programozás (házi feladatok, konzultáció)
- 46 óra: félévi felkészülés (ismétlés, gyakorlás)
- 4 óra: zárthelyi dolgozat

## Követelmények

---

### Előfeltételek
- Előadás és gyakorlat rendszeres látogatása (max. 4-4 hiányzás)
- Előadás látogatása alóli felmentés a szokásos szabályok szerint

---

### Pontrendszer (100 pont)
- **Órai kvízek**: 20 pont (10 alkalommal × 2 pont)
- **Egyéb gyakorlati pontok**: 10 pont (gyakorlatvezető által meghatározva)
- **Beadandó feladat**: kötelező, de nem ér pontot
- **Zárthelyi dolgozat**: 70 pont
  - Elméleti rész: 20 pont (kvízkérdések)
  - Programozási rész: 50 pont

---

### Érdemjegyek
- **Elégséges**: 50 pont
- **Közepes**: 60 pont  
- **Jó**: 70 pont
- **Jeles**: 80 pont

## Zárthelyi szabályok

---

### Engedélyezett eszközök
- ✅ Java API referencia dokumentáció
- ✅ JUnit standalone jar fájl
- ✅ Üres papír és toll (elméleti részhez)

---

### Tiltott eszközök és tevékenységek
- ❌ Internet használat (kivéve számonkérő oldal)
- ❌ Fóliák, jegyzetek
- ❌ Saját gép
- ❌ IDE jellegű szövegszerkesztők
- ❌ Mobiltelefon, tablet, okosóra
- ❌ Kommunikáció más hallgatókkal
- ❌ Mesterséges intelligencia
- ❌ Előkészített szoftver/hardver

---

### Fontos feltételek
- Minden Java fájlnak hiba nélkül le kell fordulnia
- Nem forduló fájlok nem kerülnek értékelésre
- Egyetlen hibás fájl az egész megoldást értékelhetetlenné teheti
- ZH egy alkalommal ismételhető (csak javítani lehet a pontszámon)
- Beadandó határidőre kötelező (különben tárgy nem teljesíthető)

**A szabálysértés a jegy megtagadását vonja maga után az ELTE SZMSZ alapján.**