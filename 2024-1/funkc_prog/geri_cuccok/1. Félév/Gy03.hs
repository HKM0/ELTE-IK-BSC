module Gy03 where

-- fromIntegral :: (Integral a, Num b) => a -> b
--      megkötés   ^^^^^^^^^^^^^^^^^^^    ^----^-- típusváltozók
-- Integral, Num is típusosztályok
-- realToFrac :: (Real a, Fractional b) => a -> b

-- fromIntegral : Egész számokról tud átalakítani tetszőleges számra.
-- realToFrac: "Valós" számokról törtszámokra tud képezni.
g1 :: Int -> Int
g1 x = x + 1
g1 x = x * 2
-- ...

g :: a -> a
g x = x
-- g 1 = 2

----------------

-- Új típus:
-- Listák -> egyirányú láncolt lista
-- [] -- üres lista
-- (:) :: a -> [a] -> [a]; Hozzáveszi az elemet a kapott lista elé.
-- 1 : 2 : [] == [1,2]

null' :: [a] -> Bool
null' [] = True
null1 _ = False

-- parametrikus polimorfizmus: A függvény működése nem függ a tartalmazott elemektől.
-- gyakorlatban: Függvény típusában a típusváltozókon nincs megkötés.
-- ad-hoc polimorfizmus: a függvény működése függ a bemeneti érték típusától (pl.: 1 == 2)
-- gyakorlatban: Függvény típusában a típusváltozón van megkötés.

-- Num a => a -> b -> a 

hasAtLeastOne :: [a] -> Bool
hasAtLeastOne (x:xs) = True
hasAtLeastOne _ = False

{- Exactly3Elements :: [a] -> Bool
Exactly3Elements [_,_,_] = True
Exactly3Elements (_:_:_:[]) = True
Exactly3Elements _ = False -}

-- NEM LEHET ILYET: [1, False, 'a']
-- A listában azonos típusú elemek kell, hogy legyenek.

-- Homogén adatszerkezet: Az adatszerkezetben csak és kizárolag azonos típusú elemek szerepelhetnek. PL.: lista
-- Heterogén adatszerkezet: Az adatszerkezetben lehetnek különböző típusú elemek is. (pl.: rendezett n-es)

h :: [[a]] -> Int
h [_,[],_] = 0
h _ = 1

j :: [(Integer,Char,c)] -> Int
j [(1,'a', x),_,(_,'b',_)] = 0
j _ = 1

------------------------
-- Lista .. kifejezések:
-- [1..10] = [1,2,3,4,5,6,7,8,9,10]
-- [1,3..10] = [1,3,5,7,9]
-- [1..] -- Végtelen 1-esével növekedő lista
-- [2,4] -- végtelen 2-esével növekedő lista
-- Listagenerátor: (List comprehension)

squaresTo100 :: [Integer]
squaresTo100 = [x^2 | x <- [0..10] ]

sums' :: [(Integer, Integer)]
sums' = [ (x,y) | x <- [1..3], y <- [100..103]]

evens :: [Integer]
evens = [x | x <- [0..10],even x]