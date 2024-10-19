module Hazi1 where
-- 1. Feladat --

intExpr1, intExpr2, intExpr3 :: Int
intExpr1 = 5999
intExpr2 = 6905
intExpr3 = 307

charExpr1, charExpr2, charExpr3 :: Char 
charExpr1 = 'L'
charExpr2 = 'f'
charExpr3 = 'Q'

boolExpr1, boolExpr2, boolExpr3 :: Bool
boolExpr1 = False
boolExpr2 = not True
boolExpr3 = not (not True)

-- 2. feladat --

inc :: Int -> Int
inc x = x + 1

double :: Int -> Int
double x = 2 * x

-- 3. feladat --

seven1 :: Int
seven2 :: Int
seven3 :: Int

seven1 = inc(double(inc(double(inc(0)))))
seven2 = inc(double(inc(inc(inc(0)))))
seven3 = inc(inc(inc(double(double(inc(0))))))
