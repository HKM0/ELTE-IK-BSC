module Hazi2 where

-- x[szám],y[szám] -> vektorok beírásának helye
-- a,b,c... -> számok (nem vektor) beírásának helye

-- 1. feladat

addV :: (Double,Double) -> (Double,Double) -> (Double,Double)
addV x y = (fst x + fst y,snd x + snd y)

subV :: (Double,Double) -> (Double,Double) -> (Double,Double)
subV x2 y2 = (fst x2 - fst y2,snd x2 - snd y2)

-- 2. feladat

scaleV :: Double -> (Double,Double) -> (Double,Double)
scaleV c x3 = (c*fst x3,c*snd x3)

-- 3. feladat

scalar :: (Double,Double) -> (Double,Double) -> Double
scalar x4 y4 = fst x4 * fst y4 + snd x4 * snd y4

-- Bónusz feladat:

vecLength :: (Double,Double) -> Double
vecLength x7 = sqrt((fst x7)**2 + (snd x7)**2)
