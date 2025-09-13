import Data.List
import Data.Function

-- map f ls = [ f e | e <- ls]

mapMap :: (a -> b) -> [[a]] -> [[b]]
mapMap = map . map
-- f (g x) == (f . g) x

{-
data List a = Nil | Cons a (List a) deriving (Show)
infixr 5 `Cons`

toList :: [a] -> List a
toList [] = Nil
toList (x:xs) = x `Cons` (toList xs)

instance Foldable List where
  foldr f e Nil = e
  foldr f e (Cons x xs) = x `f` foldr f e xs

-}
uniq :: Ord a => [a] -> [a]
uniq =  map head . filter g . group . sort
  where
    g (x:[]) = True
    g _      = False


