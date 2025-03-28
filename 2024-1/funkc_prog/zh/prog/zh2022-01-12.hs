module Zh20220112 where
import Data.Char
import Data.Maybe
--skeleton zh2022-01-12 (model-z12a)

{-
Feladatok

Három osztás összege (1 pont)
Adjuk meg azt a függvényt, ami három rendezett párban kapott számokat elosztja,
majd ezek eredményeit összeadja! Az osztásnál a pár első elemét osztjuk a másodikkal és
egész részek összegét adjuk vissza Just konstruktorba csomagolva.
A függvény eredménye legyen Nothing, ha nullával osztanánk!
-}

threeDivs:: Integral a => (a,a) -> (a,a) -> (a,a) -> Maybe a
threeDivs = undefined

{-
threeDivs (2,1) (2,1) (2,1) == Just 6
threeDivs (1,1) (1,1) (1,1) == Just 3
threeDivs (9,3) (12,4) (27,9) == Just 9
threeDivs (1,2) (3,6) (6,6) == Just 1
threeDivs (2,1) (2,0) (2,1) == Nothing
threeDivs (2,1) (2,2) (2,0) == Nothing
threeDivs (2,0) (2,2) (2,12) == Nothing
-}

-------------------------------------------------------------------------------

{-
Különbségek (1 pont)
Definiáljuk azt a függvényt, amely rendezett párosokat tartalmazó listában megszámolja, hogy hányszor
nem egyezik meg a pár két értéke! A listáról feltehető, hogy véges!
-}

howManyDifferences:: Eq a => [(a,a)] -> Int
howManyDifferences = undefined

{-
howManyDifferences [] == 0
howManyDifferences [(1,2)] == 1
howManyDifferences [('a','b'), ('c','d')] == 2
howManyDifferences [(1,1),(2,2)] == 0
howManyDifferences (take 60 $ zip [1..] [2..] )== 60
-}

-------------------------------------------------------------------------------

{-
Termékkód (1 pont)
Egy raktárban a tárolt termékeket kóddal látják el, ami n darab számból és ezt követően m darab
nagybetűből áll (n és m nemnegatív értékek). Készítsünk függvényt, amely egy ilyen formátum
termékkódnak megadja a számokból álló részét, azaz az elejét! Feltehető, hogy a paraméterül kapott
érték a leírásnak megfelel.

Segítség: Használhatjuk a Data.Char modul isDigit függvényét!
-}

getDigitsFromCode :: String -> String
getDigitsFromCode = undefined

{-
getDigitsFromCode "4235AAA" == "4235"
getDigitsFromCode "42353423546" == "42353423546"
getDigitsFromCode "AAABBBCCC" == ""
getDigitsFromCode "213425465453231AAABBBCCC" == "213425465453231"
getDigitsFromCode ("213425465453231" ++ cycle "ABCD") == "213425465453231"
-}

-------------------------------------------------------------------------------

{-
Háromszögszámok (2 pont)
Definiáld az isTriangularNumber függvényt, ami egy számról eldönti hogy háromszögszám-e!
Háromszögszámnak azokat a számokat nevezzük, amik felírhatók az első n pozitív egész szám összegeként,
pl.: 1 + 2 + 3 + 4 + 5 = 15 az ötödik háromszögszám.
-}

isTriangularNumber :: Integral a => a -> Bool
isTriangularNumber = undefined

{-
isTriangularNumber 1
isTriangularNumber 15
not $ isTriangularNumber (-2)
not $ isTriangularNumber 0
not $ isTriangularNumber 32
filter isTriangularNumber [1..] !! 50 == 1326
filter isTriangularNumber [1..50] == [1,3,6,10,15,21,28,36,45]
-}

-------------------------------------------------------------------------------

{-
Legkisebb lista (2 pont)
Készítsd el a smallestInSize névű függvényt, amely három listát kap paraméterül és megadja hogy a három lista
közül, az elemszámokat tekintve, melyik a legkisebb! Az eredményt egy Just konstruktorba csomagolva adja vissza
. Amennyiben nem adható meg egyértelműen a legkisebb elemszámú lista sorszáma (azaz azonos elemszámú), az 
eredmény legyen Nothing. A sorszámozást 1-től kezdjük. Feltehető, hogy a három lista közül legalább egy véges.
-}

smallestInSize :: [a] -> [b] -> [c] -> Maybe Int
smallestInSize = undefined
-- a teszteléshez szükséges a Data.Maybe modul importálása

