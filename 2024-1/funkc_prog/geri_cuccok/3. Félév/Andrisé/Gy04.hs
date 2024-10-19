module Gy04 where 



{-
1. feladat 
Hány eleműek az alábbi listák? (4 * 0,25 pont)
a) (x:y:z:[])
b) [1,3..16]
c) [1..]
d) [1 : 2 : 3 : 4 : []]
------------------------------------------------

2. feladat 

Mi lesz a `function 3` eredménye? (1 pont)
-}

------------------------------------------------
function :: Int -> [Int]
function n = [x | x <- [1..n], a <- [1..x]]



head' :: [a] -> a 
head' (x:xs) = x
head' [] = error "Empty list" 

tail' :: [a] -> [a]
tail' [] = []
tail' (x:xs) = xs  

-- REKURZIÓ - egy függvényt önmaga segítségével definiálunk

-- adjuk össze egy lista elemeit
sum' :: [Int] -> Int 
sum' [] = 0
sum' (x:xs) = x + sum' xs   

{-
sum' [1,2,3,4] 
x = 1 xs = [2,3,4]
    1 + sum' [2,3,4]
    x = 2 xs = [3,4]
        2 + sum' [3,4]
        x = 3 xs [4]
            3 + sum' [4]
            x = 4 xs = []
                sum' [] = 0
1 + 2 + 3 + 4 + 0
-}

fact :: Int -> Int
fact 0 = 1 
fact 1 = 1
fact n = n * fact (n - 1) 

-- Hibalehetőségek 
    -- nem érhető el a kilépési feltétel
    -- nincs kilépési feltétel
    -- nem változtatunk a rekurzív híváson

or' :: [Bool] -> Bool 
or' [] = False
or' (x:xs) = x || or' xs   

and' :: [Bool] -> Bool 
and' [] = True
and' (x:xs) = x && and' xs  


-- fibonacci számok: 1, 1, 2, 3, 5, 8..
fib :: Int -> Int
fib 0 = 1
fib 1 = 1
fib n = fib (n - 1) + fib (n - 2) 
-- ghci -Wall


-- Lista elemeinek szorzata
product' :: [Int] -> Int 
product' [] = 1
product' (x:xs) = x * product' xs  
-- Lista utolsó elemét adja vissza (ha van)
last' :: [a] -> a 
last' [] = error "Empty list"
last' [x] = x
last' (x:xs) = last' xs 

-- Elhagyja a lista utolsó elemét
init' :: [a] -> [a]
init' [] = []
init' [_] = [] 
init' (x:xs) = x : init' xs 

-- min a b - megadja a kisebbet
-- a lista nem üres, és rendezhető, azaz része az Ordering osztálynak 
minimum' :: Ord a => [a] -> a 
minimum' [] = error "Empty list"
minimum' [x] = x 
minimum' (x:y:xs) = minimum' (min x y : xs) 
-- "alma" ++ "fa" = "almafa"

-- összefűz két listát


-- összefűz n db listát
concat' :: [[a]] -> [a]
concat' [] = []
concat' (x:xs) = x ++ (concat' xs)


-- megadja a lista hosszát
length' :: [a] -> Int
length' [] = 0
length' (x:xs) = 1 + length' xs 

-- megfordítja a listát
reverse' :: [a] -> [a] 
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x] 

-- kivesz legfeljebb n db elemet a listából
take' :: Int -> [a] -> [a]
take' 0 _ = []
take' _ [] = []
take' n (x:xs) = x : take' (n - 1) xs

-- eldobja az első n db elemet a listából
drop' :: Int -> [a] -> [a]
drop' 0 xs = xs
drop' _ [] = []
drop' n (x:xs) = drop' (n - 1) xs  

-- következő óra elején

-- két lista összefűzése
(+++) :: [a] -> [a] -> [a]
(+++) = undefined

-- megnézi, hogy egy elem része egy listának
elem' :: Eq a => a -> [a] -> Bool 
elem' y (x:xs) = undefined 

-- rendezett párokká alakítja a listűkat
zip' :: [a] -> [b] -> [(a,b)]
zip' = undefined

-- összefésüli a listákat
mix :: [a] -> [a] -> [a]
mix = undefined