module Hazi6 where

-- We meet again, LORD SPLITON

splitOn :: Eq a => a -> [a] -> [[a]]
splitOn a [] = [[]]
{-
splitOn a [e] 
    | a == e = [[],[]]
splitOn a xs = splitOn [] xs where
    splitOn c [] = [c]
    splitOn c (y:ys) 
        | a == y = c : splitOn [] ys
        | otherwise = (y : head (splitOn c ys)) : tail (splitOn c ys)
-}
splitOn a (x:xs)
    | a == x = [] : splitOn a xs
    | otherwise = (x : head (splitOn a xs)) : tail (splitOn a xs)

-- kulcsok

keys :: [(Char,Int)]
keys = zip ['a'..'z'] [1..26] ++ zip ['a'..'z'] [27..52]

-- számok csak karakterben

intToChar :: Int -> Char
intToChar a
    | a < 1 || a > 52 = '?'
    | otherwise = fst(keys !! (a - 1))

-- karakterek csak számokban

charToInt :: Char -> Int
charToInt '?' = 0
charToInt b = help b 1 where
    help b acc
        | b == intToChar acc = acc
        | otherwise = help b (acc + 1)

-- kódolás karakterekkel

encodeChar :: Char -> Char -> Char
encodeChar char1 char2 = intToChar(charToInt(char1) + charToInt(char2))

decodeChar :: Char -> Char -> Char
decodeChar char1 char2 = intToChar(charToInt(char2) + 26 - charToInt(char1))

-- kódolás Stringgel

encodeStr :: String -> String -> String
encodeStr [] _ = []
encodeStr _ [] = []
encodeStr (x:xs) (y:ys) = encodeChar x y : encodeStr xs ys

decodeStr :: String -> String -> String
decodeStr [] _ = []
decodeStr _ [] = []
decodeStr (x:xs) (y:ys) = decodeChar x y : decodeStr xs ys

--kódolás Stringgel 2

encodeByString :: String -> String -> String
encodeByString [] _ = []
encodeByString _ [] = []
encodeByString xs ys = (encodeStr xs (take (length(xs)) ys)) ++ encodeByString xs (drop (length(xs)) ys)

decodeByString :: String -> String -> String
decodeByString [] _ = []
decodeByString _ [] = []
decodeByString xs ys = (decodeStr xs (take (length(xs)) ys)) ++ decodeByString xs (drop (length(xs)) ys)