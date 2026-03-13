```sql
select * from dolgozo 
where fizetes <= all(select fizetes from dolgozo);
with D as (select dkod, dnev, fizetes from dolgozo) 
select * from D 
MINUS select D1. * from D D1, D D2 where D1.fizetes > D2.fizetes
```

```sql
SELECT * FROM dolgozo, osztaly;
   
   -- Természetes összekapcsolás és az inner join összehasonlítása:
SELECT dkod, dnev, oazon, onev
       FROM dolgozo NATURAL JOIN osztaly;
SELECT dkod, dnev, dolgozo.oazon, onev
       FROM dolgozo, osztaly
       WHERE dolgozo.oazon=osztaly.oazon;
SELECT dkod, dnev, dolgozo.oazon, onev
       FROM dolgozo JOIN osztaly
       ON dolgozo.oazon=osztaly.oazon;
   -- Theta-join: 
SELECT * FROM dolgozo, fiz_kategoria
       WHERE fizetes BETWEEN also and felso;
       -- WHERE fizetes >= also and fizetes <= felso;
SELECT * FROM dolgozo JOIN fiz_kategoria
       ON fizetes BETWEEN also and felso; 
```

```sql
select * from dolgozo
where fizetes = (select min(fizetes) from dolgozo);


select * from dolgozo
where fizetes <= all(select fizetes from dolgozo);

with D as (select dkod, dnev, fizetes from dolgozo)

select * from D



with D as (select dkod, dnev, fizetes from dolgozo)

select D1.* from D D1, D D2
where D1.fizetes > D2.fizetes



with D as (select dkod, dnev, fizetes from dolgozo)
select * from D
MINUS
select D1.* from D D1, D D2
where D1.fizetes > D2.fizetes



with D as (select dkod, dnev, fizetes, fonoke from dolgozo)
select * from D D1, D D2;


-- Direkt szorzat:
SELECT * FROM dolgozo, osztaly;

   -- Természetes összekapcsolás és az inner join összehasonlítása:
SELECT dkod, dnev, oazon, onev
       FROM dolgozo NATURAL JOIN osztaly;
SELECT dkod, dnev, dolgozo.oazon, onev
       FROM dolgozo, osztaly
       WHERE dolgozo.oazon=osztaly.oazon;
SELECT dkod, dnev, dolgozo.oazon, onev
       FROM dolgozo JOIN osztaly
       ON dolgozo.oazon=osztaly.oazon;

   -- Theta-join: 
SELECT * FROM dolgozo, fiz_kategoria
       WHERE fizetes BETWEEN also and felso;
       -- WHERE fizetes >= also and fizetes <= felso;
SELECT * FROM dolgozo JOIN fiz_kategoria
       ON fizetes BETWEEN also and felso;



SELECT dkod, dnev, d.oazon, o.oazon, onev
       FROM dolgozo d LEFT OUTER JOIN osztaly o
       ON d.oazon=o.oazon;

SELECT dkod, dnev, d.oazon, o.oazon, onev
       FROM dolgozo d RIGHT OUTER JOIN osztaly o
       ON d.oazon=o.oazon;


SELECT dkod, dnev, d.oazon, o.oazon, onev
       FROM dolgozo d RIGHT OUTER JOIN osztaly o
       ON d.oazon=o.oazon
       WHERE fizetes>=0 or fizetes is null;


SELECT  osztaly.oazon, onev, SUM(dolgozo.fizetes) osszeg
       FROM dolgozo RIGHT OUTER JOIN osztaly
       ON dolgozo.oazon=osztaly.oazon
       WHERE fizetes>=0 or fizetes is null
       GROUp BY osztaly.oazon, onev;

```

gyakorlati feladat megoldasa: 
```sql

SELECT  osztaly.oazon, onev, 
       NVL(SUM(dolgozo.fizetes), (select min(fizetes) from dolgozo)) osszeg,
       COUNT(dolgozo.dkod) letszam
       FROM dolgozo RIGHT OUTER JOIN osztaly
       ON dolgozo.oazon=osztaly.oazon
       WHERE fizetes>=0 or fizetes is null
       GROUP BY osztaly.oazon, onev
       HAVING COUNT(dkod)>= 0
       ORDER BY letszam DESC;

```

 7. Kik azok a dolgozók, akiknek van 2000-nél nagyobb fizetésű beosztottja.
```sql
SELECT d.dkod, d.dnev
FROM dolgozo d WHERE EXISTS (SELECT 1 FROM dolgozo b WHERE b.fonoke = d.dkod AND b.fizetes > 2000);
```

8. Kik azok a dolgozók, akiknek nincs2000-nél nagyobb fizetésű beosztottja.
```sql
SELECT d.dkod, d.dnev
FROM dolgozo d
WHERE NOT EXISTS (
    SELECT 1 FROM dolgozo b
    WHERE b.fonoke = d.dkod
    AND b.fizetes > 2000);
```