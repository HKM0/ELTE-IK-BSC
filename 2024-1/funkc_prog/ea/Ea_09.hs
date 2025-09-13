
-- data Maybe a = Nothing | Just a

{-
h e = i 3 e
  where
    i x k = x + k
-}


safeHead :: [a] -> Maybe a
safeHead (x:xs) = Just x
safeHead _      = Nothing

-- data Either a b = Left a | Right b 

data List a = Nil | Cons a (List a) deriving (Show)

infixr 5 `Cons`

headL :: List a -> a
headL (Cons x xs) = x


lastL :: List a -> a
lastL (Cons x Nil) = x
lastL (Cons x xs)  = lastL xs

sum' :: [Int] ->  Int
sum' [] = 0
sum' (x:xs) = x + sum' xs


product' :: [Int] -> Int
product' [] = 1
product' (x:xs) = x * product' xs

foldR :: (a -> b -> b) -> b -> [a] -> b
foldR f e [] = e
foldR f e (x:xs) = x `f` foldR f e xs


