# Instrukciók

INFÓK: Az előző héten befejeztük az ALAPOKAT: A helyes szemlélet kialakítása, adatmodellezés és relációs sématervezés, relációs séma, kulcsok, idegen kulcsok (táblák közötti kapcsolat),  reláció előfordulás = a tábla tartalma, sorok halmaza, halmaz-szemlélet. Lekérdezések megadása az adatbázis séma (relációs sémák) alapján, vagyis minden lehetséges tábla tartalomra helyesen kell működnie a lekérdezésnek.

```sql
SELECT lista        -- 3.  <=> 3. pi lista
FROM R, S, ...      -- 1.  <=> ______ __________ 1. (R x S x ...)
[WHERE feltétel] -- 2.  <=> ______ 2. sigma feltétel
```

Az SQL-ben a halmazműveleteket nem táblákra, hanem  a fenti SFW lekérdezésekre alkalmazzuk (azonos dimenzió, kompatibilis típus)

- Alapértelmezésben halmazként értelmezve: duplikációk nélkül
- "ALL" kiegészítőszóval multihalmazként értelmezve (multiplicitás)

```text
SFW
  {UNION [ALL] | MINUS | INTERSECT }
SFW
```

Ha az előző 03.heti gyakorlat anyagából készített házi feladatot, akkor azt is másolja be a mai kötelező feladat alá, és együtt (egyszerre) küldje be (csak egyszer küldhető be a Canvasban a feladat).  Emlékeztető a mai gyakorlatra feladatott HF az előző 03.gyak. III.RÉSZLinkek egy külső oldalra Dolgozo-Osztaly táblák lekérdezési feladatait kellett relációs algebrában megoldani, és  új  HF a köv.  05.gyakorlatig írja át a relációs algebrai kifejezéseket SQL lekérdezésekre.  A köv.héten megbeszéljük az otthoni gyakorlás során felmerült kérdéseket,  mert az 05.gyak. lesz az I.ZH-t megelőző gyakorlat, amikor  a többtáblás lekérdezéseket (külső joinok, alkérdések) nézzük át SQL-ben. A mai gyakorlaton egytáblás lekérdezések (sorfüggvények, csoportosítás, összesítő függvények) lesznek SQL-ben.

I.ZH/1.része (40 perc papíros dolgozat) témaköre: Az alap relációs algebrai lekérdezések és kapcsolatuk az SQL lekérdezésekkel. Az első három gyakorlat anyagát fejből kell tudniuk, nem használhatnak segédleteket. Ehhez a Tk. 2.4., 6.1.-6.2. fejezeteiből kell felkészülni (az első két és fél előadás tananyagából).

I.ZH/2.része (40 perc gépes zh) az első öt gyakorlat anyagából lesz, ebben a gépes 2.részben csak SQL lekérdezések lesznek Oracle adatbázisban. Itt az Oracle dokumentációt .pdf-ben használhatják, ezért  a mai gyakorlaton gyakoroljuk be a doksi használatát. Ehhez töltse le:

Canvas > Fájlok >Oracle_SQL_Language_Reference.pdf

4.gyakorlat: https://people.inf.elte.hu/sila/ABGY/ab1gy04.htmlLinkek egy külső oldalra

Egytáblás lekérdezések SQL-ben, kifejezések, sorfüggvények, összesítések, csoportosítás

A megoldás menetét is be kell küldenie, lépésenként, amikor megvan egy rész, azt másolja be a Canvasba és mindig másolja be az új részt a korábbiak alá, minden folyamatosan legyen lementve a Canvasba, hogy lehessen látni a megoldás teljes menetét, és a legalul levő (végleges) megoldáshoz (csak ehhez az egyhez) másolja be az outputot is. Ha az hibás, és nincs output, akkor a hibaüzenetet másolja be a megoldás alá.

A lekérdezést a feladatok szövege szerint kell megoldani és az adott táblák sémáit (tábla- és oszlop-neveit) használják, de nincs jelentősége a tábla éppen aktuális tartalmának, vagyis úgy kell a lekérdezést megadni, hogy az minden lehetséges tábla tartalomra helyesen működjön.

Az SQL lekérdezésekhez be kell küldeni:

- a.) a megoldást, SELECT utasítást egyszerű szövegben másolja be a Canvas ablakba
- b.) az SQL lekérdezéseket le is kell futtatniuk az sqldeveloperben és a lekérdezés eredményét, az outputot is egyszerű szövegben, formázás nélkül másolja be a Canvasba. (Ha Run Script futtatja a kijelölt SELECT utasítást, akkor Script Output ablakból tudja kimásolni az outputot. Ha hosszú lenne az  output, akkor elég az első 3-4 sorát, illetve, ha hibás a megoldása, akkor a hibaüzenetet másolja át.)

Az órai kötelező feladatban először is másolja be a "villám"-feladatnak szövegét, amit az óra során konkrétan megkérdezek, hogy ezt a feladatot kell beadnia, majd másolja be a feladat szövege  alá a feladat megoldását. Másolja be a mai gyakorlófeladatokat, amit önállóan csinált.

Ha az előző heti gyakorlat anyagából készített házi feladatot, akkor azt is másolja be a mai kötelező feladat alá, és együtt (egyszerre) küldje be (csak egyszer küldhető be a Canvasban a feladat).

## A beküldött megoldás

4. Adjuk meg azon dolgozókat, akik nevének második betűje 'A'

```sql
SELECT dnev FROM dolgozo WHERE SUBSTR(dnev, 2, 1) = 'A';
```

5. Adjuk meg azon dolgozókat, akik nevében van legalább két 'L' betű.

```sql
SELECT dnev FROM dolgozo WHERE INSTR(dnev, 'L', 1, 2) > 0;
```

6. Adjuk meg a dolgozók nevének utolsó három betűjét.

```sql
SELECT SUBSTR(dnev, -3) FROM dolgozo;
```

7. Adjuk meg azon dolgozókat, akik nevének utolsó előtti betűje 'T'.

```sql
SELECT dnev FROM dolgozo WHERE SUBSTR(dnev, -2, 1) = 'T';
```

8. Kik azok a dolgozók, akik '1982.01.01.' után léptek be? (TO_DATE (Linkek egy külső oldalra)-re példák)

```sql
SELECT dnev FROM dolgozo WHERE belepes > TO_DATE('1982.01.01', 'YYYY.MM.DD');
```
