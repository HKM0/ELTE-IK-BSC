
-- [1,2,3]
-- homogén
-- polimorf

fives = 5 : fives
-- 5 : fives

second :: [a] -> a
second (_:y:_) = y
second _       = error "valami"

(+:+) :: [a] -> [a] -> [a]
(+:+) [] ls = ls
(+:+) ls [] = ls
(+:+) (x:xs) ls = x : xs +:+ ls

-- (1:[2]) +:+ [3,4]
-- 1 : (2:[]) +:+ [3,4]
--     2 : [] +:+ [3,4]
--         [3,4] 

--sum [] = 0
--sum (x:xs) = x + sum xs 


concat' :: [[a]] -> [a]
concat' [] = []
concat' (x:xs) = x ++ concat' xs

-- concat' [[1,2,3],[], [4,5]]
-- [1,2,3] ++ (concat' [[], [4,5]])
--             [] ++ concat' [[4,5]]
--                   [4,5] ++ concat' []
--                            []

--[1,2,3] ++ ([1,2] ++ ([4,5] ++ []))
--([1,2,3] ++ [1,2]) ++ [4,5] ++ []

reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]


reverse'' :: [a] -> [a]
reverse'' ls = revH ls []

revH []     acc = acc
revH (x:xs) acc = revH xs (x:acc)






