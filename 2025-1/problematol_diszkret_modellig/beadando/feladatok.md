## Beadandó ötletek - "könnyű"

- **[BARK_1_HAZUG_KERDEZ]** Készítsünk el egy barkóbázó programot, mely az általunk gondolt szám esetén EGY hazugság lehetősége melletti kérdező stratégiát valósít meg. Az alaphalmaz legfeljebb N = 1000 elemű. A stratégia legyen olyan, mely a lehető legjobban felezi a játék állapotát leíró számhármas „térfogatát”.
- **[CSOP_2_TARGY]** Készítsünk egy csoporttesztelő algoritmust, mely N-ből 2 jelzett elemet keres meg. A kérdések során az alaphalmaz egy tetszőleges részhalmazáról megkérdezhetjük, hogy van-e a ebben a részhalmazban jelzett elem. Használjuk az általánosított felező algoritmust.

## Beadandó - "közepes"

- **[SZTRING1]** Készítsünk algoritmust, mely a De Bruijn-gráf segítségével előállít egy sztringet, mely a bemenetként kapott összes sztringet tartalmazza.
- **[SZTRING2]** Készítsünk algoritmust, mely rekonstruál egy sztringet (több megoldás esetén az összes lehetségeset) a bemenetként megkapott Parikh-multihalmazából.
- **[BARK_2_HAZUG_VALASZ]** Készítsünk el egy barkóbázó programot, mely az általunk gondolt szám esetén KÉT hazugság lehetősége mellett válaszadó stratégiát valósít meg. Próbáljuk meg rákényszeríteni a kérdezőt a lehető legtöbb kérdés feltevésére. Az alaphalmaz legfeljebb N = 1000 elemű. A stratégia legyen olyan, mely a játék állapotát leíró számhármas „térfogatát” a kérdés alapján kevésbé csökkenti.
- **[FOCI]** Írjunk programot, ami bemenetként egy számsorozatot vár, és megmondja, hogy az a sorozat lehet-e egy (visszavágó nélküli) körmérkőzéses focibajnokság pontszámsorozata.
	A megoldást egész programozási (Integer Programming, IP) feladatként adjuk meg.
- **[TENISZ1]** Modellezzünk le egy teniszmeccset Markov-láncként. A bemenő paraméterek legyenek azok, hogy az "A", illetve "B" játékos milyen valószínűséggel nyeri meg a saját szervája esetén a labdamenetet. Ebből számítsuk ki, hogy ki milyen eséllyel nyeri az egyes gémeket. Azután ebből azt, hogy ki milyen eséllyel nyeri a szetteket, illetve a meccset.
- **[FOKSZÁM]** Írjunk programot, ami bemenetként egy számsorozatot vár, és megmondja, hogy az a sorozat lehet-e egy egyszerű irányítatlan gráf fokszámsorozata.
	A megoldást egész programozási (Integer Programming, IP) feladatként adjuk meg.

## Beadandó - "nehéz"