{-
smallestInSize [] [] [] == Nothing
smallestInSize [1] [3] [4] == Nothing
smallestInSize [] [3] [] == Nothing
smallestInSize [1..10] [4,6..] [10,9..1] == Nothing
smallestInSize [1] [3] [] == Just 3
smallestInSize [5] [] [5] == Just 2
smallestInSize [] [3] [3] == Just 1
smallestInSize [] [1,2] [1..] == Just 1
smallestInSize [213,231,1] [1,2] [1..] == Just 2
smallestInSize [12,3,1] [1,1,2,2] [1..] == Just 1
smallestInSize [21,21,21] [1..] [11,4,2,1] == Just 1
smallestInSize [21..] ["14","3"] ["11","4","2","1"] == Just 2
smallestInSize [21..] "alma" [11..] == Just 2
smallestInSize [even, odd, (== 0)] [(+i) | i <- [1..]] (repeat null) == Just 1
smallestInSize [1..] [2,6..] [10..1000] == Just 3
length (filter isNothing [smallestInSize [1..i] [1..j] [1..k] | i <- [1..5], j <- [1..5], k <- [1..5]]) == 35
length (filter isJust [smallestInSize [1..i] [1..j] [1..k] | i <- [1..5], j <- [1..5], k <- [1..5]]) == 90
-}

-------------------------------------------------------------------------------

{-
Szavak tükrözése (2 pont)
Add meg azt a függvényt, amely egy szöveg megadott sorszámú szavait megfordítja!
A sorszámozás 1-től kezdődik. Feltehető, hogy a sorszámokat tartalmazó listában
növekvő sorrendben adottak az értékek.
-}

reverseWords :: Integral a => String -> [a] -> String
reverseWords = undefined

{-
reverseWords "" [] == ""
reverseWords "" [1,5] == ""
reverseWords "Haskell" [1] == "lleksaH"
reverseWords "Haskell" [2] == "Haskell"
reverseWords "Haskell" [1,2] == "lleksaH"
reverseWords "Haskell is" [2] == "Haskell si"
reverseWords "Haskell is" [2,5] == "Haskell si"
reverseWords "Haskell is good" [1,3] == "lleksaH is doog"
reverseWords "Haskell is a good language" [2,4,5] == "Haskell si a doog egaugnal"
reverseWords "Haskell is a good language" [2,4..] == "Haskell si a doog language"
reverseWords "Nem minden tarka fajta szarka farka tarka csak a tarka farku szarkafajta szarka farka tarka." [2,4..] == "Nem nednim tarka atjaf szarka akraf tarka kasc a akrat farku atjafakrazs szarka akraf tarka."
reverseWords "Nem minden tarka fajta szarka farka tarka csak a tarka farku szarkafajta szarka farka tarka." [1,5..] == "meN minden tarka fajta akrazs farka tarka csak a tarka farku szarkafajta akrazs farka tarka."
-}

-------------------------------------------------------------------------------

{-
Konverzió (2 pont)
A snake_case és a camelCase a programozásban használt konvenciók változók nevére. Előbbiben a különálló
szavakat '_' karakerrel kötjük össze, ebben csak kisbetűket használunk (pl.: snake_case_valtozonev),
utóbbiban a különálló szavakat egybe írjuk, de minden új szó kezdetét nagybetűvel írjuk kivéve az elsőt
(pl.: mindenUjSzoNagybetuvel). Írjunk egy függvényt, amely camelCase-ből snake_case-be konvertál
változóneveket! Feltételezhető, hogy a bemenet megfelelő és véges lesz.
-}

camelToSnake :: String -> String
camelToSnake = undefined

{-
camelToSnake "" == ""
camelToSnake "a" == "a"
camelToSnake "apple" == "apple"
camelToSnake "camelToSnake" == "camel_to_snake"
camelToSnake "snake2Camel" == "snake2_camel"
camelToSnake "iAmInCamelCase" == "i_am_in_camel_case"
camelToSnake "nemMindenTarkaFajtaSzarkaFarkaTarkaCsakATarkaFarkuSzarkafajtaSzarkaFarkaTarka" == "nem_minden_tarka_fajta_szarka_farka_tarka_csak_a_tarka_farku_szarkafajta_szarka_farka_tarka"
-}

-------------------------------------------------------------------------------

{-
sumMaybe (2 pont)
Definiáld a sumMaybe függvényt, amely kap egy Maybe értékeket tartalmazó listát és visszaadja a listában található Just konstruktorok által csomagolt értékek abszolútértékének összegét! A listáról feltehető, hogy véges!
-}

