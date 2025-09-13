module Hazi7 where

import Data.Char
import Data.List

-- 1. feladat

splitOn :: (b -> Bool) -> [b] -> [[b]]
splitOn b [a] | b a = [[],[]]
splitOn b [] = [[]]
splitOn b x = splitOn [] x
    where 
        splitOn c [] = [c]        
        splitOn c (y:ys) | b y = c : splitOn [] ys
                            | otherwise = (y : head (splitOn c ys)) : tail (splitOn c ys)

-- 2. feladat

countEmptyLists :: Num b => [[[a]]] -> [b]
countEmptyLists [] = []
countEmptyLists (x:xs) = countUres x : countEmptyLists xs
    where
        countUres [] = 0
        countUres ([]:ys) = 1 + countUres ys
        countUres (y:ys) = countUres ys

-- 3. feladat

mapping :: [(Char,Char)]
mapping = zip (['0'..'9'] ++ ['A'..'Z'] ++ ['a'..'z']) (['3'..'9'] ++ ['A'..'Z'] ++ ['a'..'z'] ++ ['0'..'2']) 

-- 4. feladat

encodeCaesar :: String -> String

encodeCaesar szoveg = map f szoveg
    where
        f c | not ( null l) = snd (head l) 
            | otherwise = '?'
            where l = filter (\x -> fst x==c) mapping
-- filter (\x -> fst x==c) mapping 

-- 5. feladat

decodeCaesar :: String -> String

decodeCaesar szoveg = map f szoveg
    where
        f d | not ( null l) = fst (head l) 
            | otherwise = '?'
            where l = filter (\x -> snd x==d) mapping

-- 6. feladat

compress :: (Eq a, Num b) => [a] -> [(a,b)]
compress xs = map f (group xs)
    where
        f xs = (head xs,genericLength xs)

decompress :: (Integral b) => [(a,b)] -> [a]
decompress ys = concat(map f ys)
    where
        f xs = genericReplicate (snd(xs)) (fst(xs))

-- [1,1,1,2,3,4,4,4,1,1,1] -> [[1,1,1],[2],[3],[4,4,4],[1,1,1]] == [(1,3),(2,1),(3,1),(4,3),(1,3)]
-- (,genericLength xs) -- [1,1,1] -> (1,3) -- [2] -> (2,1)

-- 7. feladat

apsOnLists :: [(a -> b)] -> [[a]] -> [[b]]
apsOnLists as bs = zipWith map as bs

-- 8. feladat

lucas :: [Integer]
lucas = 2 : 1 : zipWith (+) lucas (tail lucas)

-- 9. feladat

isNotPrime :: Integral a => a -> Bool
isNotPrime n = ((lucas !! (fromIntegral n))-1) `mod` (fromIntegral n) /= 0

--10. sublists a lambda weboldalon + [] az elején

sublists :: [a] -> [[a]]
sublists = ([] :) . filter (not . null) . concatMap tails . inits
