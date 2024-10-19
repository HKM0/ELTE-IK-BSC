module Hazi4 where
import Data.Char

-- EZAZ LUKÁCS (GYÖRGY) MÁR VÁRTALAK

lucas :: Int -> Int
lucas 0 = 2
lucas 1 = 1
lucas x = lucas (x-1) + lucas (x-2)

-- FUS... FUS RO DAAH

shout :: String -> String
shout "" = ""
shout (x:xs) = toUpper(x) : shout(xs)

-- Fordított 3-as ikrek(?Ausztrália?)

reverseTriplets :: [(a,b,c)] -> [(c,b,a)]
reverseTriplets [] = []
reverseTriplets ((a,b,c):xs) = (c,b,a) : reverseTriplets xs

-- Gondolkodtam egy viccen de nem volt elég hosszú hogy berakjam ide
-- Ennél a feladatnál a ChatGPT elhasalt, most már csak Mesterséges (intelligencia nem)

longerThan :: [a] -> Integer -> Bool
longerThan [] n = n < 0
longerThan (x:xs) n = n <= 0 || longerThan xs (n-1)

-- Kizáró vagyok, de néha be is fogadok

allxor :: [Bool] -> Bool
allxor [] = True
allxor [x] = x
allxor (x:xs) = x /= allxor xs

quicksort :: Ord a => [a] -> [a]
quicksort [] = []
quicksort (x:xs) = quicksort ([a | a <- xs, a <= x ]) ++ [x] ++ quicksort([b | b <- xs, b > x ])