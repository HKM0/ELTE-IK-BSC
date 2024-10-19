module Gy09 where
{-
1. Feladat (Helyes megoldás 0.25, egyéb 0 pont, legalább 0 pont)
Döntsük el az alábbi függvényekről a típusuk alapján, hogy magasabbrendűek-e:
 f :: (a -> b) -> [a] -> [b]
 g :: Int -> Int -> ([Int] -> [Int])
 h :: Integral a => a -> ((a -> Bool) -> a)
 i :: Num t => (t -> (t -> Int -> (t -> [t])))
------------------------------------------------------------------------ 
2. Feladat (2 x 0.5 pont)
Az alábbi függvények, valamint lambdafüggvények segítségével hozzuk létre a 
[3,3] listát két KÜLÖNBÖZŐ féle módon a `start :: [Int]` módosításával 
Azaz nem írható le expliciten a lista konstruktora sem ([]) 

map, filter, not, even, (<), (>), (<=), (>=), (+), (*), (-), (/), (:), (&&), (||)
A fenti függvények használatához tetszőleges `Bool`, `Num _` értékek is használhatóak

start = [1,2,3,3,4]
solution1, solution2 :: [Int]
filter even [1,2,3,4] == [2,4]
solution1 == [3,3]
solution1 == solution2 

-}




-- Mi a közös az alábbi függvényekben?

sum' :: Num a => [a] -> a
sum' [] = 0
sum' (x:xs) = x + sum' xs 

product' :: Num a => [a] -> a
product' [] = 1
product' (x:xs) = x * product' xs 

all' :: [Bool] -> Bool
all' = undefined

any' :: [Bool] -> Bool
any' = undefined


fr :: (a -> b -> b) -> b -> [a] -> b
fr _ b [] = b 
fr f b (a:as) = f a (fr f b as)

fr' :: (b -> a -> b) -> b -> [a] -> b
fr' _ b [] = b
fr' f b (a:as) = f (fr' f b as) a

--fr (||) True (repeat True)
--True
--fr' (||) True (repeat True)
-- nem értékeli ki

fl :: (b -> a -> b) -> b -> [a] -> b
fl _ b [] = b 
fl f b (a:as) = fl f (f b a) as

-- Típusszinonimák (megint)

type Alma = Int

addInt :: Alma -> Alma -> Alma -- ua. mint Int -> Int -> Int
addInt a b = a + b


--filter :: Predicate a -> [a] -> [a] -- ua. lehetne mint az eredeti filter típusa

-- Függvény miért ne lehehtne type-ban?

type Predicate a = (a -> Bool)

-- Saját adattípusok

type Date = (Int, Int, Int)
type Person = (String, Int, String, Date)

-- Legyen egy Answer típusunk, amely Yes, No vagy Perhaps értékekkel rendelkezhet

data Answer = Yes | No | Perhaps --deriving Show
instance Show Answer where
    show :: Answer -> String
    show Yes = "yes"
    show No = "no"
    show Perhaps = "perhaps"


negAnswer :: Answer -> Answer
negAnswer Yes = No
negAnswer No = Yes 
negAnswer Perhaps = Perhaps

-- Hogyan lehet a Bool típus definiálva?

data Bool' = True' | False' deriving (Show, Eq)




-- instance-ok







-- Saját típus: Komplex számok 

type RealPart = Int
type ImaginaryPart = Int
data Complex = C RealPart ImaginaryPart deriving Show





