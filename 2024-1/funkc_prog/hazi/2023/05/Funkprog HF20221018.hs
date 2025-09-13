module Hazi5 where
import Data.Char

-- 1. feladat

isSorted :: (Ord a) => [a] -> Bool
isSorted [] = True
isSorted [x] = True
isSorted (x:y:xs)
    | x<y = isSorted(y:xs)
    | otherwise = False

-- 2. feladat

(!!!) :: (Integral b) => [a] -> b -> a
(!!!) [] _ = error "Rossz indexelés"
(!!!) (a:_) 0 = a
(!!!) list@(a:as) b 
    | b<0 = (reverse list) !!! ((-(b))-1)
    | otherwise = as !!! (b-1)

-- 3. feladat

format :: Integral a => a -> String -> String
format x a | x<=0 = a
format x [] = format (x-1) "" ++ " "
format x (a:as) = a : format (x-1) as

-- 4. feladat

mightyGale :: (Num b, Num c, Ord c, Integral d)=> [(String,b,c,d)] -> String
mightyGale ((a,b,c,d):tobbi)
    | c<=110 = mightyGale tobbi
    | otherwise = a
mightyGale [] = ""

-- 5. feladat

cipher :: String -> String
cipher (a:b:c:as)
    | isDigit (c) = [a,b]
    | otherwise = cipher (b:c:as)
cipher _ = ""

-- 6. feladat

doubleElements :: [a] -> [a]
doubleElements [] = []
doubleElements (a:as) = a : a : doubleElements as

-- 7. feladat

szokozelol :: String -> String
szokozelol "" = ""
szokozelol (x:xs)
    | x==' ' =  xs
    | otherwise = (x:xs)

deleteDuplicateSpacesSeged :: String -> String
deleteDuplicateSpacesSeged "" = ""
deleteDuplicateSpacesSeged [' '] = []
deleteDuplicateSpacesSeged (' ':' ':b) = deleteDuplicateSpacesSeged (' ':b)
deleteDuplicateSpacesSeged (a:b) = a : deleteDuplicateSpacesSeged b 

deleteDuplicateSpaces :: String -> String
deleteDuplicateSpaces x = szokozelol (deleteDuplicateSpacesSeged x)
