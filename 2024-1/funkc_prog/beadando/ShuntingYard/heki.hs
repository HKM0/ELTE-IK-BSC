module Beadando where
import Text.Read
import Data.List

data Dir = InfixL | InfixR deriving (Show, Eq, Ord)

data Tok a = BrckOpen | BrckClose | TokLit a | TokBinOp (a->a->a) Char Int Dir | TokFun (a->a) String


--TokBinOp (muvelet operator haskellben) (matek muvelet jel) (kotesierosseg) (kotesiirany)
instance Show a => Show (Tok a) where
    show BrckOpen = "BrckOpen"
    show BrckClose = "BrckClose"
    show (TokLit a) = "TokLit" ++ " " ++ show a
    show (TokBinOp operator muvelet kotesierosseg kotesiirany) = "TokBinOp" ++ " '" ++ [muvelet] ++ "' " ++ show kotesierosseg ++ " " ++ show kotesiirany
    show (TokFun a b) = "TokFun" ++ " " ++ (filter (/='\"') (show b))

instance Eq a => Eq (Tok a) where
    BrckOpen == BrckOpen = True
    BrckClose == BrckClose = True
    (TokLit a) == (TokLit b) = a==b
    TokBinOp operatorA muveletA kotesierossegA kotesiiranyA == TokBinOp operatorB muveletB kotesierossegB kotesiiranyB = muveletA == muveletB && kotesierossegA == kotesierossegB && kotesiiranyA == kotesiiranyB    
    (TokFun a b) == (TokFun a2 b2) = b==b2 
    a == b = False

---------------------------------------------------------

basicInstances = 0 -- Ez a tesztelőnek szükséges! 
 
type OperatorTable a = [(Char, (a -> a -> a, Int, Dir))] 
 
tAdd, tMinus, tMul, tDiv, tPow :: Floating a => Tok a 
tAdd = TokBinOp (+) '+' 6 InfixL 
tMinus = TokBinOp (-) '-' 6 InfixL 
tMul = TokBinOp (*) '*' 7 InfixL 
tDiv = TokBinOp (/) '/' 7 InfixL 
tPow = TokBinOp (**) '^' 8 InfixR 
operatorTable :: Floating a => OperatorTable a 
operatorTable = [ 
  ('+', ((+), 6, InfixL)),  ('-', ((-),  6, InfixL)),  ('*', ((*), 7, InfixL)), 
  ('/', ((/), 7, InfixL)),  ('^', ((**), 8, InfixR)) 
  ]

-------------------------------------------------------

operatorFromChar :: OperatorTable a -> Char -> Maybe (Tok a)
operatorFromChar [] _ = Nothing
operatorFromChar ((operator, (muvelet, kotesierosseg, kotesiirany)):xs) b
    | operator == b = Just (TokBinOp muvelet operator kotesierosseg kotesiirany)
    | otherwise = operatorFromChar xs b

getOp :: Floating a => Char -> Maybe (Tok a) 
getOp = operatorFromChar operatorTable 

{-
megnézné hogy egy karakter valami eleme -e egy listának, nem használtam, nem az igazi.

bennevanbool:: Eq a => a -> [a] -> Bool
bennevanbool e [] = False
bennevanbool e (x:xs) = e == x || bennevanbool e xs
-}

-- Ellenőrzi hogy egy adott karakter megtalálható -e a megadott operátor táblában. 
bennevanTeleTabi:: Read a => Char -> OperatorTable a -> Bool
bennevanTeleTabi a [] = False
bennevanTeleTabi a ((c,_):xs) = a == c ||  bennevanTeleTabi a xs
 
{-
Stringet, string listára bontja a szóközöknél, zárójelekt külön vettem, eleinte nem így volt kezelve, 
de a nagy pánikban mikor kikerültek új teszt esetek, ez maradt bent.
-}
szavakbontas :: String -> [String]
szavakbontas [] = [[]]
szavakbontas (' ':xs) = [] : szavakbontas xs
szavakbontas ('(':xs) = ['('] : szavakbontas xs
szavakbontas (')':xs) = [')'] : szavakbontas xs
szavakbontas (x:xs) = (x : head (szavakbontas xs)) : tail (szavakbontas xs)

