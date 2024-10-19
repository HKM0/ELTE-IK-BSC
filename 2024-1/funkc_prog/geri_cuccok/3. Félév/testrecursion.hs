module Testrecursion where

faktr :: Integer -> Integer
faktr 0 = 1
faktr n = n* faktr (n-1)

fakts :: Integer -> Integer
fakts n = product [1..n]