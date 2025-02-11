module Osszefoglalo where

-- Haskell beépített függvények és használatuk

-- map :: (a -> b) -> [a] -> [b]
-- Egy függvényt alkalmaz a lista minden elemére.
map' :: (a -> b) -> [a] -> [b]
map' f [] = []
map' f (x:xs) = f x : map' f xs

-- filter :: (a -> Bool) -> [a] -> [a]
-- Visszaadja azoknak az elemeknek a listáját, amelyek megfelelnek egy predikátumnak.
filter' :: (a -> Bool) -> [a] -> [a]
filter' p [] = []
filter' p (x:xs)
  | p x       = x : filter' p xs
  | otherwise = filter' p xs

-- foldl :: (b -> a -> b) -> b -> [a] -> b
-- Balra asszociatív összegzés egy listán.
foldl' :: (b -> a -> b) -> b -> [a] -> b
foldl' f acc [] = acc
foldl' f acc (x:xs) = foldl' f (f acc x) xs

-- foldr :: (a -> b -> b) -> b -> [a] -> b
-- Jobbra asszociatív összegzés egy listán.
foldr' :: (a -> b -> b) -> b -> [a] -> b
foldr' f acc [] = acc
foldr' f acc (x:xs) = f x (foldr' f acc xs)

-- length :: [a] -> Int
-- Visszaadja egy lista hosszát.
length' :: [a] -> Int
length' [] = 0
length' (_:xs) = 1 + length' xs

-- reverse :: [a] -> [a]
-- Megfordít egy listát.
reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]

-- concat :: [[a]] -> [a]
-- Összefűz egy listát listákból egyetlen listává.
concat' :: [[a]] -> [a]
concat' [] = []
concat' (x:xs) = x ++ concat' xs

-- sum :: Num a => [a] -> a
-- Visszaadja egy számokból álló lista összegét.
sum' :: Num a => [a] -> a
sum' [] = 0
sum' (x:xs) = x + sum' xs

-- product :: Num a => [a] -> a
-- Visszaadja egy számokból álló lista szorzatát.
product' :: Num a => [a] -> a
product' [] = 1
product' (x:xs) = x * product' xs

-- and :: [Bool] -> Bool
-- Igazat ad vissza, ha a lista minden eleme igaz.
and' :: [Bool] -> Bool
and' [] = True
and' (x:xs) = x && and' xs

-- or :: [Bool] -> Bool
-- Igazat ad vissza, ha a lista bármely eleme igaz.
or' :: [Bool] -> Bool
or' [] = False
or' (x:xs) = x || or' xs

-- any :: (a -> Bool) -> [a] -> Bool
-- Igazat ad vissza, ha a lista bármely eleme megfelel a predikátumnak.
any' :: (a -> Bool) -> [a] -> Bool
any' p [] = False
any' p (x:xs) = p x || any' p xs

-- all :: (a -> Bool) -> [a] -> Bool
-- Igazat ad vissza, ha a lista minden eleme megfelel a predikátumnak.
all' :: (a -> Bool) -> [a] -> Bool
all' p [] = True
all' p (x:xs) = p x && all' p xs

-- take :: Int -> [a] -> [a]
-- Visszaadja a lista első n elemét.
take' :: Int -> [a] -> [a]
take' _ [] = []
take' n (x:xs)
  | n > 0     = x : take' (n-1) xs
  | otherwise = []

-- drop :: Int -> [a] -> [a]
-- Eldobja a lista első n elemét.
drop' :: Int -> [a] -> [a]
drop' _ [] = []
drop' n (_:xs)
  | n > 0     = drop' (n-1) xs
  | otherwise = xs

-- zip :: [a] -> [b] -> [(a, b)]
-- Két listát párok listájává kombinál.
zip' :: [a] -> [b] -> [(a, b)]
zip' [] _ = []
zip' _ [] = []
zip' (x:xs) (y:ys) = (x, y) : zip' xs ys

-- unzip :: [(a, b)] -> ([a], [b])
-- Egy párok listáját két listára bontja.
unzip' :: [(a, b)] -> ([a], [b])
unzip' [] = ([], [])
unzip' ((x, y):xs) = (x:xs', y:ys')
  where (xs', ys') = unzip' xs

-- elem :: Eq a => a -> [a] -> Bool
-- Ellenőrzi, hogy egy elem benne van-e a listában.
elem' :: Eq a => a -> [a] -> Bool
elem' _ [] = False
elem' e (x:xs) = (e == x) || elem' e xs

-- notElem :: Eq a => a -> [a] -> Bool
-- Ellenőrzi, hogy egy elem nincs-e benne a listában.
notElem' :: Eq a => a -> [a] -> Bool
notElem' _ [] = True
notElem' e (x:xs) = (e /= x) && notElem' e xs

