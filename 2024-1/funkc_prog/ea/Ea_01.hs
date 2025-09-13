-- Bozó István
{-
bozo_i@inf.elte.hu
D 2.518
Fogadóóra: P 11-12
Konzultáció: P 14-16, 00-803 Nyelvi labor
Előadás: 10:15 - 11:45
http://lambda.inf.elte.hu/
https://tms.inf.elte.hu/
https://learnyouahaskell.com/chapters
-}

-- 5!-> 5 * 4!
fact 0 = 1
fact n = n * fact (n-1)

-- fact 3
-- 3 * fact 2 
-- 3 * 2 * fact 1
-- 3 * 2 * 1 * fact 0
--             1
fact' n = product [1..n]