sumMaybe :: Num a => [Maybe a] -> a
sumMaybe = undefined

{-
sumMaybe [] == 0
sumMaybe [Nothing] == 0
sumMaybe [Just 1, Just 2, Just 3] == 6
sumMaybe [Just 1, Nothing, Just (-3)] == 4
sumMaybe [ if even i then Just i else Nothing | i <- [1..20]] == 110
sumMaybe [Just 2, Just (-3), Nothing, Just 0, Just (-10), Just (-9), Nothing] == 24
sumMaybe [Nothing, Nothing, Nothing, Nothing, Nothing, Nothing, Nothing, Just (-1)] == 1
sumMaybe (map Just [2,34,4,1,1,-54,2,0,-123,34]) == 255
-}

-------------------------------------------------------------------------------

{-
Nagyító függvényalkalmazás (2 pont)
Adjuk meg azt a függvényt, amely egy függvényt alkalmaz egy lista minden elemére, de csak akkor,
ha az az adott elem értékét megnöveli!
-}

applyIfIncreases :: Ord a => (a -> a) -> [a] -> [a]
applyIfIncreases = undefined

{-
applyIfIncreases (*2) [] == []
applyIfIncreases (*2) [1,2,-1,-2,3] == [2,4,-1,-2,6]
applyIfIncreases abs [1,2,-1,-2,3] == [1,2,1,2,3]
applyIfIncreases (\x -> x - 1) [-5..5] == [-5,-4,-3,-2,-1,0,1,2,3,4,5]
applyIfIncreases not [True,False,True,False,False,False,True,False] == [True,True,True,True,True,True,True,True]
take 20 (applyIfIncreases not [even i | i <- [0..]]) == [True,True,True,True,True,True,True,True,True,True,True,True,True,True,True,True,True,True,True,True]
take 20 (applyIfIncreases (\i -> if even i then i+1 else i-1) [0..]) == [1,1,3,3,5,5,7,7,9,9,11,11,13,13,15,15,17,17,19,19]
-}

-------------------------------------------------------------------------------

{-
Elemek gyakorisága (2 pont)
Adjuk meg azt a függvényt, amely megadja az elemek gyakoriságát egy listán belül! Az eredmény az első előfordulás szerinti sorrendben tartalmazza az elemek összesítését. A listáról feltehető, hogy véges!
-}

elemFreqByFirstOcc :: Eq a => [a] -> [(a, Int)]
elemFreqByFirstOcc = undefined

{-
elemFreqByFirstOcc [] == []
elemFreqByFirstOcc "abcd" == [('a',1),('b',1),('c',1),('d',1)]
elemFreqByFirstOcc "dcba" == [('d',1),('c',1),('b',1),('a',1)]
elemFreqByFirstOcc "adbcba" == [('a',2),('d',1),('b',2),('c',1)]
elemFreqByFirstOcc "Nem minden tarka fajta szarka farka tarka,csak a tarka farku szarkafajta szarka farka tarka." == [('N',1),('e',2),('m',2),(' ',13),('i',1),('n',2),('d',1),('t',6),('a',25),('r',10),('k',11),('f',5),('j',2),('s',4),('z',3),(',',1),('c',1),('u',1),('.',1)]
elemFreqByFirstOcc [1,2,1,3,3,2,1,4,3,2,1,1,1,4,6,5] == [(1,6),(2,3),(3,3),(4,2),(6,1),(5,1)]
-}

-------------------------------------------------------------------------------

{-
Parkolóház
A feladatban egy egyszerű parkolóház reprezentációt fogunk megadni. Ehhez a következő szinonimákat fogjuk használni:
-}

type RegNum = String -- rendszám
type Level = Int -- emelet
type SpotNum = Int -- parklóhely sorszáma

{-
Adattípusok definiálása (1 pont)
Definiáld a Status algebrai adatszerkezetet, amely egy parkolóhely állapotát írja le. A parkolóhely
állapotát két konstruktorral írjuk le, ezek a következők:

Free: paraméter nélküli konstruktor, amely azt jelenti hogy a parkolóhely szabad,
Occupied: a konstruktornak egy szöveg paramétere van (RegNum), amely a pakolóhelyen álló autó rendszámát adja meg.
Kérjünk a fordítótól automatikus példányosítást a Show és Eq típusosztályokra!

Definiáld a ParkingSpace adatszerkezetet, amely a parkolóhelyet reprezentálja!
Egy parkolóhelyet a PS konstruktorral tudunk megadni, amely három paraméterrel rendelkezik:

első paramétere az emeletet adja meg (Level), ahol a parkolóhely található,
második paramétere a parkolóhely sorszámát adja meg (SpotNum),
harmadik paramétere pedig a státusza (Status).
Kérjünk a fordítótól automatikus példányosítást a Show és Eq típusosztályokra!

A parkolóházat a parkolóhelyek listájával adjuk meg, amely a következő szinoníma tartozik:
-}

