module Gy10 where
{-
1. Feladat (0.25 - 0.25 - 0.5 - 0.5 pont)

Egészítsük ki az alábbi mondatot az algebrai adatszerkezetekről:

Haskellben saját típust a DATA kulcsszóval tudunk létrehozni.
A típus definiálása során KONSTRUKTOR-okat adunk meg.
Ahhoz hogy a típusunk egy példányát ki tudjuk írni a konzolra, a típusra a Show INSTANCE-t 
kell definiálnunk. Van lehetőség arra, hogy a fordító írja ezt meg helyettünk, 
amit a DERIVING kulcsszóval érünk el.  

2. Feladat - (0.5 pont)

Döntsük el hogy melyik kifejezés adja meg az `xs` lista hosszát.

a) `foldl (\a b -> a + b) 0 xs`
b) `foldl (\a b -> b + 1) 0 xs`
c) `foldr (\a b -> a + b) 0 xs`
-d) `foldr (\a b -> b + 1) 0 xs`
-}


        -- Apple' :: Fruit
        -- Apple :: Int -> Fruit
data Fruit = Apple Int | Pear Int | Peach Int deriving Show -- | Apple' 

countFruits :: [Fruit] -> (Int,Int,Int)
countFruits [] = (0,0,0)
countFruits ((Apple x):xs) = (a + x,b,c) where
    (a,b,c) = countFruits xs 
countFruits ((Pear x):xs) = (a,b + x,c) where
    (a,b,c) = countFruits xs 
countFruits ((Peach x):xs) = (a,b,c + x) where
    (a,b,c) = countFruits xs 
--countAllFruits :: [Fruit] -> Int
--countAllFruits (_ x:xs) = mindig mintailleszteni kell a konstruktorokra

data Wrap = Wrap (Integer -> Integer) Integer 

eval :: Wrap -> Integer
eval (Wrap f a) = f a 


-- head függvény problémája
head' :: [a] -> a
head' (x:_) = x
head' [] = error "Empty list"

data D1 = A Int | B | C String Int Int 
data MaybeInt =  HaveInt Int | NoInt deriving Show 
{-
safeHead :: [Int] -> MaybeInt
safeHead [] = NoInt
safeHead (x:_) = HaveInt x
-}
data Maybe' a = Just' a | Nothing' deriving Show 

safeHead :: [a] -> Maybe' a
safeHead [] = Nothing'
safeHead (x:_) = Just' x

find' :: (a -> Bool) -> [a]  -> Maybe a
find' f [] = Nothing 
find' f (x:xs)
    | f x = Just x
    | otherwise = find' f xs

fromJust' :: Maybe a -> a
fromJust' (Just a) = a
fromJust' Nothing = error "Nothing is available" 

maybeComp :: (b -> Maybe c) -> (a -> Maybe b) -> a -> Maybe c
maybeComp f g a = help f (g a) where
    help :: (b -> Maybe c) -> Maybe b -> Maybe c
    help f Nothing = Nothing
    help f (Just b) = f b 

maybeComp' :: (b -> Maybe c) -> (a -> Maybe b) -> a -> Maybe c
maybeComp' f g a = case g a of 
    Nothing -> Nothing
    Just x  -> f x

lookup' :: Eq a => (a -> Bool) -> [(a,b)] -> Maybe b
lookup' f [] = Nothing
lookup' f ((a,b):xs) 
    | f a = Just b
    | otherwise = lookup' f xs

data Either' a b = Left' a | Right' b deriving Show


eitherAB, eitherAB2, eitherAB3 :: Either String Int 
eitherAB = Left "valamilyen string"
eitherAB2 = Right $ 13 :: Int
eitherAB3 = Right 14

isLeft :: Either a b -> Bool
isLeft (Left _) = True
isLeft (Right _) = False

isRight :: Either a b -> Bool
isRight x = case x of 
    Right _ -> True
    _       -> False


