module Teszt2 where

brew :: (Integral a, Num b) => (b -> Bool) -> (b -> b) -> [[a]] -> b
brew _ _ [] = 0
brew pred func (x:xs) 
    | pred(sum(map func x)) = sum(map func x)