import Data.Maybe
--import Prelude

data Koordinata = Koordinata Int Int
data Maybe' a = Goon | TO_U a

data Answer = No | Maybe | Yes deriving (Eq, Show)

data CardinalPoint = North | East | South | West deriving (Eq, Show)

turnleft :: CardinalPoint -> CardinalPoint
turnleft North = East
turnleft East = South
turnleft South = West
turnleft West = North

data Bit = Zero | One deriving (Eq, Show)

type Binary = [Bit]

plus1 :: Binary -> Binary
plus1 (Zero:xs) = One : xs
plus1 (One:xs) = Zero : plus1 xs
plus1 [] = [One]

add :: Binary -> Binary -> Binary
add bitA bitB = addHelp bitA bitB Zero
    where 
        addHelp :: Binary -> Binary -> Bit -> Binary
        addHelp [] [] tovabbErtek 
            | tovabbErtek == One = [One]
            | otherwise = []

        addHelp [] bitB tovabbErtek = addHelp [Zero] bitB tovabbErtek
        addHelp bitA [] tovabbErtek = addHelp bitA [Zero] tovabbErtek

        addHelp (bitA : a_Maradek) (bitB : b_Maradek) tovabbErtek
            | bitSzumma bitA bitB tovabbErtek == (Zero, Zero) = Zero : addHelp a_Maradek b_Maradek Zero
            | bitSzumma bitA bitB tovabbErtek == (One, Zero) = One : addHelp a_Maradek b_Maradek Zero
            | bitSzumma bitA bitB tovabbErtek == (Zero, One) = Zero : addHelp a_Maradek b_Maradek One
            | bitSzumma bitA bitB tovabbErtek == (One, One) = One : addHelp a_Maradek b_Maradek One
            | otherwise = error "baj van Nber!"
        
        bitSzumma :: Bit -> Bit -> Bit -> (Bit, Bit)
        bitSzumma Zero Zero Zero = (Zero, Zero)

        bitSzumma One Zero Zero = (One, Zero)
        bitSzumma Zero One Zero = (One, Zero)
        bitSzumma Zero Zero One = (One, Zero)

        bitSzumma One One Zero = (Zero, One)
        bitSzumma Zero One One = (Zero, One)
        bitSzumma One Zero One = (Zero, One)

        bitSzumma One One One = (One, One)

safeHead :: [a] -> Maybe a
safeHead [] = Nothing
safeHead (x:xs) = Just x

safeDiv :: Integral a => a -> a -> Maybe a
safeDiv x 0 = Nothing
safeDiv x y = Just (div x y)

data Bandi nev = Goth nev | Pass | Other nev deriving (Show)
bandiGoth :: Bandi String
bandiGoth = Goth "goth woman numero uno"

data Either2 a b = Left2 a | Right2 b deriving (Show, Eq)

-- maybe ertek osszeadasa
maybeAdd :: Num a => Maybe a -> Maybe a -> Maybe a
maybeAdd (Just szam1) (Just szam2) = Just (szam1 + szam2)
maybeAdd (Just szam1) _ = Just szam1
maybeAdd _ (Just szam2) = Just szam2
maybeAdd _ _ = Nothing

-- adott elem pozicioja
elemIndex :: Eq a => a -> [a] -> Maybe Int
elemIndex x xs = elemIndexSeged x xs 0
    where 
        elemIndexSeged :: Eq a => a -> [a] -> Int -> Maybe Int
        elemIndexSeged _ [] _ = Nothing
        elemIndexSeged x (y:ys) index 
            | x==y = Just index
            | otherwise = elemIndexSeged x ys (index + 1)

-- maybe lista osszegzese
maybeSum :: Num a => [Maybe a] -> a
maybeSum [] = 0
maybeSum (Nothing : xs) = maybeSum xs
maybeSum ((Just n) : xs) = n + maybeSum xs