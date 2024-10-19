module Hazi5 where

--Sry a késésért, nem akarok újra megbukni Analból. Habár funkcból se

-- 1. Listás valentin-nap, azaz minden legyen páros

noOdds :: (Integral a) => [a] -> [a]

noOdds [] = []
noOdds (x:xs)
    | x `mod` 2 == 1 = x + 1 : noOdds xs
    | otherwise = x : noOdds xs

-- 2. No WhiteSpace but very scuffed

trimWhiteSpace :: String -> String
trimWhiteSpace [] = []
trimWhiteSpace xs
    | xs !! 0 == ' ' = trimWhiteSpace(tail(xs))
    | reverse(xs) !! 0 == ' '  = trimWhiteSpace(init(xs))
    | otherwise = xs

-- Gratulálok fiam bűnronda lettél, de legalább a feladatot megoldod.

-- 3. Nincs ötletem poénra, mókásabb függvényneveket adhatnál nekik

orderedByThird :: Ord c => [(a, b, c)] -> [(a, b, c)]

orderedByThird [] = []
orderedByThird [x] = [x]
orderedByThird ((a,b,c):(d,e,f):xs)
    | c > f = (d,e,f):orderedByThird ((a,b,c):xs)
    | otherwise = (a,b,c):orderedByThird ((d,e,f):xs)

-- 4. Szortírozás

sortedElem :: Ord a => a -> [a] -> Bool
sortedElem _ [] = False
sortedElem e (x:xs) 
    | e == x = True
    | e < x = False
    | otherwise = sortedElem e xs

-- 5. Pontosan kétszer

exactlyTwoTimes :: Eq a => a -> [a] -> Bool
exactlyTwoTimes _ [] = False
exactlyTwoTimes e xs = helper e xs 0 where
    helper e [] acc = acc == 2
    helper e (x:xs) acc
        | e == x = helper e xs (acc + 1)
        | acc > 2 = False
        | otherwise = helper e xs acc