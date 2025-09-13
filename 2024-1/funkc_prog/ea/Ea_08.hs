-- type String = [Char] 
-- data Bool = False | True
-- data List a = Nil | Cons a (List a)

type Year = Int
--type String = [Char]

--type Tuple = (Int, Int)
--type Tuple a = (a, a)
--type Tuple a b = (a,b)
type PredOn a = a -> Bool

data MyBool = MyFalse | MyTrue-- deriving (Show)
-- Eq, Ord, Show, Read, Enum

instance Show MyBool where
  show (MyFalse) = "hamis"
  show (MyTrue)  = "igaz"


es MyTrue MyTrue = MyTrue
es _      _      = MyFalse 

-- newtype 

-- (Int, Int)
data Point0 = Point Int Int

data Dat = Dat Int Int


--f :: Dat -> Point -> Dat
--f :: (Int, Int) -> (Int, Int) -> (Int, Int)

--data Point = P0 | P2 Int Int | P3 Int Int Int deriving Show 

--data Point a = P2 a a | P3 a a a deriving Show
--data Point a = P2 { x :: a, y :: a} | P3 {x :: a, y :: a, z :: a} deriving Show

data FunDat a = Fun (a -> a) a | Dat2 a
instance Show a => Show (FunDat a) where
  show (Dat2 x) = show x 
  show (Fun f e) = show (f e)


--x :: Point a -> a
--x (P2 a b) = a 
--x (P3 a b c) = a
-- | P4 ...
-- [Point]

-- [(Int, Int)]

newtype N = N Int deriving Show

data D = D Int deriving Show 

fN :: N -> Int
fN (N _) = 1

fD :: D -> Int
fD (D _) = 1

f e = f e






