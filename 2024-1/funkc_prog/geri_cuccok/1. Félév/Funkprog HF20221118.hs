module Hazi9 where

-- 1. feladat

data Time = T Int Int deriving Eq

-- 2. feladat

t :: Int -> Int -> Time
t x y
    | x > 23 || x < 0 || y < 0 || y > 59 = error "Ilyen idő nem létezik!"
    | otherwise = T x y

-- 3. feladat

instance Show Time where
    show (T x y) = show x ++ [':'] ++ show y

-- 4. feladat

isEarlier :: Time -> Time -> Bool
isEarlier (T x y) (T a b)
    | x < a = True
    | x==a && y<b = True
    | otherwise = False

--5. feladat

isBetween :: Time -> Time -> Time -> Bool
isBetween (T a b) (T c d) (T e f)
    | isEarlier (T a b) (T c d) && isEarlier (T c d) (T e f) = True
    | isEarlier (T e f) (T c d) && isEarlier (T c d) (T a b) = True
    | otherwise = False

-- (a<c && c<e) || (e<c && c<a) = True
-- (a==c && c==e && e==a) && ((b<d && d<f) || (f<d && d<b)) = True

--6. feladat

data USTime = UST AMPM Int Int deriving Eq

--7. feladat

data AMPM = AM | PM 

instance Eq AMPM where
    AM==AM = True
    PM==PM = True
    _ == _ = False


ustime :: AMPM -> Int -> Int -> USTime
ustime z x y 
        | x > 12 || x < 1 || y < 0 || y > 59  = error "Ilyen idő nem létezik!"
        | otherwise = UST z x y

--8. feladat

instance Show USTime where
    show (UST z x y) 
        | z==AM = "AM " ++ show x ++ [':'] ++ show y
        | otherwise = "PM " ++ show x ++ [':'] ++ show y

--9. feladat(a)

ustimeToTime :: USTime -> Time
ustimeToTime (UST a b c) 
    | a == AM && b == 12 = (t (b-12) c)
    | a == PM && b /= 12 = (t (b+12) c)
    | otherwise = (t b c)

--9. feladat(b)

timeToUSTime :: Time -> USTime

isEarlier' :: Time -> Time -> Bool
isEarlier' (T x y) (T a b)
    | x <= a = True
    | x==a && y <= b = True
    | otherwise = False

isBetween' :: Time -> Time -> Time -> Bool
isBetween' (T a b) (T c d) (T e f)
    | isEarlier' (T a b) (T c d) && isEarlier' (T c d) (T e f) = True
    | isEarlier' (T e f) (T c d) && isEarlier' (T c d) (T a b) = True
    | otherwise = False

timeToUSTime (T a b) 
    | isBetween' (T 0 0) (T a b) (T 0 59) = (ustime AM (a+12) b)
    | isBetween' (T 13 0) (T a b) (T 23 59) = (ustime PM (a-12) b)
    | isBetween' (T 12 0) (T a b) (T 12 59) = (ustime PM a b)
    | otherwise = (ustime AM a b)

    