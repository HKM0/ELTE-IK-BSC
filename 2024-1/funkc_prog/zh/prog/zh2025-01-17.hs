module Zh20250117 where
import Data.Char
--elso

restockStore :: Integral a => [(String, a, a)] -> [(String, a, a)]
restockStore [] = []
restockStore ((termek, keszlet, ar):xs)
    | keszlet < 30 = [(termek, (100-keszlet), ((100-keszlet)*ar))] ++ restockStore xs
    | otherwise = restockStore xs

------------------------------------------------
--masodik


quadraticSols :: [(Integer, Integer, Integer)] -> [Maybe Integer]
quadraticSols [] = []
quadraticSols ((a,b,c):xs)
    | a == 0 = [Nothing] ++ quadraticSols xs
    | (b^2)-(4*a*c) < 0 = [Just 0] ++ quadraticSols xs
    | (b^2)-(4*a*c) == 0 = [Just 1] ++ quadraticSols xs
    | otherwise = [Just 2] ++ quadraticSols xs

------------------------------------------------
--harmadik
monotoneSubsequence :: Ord a => [a] -> [a]
monotoneSubsequence [] = []
monotoneSubsequence (x:xs) = help (x:xs) x where
    help :: Ord a => [a] -> a -> [a]
    help [] _ = []
    help (x:xs) a
        | x >= a = [x] ++ help xs x
        | otherwise = help xs a

------------------------------------------------
--negyedik

repeatNext :: [Int] -> [Int]
repeatNext [] = []
repeatNext [a] = []
repeatNext (x:y:xs)
    | x > 0 = (replicate x y) ++ repeatNext (y:xs)
    | otherwise = repeatNext (y:xs)


------------------------------------------------
--ötödik

zipMaybe :: [a] -> [b] -> [(Maybe a, Maybe b)]
zipMaybe [] [] = []
zipMaybe [] (x:xs) = [(Nothing, Just x)] ++ zipMaybe [] xs
zipMaybe (x:xs) [] = [(Just x, Nothing)] ++ zipMaybe xs []
zipMaybe (x:xs) (y:ys) = [(Just x, Just y)] ++ zipMaybe xs ys

------------------------------------------------
--hatodik

tripleTuple :: [(a, (a -> b), (b -> Bool))] -> Maybe b
tripleTuple [] = Nothing
tripleTuple ((a, b, c):xs)
    | (c (b a)) == False = Just (b a)
    | otherwise = tripleTuple xs

------------------------------------------------
--hetedik

data Utilization = Low | Avg | High deriving (Show,Eq)
{-
inspectTrainF :: [String] -> [Utilization]
inspectTrainF = undefined
-}


------------------------------------------------
--nyolcadik

parErtek :: (Num a, Ord a) => (a,a) -> a
parErtek (a,b) = (a + b)

largestNeighbors :: (Num a, Ord a) => [a] -> Maybe (a,a)
largestNeighbors [] = Nothing
largestNeighbors [a] = Nothing
largestNeighbors (x:y:xs) = help (x:y:xs) (x,y) where
    help :: (Num a, Ord a) => [a] -> (a,a) -> Maybe (a,a)
    help [] (a,b) = Just (a,b)
    help [x] (a,b) = Just (a,b)
    help (x:y:xs) tup
        | parErtek (x,y) > parErtek tup = help (y:xs) (x,y)
        | otherwise = help (y:xs) tup

