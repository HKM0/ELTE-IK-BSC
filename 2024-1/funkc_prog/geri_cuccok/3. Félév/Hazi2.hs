module Hazi2 where

-- Primitív kódolás

primitiveEncode :: Int -> Char
primitiveEncode 1 = 'a'
primitiveEncode 2 = 'b'
primitiveEncode 3 = 'c'
primitiveEncode 4 = 'd'
primitiveEncode _ = '?'

-- XOR

xor :: Bool -> Bool -> Bool
xor x y = x /= y

-- andOr avagy a Star Wars nevű függvény(Get it? Andor haha)

andOr :: Bool -> Bool -> Bool -> Bool
andOr _ _ True = True
andOr True True _ = True
andOr _ _ _ = False

-- IsOrigin

isOrigin :: (Int, Int) -> Bool
isOrigin (0, 0) = True
isOrigin (_, _) = False

-- isOnXAxis

isOnXAxis :: (Int,Int) -> Bool
isOnXAxis (_, 0) = True
isOnXAxis (_, _) = False

-- isOnYAxis

isOnYAxis :: (Int,Int) -> Bool
isOnYAxis (0, _) = True
isOnYAxis (_, _) = False

-- Gratulálunk fordított rendezett hármasai születtek

reverseTriplets :: (a,b,c) -> (c,b,a)
reverseTriplets (andris,bandris,candris) = (candris,bandris,andris) 

-- A Püthagorász

pythagoras :: (Num a, Ord a) => (a, a, a) -> Bool
pythagoras (x, y, z) = x^2 + y^2 == z^2 && y > 0 && z > 0 && x + y > z && y + z > x && x + z > y