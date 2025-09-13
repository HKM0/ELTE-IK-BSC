-- lista minták -- ismétlés
-- lista generátor
-- nub
-- minimum
-- everyNth

-- []
-- (x:[])  -- [x]
-- (x:xs)
-- (x:y:[]) -- [x,y]
-- (x:y:xs)
-- (x:y:z:xs)


-- (xs:x)
-- x _


-- f :: Int -> Bool
-- f _ = True
{-
allFst :: [(a, Int)] -> [a]
allFst [] = []
allFst (x:xs)
  | snd x < 100 = fst x : allFst xs
  | otherwise   = allFst xs
-}

allFst :: [(a, Int)] -> [a]
allFst [] = []
allFst ((a,b):xs)
  | b < 100   = a : allFst xs
  | otherwise = allFst xs


fLC ls = [ (x, y) | x <- ls, y <- [x.. x*3] ]

allFstLC :: [(a,Int)] -> [a]
allFstLC ls = [ x | (x,y) <- ls, y < 100]


nonEmpties :: [[a]] -> [[a]]
nonEmpties [] = []
nonEmpties (l@(_:_):xs) = l : nonEmpties xs
nonEmpties (x:xs)        = nonEmpties xs
{-
  | not (null x) = x : nonEmpties xs
  | otherwise    = nonEmpties xs
-}

nonEmptiesLC :: [[a]] -> [[a]]
nonEmptiesLC ls = [ l | l@(x:xs) <- ls ]

nub' :: Eq a => [a] -> [a]
nub' []     = []
nub' (x:xs) = x : nub' [ e | e <- xs, e /= x]

nub'' :: Eq a => [a] -> [a]
nub'' [] = []
nub'' (x:xs)
  | elem x xs = nub'' xs
  | otherwise = x : nub'' xs

minimum' :: Ord a => [a] -> a
minimum' [x] = x
minimum' (x:xs) 
  | x < ml    = x
  | otherwise = ml
    where
      ml = minimum' xs

minimum'' :: Ord a => [a] -> a
minimum'' [x] = x
minimum'' (x:xs) = x `min` (minimum'' xs)



g123 :: Int -> Int
g123 = undefined


minimum''' [x] = x
minimum''' (x:y:xs)
  | x < y     = minimum''' (x:xs)
  | otherwise = minimum''' (y:xs)

sum' [] = 0
sum' (x:xs) = x + sum' xs

{-
everyNth i ls = everyH i ls
  where
    everyH 0 (x:xs) = ... everyH i xs
-}

everyNth :: Integer -> [a] -> [a]
everyNth i ls = [ e | (e, 0) <- zip ls (cycle [0..i-1])]

-- type String = [Char] 
-- data Bool = False | True
-- data List a = Nil | Cons a (List a)

