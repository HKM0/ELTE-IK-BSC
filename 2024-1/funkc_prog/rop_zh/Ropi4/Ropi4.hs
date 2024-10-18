module Ropi4 where
import Data.List
numbers :: [Int]
numbers = [x | x <- [100,98..1], mod x 3 == 0 && mod x 5 /= 0 || mod x 5 == 0 && mod x 3 /= 0]
