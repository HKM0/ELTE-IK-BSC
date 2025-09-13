module Gy05 where 
import Data.Char

------------------------------------------------
-- 1. Feladat
-- Mi a rekurzió? Fogalmazd meg saját szavaiddal! (1 pont)
-------------------------------------------------
-- 2. Feladat
-- Az alábbiak közül melyik függvény rekuzív? (0,5 pont)
-- Lehetséges válaszok:csak az első, csak a második, mindkettő, egyik sem
f :: [Int] -> Int 
f [] = 0
f (x:xs) = x + f xs 

g :: Int -> Int
g 0 = (-1)
g x = x - 1

--------------------------------------------------------------------------------------
-- 3. Feladat
-- Írj 2 olyan tipikus hibát amit a rekurzióval függvényekben elkövethetünk! (2 * 0,25 pont)
--------------------------------------------------------------------------------------

-- két lista összefűzése
(+++) :: [a] -> [a] -> [a]
(+++) [] ys = ys 
(+++) (x:xs) ys = x : (+++) xs ys 

-- eldönti, hogy egy elem része egy listának
elem' :: Eq a => a -> [a] -> Bool 
elem' _ [] = False
elem' a (x:xs) = a == x || elem' a xs  

-- (x:xs) - legalább egy elemű lista
-- [x] - pontosan egy elemű lista
-- x - ha a típusa lista, akkor bárhány elemű lehet

-- rendezett párokká alakít két listát, amíg az egyik ki nem fogy
zip' :: [a] -> [b] -> [(a,b)]
zip' [] _ = []
zip' _ [] = []
zip' (x:xs) (y:ys) = (x,y) : zip' xs ys  

-- [(x,y)] ++ zip' xs ys EZT NE
-- (x,y) : zip' xs ys  EZT HELYETTE

-- összefésüli a listákat
mix :: [a] -> [a] -> [a]
mix [] ys = ys
mix xs [] = xs 
mix (x:xs) (y:ys) = x : y : mix xs ys

-- eldönti, hogy az első listával kezdődik-e a második lista
isPrefixOf' :: Eq a => [a] -> [a] -> Bool
isPrefixOf' [] _ = True 
isPrefixOf' _ [] = False 
isPrefixOf' (x:xs) (y:ys) = x == y && isPrefixOf' xs ys  

-- Esetszétválasztás

-- a > b ? 
bigger :: Int -> Int -> Int 
bigger a b | a > b = a
bigger a b | a < b = b
bigger _ _ = error "They are equal"  

-- signum fv
signum' :: (Ord a, Num a) => a -> Int
signum' n
    | n < 0 = -1
    | n > 0 = 1
    | otherwise = 0
signum' 0 = 0 

otherwise' = True 

-- fakt fv totális változata
fakt :: Int -> Int 
fakt n 
    | n <= 1 = 1
    | otherwise = n * fakt (n - 1)

-- legalább egy elemű listára 
maximum' :: Ord a => [a] -> a
maximum' [] = error "Empty list"
maximum' [x] = x
maximum' (x:y:xs)
    | x < y = maximum' (y:xs)
    | otherwise = maximum' (x:xs) 

minimum' :: Ord a => [a] -> a
minimum' = undefined

-- take fv negatív számokra is
take' :: Int -> [a] -> [a] 
take' = undefined

-- drop fv negatív számokra is
drop' :: Int -> [a] -> [a] 
drop' = undefined

-- csak akkor teszi vissza az elemet a listába, ha még nincs benne 
nub' :: Eq a => [a] -> [a]
nub' = undefined








