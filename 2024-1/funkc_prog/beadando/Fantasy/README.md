# Fantasy Battle Simulator - Nagy Beadandó
**Az eredeti feladatleírás nincs meg, ez csak egy kb hasonló leírás!**

## Feladat leírása

Ez a projekt egy fantasy témájú csata szimulációs játék megvalósítása Haskell nyelven. A program különböző egységek közötti harcokat szimulál, beleértve varázslókat és különféle lényeket.

## Főbb komponensek

### 1. Alapvető adatstruktúrák
- **State**: Élő vagy halott állapot reprezentálása (`Alive a | Dead`)
- **Entity**: Játékbeli lények (Golem, HaskellElemental)
- **Mage**: Varázslók névvel, életerővel és varázslattal
- **Unit**: Hadsereg egységek (varázslók vagy lények)
- **Army**: Hadsereg lista

### 2. Varázslók és varázslatok
- Előre definiált varázslók különböző varázslatokkal:
  - **Papi**: Thunderpor varázslat
  - **Java**: Moduláris sebzés
  - **Traktor**: Matematikai számítások
  - **Jani**: Százalékos sebzés
  - **Skver**: Felezés alapú varázslat
  - **PotionMaster**: Rekurzív bájital varázslat

### 3. Harci rendszer
- **fight**: Két hadsereg közötti csata szimulációja
- **formationFix**: Elesett egységek hátraszorítása
- **over**: Hadsereg teljes megsemmisülésének ellenőrzése
- **recreate**: Egységek állapotának frissítése

### 4. Speciális képességek
- **haskellBlast**: Robbanás mechanizmus (5 egység, 5 sebzés)
- **multiHeal**: Gyógyítás rendszer
- **chain**: Lánc hatás (felváltva gyógyít és sebez)

### 5. Végső csata
- **OneVOne**: Egy az egy elleni harc reprezentációja
- **finalBattle**: Végső összecsapás a HaskellMage ellen
- Különböző támadási stratégiák az egészség alapján

## Technikai követelmények

### Implementálandó funkciók:
1. **Állapot kezelés**: Egységek élő/halott állapotának követése
2. **Show és Eq instance-ok**: Proper megjelenítés és összehasonlítás
3. **Harci mechanika**: Varázslatok alkalmazása, sebzés számítás
4. **Hadsereg menedzsment**: Formáció kezelés, elesettek kezelése
5. **Speciális effektek**: Robbanások, gyógyítás, lánc reakciók
6. **Végső boss harc**: Komplex turn-based harc szimulációja

### Adatszerkezetek:
- Algebrai adattípusok használata
- Magasabbrendű függvények alkalmazása (Spell típus)
- Lista műveletek (hadseregek kezelése)
- Rekurzív függvények (csata logika)

### Programozási technikák:
- Pattern matching
- Guard expressions
- Where és let klauzulák
- Rekurzió és tail rekurzió
- Lista műveletek (take, drop, filter stb.)

## Fájl struktúra
- `NagyBeadando.hs`: A teljes implementáció
- `README.md`: Projekt dokumentáció

## Futtatás
```haskell
ghci NagyBeadando.hs
```

A program különböző függvények meghívásával tesztelhető, például:
- Hadsereg létrehozása
- Csaták szimulálása
- Speciális képességek tesztelése
- Végső csata lejátszása


## Fontos megjegyzés

> **Figyelem!**  
> Ez a beadandó nem saját készítésű munka.  
> Az itt található minden tartalom Geri munkája.
