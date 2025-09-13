
reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]

reverse'' :: [a] -> [a]
reverse'' ls = revH ls []
  where
    revH []     acc = acc
    revH (x:xs) acc = revH xs (x:acc)
--    lls = tail ls
--    suM = sum lls
--    (f,s) = (1,2)

-- isPrefixOf "alma" "alma"
-- isPrefixOf "asda" "asd"
isPrefixOf :: Eq a => [a] -> [a] -> Bool -- Eq
isPrefixOf [] _  = True
isPrefixOf _  [] = False
isPrefixOf (x:xs) (y:ys)
  | (x == y)  = isPrefixOf xs ys
  | otherwise = False

and' :: [Bool] -> Bool
and' [] = True
and' (x : xs) = x && and' xs
--  | x          = and' xs
--  | otherweise = False


-- inits' "abc" -> ["", "a", "ab", "abc"]
inits' :: [a] -> [[a]]
inits' [] =  [[]]
inits' (x:xs) = [] : insH x (inits' xs)
  where
    insH e []     = []
    insH e (l:ls) = (e : l) : insH e ls

inits'' :: [a] -> [[a]]
inits'' [] = [[]]
inits'' (x:xs) = [] : [ x : ys | ys <- inits'' xs]

-- a:"bc"
-- 'a' -> [] : ""     -- "a"
--        "b"    -- "ab"
--        "bc"   -- "abc"

-- 'b':"c"
-- 'b' -> [] : ""     -- "b"
--        "c"    -- "bc"

-- 'c':""
-- 'c' -> "" -> [[], "c"]

-- "" -> [""]

deletions :: [a] -> [[a]]
deletions [] = []
deletions (x:xs) = xs : [ x : ys | ys <- deletions xs]

insertions :: a -> [a] -> [[a]]
insertions e [] = [[e]]
insertions e ls@(x:xs) = (e : ls) : [ x : ys | ys <- insertions e xs]


permutations [] = [[]]
permutations ls@(x:xs) =  [ zs | ys <- permutations xs, zs <- insertions x ys]   

