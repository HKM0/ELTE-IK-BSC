
reverse' :: [a] -> [a]
reverse' []     = []
reverse' (x:xs) = reverse' xs ++ [x]


reverse'' :: [a] -> [a]
reverse'' ls = revH ls []
  where
    revH []     acc = acc
    revH (x:xs) acc = revH xs (x:acc)

reverse3 :: [a] -> [a]
--reverse3 ls = foldl (\acc x -> x : acc) [] ls  
reverse3 = foldl (flip (:)) []  
-- flip f x y = f y x

-- reverse3 [1,2,3]
-- foldl (flip (:)) [] [1,2,3]

--(++) []     l2 = l2
--(++) (x:xs) l2 = x : (xs ++ l2)

plpl :: [a] -> [a] -> [a]
plpl l1 l2 = foldr (:) l2 l1

concat' :: [[a]] -> [a]
concat' lls = foldr (++) [] lls 

fib 0 = 1
fib 1 = 1
fib n = fib (n-1) + fib (n-2)

iterate' :: (a -> a) -> a -> [a]
iterate' f x = x : iterate' f (f x)

-- (\(x, y) -> (y, x + y) )

fibs = map snd . iterate (\(x, y) -> (y, x + y)) $ (0,1)


(.:.) :: (b -> c) -> (a -> b) -> a -> c
--(.:.) f g = (\x -> f (g x))
(.:.) f g x = f (g x)
--(.:.) f g = h
--  where
--    h x = f (g x)


dropWhile' :: (a -> Bool) -> [a] -> [a]
dropWhile' p [] = []
dropWhile' p (x:xs)
  | p x       = dropWhile' p xs
  | otherwise = x:xs


trim :: (String -> String)
trim = dropWhile (== ' ')

dropSpaces :: String -> String
dropSpaces = reverse . trim . reverse . trim

-- (== [])
-- null 

