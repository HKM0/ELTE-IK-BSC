module Hazi8 where

{-
1. Három értékű Bool
a) TriBool

Definiálj egy három értékű típust TriBool néven! 
Ennek a típusnak legyen három konstruktora: Yes, Maybe, No. 
Kérjük meg a fordítót, hogy példányosítsa erre a típusra a Show és az Eq osztályokat!
-}


--tesztek:
{- 
Maybe == Maybe
No == No
Yes == Yes
Maybe /= No
No /= Maybe
Yes /= No
No /= Yes
Yes /= Maybe
Maybe /= Yes
show Maybe == "Maybe"
show Yes == "Yes"
show No == "No"
-}

----------------------------------------------------------------------------------------
{-
b) TriBool-ok rendezése

Definiálj a TriBool típusunkra Ord példányt manuálisan! A konstruktorok közül a Yes a legnagyobb és a No a legkisebb.
-}


--tesztek:
{-
No < Yes
Yes > Maybe
Maybe >= Maybe
No <= Maybe
not (Yes <= No)
-}

----------------------------------------------------------------------------------------
{-
c) TriBool műveletek

Definiáld a triAnd és triOr függvényeket, amelyek logikai műveleteket végeznek el TriBool-ok felett!
-}

{-
triOr :: TriBool -> TriBool -> TriBool
triAnd :: TriBool -> TriBool -> TriBool
-}

{-
Megjegyzés: Mindkét függvény a Yes-szel és a No-val ugyanúgy viselkedik, mint a rendes logikai függvények. 
Éselés esetén a Maybe gyengébb, mint a Yes, így azon vizsgálatkor a Maybe-t kell visszaadni. 
Vagyolás esetén pedig a Maybe erősebb, mint a No, így azon vizsgálatkor a Maybe-t kell visszaadni.
-}

----------------------------------------------------------------------------------------
{-
d) Talán monoton növekvő

Definiáld az incMonotonityTest függvényt, amely megállapítja hogy a lista növekvő-e! Ehhez a lista első n elemét vizsgálja. Ha a listának ennél több eleme van, akkor nem tudhatjuk a többi rész monoton-e, ezért ekkor adjunk vissza Maybe-t. Ha találunk az első n elemben ellenpéldát, akkor nem monoton növekvő, ha a lista hossza kevesebb mint n és azon monoton növekvő, akkor az egész lista monoton növekvő.
-}

--incMonotonityTest :: (Integral i, Ord a) => i -> [a] -> TriBool


--tesztek:
{-
triOr Yes Maybe == Yes
triAnd Yes Maybe == Maybe
triAnd No Maybe == No
incMonotonityTest 3 [1,2,3] == Yes
incMonotonityTest 3 [1,2,3,4] == Maybe
incMonotonityTest 3 [1,2,3,0] == Maybe
incMonotonityTest 4 [1,2,3,0] == No
incMonotonityTest 10 [1..] == Maybe
incMonotonityTest 10 ([1..7] ++ [7,6..]) == No
-}

----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------

{-
2. Golf
a) Kifejezések

A golfban a pontozás az alapján megy, hogy hány ütésből tudta valaki beütni a labdát a lyukba - minél kevesebb annál jobb. Ehhez az alábbi terminológiát szokás használni:

    Ace - Amikor valaki első ütésre belövi a labdát.
    Albatross - Amikor valaki a lyuk limitje alatt legalább 3-mal lőtte be a golflabdát.
    Eagle - Amikor valaki a lyuk limitje alatt 2-vel lőtte be a labdát.
    Birdie - Amikor valaki a lyuk limitje alatt 1-gyel lőtte be a labdát.
    Par - Amikor valaki a lyuk limitjével egyező lövésszámmal lőtte be a golflabdát.
    Bogey - Amikor valaki túllépi a limitet.

Definiálj egy GolfScore adattípust, aminek a fenti konstruktorai vannak. A Bogey-nak legyen egy Integer paramérere, amely azt reprezentálja, hogy mennyivel léptük túl a limitet. Kérd a fordítótól a Show osztály példányosítását!

Definiálj manuálisan Eq példányt erre a típusra!
-}


--tesztek:
{-
show Ace == "Ace"
show Albatross == "Albatross"
show Eagle == "Eagle"
show Birdie == "Birdie"
show Par == "Par"
show (Bogey 10) == "Bogey 10"
Bogey 2 == Bogey 2
Bogey 3 /= Ace
Ace /= Albatross
-}

----------------------------------------------------------------------------------------
{-
b) Pontszám

Definiáld a score függvényt, amely egy limit és egy ütésszám alapján kiszámolja, hogy mi a pontszáma valakinek!
-}

--score :: Integer -> Integer -> GolfScore