--Meghívja az előző szavak bontás függvényt, és kiszedi az üres beütéseket.
urestorol :: String -> [String]
urestorol bemenet = filter (/= "") ((szavakbontas bemenet))

{-
Eldönti hogy egy megadott maybe érték Just vagy Nothing
-}
maybevagysem :: Maybe a -> Bool
maybevagysem (Just a) = True
maybevagysem Nothing = False

kiszedjust :: Maybe a -> a
kiszedjust (Just a) = a

hosszegyenloegy :: [a] -> Bool
hosszegyenloegy [a] = True
hosszegyenloegy a = False

parseTokens :: Read a => OperatorTable a -> String -> Maybe [Tok a]
parseTokens _ "" = Just [] 
{-parseTokens  [(a,(_, _, _))] (x:xs) 
    | a == x = Nothing -}
parseTokens lista bemenet = osszeir lista (urestorol bemenet) [] 
    where
        osszeir :: Read a => OperatorTable a -> [String] -> [Tok a] -> Maybe [Tok a]
        osszeir _ [] kimenet = Just (reverse kimenet)
        osszeir lista (x:xs) kimenet
            | head x == '(' = osszeir lista xs (BrckOpen:kimenet)
            | head x == ')' = osszeir lista xs (BrckClose:kimenet)
            | maybevagysem readPLS = osszeir lista xs ((TokLit (kiszedjust readPLS)):kimenet)
            | bennevanTeleTabi (head x) lista && (hosszegyenloegy x == False) = Nothing
            | hosszegyenloegy x && maybevagysem (operatorFromChar lista (head x)) = osszeir lista xs ((kiszedjust (operatorFromChar lista (head x))):kimenet)
            | otherwise = Nothing 
            where
                readPLS = readMaybe x 


parse :: String -> Maybe [Tok Double]
parse = parseTokens operatorTable

----------------------------------------------------

literalisKerdojel :: Tok a -> Bool
literalisKerdojel (TokLit a) = True
literalisKerdojel _ = False

operatorkerdojel :: Tok a -> Bool
operatorkerdojel (TokBinOp a b c d) = True
operatorkerdojel a = False

toklitszetbontas :: Tok a -> a
toklitszetbontas (TokLit a) = a

{-
muvelet elvégzése: kap egy operátort és 2 literált, ezekre elvégzi a megadott operátor műveletet, 
és az eredmény literált adja vissza
-}
muveletbasic :: (a -> a -> a) -> a -> a -> a
muveletbasic operator a b = operator a b

shuntingYardBasic :: [Tok a] -> ([a], [Tok a])
shuntingYardBasic [] = ([], [])
shuntingYardBasic (x:xs) = osszeir (x:xs) ([],[])
    where
        osszeir :: [Tok a] -> ([a], [Tok a]) -> ([a], [Tok a])
        osszeir (BrckOpen:xs) (kimenetLiteral, kimenetOperator) = osszeir xs (kimenetLiteral, BrckOpen : kimenetOperator)
        osszeir (BrckClose:xs) (kimenetLiteral, kimenetOperator) = osszeir xs (kimenetA, kimenetB)
            where
                (kimenetA, kimenetB) = fgvbasic (kimenetLiteral, kimenetOperator)
                    where
                        fgvbasic (literalok, (BrckOpen:stb)) = (literalok, stb)
                        fgvbasic (literalok, (operator:stb)) = fgvbasic (muveletbasic literalok operator, stb)
                        fgvbasic (literalok, []) = (literalok, [])
                muveletbasic (a:b:stb) (TokBinOp c d e f) = (c b a) : stb
        osszeir (x:xs) (kimenetLiteral, kimenetOperator)
            | literalisKerdojel x = osszeir xs (toklitszetbontas x : kimenetLiteral, kimenetOperator)
            | operatorkerdojel x = osszeir xs (kimenetLiteral, x : kimenetOperator)
        osszeir [] (kimenetLiteral, kimenetOperator) = (kimenetLiteral, kimenetOperator)

parseAndEval :: 
    (String -> Maybe [Tok a]) -> 
     ([Tok a] -> ([a], [Tok a])) -> 
     String -> Maybe ([a], [Tok a]) 
