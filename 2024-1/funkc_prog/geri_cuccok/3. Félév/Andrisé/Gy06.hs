module Gy06 where
import Data.List

h :: Integer -> Bool --1. Feladat: Mennyi lesz `h 8` értéke? (1 pont)
h n 
    | n `mod` 4 == 3 = True
    | (n `div` 2) `elem` [1,3,5] = False  
    | otherwise = h (n + 1) /= h (n - 2)

{-
True
-}

g :: Integer -> Bool -- 2. Feladat: Mennyi lesz `f 8` értéke? (1 pont)
g n -- isZero
    | n < 0 || n > 0 = False
    | otherwise = otherwise

f :: Integer -> Integer
f (-10) = -2
f 10 = 3
f 0 = 0
f n
    | not (g (1 - n)) = f (n - 1)
    | otherwise = f (1 - n)

{-
0
-}


inits' :: [a] -> [[a]]
inits' [] = [[]]
inits' xs = inits' (init xs) ++ [xs]  

tails' :: [a] -> [[a]]
tails' [] = [[]]
tails' l@(x:xs) = l : tails' xs



-- where / let .. in 

-- reverse fv.
reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x] 

-- reverse fv. kicsit máshogy
reverse'' :: [a] -> [a]
reverse'' xs = rev xs [] where 
    rev :: [a] -> [a] -> [a]
    rev [] acc = acc
    rev (x:xs) acc = rev xs (x : acc)

reverse''' xs = let 
    rev :: [a] -> [a] -> [a]
    rev [] acc = acc
    rev (x:xs) acc = rev xs (x : acc)
    in rev xs []

whereF :: (Int,Int) -> Int
--whereF (a,0) = inc1 a
whereF (a,b) = inc1 a where
    inc1 :: Int -> Int
    inc1 b = a + 1





-- Fűzzük szét egy rendezett párok listáját, két listává
unzip' :: [(a, b)] -> ([a], [b])
unzip' [] = ([],[])
unzip' ((a,b):xs) = (a : fst (unzip' xs) ,b : snd (unzip' xs))  
--fst (a,_) = a
--snd (_,b) = b

unzip'' :: [(a, b)] -> ([a], [b])
unzip'' [] = ([],[])
unzip'' ((a,b):xs) = (a : as,b : bs) where
    (as,bs) = unzip'' xs 

-- splitAt 3 [1..5] == ([1,2,3],[4,5])
splitAt' :: Int -> [a] -> ([a], [a])
splitAt' n list = (take n list, drop n list ) 

splitAt'' :: Int -> [a] -> ([a], [a])
splitAt'' 0 xs = ([],xs)
splitAt'' n (x:xs) = (x : a, b) where
    (a,b) = splitAt'' (n - 1) xs


-- minden listaelem csak egyszer szerepel, az előfordulás sorrendjében
nub' :: Eq a => [a] -> [a]
nub' = undefined
-- nub [2,2,3,3,2,4] == [2,3,4]

{-
Paraméter nélküli függvények:
f :: Int egész szám
g :: a bármilyen érték
h :: Integral a => a - Int/Integer
i :: (a,b) - rendezett pár
j :: [a] - lista
Paraméterezett függvények:
f :: a -> b
g :: Int -> Int 
h :: [a] -> [a]



-}

-- Magasabbrendű függvények

inc :: Int -> Int 
inc x = x + 1

inc2 :: Int -> Int
inc2 x = x + 1

-- Lambda függvény = névtelen függvény
-- (\x -> x + 1)
-- (\x y -> x + 2 * y)

inc3 :: Int -> Int
inc3 = (\x -> x + 1)

