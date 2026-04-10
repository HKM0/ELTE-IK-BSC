
# 7-8. gyakorlat - kvíz és órai információk (formázott)

## 7. gyakorlat

### I. rész - SQL DML + tranzakciókezelés
- Téma: táblák tartalmának módosítása.
- SQL DML utasítások: `DELETE`, `UPDATE`, `INSERT`.
- Tranzakciókezelés: `COMMIT`, `ROLLBACK`.
- Ajánlott forrás: Oracle Példatár 5. fejezet.

#### Kötelező órai beadandó (script)
A beadandó script kötelező sorrendje:
1. `SELECT`
2. fő művelet: `DELETE` vagy `UPDATE` vagy `INSERT`
3. újra `SELECT` (a változás megfigyelésére)
4. `ROLLBACK` (az eredeti állapot visszaállítására)

Beküldés:
- SQL script + script output.
- SQL Developerben scriptként futtatva (Worksheet felső sor, 2. ikon: zöld nyíl papírlapon).

### II. rész - táblák és megszorítások
- Téma: kulcsok, külső kulcsok, összetett kulcsok, hivatkozási épség.
- Forrás: Oracle Database SQL Language Reference (`Constraint` rész).
- Canvas útvonal: `Canvas > Fájlok > Oracle_SQL_Language_Reference.pdf`.
- Kiemelten: SQL DDL 8. fejezet constraint példák.

Otthoni gyakorlás:
- `create table` példák (emp/dept helyett dolgozo/osztaly táblákkal).
- `alter table` megszorítás példák.

## 1. kérdés (7. gyakorlat)

Feladatleírás röviden:
- Az órai kötelező feladatnál be kell másolni a kijelölt feladat sorszámát és szövegét.
- Alá kell írni a megoldást ebben a formában:
	- `SELECT`
	- `[DELETE | UPDATE | INSERT]`
	- `SELECT`
	- `ROLLBACK`
- A script outputot is mellé kell adni.

Beküldött megoldás:

```sql
-- Delete első feladat
DELETE FROM dolg2 WHERE jutalek IS NULL;

-- Update 3 és 7-es feladatok
UPDATE dolgozo
SET jutalek = NVL(jutalek, 0) + (SELECT MAX(jutalek) FROM dolgozo);

UPDATE dolgozo d1
SET fizetes = fizetes +
		(SELECT AVG(fizetes)
		 FROM dolgozo d2
		 WHERE d1.oazon = d2.oazon)
WHERE oazon IS NOT NULL
	AND dkod NOT IN
			(SELECT fonoke
			 FROM dolgozo
			 WHERE fonoke IS NOT NULL);
```

## 8. gyakorlat

- A teljes SQL témakör lezárása.
- A II. ZH két részből áll:
	1. SQL
	2. PL/SQL

### II. ZH / 1. rész (SQL) várható témák
- 7. gyakorlat:
	- SQL DML (`INSERT`, `DELETE`, `UPDATE`)
	- tranzakciókezelés (`COMMIT`, `ROLLBACK`)
	- SQL DDL `CREATE TABLE` + megszorítások
- 8. gyakorlat:
	- SQL DDL `CREATE VIEW`
	- hierarchikus lekérdezések (`SELECT ... CONNECT BY ...`)
	- rekurzió SQL-ben (`WITH`)
- `Eljut` feladat:
	- útmeghatározás élekből álló gráf alapján
	- 8. gyakorlaton és 9. gyakorlaton (PL/SQL első óra) is előkerül

### Órai kötelező feladat (8. gyakorlat eleje)
Két tábla létrehozása SQL-ben:

1. `sportcsapatok`
- Oszlopok: `csapatnev`, `varos`, `tagdij`
- Összetett kulcs: `(csapatnev, varos)`
- Megszorítás: ha `varos != 'Budapest'`, akkor `tagdij <= 5000`

2. `jatekosok`
- Oszlopok: `nev`, `mezszam`, `szuldatum`, `szulvaros`, `csapatnev`, `varos`
- Összetett kulcs: `(mezszam, csapatnev, varos)`
- Idegen kulcs: `(csapatnev, varos)` -> `sportcsapatok` elsődleges kulcsa
- `nev` oszlop: kötelező (`NOT NULL`) és egyedi (`UNIQUE`)

Beküldendő script váz:

```sql
DROP TABLE JATEKOSOK;
DROP TABLE SPORTCSAPATOK;

CREATE TABLE ... ;
-- ha marad idő: INSERT INTO ... (megszorítások tesztelésére)
```

Futtatás után az outputot is be kell küldeni.

## Megjegyzések

- A gépes ZH-n csak a két Oracle dokumentáció használható:
	- SQL
	- PL/SQL
	(Canvas Fájlokból letöltött PDF-ek)
- Otthoni gyakorláshoz hasznos:
	- `Kende_Nagy_Oracle_Peldatar.pdf`
	- `Ullman_Adatbazisrendszerek_Alapvetes.pdf`
	- Ezek a ZH-n nem használhatók.
- A 8. gyakorlathoz nem volt külön kvíz, ezért a pontot megkaptuk.