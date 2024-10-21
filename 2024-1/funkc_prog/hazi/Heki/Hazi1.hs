module HAZI1 where

--  1. Kifejezések
intExpr1 :: Int
intExpr1 = 1 
intExpr2 :: Int 
intExpr2 = 2 
intExpr3 :: Int 
intExpr3 = 3 

charExpr1 :: Char 
charExpr1 = 's'
charExpr2 :: Char
charExpr2 = 'b' 
charExpr3 :: Char 
charExpr3 = 'a' 

boolExpr1 :: Bool
boolExpr1 = True
boolExpr2 :: Bool
boolExpr2 = False
boolExpr3 :: Bool
boolExpr3 = True

--  2. +1, *3
inc :: Integer -> Integer
inc x = x + 1
triple :: Integer -> Integer
triple x = x * 3

--  3. Tizenhárom
thirteen1 :: Integer
thirteen1 = inc(triple(inc(triple (inc 0))))
thirteen2 :: Integer
thirteen2 = inc(inc(inc(inc(inc(inc(inc(inc(inc(inc(inc(inc(inc 0))))))))))))
thirteen3 :: Integer
thirteen3 = inc(inc(inc(inc(triple(triple(inc 0))))))

--  4. Osztási maradék
cmpRem5Rem7 :: Integer -> Bool
cmpRem5Rem7 x = mod x 5 > mod x 7

-- 5. Típusszignatúra
foo :: Int -> Bool -> Bool
foo x y = (x > 1) == y

bar :: Bool -> Int -> Bool
bar x y = foo y x == x 
