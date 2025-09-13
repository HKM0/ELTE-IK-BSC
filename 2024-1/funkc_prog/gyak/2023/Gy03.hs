module Gy03 where 
import Data.List 



{-

1. feladat
Homogén vagy heterogén az alábbi rendezett pár? (0,5 pont)
         (4 :: Int, 1) 
- heterogén
Változtass a fenti rendezett pár pontosan egy elemén hogy az 
ellenkezője legyen! (homogén <-> heterogén)  (0,5 pont)


2. feladat
Adott az alábbi függvény:
-}
modifiedSquare :: (Floating a, Eq a) => a -> a 
modifiedSquare 1 = 2
modifiedSquare x = x * x 
modifiedSquare 1 = 4
{-
Mennyi lesz a modifiedSquare 1 értéke? (1 pont)

-}
--------------------------------------------------------------------------------------


-- ad-hoc polimorfizmus: függ a típustól a működés
--plus' :: Num a => a -> a -> a
-- parametrikus polimorfizmus: nem függ a típustól a működés
--id' :: a -> a

-- Lista - nem tömb 
-- egyirányú láncolt lista 
-- [1,2,3], homogén [1,2,'3'] <- ilyen nincs

-- lista a rendezett n-essel szemben homogén adatszerkezet -> azaz legfeljebb csak 
-- 1 Típus alá tartozó elemet tartalmazhat

-- (1 : 2 : 3 : [])

-- Függvények: (:) - null - (++) - !! - length - genericLength
-- Listákon ugyanúgy tudunk mintát illeszteni:
-- type String = [Char]
--type Bináris = Bool

null' :: [a] -> Bool
null' [] = True 
null' _ = False

isSingleton, isSingleton' :: [a] -> Bool 
isSingleton [x] = True
isSingleton _ = False 
isSingleton' (x : []) = True
isSingleton' _ = False

-- pontosan két elem
exactlyTwoElements :: [a] -> Bool 
exactlyTwoElements (_:_:[]) = True 
exactlyTwoElements _ = False  
-- [1,2,3] átfordul arra hogy: (1:2:3:[])
-- legalább 2 elem
hasAtLeastTwo :: [a] -> Bool 
hasAtLeastTwo (_:_:_) = True
hasAtLeastTwo _ = False

-- string - char összefüggés 
-- type kulcsszó 

-- Hosszu listákat megadhatunk egyszerűbben is .. segítségével
-- [1..10] == [1,2,3,4,5,6,7,8,9,10]
-- [10,9..1] == [10,9,8,7,6,5,4,3,2,1]
-- [1,3..10] == [1,3,5,7,9]
-- Végtelen listák is léteznek:
-- [1..]
-- listagenerátor 
-- [x | x <- [1..10]] == [1..10]

-- páros számok x-ig
evens :: Integer -> [Integer]
evens x = [ y | y <- [1..x], y `mod` 2 == 0]  
-- első x páros szám
evens' :: Integer -> [Integer]
evens' x = [y * 2 | y <- [1..x] ]


replicate1' :: Int -> [Int]
replicate1' x = [ y | y <- [1,2,3], z <- [1..x]]

squaresTo100 :: [Integer]
squaresTo100 = [ y * y | y <- [1..10]]

firstNsquares :: Integer -> [Integer]
firstNsquares n = [ y * y | y [1..n] ] 

divisibleByFive :: [Integer] -> [Integer]
divisibleByFive xs = [y | y <- xs, y `mod` 5 == 0] 

combinations :: Integer -> Integer -> [(Integer,Integer)]
combinations x y = [(a,b) | a <- [1..x], b <- [1..y]] 