--type ParkingLot = [ParkingSpace]


-------------------------------------------------------------------------------

{-
Szabad helyek (1 pont)
Adjuk meg azt a függvényt, amely segítségével le tudjuk kérdezni, hogy a parkolóház egy tetszőleges emeletén
hány szabad hely van!
-}

--freeSpaces :: ParkingLot -> Int -> Int
--freeSpaces = undefined

{-
freeSpaces [] (-1) == 0
freeSpaces [PS 0 1 Free, PS 0 2 Free, PS 0 3 Free] 0 == 3
freeSpaces [PS (-1) 1 Free, PS 0 2 Free, PS (-1) 3 Free] (-1) == 2
freeSpaces [PS 0 1 Free, PS 0 2 (Occupied "ABC123"), PS 0 3 Free, PS 1 0 (Occupied "CBA321"), PS 1 2 Free, PS 1 3 (Occupied "BCD234")] 0 == 2
freeSpaces [PS 0 1 Free, PS 0 2 (Occupied "ABC123"), PS 0 3 Free, PS 1 0 (Occupied "CBA321"), PS 1 2 Free, PS 1 3 (Occupied "BCD234")] 1 == 1
freeSpaces [PS i j (if even (i+j) then Free else (Occupied ("ABC0" ++ show i ++ show j))) | i <- [-2..1], j <- [1..5]] 0 == 2
freeSpaces [PS i j (if even (i+j) then Free else (Occupied ("ABC0" ++ show i ++ show j))) | i <- [-2..1], j <- [1..5]] (-2) == 2
freeSpaces [PS i j (if even (i+j) then Free else (Occupied ("ABC0" ++ show i ++ show j))) | i <- [-2..1], j <- [1..5]] (-1) == 3
-}

-------------------------------------------------------------------------------

{-
Autó keresése (2 pont)
A parkolóházban lehetőség van az információs pultnál segítséget kérni az autó pozíciójáról. Adjuk meg azt a
függvényt, amely rendszám alapján megkeresi, hogy az autó melyik emeleten és parkolóhelyen található!
Amennyiben a keresett rendszám megtalálható a nyilvántartásban, úgy egy Just konstruktorba csomagolva adjuk
meg ezt, ellenkező esetben az eredmény Nothing legyen. A parkoló véges! Ha véletlenül több azonos rendszámú
autó van a parkolóban, akkor adjuk vissza a "legmélyebben" lévőt.
-}

--findCar :: ParkingLot -> RegNum -> Maybe (Level, SpotNum)
--findCar = undefined

{-
findCar [] "ABC123" == Nothing
findCar [PS i j (if even (i+j) then Free else (Occupied ("ABC0" ++ show i ++ show j))) | i <- [-2..1], j <- [1..5]] "ABC012" == Just (1,2)
findCar [PS i j (if even (i+j) then Free else (Occupied ("ABC0" ++ show i ++ show j))) | i <- [-2..1], j <- [1..5]] "ABC0-12" == Just (-1,2)
findCar [PS i j (if even (i+j) then Free else (Occupied ("ABC0" ++ show j ++ show i))) | i <- [-2..1], j <- [1..5]] "ABC02-1" == Just (-1,2)
findCar [PS i j (if even (i+j) then Free else (Occupied ("ABC0" ++ show (2*abs j + 1) ++ show (2*abs i-1)))) | i <- [-2..1], j <- [1..5]] "ABC02-1" == Nothing
findCar [PS i j (if even (i+j) then Free else (Occupied ("ABC0" ++ show (2*abs j + 1) ++ show (2*abs i-1)))) | i <- [-2..1], j <- [1..5]] "ABC091" == Just (-1,4)
findCar [PS i j (if even (i+j) then Free else (Occupied ("ABC0" ++ show (2*abs j + 1) ++ show (2*abs i-1)))) | i <- [-2..1], j <- [1..5]] "ABC02-2" == Nothing
findCar [PS i j (if even (i+j) then Free else (Occupied ("ABC0" ++ show (2*abs j + 1) ++ show (2*abs i-1)))) | i <- [-2..1], j <- [1..5]] "ABC03-2" == Nothing
-}

