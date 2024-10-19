module Gy07 where

-- 1. Feladat: Mennyi lesz f [1,2,3] értéke? (1 pont)
f :: [a] -> [a]
f [] = []
f xs = g xs where
    ys = tail xs
    g ys = tail xs

-- 2. Feladat: Írd meg a `sum :: [Int] -> Int` függvényt akkumulátor segítségével (1 pont)
--  a sum függvény összeadja egy lista elemeit 

accSum :: [Int] -> Int -> Int
accSum [] acc = acc
accSum (x:xs) acc = accSum xs (acc + x)







-- Vissza a lambdákhoz





-- parciálisan <-> totálisan applikált függvény


-- függvény alkalmazása listán
map', map'' :: (a -> b) -> [a] -> [b]
map' _ []  = []
map' f (x:xs) = f x : map' f xs 
map'' f xs = [f y | y <- xs] 

-- Magasabbrendű függvény: olyan függvény, amely paraméterül függvényt (is) vár


-- csak azokat az elemeket adja vissza, amire a predikátum igaz
filter' :: (a -> Bool) -> [a] -> [a]
filter' f [] = []
filter' f (x:xs)
    | f x = x : filter' f xs
    | otherwise = filter' f xs

-- megszámolja hány elem felel meg a predikátum a listában
count :: (a -> Bool) -> [a] -> Int
count f [] = 0
count f (x:xs)
    | f x = 1 + count f xs
    | otherwise = count f xs

-- a predikátum minden elemre igaz-e?
all' :: (a -> Bool) -> [a] -> Bool
all' f [] = True
all' f (x:xs) = f x && all' f xs
-- léteztik any függvény is


-- amíg igaz az állítás, addig veszünk ki elemeket
takeWhile' :: (a -> Bool) -> [a] -> [a]
takeWhile' f [] = []
takeWhile' f (x:xs)
    | f x = x : takeWhile' f xs
    | otherwise = []

-- amíg igaz az állítás, addig dobjuk el az elemeket
dropWhile' :: (a -> Bool) -> [a] -> [a]
dropWhile' f [] = []
dropWhile' f l@(x:xs)
    | f x = dropWhile' f xs
    | otherwise = l

-- span p xs = (takeWhile p xs, dropWhile p xs)
-- de írjuk meg hatékonyabban

span' :: (a -> Bool) -> [a] -> ([a],[a])
span' f [] = ([],[])
span' f l@(x:xs) 
    | f x = (x : a, b)
    | otherwise = ([],l) where
        (a,b) = span' f xs

-- alkalmazzuk a függvényt 0x majd 1x majd 2x majd ... végtelenszer
iterate' :: (a -> a) -> a -> [a]  
iterate' f a = a : iterate' f (f a) 

-- infixr 0
($) :: (a -> b) -> a -> b
($) f a = f a

--map ($ 10) [(+1), (* 2), (^2)]

--elem' :: Eq a -> a -> [a]
--elem' = undefined

-- létezik notElem is 

-- válogassunk ki adott elemeket egy listából 
-- az első listából kiveszi azt ami a másodikban szerepel
-- filters "abcdef" "abf" == "cde"
filters :: Eq a => [a] -> [a] -> [a]
filters [] _ = []
filters xs [] = xs
filters (x:xs) list
    | x `elem` list = filters xs list
    | otherwise = x : filters xs list


-- fűzzünk össze 2 listát, úgy hogy alkalmazunk a az elemeken egy kétparraméteres függvényt
zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith' f [] _ = []
zipWith' f _ [] = []
zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys

-- Hogyan tudnánk ezek alapján definiálni a zip-et?

zip' :: [a] -> [b] -> [(a,b)]
zip' xs ys = zipWith' (,) xs ys