parseAndEval parse eval input = maybe Nothing (Just . eval) (parse input) 
 
syNoEval :: String -> Maybe ([Double], [Tok Double]) 
syNoEval = parseAndEval parse shuntingYardBasic 
 
syEvalBasic :: String -> Maybe ([Double], [Tok Double]) 
syEvalBasic = parseAndEval parse (\t -> shuntingYardBasic $ BrckOpen : (t ++ [BrckClose]))

-----------------------------------------------
{-
egy másik próbálkozáshoz kellett

operatorAnagyobbmintB :: Tok a -> Tok b -> Bool
operatorAnagyobbmintB (TokBinOp _ _ a _) (TokBinOp _ _ b _) = a > b
operatorAnagyobbmintB _ _ = False
legkisebberosseguoperator :: Tok a -> [Tok b] -> Bool
legkisebberosseguoperator _ [] = True
legkisebberosseguoperator a (x:xs)
    | operatorAnagyobbmintB a x = legkisebberosseguoperator a xs 
    | otherwise = False
-}


operatorkotesierosseg :: Tok a -> Int
operatorkotesierosseg (TokBinOp _ _ e _) = e

muvelet :: [a] -> Tok a -> [Tok a] -> ([a], [Tok a])
muvelet (a:b:literalok) (TokBinOp c karakter int irany) [] = ((c b a):literalok, [])
--muvelet (a:b:literalok) (TokBinOp c karakter int irany) (BrckOpen:xs) = ((c b a):literalok, BrckOpen:xs)
muvelet (a:b:literalok) operator (TokBinOp c d e f:xs)
    | ((operatorkotesierosseg operator) < e) && irany operator == InfixR = muvelet ((c b a):literalok) operator xs
    | (((operatorkotesierosseg operator) < e) || ((operatorkotesierosseg operator) == e)) && irany operator == InfixL = muvelet ((c b a):literalok) operator xs
    where 
        irany (TokBinOp _ _ _ a) = a
muvelet literalok operator xs = (literalok, operator:xs)
--muvelet literalok operator [] = (literalok, [operator])

-----------------------------------------------------------------



fgv :: ([a],[Tok a]) -> ([a],[Tok a])
fgv (a, []) = (a, [])
fgv (a, op:b) = muvelet a op b

--Minták alapján dolgozza fel a megadott rendezett lista párt.
kiertekel :: ([a], [Tok a]) -> ([a], [Tok a])
kiertekel (literalok, (BrckOpen:stb)) = (literalok, stb)
kiertekel (elso:masodik:literalok, (TokBinOp fuggveny _ _ _:stb)) = kiertekel (fuggveny masodik elso:literalok, stb)
kiertekel (literalok, []) = (literalok, [])
kiertekel (debugA, debugB) = (debugA, debugB)

shuntingYardPrecedence :: [Tok a] -> ([a], [Tok a])
shuntingYardPrecedence [] = ([], [])
shuntingYardPrecedence (x:xs) = osszeir (x:xs) ([],[])
    where
        osszeir :: [Tok a] -> ([a], [Tok a]) -> ([a], [Tok a])
        osszeir (BrckOpen:xs) (kimenetLiteral, kimenetOperator) = osszeir xs (kimenetLiteral, BrckOpen : kimenetOperator)
        osszeir (x:xs) (kimenetLiteral, kimenetOperator)
            | literalisKerdojel x = osszeir xs ((toklitszetbontas x) : kimenetLiteral, kimenetOperator)
            | operatorkerdojel x = osszeir xs (fgv (kimenetLiteral, x : kimenetOperator))
--            | operatorkerdojel x = osszeir xs (kimenetLiteral, x : kimenetOperator)
        osszeir (BrckClose:xs) (kimenetLiteral, kimenetOperator) = osszeir xs (kiertekel (kimenetLiteral, kimenetOperator))
            {-where
                kiertekel :: ([a], [Tok a]) -> ([a], [Tok a])
                kiertekel (literalok, (BrckOpen:stb)) = (literalok, stb)
                kiertekel ((elsoliteral:masodikliteral:literalok), [TokBinOp function character integer direction,BrckOpen]) = (function masodikliteral elsoliteral:literalok, [])
                kiertekel (literalok, (operator:stb)) = kiertekel (muvelet literalok operator stb)
                kiertekel (literalok, []) = (literalok, []) -}
{-          osszeir (BrckClose:xs) (kimenetLiteral, kimenetOperator) = osszeir xs (kimenetA, kimenetB)
            where
                (kimenetA, kimenetB) = (fgv (kimenetLiteral, kimenetOperator))
                --kiertekel (a:b:stb) (TokBinOp c d e f) = (c b a) : stb
                --kiertekel (a:b:stb) (TokBinOp c d e f) = (c b a) : stb-}
        osszeir [] (kimenetLiteral, kimenetOperator) = (kimenetLiteral, kimenetOperator)


