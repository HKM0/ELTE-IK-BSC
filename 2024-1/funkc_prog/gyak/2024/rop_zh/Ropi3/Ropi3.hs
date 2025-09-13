module Ropi3 where
import Data.Char

doubleSecond :: Num a => [a] -> [a]
doubleSecond (a:b:o) = a:b*2:o
doubleSecond [a] = [a]
doubleSecond _ = []
{-
Különböző típusú adatok vannak benne amit a haskell nem szeret
-}