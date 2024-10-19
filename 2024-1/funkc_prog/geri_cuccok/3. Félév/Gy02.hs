module Gy02 where

isLeapYear :: Int -> Bool
isLeapYear x = x `mod` 4 == 0 && (x `mod` 100 /= 0 || x `mod` 400 == 0)

addIntegrals :: (Integral a, Integral b, Integral c) => a -> b -> c
addIntegrals x y = (fromIntegral x) + (fromIntegral y)

plus' :: (Num a) => a -> a -> a
plus' x y = x + y

id' :: a -> a
id' x = x

--f :: Int -> Int
f 0 = 0
f 2 = 8
f x = x * x

not' :: Bool -> Bool
not' True = False
not' False = False

(&&&) :: Bool -> Bool -> Bool
(&&&) True True = True
(&&&) False True = False
(&&&) True False = False
(&&&) False False = False

-- (|||)

(&&&&) :: Bool -> Bool -> Bool
(&&&&) True True = True
(&&&&) _ _ = False

(||||) :: Bool -> Bool -> Bool
(||||) False False = False
(||||) _ _ = True

fst' :: (a, b) -> a
fst' (x, _) = x

snd' :: (a, b) -> b
snd' (_, y) = y

addVectors :: (Num a, Num b) => (a, b) -> (a, b) -> (a, b)
--addVectors (a1, b1) (a2, b2) = (a1 + b1, a2 + b2)
addVectors x y = (fst x + fst y, snd x + snd y)

fst3 :: (a, b, c) -> a
fst3 (x,_,_) = x

snd3 :: (a, b, c) -> b
snd3 (_,y,_) = y

thd3 :: (a, b, c) -> c
thd3 (_,_,z) = z