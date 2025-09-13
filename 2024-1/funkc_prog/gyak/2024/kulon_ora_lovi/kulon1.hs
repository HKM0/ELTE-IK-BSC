module Kulon1 where

{-  Rekurzió
*rekurzió ami saját magát hívja meg egy függvényen belül.
*mindig kell neki egy leállási feltétel.
-}

fact :: Int -> Int
fact 0 = 1
fact n = n * fact (n-1)
--vagy így ha alfüggvényként így ha alfüggvényként írjuk meg.
fact' :: Integer -> Integer
fact' 0 = 1
fact' n
    | n > 0 = n * fact' (n-1)

-- a fibonacci pl pont így megy.
fib :: Int -> Int
fib 0 = 0
fib 1 = 1
fib n = fib (n-1) + fib (n-2)

--hasonlóan al-függvényként
fib' :: Integer -> Integer
fib' 0 = 0
fib' 1 = 1
fib' n 
    | n > 1 = fib' (n-1) + fib' (n-2)


{-A map használata:
map (függvény) (lista)
-}

{-4. feladat: 
*add meg az x az n-ediken függvényt mint power.
-}
pow :: Int -> Int -> Int
pow x 0 = 1
pow x 1 = x
pow x n = x * pow x (n-1)


{-5. feladat
*deffiniáld a range függvényt ami visszaad egy listát-}

--első megoldás (nem rekurzívan):
ran :: Int -> Int -> [String]
ran x n | (n == x)  = map show [x]
ran x n | n < x = map show [x,x-1..n]
ran x n | n > x = map show [x..n]
-- másik megoldás:
ran' :: Int -> Int -> [Int]
ran' n m 
    | n == m = [n]
    | n > m = [n] ++ ran' (n+1) m
    | n > m = [n] ++ ran' (n-1) m

{-7. feladat
*deffiniáld azt a függvényt rekurzívan ami megadja egy lista hosszát.-}
len :: [Int] -> Int
len [] = 0
len (x:xs) = 1 + len (xs)

{-8. feladat
*deffiniálkd újra a minimum függvényt ami megadja egy lista legkisebb elemét-}
min' :: [Integer] -> Integer
min' [] = error "Üres tömb."
min' [x] = x
min' (x:xs)
    | x < min' xs = x
    | otherwise = min' xs
--vagy így: 
minimum' :: [Integer] -> Integer
minimum' [] = error "Üres tömb."
minimum' [x] = x
minimum' (x:xs:xss)
    | x <= xs = minimum' (x:xss)
    | x > xs = minimum' (xs:xss)