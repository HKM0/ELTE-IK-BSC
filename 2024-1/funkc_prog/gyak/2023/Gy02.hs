module Gy02 where 





{-
1. MiniZH

1, Létezik-e a kifejezés haskellben? Ha igen, mi (lehet) a típusa, 
ha nem miért nem helyes?

3 (0,5 pont) Int, Integer, Double, Float, Integral, Num 
false (0,5 pont), helyes: False 

2, Sorolj fel 3 típust amit ismersz haskellből! (1 pont)
Int, Integer, Double, Float, String, Bool, Char
-------------------------------------------------------------------------------------
-}








-- Osztó 
divide :: Int -> Int -> Bool 
divide x y = (x `mod` y) == 0

-- Maradékos osztás
even' :: Int -> Bool 
even' x = (x `mod` 2) == 0

odd' :: Int -> Bool
odd' x = (x `mod` 2) == 1

{-
Szökőév:
    - osztható 4-gyel
    - nem osztható 100-zal
    - kivéve, ha osztható 400-zal
-}
isLeapYear :: Int -> Bool 
isLeapYear x = (x `mod` 4 == 0) && ((x `mod` 100 /= 0) || (x `mod` 400 == 0))

-- Típusosztályok - típuskonverziók - egyszerű polimorfizmus
    -- Num
        -- Integral (Int, Integer)
        -- RealFrac (Double, Float) 

-- Hogyan adjunk össze egész számokat?
addIntegrals :: (Integral a, Integral b, Integral c) => a -> b -> c
addIntegrals x y = (fromIntegral x) + (fromIntegral y)

-- Hogyan adjunk össze bármilyen számokat?
plus' :: (Num a) => a -> a -> a
plus' a b = a + b 

-- Parametrikus polimorfizmus
id' :: a -> a 
id' x = x

-- Típusosztályokról további infó :i <Típusosztály>

-- Infix/prefix függvényalkalmazás
-- Függvények kötési erőssége - GHCi :i <kifejezés> 
-- infixl 6 +
-- ((2 + 3) + 4)

-- Mintaillesztés 
-- Totális vs parciális függvény

-- Totális fv.: minden bemeneti értékre tud adni eredményt
-- Parciális fv.: nem minden bemeneti értékre tud adni eredményt
f 0 = 2
f 2 = 8
f x = x * x -- x ^ 2 
-- f 3 = 6


not' :: Bool -> Bool
not' True = False 
not' False = True 

(&&&) :: Bool -> Bool -> Bool
(&&&) True True = True 
(&&&) True False = False 
(&&&) False True = False 
(&&&) False False = False


(|||) :: Bool -> Bool -> Bool
(|||) = undefined


-- Lusta kiértékelés
(&&&&) :: Bool -> Bool -> Bool
(&&&&) True x = x 
(&&&&) False _ = False

(||||) :: Bool -> Bool -> Bool
(||||) = undefined


-- Új típus: rendezett pár (,) - létezik rendezett n-es is (,,) (,,,) ... 
-- Homogén vs heterogén adatszerkezet
-- Homogén: csak azonos típusú értékek lehetnek benne 
-- Heterogén: különböző típusú értékek is lehetnek benne

fst' :: (a, b) -> a 
fst' (x,_) = x  

snd' :: (a, b) -> b 
snd' (_,y) = y 

addVectors :: (Num a, Num b) => (a, b) -> (a, b) -> (a,b)
addVectors (a1,b1) (a2,b2) = (a1 + a2 , b1 + b2) 
addVectors' x y = (fst x + fst y, snd x + snd y)

-- Pitagoraszi számhármasok 
pythagoras :: (Int, Int, Int) -> Bool 
pythagoras = undefined

-- Feladat: Írjuk meg a rendezett 3-as elérő függvényeit fst3, snd3, thd3


-- Hogyan érjük el az elemeket?
    -- függvénnyel
    -- mintaillesztéssel













