module Hazi4 where

-- 1. feladat

init' :: [a] -> [a]
init' [] = []
init' [_] = []
init' (x:xs) = x : init' xs

mountainseged :: Integer -> String
mountainseged (-1) = ""
mountainseged 0 = ""
mountainseged x =  mountainseged ((div (x + abs x) 2) - 1) ++ [y | y <- "#", b <- [1..x] ] ++ "\n"

mountain :: Integer -> String
mountain x = init' (mountainseged x)

-- 2. feladat

countAChars :: (Num a) => String -> a
countAChars [] = 0
countAChars ['a'] = 1
countAChars [_] = 0
countAChars (x:xs) = countAChars [x] + countAChars xs

-- 3. feladat

lucas :: (Real a, Real b) => a -> b
lucas 0 = 2
lucas 1 = 1
lucas x = lucas (x-1) + lucas (x-2)

-- 4. feladat

longerThan :: [a] -> Integer -> Bool
longerThan (_:_) 0 = True
longerThan [] x = x < -1
longerThan (_:_) (-1) = True
longerThan (a:as) x = longerThan as (((x + (abs x)) `div` 2-1)) 

-- 5. feladat

format :: Integral a => a -> String -> String
format 0 (a) = a
format x [] = format (x-1) "" ++ " "
format x (a:as) = a : format (x-1) as

-- 6. feladat(a része)

zip' :: [a] -> [b] -> [(a,b)]
zip' [] _ = []
zip' _ [] = []
zip' (b:bs) (c:cs) = (b,c) : zip' bs cs

-- 6. feladat (b része)

numberWords :: (Integral a) => String -> [(a,String)]
numberWords szoveg = ([1..]) `zip'` words(szoveg)

-- 7. feladat 

merge :: [a] -> [a] -> [a]
merge ds [] = ds
merge [] es = es
merge (d:ds) (e:es) = d : e : merge ds es