-------------------------------------------------------------------------------

{-
Kiértékelés (3 pont)
Adott egy tetszőlegesen hosszú, pozitív egész tagokból álló összeg szövegként. A szövegben csak számok és a
'+' karakter szerepel, és feltehetjük, hogy értelmesen: '+' csak számok között szerepel, egy szám sem kezdődik
0-val, a szöveg elején és végén (amennyiben az nem üres) szám van. Számítsd ki az összeget! Természetesen ez a
szöveg véges!
-}

eval :: String -> Integer
eval = undefined

--Segítség: szöveg számmá alakítására segítséget nyújt a read függvény (link), mely nem igényel importálást.



{-
eval "" == 0
eval "3+7" == 10
eval "10+14" == 24
eval "2+39+114+81" == 236
eval "2+39+114+81+213+243+123" == 815
-}

-------------------------------------------------------------------------------

{-
Lista átalakítás (3 pont)

Definiáld a dropOrInsert függvényt, amely paraméterül kap két listát. A függvény végig megy a második lista elemein
és amennyiben az adott elem megtalálható az első listában, akkor eldobja belőle annak első előfordulását,
viszont ha nem található meg benne, akkor beszúrja az első lista végére új elemként. Mindkét listáról feltehető,
hogy végesek.

Megjegyzés: Amennyiben egy elem többször is érintett a módosításban, előfordulhat hogy hozzáadjuk a listához, majd
következő körben eltávolítjuk ugyanazt.
-}

dropOrInsert :: Eq a => [a] -> [a] -> [a]
dropOrInsert = undefined

{-
dropOrInsert [] [2] == [2]
dropOrInsert [] [2,2] == []
dropOrInsert [] [2,2,2] == [2]
dropOrInsert [] [2,2,2,2] == []
dropOrInsert [3,2] [2,2,2,2] == [3,2]
dropOrInsert [] ['a','b','c'] == ['a','b','c']
dropOrInsert ['a','b','c'] [] == ['a','b','c']
dropOrInsert [5,6,7,8,1,2,3] [1,4,9] == [5,6,7,8,2,3,4,9]
dropOrInsert [10,45,23] [45,20,23,45] == [10,20,45]
dropOrInsert [3,2,1,5,2,6,1] [1,2,6,2] == [3,5,1]
dropOrInsert [3,2,1,5,6,1] [1,2,6,2] == [3,5,1,2]
dropOrInsert [3,2,1,5,6,1] [1,2,6,2,2] == [3,5,1]
-}

-------------------------------------------------------------------------------

{-
Mozgóátlag (3 pont)

Adjuk meg azt a függvényt, amely egy m értéket és egy sorozatot vár paraméterül, és az első elemtől kezdve minden
elemre kiszámolja az adott elem és az őt követő m-1 elem átlagát egy Just konstruktorba csomagolva! A sorozat lehet
végtelen hosszúságú is.

m-nél rövidebb ablakok átlagát ne számoljuk ki, azaz amennyiben elérünk egy olyan elemet, melyet nem követ legalább
m-1 elem, az eredmény legyen Nothing. Amennyiben m nem pozitív szám, adjunk vissza üres listát.
-}

movingAvg :: Int -> [Double] -> [Maybe Double]
movingAvg = undefined

{-
movingAvg 1 [5] == [Just (5/1)]
movingAvg 2 [1, 5] == [Just ((1+5)/2), Nothing]
movingAvg 5 [1, 2, 3, 4, 5] == [Just ((1+2+3+4+5)/5), Nothing, Nothing, Nothing, Nothing]
movingAvg 1 [1,5] == [Just (1/1), Just (5/1)]
movingAvg 2 [1,5,1] == [Just ((1+5)/2), Just ((5+1)/2), Nothing]
movingAvg 3 [1,5,3,1,5] == [Just ((1+5+3)/3), Just ((5+3+1)/3), Just ((3+1+5)/3), Nothing, Nothing]
movingAvg 120 [] == []
movingAvg (-1) (repeat 120) == []
movingAvg 0 (repeat 120) == []
movingAvg 1 [1..25] == map Just [1..25]
movingAvg 25 [1..25] == [Just 13.0] ++ replicate 24 Nothing
movingAvg 2 [ fromIntegral (i `mod` 2) | i <- [1..25]] == map Just (replicate 24 0.5) ++ [Nothing]
take 25 (movingAvg 1 (repeat 1)) == map Just (replicate 25 1)
take 10 (movingAvg 4 [2,4..]) == map Just [5,7..23]
-}