-----------------------------------------------------------------
syEvalPrecedence :: String -> Maybe ([Double], [Tok Double]) 
syEvalPrecedence = parseAndEval 
  parse 
  (\t -> shuntingYardPrecedence $ BrckOpen : (t ++ [BrckClose]))


data ShuntingYardError = 
    OperatorOrClosingParenExpected 
        | LiteralOrOpeningParenExpected  
        | NoOpeningParen 
        | NoClosingParen
        | ParseError 
    deriving (Eq, Show)

type ShuntingYardResult a = Either ShuntingYardError a


eqError = 0 -- Ez a tesztelőnek szükséges! 
-----------------------------------------------------------------
{-
zarojel szamlalo, nem müködik

zarooperatorSzamalo :: Char -> (Int, Int) -> (Int, Int) 
zarooperatorSzamalo '(' (a, b) = ((a + 1), b)
zarooperatorSzamalo ')' (a, b) = (a , (b + 1))
-}

parseSafe :: Read a => OperatorTable a -> String -> ShuntingYardResult [Tok a] 
parseSafe _ "" = Right [] 
parseSafe lista bemenet = osszeir lista (urestorol bemenet) [] 
    where
        osszeir :: Read a => OperatorTable a -> [String] -> [Tok a] -> ShuntingYardResult [Tok a]
        osszeir _ [] kimenet = Right (reverse kimenet)
        osszeir lista (x:xs) kimenet
            | head x == '(' = osszeir lista xs (BrckOpen:kimenet)
            | head x == ')' = osszeir lista xs (BrckClose:kimenet)
            | maybevagysem readPLS = osszeir lista xs ((TokLit (kiszedjust readPLS)):kimenet)
            | bennevanTeleTabi (head x) lista && (hosszegyenloegy x == False) = Left ParseError
            | hosszegyenloegy x && maybevagysem (operatorFromChar lista (head x)) = osszeir lista xs ((kiszedjust (operatorFromChar lista (head x))):kimenet)
            | otherwise = Left ParseError --most már ok
            where
                readPLS = readMaybe x 

{-
ghci> sySafe "1 )" == Left NoOpeningParen       False
ghci> sySafe "( 1 " == Left NoClosingParen      False
-}

{-
Előző próbálkozások error szűrésre

fgvSafe :: ([a],[Tok a]) -> ([a],[Tok a])
fgvSafe (a, []) = (a, [])
fgvSafe (a, op:b) = muvelet a op b

bobegyenlo :: Tok a -> ([a], [Tok a]) -> Bool
bobegyenlo = undefined

bobthebuilder :: Tok a -> ([a], [Tok a]) -> String -> (Bool, String)
bobthebuilder x ([], []) "LIT" = (True, "LIT")
bobthebuilder x (kimenetLiteral, []) "LIT" = (False, "LIT")
bobthebuilder x (kimenetLiteral, kimenetOperator) "LIT" = (True, "LIT")

bobthebuilder x ([], []) "OP" = (False, "OP")
bobthebuilder x ([], kimenetOperator) "OP" = (False, "OP")
bobthebuilder x (kimenetLiteral, kimenetOperator) "OP" = (True, "OP")
-}

{-
zarojelkerdojel :: Tok a -> Bool
zarojelkerdojel BrckClose = True
zarojelkerdojel BrckOpen = True
zarojelkerdojel _ = False
-}

nyitozarojelkerdojel :: Tok a -> Bool
nyitozarojelkerdojel BrckOpen = True
nyitozarojelkerdojel _ = False


