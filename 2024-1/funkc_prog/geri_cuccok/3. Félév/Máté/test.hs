module Test where
import Data.List

compress xs = [(head x, length x) | x<- group xs]