-- head :: [a] -> a
-- Visszaadja a lista első elemét.
head' :: [a] -> a
head' (x:_) = x
head' [] = error "empty list"

-- tail :: [a] -> [a]
-- Visszaadja a listát az első elem nélkül.
tail' :: [a] -> [a]
tail' (_:xs) = xs
tail' [] = error "empty list"

-- init :: [a] -> [a]
-- Visszaadja a listát az utolsó elem nélkül.
init' :: [a] -> [a]
init' [_] = []
init' (x:xs) = x : init' xs
init' [] = error "empty list"

-- last :: [a] -> a
-- Visszaadja a lista utolsó elemét.
last' :: [a] -> a
last' [x] = x
last' (_:xs) = last' xs
last' [] = error "empty list"

-- maximum :: Ord a => [a] -> a
-- Visszaadja a lista legnagyobb elemét.
maximum' :: Ord a => [a] -> a
maximum' [x] = x
maximum' (x:xs) = max x (maximum' xs)
maximum' [] = error "empty list"

-- minimum :: Ord a => [a] -> a
-- Visszaadja a lista legkisebb elemét.
minimum' :: Ord a => [a] -> a
minimum' [x] = x
minimum' (x:xs) = min x (minimum' xs)
minimum' [] = error "empty list"

-- null :: [a] -> Bool
-- Ellenőrzi, hogy egy lista üres-e.
null' :: [a] -> Bool
null' [] = True
null' _ = False

-- length :: [a] -> Int
-- Visszaadja egy lista hosszát.
length'' :: [a] -> Int
length'' [] = 0
length'' (_:xs) = 1 + length'' xs

-- replicate :: Int -> a -> [a]
-- Létrehoz egy listát n példánnyal egy elemből.
replicate' :: Int -> a -> [a]
replicate' n x
  | n <= 0    = []
  | otherwise = x : replicate' (n-1) x

-- takeWhile :: (a -> Bool) -> [a] -> [a]
-- Visszaadja a leghosszabb prefixet, amely megfelel egy predikátumnak.
takeWhile' :: (a -> Bool) -> [a] -> [a]
takeWhile' _ [] = []
takeWhile' p (x:xs)
  | p x       = x : takeWhile' p xs
  | otherwise = []

-- dropWhile :: (a -> Bool) -> [a] -> [a]
-- Eldobja a leghosszabb prefixet, amely megfelel egy predikátumnak.
dropWhile' :: (a -> Bool) -> [a] -> [a]
dropWhile' _ [] = []
dropWhile' p (x:xs)
  | p x       = dropWhile' p xs
  | otherwise = x:xs

-- span :: (a -> Bool) -> [a] -> ([a], [a])
-- Két részre oszt egy listát: egy prefixre, amely megfelel egy predikátumnak, és a maradékra.
span' :: (a -> Bool) -> [a] -> ([a], [a])
span' _ [] = ([], [])
span' p xs@(x:xs')
  | p x       = let (ys, zs) = span' p xs' in (x:ys, zs)
  | otherwise = ([], xs)

-- break :: (a -> Bool) -> [a] -> ([a], [a])
-- Két részre oszt egy listát: egy prefixre, amely nem felel meg egy predikátumnak, és a maradékra.
break' :: (a -> Bool) -> [a] -> ([a], [a])
break' p = span' (not . p)

-- lines :: String -> [String]
-- Egy karakterláncot sorok listájává bont.
lines' :: String -> [String]
lines' [] = []
lines' s = let (l, s') = break' (== '\n') s
           in l : case s' of
                    []      -> []
                    (_:s'') -> lines' s''

-- words :: String -> [String]
-- Egy karakterláncot szavak listájává bont.
words' :: String -> [String]
words' [] = []
words' s = let (w, s') = break' (== ' ') s
           in w : case s' of
                    []      -> []
                    (_:s'') -> words' s''

-- unlines :: [String] -> String
-- Sorok listáját egyetlen karakterlánccá egyesít.
unlines' :: [String] -> String
unlines' [] = []
unlines' (l:ls) = l ++ '\n' : unlines' ls

-- unwords :: [String] -> String
-- Szavak listáját egyetlen karakterlánccá egyesít.
unwords' :: [String] -> String
unwords' [] = []
unwords' (w:ws) = w ++ case ws of
                         [] -> []
                         _  -> ' ' : unwords' ws

-- zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
-- Két listát egy függvény segítségével kombinál.
zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith' _ [] _ = []
zipWith' _ _ [] = []
zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys

-- unzipWith :: (a -> (b, c)) -> [a] -> ([b], [c])
-- Egy lista elemeit két listára bontja egy függvény segítségével.
unzipWith' :: (a -> (b, c)) -> [a] -> ([b], [c])
unzipWith' _ [] = ([], [])
unzipWith' f (x:xs) = let (b, c) = f x
                          (bs, cs) = unzipWith' f xs
                      in (b:bs, c:cs)