module ROPI1 where

f :: Int -> Int
f x = x * 4

g :: Int -> Int
g x = x + 1

eight1 :: Int
eight1 = g(g(g(g(f(g 0)))))
eight2 :: Int
eight2 = f(g (g 0))