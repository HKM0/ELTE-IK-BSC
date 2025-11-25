newtype Square = S (Char, Int) deriving (Show, Eq)

s :: (Char, Int) -> Square
s (oszlop, sor)
    | oszlop >= 'A' && oszlop <='H' && sor >= 1 && sor <= 8 = S (oszlop, sor)


newtype IPoint = P (Int, Int) deriving (Show, Eq)
mirrorO :: IPoint -> IPoint
mirrorO (P (x,y)) = P (-x, -y)

mirrorP :: IPoint -> IPoint -> IPoint
mirrorP (P (xA, yA)) (P (xB, yB)) = P (2*xA - xB, 2*yA - yB)