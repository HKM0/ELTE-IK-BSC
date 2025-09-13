module Hazi7 where
import Data.Char

-- splitOn Season 2 part 2
splitOn :: (a -> Bool) -> [a] -> [[a]]
splitOn f [] = [[]]
splitOn f (x:xs)
    | f(x) = [] : splitOn f xs
    | otherwise = (x : head (splitOn f xs)) : tail (splitOn f xs)

-- Is this empty or is this just fantasy? (Geri - Üres listák rapszódiája)

countEmptyLists :: (Num b) => [[[a]]] -> [b]
countEmptyLists [] = []
countEmptyLists (x:xs) = counts (x:xs) where
    counts [] = []
    counts (y:ys) = f y 0 : counts ys where
        f [] acc = acc
        f (z:zs) acc
            | null(z) = f zs (acc + 1)
            | otherwise = f zs acc

-- ApplyList amihez semmi poént nem tudtam kitalálni, lehet a végére kitalálok(Edit: Nem tudtam :( )

applyList :: [(a -> b)] -> a -> [b]
applyList [] _ = []
applyList (func:funcs) e = func(e) : applyList funcs e

-- The Cooler Lukács

lucas :: [Integer]
lucas = 2 : 1 : zipWith (+) lucas (tail lucas)

