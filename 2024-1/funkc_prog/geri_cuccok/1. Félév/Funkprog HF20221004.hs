module Hazi3 where

-- 1. feladat

divides :: Integral a => a -> a -> Bool
divides 0 0 = True
divides 0 _ = False
divides x y = y `mod` x == 0 

-- 2. feladat(a rész)

isSingleton :: [a] -> Bool
isSingleton [_] = True
isSingleton _ = False

-- 2. feladat(b rész)

exactly2OrAtLeast4 :: [a] -> Bool
exactly2OrAtLeast4 [_,_] = True
exactly2OrAtLeast4 [_,_,_,_] = True
exactly2OrAtLeast4 (_:_:_:_:_) = True
exactly2OrAtLeast4 _ = False

-- 3. feladat

firstTwoElements :: [a] -> [a] 
firstTwoElements (a:b:_) = [a,b]
firstTwoElements _ = []

-- 4. feladat

withoutThird :: [a] -> [a] 
withoutThird (x:y:_:xs) = (x:y:xs)
withoutThird c = c

-- 5. feladat

add :: (Integral a, Integral b) => a -> b -> Integer
add x y = (fromIntegral (x) + fromIntegral (y)) :: Integer

-- 6. feladat

onlySingletons :: [[a]] -> [[a]]
onlySingletons xs = [ x | x <-xs, isSingleton x]

-- 7. feladat

decompress :: [(Char, Int)] -> String
decompress d = [e | (x,xs) <- d, f <-[1..xs], e <- [x]]

decompress' :: [(Char, Int)] -> String
decompress' d = [e | (x,xs) <- d, f <-[1..xs],e]