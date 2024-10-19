module Gy08 where 

{-
1. Feladat (2p)
Írj meg az `underHundred :: ?` függvényt, ami egy EGÉSZEKET tartalmazó 
lista elemeit adja össze, DE amint az összeg MEGHALADNÁ a 100-at, ne 
számoljunk továb. A típus is a feladat része, legyen a lehető 
legáltalánosabb a feladat szövege alapján.
A feladat megoldásához javasolt akkumulátor használata. 
A listát balról jobbra dolgozzuk fel.
Ha nincs egy elem sem, az összeg természetesen 0.

Tehát az alábbi listák összege:
[1,2,3] -> 6
[33,67,1] -> 100
[33,68] -> 33
[101] -> 0
-}

underHundred :: Integral a => [a] -> a -> a
underHundred [] acc = acc
underHundred (x:xs) acc 
    | x + acc > 100 = acc
    | otherwise = underHundred xs (acc + x)




-- curry - uncurry

curry' :: ((a, b) -> c) -> a -> b -> c
curry' f a b = f (a,b)

uncurry' :: (a -> b -> c) -> (a, b) -> c
uncurry' f (a,b) = f a b

-- f(x,y)

--f x y = x + y
-- f 2 3

--f :: (a -> (b -> (c -> d)))
--g :: a -> ((a -> b) -> b)
 
-- (+4) 3

flip' :: (a -> b -> c) -> b -> a -> c
flip' f b a = f a b 

-- Paraméterek "lenyelése" - függvények zárójelezése

add1 = (\x -> x + 1)

-- Lambdafüggvények gyakorlás
numbersMadeOfOnes :: [Integer] -- 1,11,111,1111,11111...
numbersMadeOfOnes = 1 : map (\x -> x * 10 + 1) numbersMadeOfOnes 
numbersMadeOfOnes' = 1 : map ((+1) . (*10)) numbersMadeOfOnes' 

numbersMadeOfThrees :: [Integer] -- 3,33,333,3333,33333...
numbersMadeOfThrees = map (*3) numbersMadeOfOnes 

numbersMadeOfOnesAndThrees :: [Integer] -- 1,31,331,3331,33331...
numbersMadeOfOnesAndThrees = map (\x -> x - 2) numbersMadeOfThrees  

mapMap :: (a -> b) -> [[a]] -> [[b]] -- map alkalmazása 2 szint mélységig
mapMap f = map (map f)
-- pl.: mapMap (+1) [[1,2],[3,4,5]] == [[2,3],[4,5,6]]

-- Függvénykompozíció
comp :: (b -> c) -> (a -> b) -> a -> c
comp f g x = f $ g x -- haskellben (.)

compExample = head . init . init . tail . (map (+1)) 
compExample2 = (.) head init