shuntingYardSafe :: [Tok a] -> ShuntingYardResult ([a], [Tok a])
shuntingYardSafe [] = Right ([], [])
shuntingYardSafe (x:xs) = osszeir (x:xs) ([],[]) [] 0
    where
        osszeir :: [Tok a] ->  ([a], [Tok a]) -> [Tok a] -> Integer -> ShuntingYardResult ([a], [Tok a])
        osszeir (BrckOpen:xs) (kimenetLiteral, kimenetOperator) ossztoken brckszam = osszeir xs (kimenetLiteral, BrckOpen : kimenetOperator) (BrckOpen:ossztoken) (brckszam+1)
        osszeir (x:xs) (kimenetLiteral, kimenetOperator) ossztoken brckszam
            | operatorkerdojel x && nyitozarojelkerdojel (head ossztoken) = Left LiteralOrOpeningParenExpected
            | literalisKerdojel x && (literalisKerdojel (head ossztoken)) = Left OperatorOrClosingParenExpected
            | operatorkerdojel x && (operatorkerdojel (head ossztoken)) = Left LiteralOrOpeningParenExpected
           -- | zarojelkerdojel (head ossztoken) && (zarojelkerdojel x) = Left LiteralOrOpeningParenExpected ----
            | literalisKerdojel x = osszeir xs ((toklitszetbontas x) : kimenetLiteral, kimenetOperator) (x:ossztoken)  brckszam
            | operatorkerdojel x = osszeir xs (fgv(kimenetLiteral, x : kimenetOperator)) (x:ossztoken) brckszam
--            | operatorkerdojel x = osszeir xs (kimenetLiteral, x : kimenetOperator)
        osszeir (BrckClose:xs) (kimenetLiteral, kimenetOperator) (BrckOpen:ossztoken) brckszam = Left LiteralOrOpeningParenExpected
        osszeir (BrckClose:xs) (kimenetLiteral, kimenetOperator) ossztoken brckszam = osszeir xs (kiertekel (kimenetLiteral, kimenetOperator)) (BrckClose:ossztoken) (brckszam-1)
        osszeir [] ((x:y:xs), []) _  brckszam= Left OperatorOrClosingParenExpected
--        osszeir [] ([kimenetLiteral], []) ossztoken = Right ([kimenetLiteral], ossztoken)
        osszeir [] ([pontegyliteral], [pontegyoperator,BrckOpen]) _ brckszam = Left LiteralOrOpeningParenExpected 
        osszeir [] ([kimenetLiteral], _ ) _ brckszam 
            | brckszam == 0 = Right ([kimenetLiteral], []) 
            | brckszam < 0 = Left NoOpeningParen
            | brckszam > 0 = Left NoClosingParen
        osszeir [] (kimenetLiteral, kimenetOperator) _ brckszam = Right (kimenetLiteral, kimenetOperator) 



parseAndEvalSafe :: 
    (String -> ShuntingYardResult [Tok a]) -> 
     ([Tok a] -> ShuntingYardResult ([a], [Tok a])) -> 
     String -> ShuntingYardResult ([a], [Tok a]) 
parseAndEvalSafe parse eval input = either Left eval (parse input)

sySafe :: String -> ShuntingYardResult ([Double], [Tok Double]) 
sySafe = parseAndEvalSafe 
  (parseSafe operatorTable) 
  (\ts -> shuntingYardSafe (BrckOpen : ts ++ [BrckClose]))


type FunctionTable a = [(String, (a -> a))] 

functionTable :: (RealFrac a, Floating a) => FunctionTable a 
functionTable = 
    [ ("sin", sin) 
    , ("cos", cos) 
    , ("log", log) 
    , ("exp", exp) 
    , ("sqrt", sqrt) 
    , ("round", (\x -> fromIntegral (round x :: Integer))) 
    ] 
 
tSin, tCos, tLog, tExp, tSqrt :: Floating a => Tok a 
tSin = TokFun sin "sin" 
tCos = TokFun cos "cos" 
tLog = TokFun log "log" 
tExp = TokFun exp "exp" 
tSqrt = TokFun sqrt "sqrt" 

tRound :: (Floating a, RealFrac a) => Tok a 
tRound = TokFun (\x -> fromIntegral (round x :: Integer)) "round"

