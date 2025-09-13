import Data.List (foldl')

sum' :: [Int] ->  Int
sum' [] = 0
sum' (x:xs) = x + sum' xs


product' :: [Int] -> Int
product' [] = 1
product' (x:xs) = x * product' xs

foldr' :: (a -> b -> b) -> b -> [a] -> b
foldr' f e [] = e
foldr' f e (x:xs) = f x (foldr' f e xs)

all' :: (a -> Bool) -> [a] -> Bool
all' p []     = True
all' p (x:xs) = p x && all' p xs

all'' :: (a -> Bool) -> [a] -> Bool
all'' p ls = foldr' help True ls
  where
    --help :: a -> Bool -> Bool
    help x b = p x && b

all''' :: (a -> Bool) -> [a] -> Bool
all''' p ls = foldL (\acc x -> acc && p x) True ls


length' :: [a] -> Int
length' [] = 0
length' (_:xs) = 1 + length' xs

length'' :: [a] -> Int
length'' ls = lengthH ls 0
  where
    lengthH []     i = i
    lengthH (_:xs) i = lengthH xs (i+1)

foldL :: (b -> a -> b) -> b -> [a] -> b
foldL f e []     = e
foldL f e (x:xs) = foldL f (f e x) xs

length''' :: [a] -> Int
length''' ls = foldl' (\ acc _ -> acc + 1) 0 ls


suM :: [Int] -> Int
suM ls = foldl' (+) 0 ls

-- (+) :: Int -> (Int -> Int)
-- ((+) 3) 4
---
-- (+1)

f :: String -> Int
f str = read str



inc x = x + 1
inc' = (\ x -> x + 1)
inc'' = (+1)


map' :: (a -> b) -> [a] -> [b]
--map' f ls = [ f e | e <- ls]
map' f [] = []
map' f (x:xs) = f x : map' f xs

map'' f ls = foldr (\x e -> f x : e) [] ls

filter' :: (a -> Bool) -> [a] -> [a]
--filter' p ls = [ e | e <- ls, p e]
filter' p [] = []
filter' p (x:xs)
  | p x       =  x : filter' p xs
  | otherwise = filter' p xs

filter'' :: (a -> Bool) -> [a] -> [a]
filter'' p ls = foldr step [] ls
  where
    step x e
      | p x       = x : e
      | otherwise = e


