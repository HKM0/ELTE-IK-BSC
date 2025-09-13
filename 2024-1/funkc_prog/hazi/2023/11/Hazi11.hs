module Hazi11 where
import Data.List
import Data.Char

cubesToStairs :: Int -> [Int]
cubesToStairs 0 = []
cubesToStairs x = help x 1 where
    help x y
        | x - y > 0 = y : help (x - y) (y + 1)
        | otherwise = [x]

applyNTimes :: Int -> (a,b) -> (a -> a) -> (b -> b) -> (a,b)
applyNTimes n (a,b) f g 
    | n <= 0 = (a,b)
    | otherwise = applyNTimes (n - 1) (f a, g b) f g

upperMatrix :: Int -> [[Int]]
upperMatrix 0 = []
upperMatrix n = help n 0 where
    help 0 _ = []
    help n y = [(replicate y 0) ++ [x | x <- [1..n]]] ++ help (n - 1) (y + 1)

chainlyApply :: a -> [(a -> a)] -> [a]
chainlyApply _ [] = []
chainlyApply n (x:xs) = help n (x:xs) [] where
    help n [] acc = help n acc []
    help n (x:xs) acc = (x n) : help (x n) xs (acc ++ [x]) 

type Size = Int

data Clothes = Pants Int | Shirt Int | Hoodie Int | Shoes

type Closet = [Clothes]

canDress :: Closet -> Size -> Bool
canDress [] _ = False
canDress (x:xs) n = helper (x:xs) n [False, False, False, False] where
    helper [] _ acc = and acc
    helper (Pants x:xs) n acc
        | x == n && (not (acc !! 0)) = helper xs n ([True] ++ (drop 1 acc))
        | otherwise = helper xs n acc
    helper (Shirt x:xs) n acc
        | x == n && (not (acc !! 1)) = helper xs n ((take 1 acc) ++ [True] ++ (drop 2 acc))
        | otherwise = helper xs n acc
    helper (Hoodie x:xs) n acc
        | x == n && (not (acc !! 2)) = helper xs n ((take 2 acc) ++ [True] ++ (drop 3 acc))
        | otherwise = helper xs n acc
    helper (Shoes:xs) n acc
        | (not (acc !! 3)) = helper xs n ((take 3 acc) ++ [True])
        | otherwise = helper xs n acc

tenToNthNumberSystem :: Int -> Int -> [Int]
tenToNthNumberSystem n num = help n num 8 where
    help n num 0 = []
    help n num left =help n (num `div` n) (left - 1) ++ [num `mod` n]

pyramid :: Ord a => [a] -> Bool
pyramid [] = True
pyramid (x:xs) = help xs x False where
    help [] _ _ = True
    help (y:ys) previous boolean
        | y < previous && not boolean = help ys y True
        | y > previous && boolean = False
        | otherwise = help ys y boolean

parseFloat :: String -> Maybe Float
parseFloat [] = Nothing
parseFloat (x:xs) = helper (x:xs) where
    helper (x:xs)
        | length (elemIndices '.' (x:xs)) > 1 || length (elemIndices '-' (x:xs)) > 1 || length (elemIndices '-' (xs)) /= 0 || x == '.' || any (=='.') (drop (length (x:xs) - 1) (x:xs))= Nothing
        | length (filter (\x -> isAlpha x) (x:xs)) > 0 = Nothing 
        | otherwise = Just (read(x:xs) ::Float)
