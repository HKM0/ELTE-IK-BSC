# Ora eleji feladat

## Instrukciok

A jelenleti ivben altalaban az aktualis het anyagahoz kapcsolodo feladatot kell bekuldenie, amihez minden szukseges tudnivalo elhangzik az adott gyakorlaton; ezzel a gyakorlaton valo aktiv jelenletet ellenorizzuk.

Az oran jelzem, hogy mikor keszitsuk el a kotelezo beadando feladatot, es akkor adom meg a kvizhez is a hozzaferesi kodot. Az idokorlat 10 perc.

## Mai gyakorlat

**9. gyakorlat - PL/SQL alapok**

### Eljut feladat

A repulogepjaratok adatairol (Honnan-Hova varosparokat tartalmazo) `Jaratok` tablat ezzel a scripttel keszitsuk el: `jaratok_tabla.txt` (Linkek egy kulso oldalra).

A mai 9. gyakorlat az elso PL/SQL gyakorlat. Erre az ugynevezett "Eljut" feladatra, grafok lekerdezesere irunk PL/SQL programot.

Az "Eljut" feladat: minden Honnan-Hova varosparrol irjuk fel, hogy mely varosbol (Honnan), mely varosba (Hova) lehet egy vagy tobb atszallassal eljutni.

Atismeteljuk a programozason tanult alapismereteket:

- eljarasok
- fuggvenyek
- valtozohasznalat
- vezerlesi szerkezetek (felteteles utasitasok, ciklusok)

## HF

Nezze at az Oracle Peldatar 8. fejezetenek feladatait. Ezek egyszeru programozasi feladatok, ismert programozasi algoritmusok megvalositasa PL/SQL-ben. A cel, hogy megszokjuk a PL/SQL (az ADA programozasi nyelv jellegu) szintaxist.

Gondolja at, hogy mi a kedvenc programozasi algoritmusa, majd irja meg az ezt megvalosito programot (eljarast vagy fuggvenyt) Oracle PL/SQL-ben, amit le is kell tesztelni, vagyis le kell futtatni.

## 1. kerdes (Penteki csoport)

Az ora legelejen az orai kotelezo feladat (aminek a megoldasahoz mar az 1. gyak. anyaganak az ismerete is elegendo: egy tabla lekerdezese, egy tabla onmagaval valo direkt szorzata).

A repulogepjaratok adatairol (Honnan-Hova varosparokat tartalmazo) `Jaratok` tablat ezzel a scripttel keszitsuk el: `jaratok_tabla.txt` (Linkek egy kulso oldalra).

Majd irjunk SQL lekerdezest, amellyel lekerdezzuk azokat a Honnan-Hova varosparokat, ahonnan (az egyik varosbol) ahova (a masik varosba) egy vagy ket atszallassal el lehet jutni, de nincs kozvetlen jarat.

Kuldje be a `SELECT` lekerdezest, es a lekerdezest lefuttatva masolja be ala a lekerdezes outputjat is.

Penteki csoport: nezzek at a `08gyak` kviz feladatat.

## Megoldas

```sql
SELECT j1.honnan, j2.hova
FROM jaratok j1 JOIN jaratok j2 ON j1.hova = j2.honnan
UNION
SELECT j1.honnan, j3.hova FROM jaratok j1
JOIN jaratok j2 ON j1.hova = j2.honnan
JOIN jaratok j3 ON j2.hova = j3.honnan
MINUS
SELECT honnan, hova FROM jaratok;
```


Órai anyag: 

pl/sql ciklus: 
az előző feldatra pl így nézne ki: 

```sql
SET SERVEROUTPUT ON;

DECLARE
  van_kozvetlen NUMBER;
BEGIN
  -- FOR ciklus: végigmegyek az 1-2 átszállásosokon.
  FOR ut IN (
    SELECT j1.honnan, j2.hova
    FROM Jaratok j1 JOIN Jaratok j2 ON j1.hova = j2.honnan
    UNION
    SELECT j1.honnan, j3.hova
    FROM Jaratok j1
    JOIN Jaratok j2 ON j1.hova = j2.honnan
    JOIN Jaratok j3 ON j2.hova = j3.honnan
  )
  LOOP
    -- megnézzük hogy van e kövezvetlen járat.
    SELECT COUNT(*) INTO van_kozvetlen
    FROM Jaratok
    WHERE honnan = ut.honnan AND hova = ut.hova;

    -- ha 0 akkor nincs közvetlen járat
    IF van_kozvetlen = 0 THEN
      DBMS_OUTPUT.PUT_LINE(ut.honnan || ' -> ' || ut.hova);
    END IF;
    
  END LOOP; -- ciklus vége
END;
```