--tesztek:
{-
score 2 3 == Bogey 1
score 3 2 == Birdie
score 4 1 == Ace
score 103 1 == Ace
score 103 2 == Albatross
score 103 100 == Albatross
score 103 101 == Eagle
score 10 10 == Par
score 6 9 == Bogey 3
-}

----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------

{-
3. Idő
a) Óra típus

Hozz létre egy saját típust Time néven. 
A típusnak legyen pontosan egy konstruktora T néven, amely két Int paramétert vár, amelyek az órát és a percet jelölik. 
Segítségül egyedül az egyenlőségvizsgálatot lehet a fordítótól kérni. 
(Tehát a deriving után csak az Eq állhat, semmi más!)
-}

----------------------------------------------------------------------------------------
{-
b) Okos konstruktor

Mivel Haskell-ben nem lehet olyat típusszinten megmondani, hogy mettől meddig lehetnek a Time típusban az értékek, tehát az óra [0..23]-ig, a perc pedig [0..59]-ig terjedhet, ezért hozzunk létre egy külön függvényt (ún. okos konstruktort), amely csak akkor fog visszaadni Time típusú értéket, ha mindkét érték a megadott intervallumba esik. Ha valamelyik érték nem megfelelő, a függvény az error függvénnyel dobjon hibát, mert jobb eszközünk még nincs.
-}

--t :: Int -> Int -> Time


--tesztek:
{-
t 10 12 == T 10 12
t 23 59 == T 23 59
-}

----------------------------------------------------------------------------------------
{-
c) Idő megjelenítése; "it's show time!"

Mivel a fordítótól nem lehetett kérni megjelenítést, ezért írjunk egyet magunknak, ami egy kicsit szebben fogja megjeleníteni az időt. Ehhez példányosítsuk a Show osztályt a Time típusra. A megjelenítésben legyen ':'-tal elválasztva az óra és a perc szóköz nélkül. (Aki ügyesebb, megoldhatja úgy is a feladatot, hogy mindig kétjegyű legyen a kiírt óra és perc, esetleg lehet olyan fajta is, hogy ha az óra egyjegyű, akkor nem írja ki a vezető 0-t, de a perc esetén igen.)
-}


--tesztek:
{-
show (t 12 23) == "12:23"
show (t 1 1) == "1:1" || show (t 1 1) == "1:01" || show (t 1 1) == "01:01"
show (t 22 1) == "22:1" || show (t 22 1) == "22:01"
show (t 0 59) == "0:59" || show (t 0 59) == "00:59"
-}

----------------------------------------------------------------------------------------
{-
d) Korábban, később

Rendezzük az időpontokat megfelelően. Ehhez példányosítsuk az Ord osztályt a Time típuson!

Emlékeztető: Ne feledjük, a rendezésnek Bool típusú az eredménye, tehát elágazást használni felesleges, ezért nem szabad!
-}


--tesztek:
{-
t 10 20 < t 10 21
t 0 0 < t 23 59
t 21 55 > t 21 30
t 22 0 > t 21 30
-}

----------------------------------------------------------------------------------------
{-
e) Két időpont között

Definiálj egy függvényt isBetween névvel, amely paraméterül kap 3 időpontot és vizsgálja, hogy a középső a két szélső időpont között van-e. 
Figyelni kell arra, hogy esetleg fordított sorrendben vannak az időpontok, arra is működnie kell.
-}

--isBetween :: Time -> Time -> Time -> Bool


--tesztek:
{-
isBetween (t 12 23) (t 12 34) (t 12 45)
isBetween (t 23 59) (t 12 0) (t 0 0)
not (isBetween (t 20 0) (t 10 0) (t 16 0))
-}

----------------------------------------------------------------------------------------
{-
f) Amerikai idő típus

Definiálj egy új adattípust USTime néven! Legyen annak két konstruktora:

    AM :: Int -> Int -> USTime: Délelőtti időt jelzi.
    PM :: Int -> Int -> USTime: Délutáni időt jelzi.

Kérd meg fordítót, hogy példányosítsa az Eq osztályt a USTime típusra!
-}

----------------------------------------------------------------------------------------
{-
g) Amerikai idő létrehozása jól

Mivel 12 órás formátumot használnak, ezért hozz létre egy okos konstruktort ustimeAM néven, amely ellenőrzi, hogy az órák az [1..12] intervallumban vannak (perc továbbra is [0..59]). 
Ha minden helyes, akkor ez egy délelőtti időt hozzon létre. Hibás érték esetén az error függvénnyel dobjunk hibát.

Analóg módon hozzunk létre egy ustimePM függvényt, ugyanazt csinálja, csak a végén délutáni időt hozzon létre.
-}


