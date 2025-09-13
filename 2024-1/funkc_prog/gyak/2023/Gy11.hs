module Gy11 where 

{-
1. Feladat (1 pont)
Válasszuk ki az adott állítások közül a helyeset a Maybe-vel kapcsolatban:

a) Egy `Maybe String` típusú értéknek talán van értéke, talán nincs.
b) A `Maybe` egy adatkonstruktor.
-c) A `Maybe`-nek van típusparamétere. (típusa)
d) Ha egy `Maybe Int` típusú érték `Nothing`, akkor a függvény egy errorral elszáll.

2. Feladat (1 pont)
Az alábbiak közül melyik NEM konstruktor? 
a) `[]`  (,)
b) `Just`
c) `False`
-d) `Num`

-} 

data Wrap = Wrap Int (Int -> Int) -- deriving (Eq, Show)
instance Show Wrap where
    show (Wrap int f) = "Wrap " ++ show int ++ " operation" 
instance Eq Wrap where
    (Wrap int1 f1) == (Wrap int2 f2) = int1 == int2 && f1 int1 == f2 int2 

data Complex = C Int Int deriving Show
instance Eq Complex where
    (C r1 i1) == (C r2 i2) = r1 == r2 && i1 == i2

data Person a = Person a String Int
instance Show a => Show (Person a) where
    show (Person a name age) = name ++ " " ++ show age ++ " " ++ show a
instance Eq a => Eq (Person a) where
    (==) (Person a1 name1 age1) (Person a2 name2 age2) = a1 == a2 && name1 == name2 && age1 == age2

data Level = Low | Medium | High
instance Show Level where
    show Low = "l"
    show Medium = "m"
    show High = "h"
instance Eq Level where
    Low == Low = True
    Medium == Medium = True
    High == High = True
    _ == _ = False
instance Enum Level where
    toEnum :: Int -> Level
    toEnum level
        | level `mod` 3 == 1 = Low
        | level `mod` 3 == 2 = Medium
        | otherwise = High
    fromEnum :: Level -> Int
    fromEnum Low = 1
    fromEnum Medium = 2
    fromEnum High = 3

-- Definiáljunk egy saját listát
data List a = Cons a (List a) | Nil deriving (Eq, Show)

-- Definiáljunk egy saját rendezett párt
data Tuple a b = T a b
instance (Show a, Show b) => Show (Tuple a b) where
    show (T a b) = "(" ++ show a ++ "," ++ show b ++ ")"
infixl 5 ?
(?) :: a -> b -> Tuple a b
(?) a b = T a b 
{-
Jegyszerzéssel kapcsolatos tudnivalók: 
    - Jegyszerzés vizsgán történik 
    - Vizsgára mehet akinek: 
        1. Minden házi feladata "Elfogadva" állapotban van 
        2. A nagybeadandója "Elfogadva" állapotban van - a határidő éles 
        3. Legalább a megszerezhető pontok 50%-át elérte az óra eleji zh-kból (>=12.0) 
        4. Aki másolás miatt büntifeladatot kapott annak az is "Elfogadva" állapotban van 
            - elfogadás feltétele a (kb. 2 hetes) határidőn belüli feltöltés 
            - ugyanezen határidőn belül szóbeli megvédése a kódnak 
            - a védés kb 15-30 perc konzultáció idejében, vagy egyéni időpontban online 
    
    - Vizsga menete:
        - A vizsgára Neptunban kell majd jelentkezni, ha kint lesznek a vizsgaidőpontok
        - Vizsgázni a tárgyból a félévben kétszer lehet (indul keresztfélévben is)
        - Ha a két vizsgarész bármelyike nem sikerül, az egész vizsgát meg kell ismételni
        - A vizsga két részből áll:
            1. Elméleti vizsgarész 
                - 20 perc
                - 12 kérdés - 12 pont
                - Legtöbbször feleletválasztós feladatok, de ez nem jelenti hogy egyszerű
                - Fokozottan érdemes ismerni a könyvtári függvények típusait, alap működését
                    (minden olyan fv. amit '-vel definiáltunk)
                - Sikeres vizsga követelménye: 7 pont 
                - Az elméleti feladatsort valószínűleg kijavítjuk a gyakorlati rész megkezdése előtt
            2. Gyakorlati vizsgarész
                - 90 perc
                - Általában 8 feladat - 18 pont (6 * 2 pont, 2 * 3 pont) de ez változhat
                - Mint a nagybeadandónál, a tesztelő mutatni fogja a várható pontszámot
                - Sikeres vizsga követelménye: 7 pont
                - Legalább egy feladatban rekurziót KELL használni, lehet segédfv.-ben is
                - A feladatokon érdemes átfutni, előbb megcsinálni ami könnyebb
                - Nem forduló kód automatikusan 0 pont
                - A vizsgákat az oktatók minden esetben kézzel átnézik, hogy megfelelnek-e
                    (Itt inkább csak pontvesztés történhet, részpontok nincsenek)
    - Pontok:
        - Elméleti vizsgarész (12 pont)
        - Gyakorlati vizsgarész (18 pont)
        - Nagybeadandó opcionális része (5 pont)
        - Így összesen 35 pont

    - Osztályzatok:
        (1) 0  - 17.999
        (2) 18 - 21.999
        (3) 22 - 25.999
        (4) 26 - 29.999
        (5) 30 - 35
-}

-- Még nem végleges vizsgaidőpontok:
-- december 22. 12:00-15:00 (péntek)
-- január 5. 12:00-15:00 (péntek)
-- január 12. 12:00-15:00 (péntek)
-- január 16. 12:00-15:00 (kedd)
-- január 25. 12:00-15:00 (csütörtök)