- **[BARK_K_HAZUG_VALASZ]** Készítsünk el egy barkóbázó programot, mely az általunk gondolt szám esetén K hazugság lehetősége mellett válaszadó stratégiát valósít meg. Próbáljuk meg rákényszeríteni a kérdezőt a lehető legtöbb kérdés feltevésére. Az alaphalmaz legfeljebb N = 1000 elemű. A stratégia legyen olyan, mely a játék állapotát leíró számhármas „térfogatát” a kérdés alapján kevésbé csökkenti. Ez két változatban is elkészíthető (tkp. két külön feladat). A fent leírtban a lehetőségekhez képest leginkább gonosz válaszadó szerepe a feladat, de elkészíthető a kérdező stratégiáját megvalósító program is.
- **[TENISZ2 update végre]**
	(talán így már jó):

	Modellezzünk le egy tenisz (pingpong, tollas, squash, padel, pickleball, mitbánomén) labdamentet Markov Döntési Folyamattal (MDP) a következő modell szerint:

	A rendszernek 3 + 2 állapota van. A 3 állapot azt tükrözi, hogy az "A" és a "B" játékos éppen mennyire uralja a labdamenetet:
	- "A fölényben" (például ütött egy jó támadó ütést, és felment a hálóra)
	- "B fölényben"
	- Semleges

	A további 2 állapot a labdamenet vége: "A nyerte a poént" vagy "B nyerte a poént", ezután új labdamenet kezdődik, semleges állapottal.

	A labdamenet közben mindig 3 opció közül választhatnak a játékosok: rizikós, stabil és menekülő. Például, ha ki vagyok szorítva, megpróbálhatok egy nagyon kockázatos nyerőt beválllani (rizikós), amit könnyen lehet, hogy elrontok, de ha mégis sikerül, nyerem a pontot. Ugyanakkor felemelhetem az égbe (moonball, csak nyári szezonban) a labdát, amivel (ha jól sikerül) visszakerülök semleges állapotba, de lehet, hogy rövid, és lecsapja az ellenfél.

	Mi vagyunk az A játékos, keressük az optimális startégiát. Az MDP modellünk bemeneteként adott minden opcióra a megfelelő állapotátmeneti valószínűség: pl.
	Amikor B fölényben van, mi jövünk, a rizikós opciót választjuk: Ekkor a következő szitucáiónk 10% eséllyel, hogy nyertük a pontot, 80%-kal elbuktuk, 5%-kal maradtunk "B fölényben" állapotban, 3%, hogy "Semleges" lett az állapot, és 2%, hogy nem nyertük a pontot, de már "A fölényben" van. Ezeket a számokat minden állapotra megkapjuk inputként. Ha vége a labdamenetnek, nincs opciók közt választásunk, jön a következő, ami "Semleges" állapotban indul.

	Határozzuk meg, hogy adott MDP bemeneti átmenetei valószínűségek esetén mikor mi a legjobb döntés.

	**RÉGI SZÖVEG, FOR THE RECORD**
	> Modellezzünk le egy teniszmeccsből egy gémet (jétékot) Markov döntési folyamatként. A modell kiindulópontja legyen a következő: a szerválónak 5-féle szervája van, a legjobbak kockázatosak (nem mindig jönnek be, de ha igen, nagyobb valószínűséggel nyeri vele a pontot). Legyen bemenő paraméter, hogy melyik szerva hány százalékkal sikeres, és ha sikeres, akkor hány százalék eséllyel hozza a pontot. Határozzuk meg, hogy milyen pontállásnál (30:0, 40:30, egyenlő stb.) melyik szervát érdemes elsőre, illetve másodikra választani. A cél a gém megnyerési valószínűségének maximalizálása. Használjunk Markov döntési folyamatot

## Új feladatok

### Nehéz

- **RMQ**: Implementáljuk a Range Minimum Query problémára a Sparse Table megközelítést, majd az RMQ-LCA ekvivalencia használatával alkalmazzuk ezt egy LCA feladat megoldására.
	ld. órai jegyzet ill.: https://www.topcoder.com/thrive/articles/Range%20Minimum%20Query%20and%20Lowest%20Common%20Ancestor
- **LCA**: Implementáljuk a Lowest Common Ancestor problémára a dinamikus programozási megközelítést, majd az RMQ-LCA ekvivalencia használatával alkalmazzuk ezt egy RMQ feladat megoldására.
	ld. órai jegyzet, ill. https://www.topcoder.com/thrive/articles/Range%20Minimum%20Query%20and%20Lowest%20Common%20Ancestor (Linkek egy külső oldalra)

### Közepes

- **Pollard-féle rhó**: Implementáljuk a Pollard-féle rhó módszert számok faktorizálására, Floyd perióduskeresési módszerével kombinálva. Hasonlítsuk össze a futási időket különböző méretű számok esetén a triviális "trial division" módszerrel. Feltehetjük, hogy az input két közel azonos méretű prímszám szorzata.

 