--ustimeAM :: Int -> Int -> USTime
--ustimePM :: Int -> Int -> USTime


--tesztek:
{-
ustimeAM 12 0 == AM 12 0
ustimeAM 10 23 == AM 10 23
ustimeAM 9 8 == AM 9 8
ustimePM 12 0 == PM 12 0
ustimePM 10 23 == PM 10 23
ustimePM 9 8 == PM 9 8
-}


----------------------------------------------------------------------------------------
{-
h) Amerikai idő megjelenítés

Példányosítsd a Show osztályt a USTime típusra.

Az óra és a perc elválasztása továbbra is egy ':'-tal történjen szóközök nélkül. 
Az AM vagy PM pedig előtte legyen pontosan egy szóközzel elválasztva az órától. 
Az időpontra a korábbi szabályok érvényesek.
-}


--tesztek:
{-
show (ustimeAM 12 1) == "AM 12:1" || show (ustimeAM 12 1) == "AM 12:01"
show (ustimeAM 6 2) == "AM 6:2" || show (ustimeAM 6 2) == "AM 06:02" || show (ustimeAM 6 2) == "AM 6:02"
show (ustimeAM 8 24) == "AM 8:24" || show (ustimeAM 8 24) == "AM 08:24"
show (ustimeAM 10 55) == "AM 10:55"
show (ustimePM 12 1) == "PM 12:1" || show (ustimePM 12 1) == "PM 12:01"
show (ustimePM 6 2) == "PM 6:2" || show (ustimePM 6 2) == "PM 06:02" || show (ustimePM 6 2) == "PM 6:02"
show (ustimePM 8 24) == "PM 8:24" || show (ustimePM 8 24) == "PM 08:24"
show (ustimePM 10 55) == "PM 10:55"
-}


----------------------------------------------------------------------------------------
{-
i) Amerikai idősorrend

Példányosítsd az Ord osztályt a USTime típusra.

Az amerikai óra a 0 órát és a delet is 12-vel jelöli. 
Tehát 0:11 náluk AM 12:11, 11:59 náluk AM 11:59, 12:00 náluk PM 12:00, tehát az órájuk abban a sorrendben megy, hogy 12,1,2,3,4,5,6,7,8,9,10,11.

Ez alapján kell megmondani, hogy melyik időpont van előbb, később, ugyanaz, stb.
-}


--tesztek:
{-
ustimeAM 12 0 < ustimeAM 12 1
ustimeAM 12 0 < ustimeAM 12 59
ustimeAM 12 1 < ustimeAM 1 0
ustimeAM 4 34 < ustimeAM 5 11
ustimeAM 4 34 < ustimeAM 11 49
ustimeAM 11 49 < ustimePM 12 0
ustimeAM 10 49 < ustimePM 11 51
ustimeAM 10 49 < ustimePM 1 4
ustimePM 12 41 > ustimePM 12 40
ustimePM 12 41 >= ustimePM 12 40
ustimePM 12 41 >= ustimePM 12 41
ustimePM 12 41 < ustimePM 1 30
ustimePM 2 25 < ustimePM 3 33
ustimePM 3 33 < ustimePM 11 59
-}


----------------------------------------------------------------------------------------
{-
j) 24 órára

Definiáld ustimeToTime függvényt, amely átalakítja a kapott amerikai időt a 24 órás időre.
-}

--ustimeToTime :: USTime -> Time


{-
ustimeToTime (ustimeAM 12 0) == t 0 0
ustimeToTime (ustimeAM 1 13) == t 1 13
ustimeToTime (ustimeAM 11 50) == t 11 50
ustimeToTime (ustimeAM 5 50) == t 5 50
ustimeToTime (ustimePM 12 50) == t 12 50
ustimeToTime (ustimePM 1 30) == t 13 30
ustimeToTime (ustimePM 11 30) == t 23 30
ustimeToTime (ustimePM 8 20) == t 20 20
-}


----------------------------------------------------------------------------------------
{-
k) Amerikainak is

Alakítsd át a 24 órás időt amerikaira.
-}

--timeToUSTime :: Time -> USTime


{-
timeToUSTime (t 10 0) == ustimeAM 10 0
timeToUSTime (t 0 34) == ustimeAM 12 34
timeToUSTime (t 12 0) == ustimePM 12 0
timeToUSTime (t 13 34) == ustimePM 1 34
timeToUSTime (t 23 54) == ustimePM 11 54
timeToUSTime (t 11 42) == ustimeAM 11 42
-}


