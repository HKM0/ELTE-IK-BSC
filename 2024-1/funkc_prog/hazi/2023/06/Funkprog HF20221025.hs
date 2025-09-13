module Hazi6 where
import Data.List

-- 1. feladat

compress :: (Eq a, Num b) => [a] -> [(a,b)]
compress [] = []
compress x = [(head(a),b)] ++ compress as
    where
        length' [] = 0
        length' (_:xs) = 1 + length' xs
        a = head(group(x))
        b = fromIntegral(length'(a))
        as = concat(tail(group(x)))

-- 2. feladat 

splitOn :: Eq a => a -> [a] -> [[a]]
splitOn b [a] | a==b = [[],[]]
splitOn b [] = [[]]
splitOn b x = splitOn [] x
    where 
        splitOn c [] = [c]        
        splitOn c (y:ys) | b == y = c : splitOn [] ys
                            | otherwise = (y : head (splitOn c ys)) : tail (splitOn c ys)

-- 3. feladat

emptyLines :: (Num a, Enum a) => String -> [a]
emptyLines b | b == [] = [1]
emptyLines (a:as) = concat (emptyLinesSeged (splitOn '\n' (a:as)) 1)
    where 
        emptyLinesSeged [] _ = []
        emptyLinesSeged x c 
            | head (x) == "" = [c] : emptyLinesSeged (tail x) (c + 1)
            | otherwise = emptyLinesSeged (tail x) (c + 1)

-- 4. feladat

csv :: String -> [[String]] 
csv "" = []
csv string = csvSeged (splitOn '\n' string)
    where
        csvSeged [] = []
        csvSeged (a:as) | a == [] = ([] : csvSeged as)
        csvSeged (a:as) = splitOn ',' a : csvSeged as