module Hazi4 where
import Data.List

{-
1. Szép számok
Adjuk meg azon pozitív x számokat csökkenő sorrendben, amelyek 1000-nél nem nagyobbak, ötös maradékuk 3, háromszorosuk hetes maradéka 2!
-}

numbers :: [Int]
numbers = [x | x <- [1000,999..1], mod x 5 == 3, mod (3*x) 7 == 2]


{-
2. Jelszó
Definiáld azt a függvényt, ami egy karakterlánc minden karakterét a * karakterre cseréli ki.
-}
password :: [Char] -> [Char]
password [] = []
password (_:x) = '*' : password x


{-
3. Csökkenő párok
Add meg azt a függvényt, amely egy rendezett párokat tartalmazó listából kiválogatja azokat az elemeket, 
ahol a pár első eleme kisebb, mint a második eleme!
-}

filterIncPairs :: Ord a => [(a,a)] -> [(a,a)]
filterIncPairs lista = [(x, y) | (x, y) <- lista, x<y]

{-
4. Egy elemű listák
Definiáld azt a függvényt, amely egy listából megtartja a pontosan egy elemű listákat! A megoldásban használj listagenerátort!
-}
onlySingletons :: [[a]] -> [[a]]
onlySingletons lista = [x | x@[_] <- lista]

{-
5. Szöveg tömörítése

Definiáld a compress függvényt, amely összetömörít egy szöveget úgy, hogy 
az egymás mellett lévő azonos karaktereket megszámolja és visszaadja rendezett párként a számolt karaktert és annak a darabszámát. 
A megoldáshoz használj listagenerátort!

Segítség: Használjuk a group :: Eq a => [a] -> [[a]] függvényt a Data.List modulból (ezt ugye importálni kell), 
amely függvény az egymás melletti azonos elemet csoportosítja egybe.
-}
compress :: (Eq a, Num b) => [a] -> [(a,b)]
compress szo = [(head x, genericLength x) | x <- group szo]

{-
6. Szöveg visszaállítása
Egy tömörített szöveg úgy van megadva, hogy listában fel van sorolva az adott karakter és mellette hogy hány darab van az adott karakterből. 
Írjuk meg azt a függvényt, ami visszaállítja a tömörített formából az eredeti szöveget! A megoldáshoz használj listagenerátort!
-}
decompress :: Integral b => [(a,b)] -> [a]
decompress lista = [x | (a,b) <- lista, z <- [1..b], x <- [a]]

{-
numbers == [983,948,913,878,843,808,773,738,703,668,633,598,563,528,493,458,423,388,353,318,283,248,213,178,143,108,73,38,3]
password "akacfa2" == "*******"    
password "hunter1234" == "**********" 
password ['a'] == ['*']
password [] == []
filterIncPairs [] == []
filterIncPairs [(2,2)] == []
filterIncPairs [(1,2), (2,3)] == [(1,2), (2,3)]
filterIncPairs [(1,2), (2,2), (2,1), (2,3)] == [(1,2), (2,3)]
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