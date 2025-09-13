queens 0 i = [[]]
queens n i = [ q:b | b <- queens (n - 1) i , q <- [0..i-1], safe' q b 1]

safe' _ [] _ = True
safe' q (x:xs) i = (q /= x && abs (q-x) /= i) && safe' q xs (i+1)

--safe q b = and [not (checks q b i) | i <- [0..(length b) - 1]]

--checks q b i = q == b !! i || abs (q - b !! i) == i + 1

--1:[3,1,4,2,0]


queens' i = queens i i 