----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
--Tesztesetek
{-

Maybe == Maybe
No == No
Yes == Yes
Maybe /= No
No /= Maybe
Yes /= No
No /= Yes
Yes /= Maybe
Maybe /= Yes
show Maybe == "Maybe"
show Yes == "Yes"
show No == "No"

No < Yes
Yes > Maybe
Maybe >= Maybe
No <= Maybe
not (Yes <= No)

triOr Yes Maybe == Yes
triAnd Yes Maybe == Maybe
triAnd No Maybe == No
incMonotonityTest 3 [1,2,3] == Yes
incMonotonityTest 3 [1,2,3,4] == Maybe
incMonotonityTest 3 [1,2,3,0] == Maybe
incMonotonityTest 4 [1,2,3,0] == No
incMonotonityTest 10 [1..] == Maybe
incMonotonityTest 10 ([1..7] ++ [7,6..]) == No

show Ace == "Ace"
show Albatross == "Albatross"
show Eagle == "Eagle"
show Birdie == "Birdie"
show Par == "Par"
show (Bogey 10) == "Bogey 10"
Bogey 2 == Bogey 2
Bogey 3 /= Ace
Ace /= Albatross

score 2 3 == Bogey 1
score 3 2 == Birdie
score 4 1 == Ace
score 103 1 == Ace
score 103 2 == Albatross
score 103 100 == Albatross
score 103 101 == Eagle
score 10 10 == Par
score 6 9 == Bogey 3

t 10 12 == T 10 12
t 23 59 == T 23 59

show (t 12 23) == "12:23"
show (t 1 1) == "1:1" || show (t 1 1) == "1:01" || show (t 1 1) == "01:01"
show (t 22 1) == "22:1" || show (t 22 1) == "22:01"
show (t 0 59) == "0:59" || show (t 0 59) == "00:59"

t 10 20 < t 10 21
t 0 0 < t 23 59
t 21 55 > t 21 30
t 22 0 > t 21 30

isBetween (t 12 23) (t 12 34) (t 12 45)
isBetween (t 23 59) (t 12 0) (t 0 0)
not (isBetween (t 20 0) (t 10 0) (t 16 0))

ustimeAM 12 0 == AM 12 0
ustimeAM 10 23 == AM 10 23
ustimeAM 9 8 == AM 9 8
ustimePM 12 0 == PM 12 0
ustimePM 10 23 == PM 10 23
ustimePM 9 8 == PM 9 8

show (ustimeAM 12 1) == "AM 12:1" || show (ustimeAM 12 1) == "AM 12:01"
show (ustimeAM 6 2) == "AM 6:2" || show (ustimeAM 6 2) == "AM 06:02" || show (ustimeAM 6 2) == "AM 6:02"
show (ustimeAM 8 24) == "AM 8:24" || show (ustimeAM 8 24) == "AM 08:24"
show (ustimeAM 10 55) == "AM 10:55"
show (ustimePM 12 1) == "PM 12:1" || show (ustimePM 12 1) == "PM 12:01"
show (ustimePM 6 2) == "PM 6:2" || show (ustimePM 6 2) == "PM 06:02" || show (ustimePM 6 2) == "PM 6:02"
show (ustimePM 8 24) == "PM 8:24" || show (ustimePM 8 24) == "PM 08:24"
show (ustimePM 10 55) == "PM 10:55"

ustimeAM 12 0 < ustimeAM 12 1
ustimeAM 12 0 < ustimeAM 12 59
ustimeAM 12 1 < ustimeAM 1 0
ustimeAM 4 34 < ustimeAM 5 11
ustimeAM 4 34 < ustimeAM 11 49
ustimeAM 11 49 < ustimePM 12 0
ustimeAM 10 49 < ustimePM 11 51
ustimeAM 10 49 < ustimePM 1 4
ustimePM 12 41 > ustimePM 12 40
ustimePM 12 41 >= ustimePM 12 40
ustimePM 12 41 >= ustimePM 12 41
ustimePM 12 41 < ustimePM 1 30
ustimePM 2 25 < ustimePM 3 33
ustimePM 3 33 < ustimePM 11 59

ustimeToTime (ustimeAM 12 0) == t 0 0
ustimeToTime (ustimeAM 1 13) == t 1 13
ustimeToTime (ustimeAM 11 50) == t 11 50
ustimeToTime (ustimeAM 5 50) == t 5 50
ustimeToTime (ustimePM 12 50) == t 12 50
ustimeToTime (ustimePM 1 30) == t 13 30
ustimeToTime (ustimePM 11 30) == t 23 30
ustimeToTime (ustimePM 8 20) == t 20 20

timeToUSTime (t 10 0) == ustimeAM 10 0
timeToUSTime (t 0 34) == ustimeAM 12 34
timeToUSTime (t 12 0) == ustimePM 12 0
timeToUSTime (t 13 34) == ustimePM 1 34
timeToUSTime (t 23 54) == ustimePM 11 54
timeToUSTime (t 11 42) == ustimeAM 11 42

-}