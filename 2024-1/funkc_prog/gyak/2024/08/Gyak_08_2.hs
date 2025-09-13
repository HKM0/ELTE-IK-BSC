-- Paraméteres data

{- 

data Maybe a = Nothing | Just a
    deriving (Show, Eq)

-}

-- Definiáljuk a `safeHead :: [a] -> Maybe a` függvényt, amely visszaadja egy lista első elemét `Just elem` formában. Ha a lista üres, adjon vissza `Nothing`-ot.

safeHead :: [a] -> Maybe a
safeHead = undefined

-- Definiáljuk a `safeDiv :: Double -> Double -> Maybe Double` függvényt, amely megvalósítja a biztonságos osztás műveletét. Ha a második paraméter 0, adjon vissza a függvény `Nothing`-ot, egyébként pedig az osztás eredményét.

safeDiv :: Double -> Double -> Maybe Double
safeDiv = undefined

-- Definiáld a `safeIndex :: [a] -> Int -> Maybe a` függvényt, ami biztonságos módon adja vissza egy lista n-edik elemét. Ha az index túl kicsi vagy túl nagy az eredmény legyen `Nothing`, különben az eredmény legyen a lista n-edik eleme `Just`-ba csomagolva. Az indexelés kezdődjön 0-tól.

safeIndex :: [a] -> Int -> Maybe a
safeIndex = undefined

{-
Tesztesetek:

safeIndex [] 3 == Nothing
safeIndex [1] 0 == Just 1
safeIndex [1,2,3,4] (-2) == Nothing
safeIndex [1,2,3] 2 == Just 3
safeIndex [1..10] 33 == Nothing
safeIndex "haskell" 4 == Just 'e'
safeIndex [1..] 9 == Just 10 
-}

--Adott egy `Maybe a` értékeket tartalmazó lista. Számold meg, hány `Nothing` szerepel a listában!


countNothings :: [Maybe a] -> Int
countNothings = undefined


{-
countNothings [] == 0
countNothings [Just 3, Just 5] == 0
countNothings [Just "Haskell", Just "Clean"] == 0
countNothings [Just "Haskell", Just "Clean", Nothing] == 1
countNothings [Nothing, Just "Haskell", Just "Clean", Nothing] == 2
countNothings [Nothing, Just "Haskell", Nothing, Just "Clean", Nothing] == 3
countNothings [Nothing, Just Nothing, Nothing, Just Nothing, Nothing] == 3
-}

-- Egy `Maybe`-be csomagolt elemet fűzz egy lista elejére! Ha az elem `Nothing`, az eredmény az eredeti lista legyen!


addBefore :: Maybe a -> [a] -> [a]
addBefore = undefined

{-
addBefore (Just 1) [2,3,4] == [1,2,3,4]
addBefore (Just 'E') "LTE" == "ELTE"
addBefore Nothing [True, False] == [True, False]
-}

------------------------------------------------------

{-
Magasabbrendű függvények

    - Függvény a paraméter
    - (Függvény a visszatérési érték)

Curry-zés 

    - Minden függvény tulajdonképpen 1 paraméteres
    Pl.:
    
max 1 5 == (max 1) 5
   
    - Mi a típusa a `(max 1)` kifejezésnek?
-}


add3 :: (Int -> (Int -> (Int -> (Int))))    --  :: Int -> Int -> Int -> Int
add3 a b c = a+b+c


-- Mi a típusa az `add3 1` kifejezésnek?


{-

Szeletek

- Operátorokból képzett (egyparaméteres) függvények
- Pl.: `(+3), (<2), (*10)`
- Magasabb rendű függvények paraméterezésére használhatóak

1. Definiáld az `apply :: (a -> b) -> a -> b` függvényt, amely alkalmazza a paraméterül kapott szeletet a második paraméterére! 

2. Definiáld az `applyTwice :: (a -> a) -> a -> a` függvényt, amely kétszer alkalmazza a paraméterül kapott szeletet a második paraméterére! 
-}

-- Elemenként feldolgozás

-- Definiáljuk újra az elemenként feldolgozás függvényét!
map' :: (a -> b) -> [a] -> [b]
map' = undefined

-- map' (+10) [1..10] == [11,12,13,14,15,16,17,18,19,20]


-- Szűrés

-- Definiáljuk újra a szűrés feldolgozás függvényét!
filter' :: (a -> Bool) -> [a] -> [a]
filter' = undefined


-- filter (>5) [1..10] == [6,7,8,9,10]


-- Definiáld a ($$) függvényt, amely egy függvényt alkalmaz egy értékre.
infixr 0 $$
($$) :: (a -> b) -> a -> b
f $$ a = undefined
-- Az eredeti függvény a ($).

-- Definiáld a takeWhile' függvényt, amely egy lista elejéről addig tartja meg az elemeket, amíg egy adott tulajdonság folyamatosan teljesül.
takeWhile' :: undefined
takeWhile' = undefined

-- Definiáld a dropWhile' függvényt, amely egy lista elejéről addig dobálja el az elemeket, amíg egy adott tulajdonság folyamatosan teljesül.
dropWhile' :: undefined
dropWhile' = undefined

-- Definiáld a find' függvényt, amely visszaadja az első adott tulajdonságú elemet egy listából, ha létezik olyan.
find' :: undefined
find' = undefined
-- Az eredeti függvény a Data.List-ben található.