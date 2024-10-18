{- Mintaillesztés

A feladatokban tessék használni mintaillesztést. Elágazást, if-then-else-et nem szabad használni, mert nem tanultuk és nincs is rájuk szükség.
0. Modul -}

module Hazi3 where
import Data.List
{- Definiálj egy modult Hazi3 néven!
1a. Pontosan egy elemű

Írj egy olyan függvényt isSingleton néven, amely megállapítja egy listáról, hogy pontosan 1 elemű-e. -}

isSingleton :: [a] -> Bool
isSingleton [_] = True
isSingleton _ = False

{- 1b. Kettő vagy legalább négy elemű

Írj egy olyan függvényt exactly2OrAtLeast4 néven, amely megállapítja egy listáról, hogy pontosan 2 vagy legalább 4 elemű-e. -}
exactly2OrAtLeast4 :: [a] -> Bool
exactly2OrAtLeast4 [a,b] = True
exactly2OrAtLeast4 (a:b:c:d:xs) = True
exactly2OrAtLeast4 _ = False

{-2. Első két elem

Definiáld a firstTwoElements függvényt, amely visszaadja egy lista első két elemét listaként, ha van legalább két elem. Ha nincs két elem, akkor adj vissza üres listát.
-}

firstTwoElements :: [a] -> [a]
firstTwoElements (a:b:xs) = (a:b:[])
firstTwoElements _ = []

add1 :: Num a => [a] -> [a]
add1 x = [a+1 | a <- x]

{- 3. Harmadik nélkül

Definiáld a withoutThird függvényt, amely egy legalább 3 elemű listából kihagyja a harmadik elemet. Ha listában nincs 3 elem, akkor amúgy sincs benne a harmadik elem, így az eredmény csak a paraméterül kapott lista legyen.-}

withoutThird :: [a] -> [a]
withoutThird (a:b:c:xs) = a:b:xs
withoutThird (a:b:xs) = [a,b]
withoutThird [a] = [a]
withoutThird _ = []

{- 4. Egy elemű listák (*)

Definiáld azt a függvényt, amely egy listából megtartja a pontosan egy elemű listákat! A megoldásban használj listagenerátort!-}

onlySingletons :: [[a]] -> [[a]]
onlySingletons a = [x | x <- a, isSingleton x]
{- 5. Szöveg tömörítése (*)

Definiáld a compress függvényt, amely összetömörít egy szöveget úgy, hogy az egymás mellett lévő azonos karaktereket megszámolja és visszaadja rendezett párként a számolt karaktert és annak a darabszámát. A megoldáshoz használj listagenerátort!

Segítség: Használjuk a group :: Eq a => [a] -> [[a]] függvényt a Data.List modulból (ezt ugye importálni kell), amely függvény az egymás melletti azonos elemet csoportosítja egybe. -}

compress :: (Eq a, Num b) => [a] -> [(a,b)]
compress a = [(head x, genericLength x) | x <- group a]
{- 6. Szöveg visszaállítása (*)

Egy tömörített szöveg úgy van megadva, hogy listában fel van sorolva az adott karakter és mellette hogy hány darab van az adott karakterből. Írjuk meg azt a függvényt, ami visszaállítja a tömörített formából az eredeti szöveget! A megoldáshoz használj listagenerátort!-}

decompress :: Integral b => [(a,b)] -> [a]
decompress x = [y | (a,b) <- x, c <- [1..b], y <- [a]] 
{-(*) Ehhez a két feladathoz listagenerátorok szükségesek, ameddig gyakorlaton nem jutottunk el
Tesztesetek-}

{-
isSingleton [1]
isSingleton "x"
not (isSingleton [])
not (isSingleton ['x','a'])
not (isSingleton [1..])
not (isSingleton [5,4,6])
not (isSingleton [6,5])
exactly2OrAtLeast4 "alma"
exactly2OrAtLeast4 "te"
exactly2OrAtLeast4 [1,10]
exactly2OrAtLeast4 [1.5,9.25]
exactly2OrAtLeast4 [1..]
not (exactly2OrAtLeast4 [])
not (exactly2OrAtLeast4 [1])
not (exactly2OrAtLeast4 [1,2,3])
not (exactly2OrAtLeast4 "nem")
not (exactly2OrAtLeast4 "a")
firstTwoElements [1,2] == [1,2]
firstTwoElements "alma" == "al"
firstTwoElements [20,9,8,7,6,5,4,3,2,1,0] == [20,9]
firstTwoElements [2,9,5,-3,-7,6,10,2,2,3,3] == [2,9]
firstTwoElements [10..] == [10,11]
firstTwoElements [1.5] == []
firstTwoElements [2] == []
firstTwoElements "a" == []
firstTwoElements ([] :: [Integer]) == []
withoutThird [1,2] == [1,2]
withoutThird [1,2,3] == [1,2]
withoutThird "alma" == "ala"
withoutThird [20,9,8,7,6,5,4,3,2,1,0] == [20,9,7,6,5,4,3,2,1,0]
withoutThird [2,9,5,-3,-7,6,10,2,2,3,3] == [2,9,-3,-7,6,10,2,2,3,3]
take 5 (withoutThird [10..]) == [10,11,13,14,15]
withoutThird [1.5] == [1.5]
withoutThird [2] == [2]
withoutThird "a" == "a"
withoutThird ([] :: [Int]) == []
onlySingletons [[],[1],[1,2],[1,2,3],[2],[2,3],[3]] == [[1],[2],[3]]
onlySingletons [[1..],[],[1..10]] == []
onlySingletons ["a","b","c","d","e","f"] == ["a","b","c","d","e","f"]
compress [] == []
compress "almafa" == [('a',1),('l',1),('m',1),('a',1),('f',1),('a',1)]
compress "compress" == [('c',1),('o',1),('m',1),('p',1),('r',1),('e',1),('s',2)]
compress "ssssszzzzzziiiillvvaaaaaaaa" == [('s',5),('z',6),('i',4),('l',2),('v',2),('a',8)]
compress [1,1,1,3,2,2,4,4,4,4] == [(1,3),(3,1),(2,2),(4,4)]
compress [1,1,1,3,2,2,4,4,3,4,4] == [(1,3),(3,1),(2,2),(4,2),(3,1),(4,2)]
decompress [] == ""
decompress [('k',1),('a',1),('t',2)] == "katt"
decompress [('A',3),('b',2),('k',5),('D',3)] == "AAAbbkkkkkDDD"
decompress [(1,1),(2,2),(3,3),(4,4)] == [1,2,2,3,3,3,4,4,4,4]
-}