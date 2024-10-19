module Gy02 where

{- /: törtszámokat tud osztani
div: egész számokat tud osztani

 ghci-ben:
 :i <kifejezés> : Információt leht kérni az adott kifejezésről.
 
 Mintaillesztés (angolul pattern-matching)
 
 
 
 
 
 
 
 
 
 -}

f :: Int -> Int --totális függvény
f 0 = 10
f x = x + 1
--f y = y + 2
-- totális függvény: Olyan függvény, amely minden lehetséges bemeneti értékre működik.


-- Mintaillesztés felülről lefelé történik, első illeszkedés fut.
g :: Int -> Int -- parciális függvény(nem minden számra ad vissza eredményt)
g 0 = 10
-- Parciális függvény: Olyan függvény, amely nem működik minden lehetséges bemeneti érték esetén

neg :: Bool -> Bool
neg False = True
neg True = False

(&&&) :: Bool -> Bool -> Bool
True &&& True = True
True &&& False = False
False &&& True = False
False &&& False = False
(&&&&) :: Bool -> Bool -> Bool
True &&&& True = True
_ &&&& _ = False

-- Haskell lusta kiértékelésű nyelv: Csak azokat a kifejezeséket értékeli ki, amiket feltétlenül kell, a többit nem.

(&&&&&) :: Bool -> Bool -> Bool
False &&&&& _ = False
True &&&&& x = x

(&&&&&&) :: Bool -> Bool -> Bool
_ &&&&&& False = False
x &&&&&& True = x

(|||) :: Bool -> Bool -> Bool
True ||| _ = True
_ ||| x = x

-- Új típus:
-- Eddig voltak: Int, Integer, Char, String, Float, Double, Bool

-- Új típus: rendezett pár (,)
-- rendezett n-es

-- Függvénye: (,)
-- fst :: (a,b) -> a
-- snd :: (a,b) -> b

mirror :: (Int, Int) -> (Int, Int)
mirror x =(fst x, -(snd x)) 

mirror' :: (Int, Int) -> (Int, Int)
mirror' (x,y) =(x, -(y))

h :: (Int, Int) -> (Int, Int)
h (0,0) = (10,10)
h (x,y) =(x+1, y+1)

mirrorXZ :: (Int, Int, Int) -> (Int, Int, Int)
mirrorXZ (x,y,z) = (x,-y,z)
