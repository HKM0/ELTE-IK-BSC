-- https://catalog.inf.elte.hu/

-- 5!-> 5 * 4!
fact 0 = 1
fact n = n * fact (n-1)

-- fact 3
-- 3 * fact 2 
-- 3 * 2 * fact 1
-- 3 * 2 * 1 * fact 0
--             1
fact' n = product [1..n]

iSqrt :: Integral a => a -> a
iSqrt n = round (sqrt (fromIntegral n))


f :: Double -> Double -> Bool
f a b = a < b 
