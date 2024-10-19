module NagyBeadando where
import Data.List

-- Előzetes

showState a = show a
showMage a = show a
eqMage a b =  a == b
showUnit a = show a
showOneVOne a = show a

type Name = String
type Health = Integer
type Spell = (Integer -> Integer)
type Army = [Unit]
type EnemyArmy = Army
type Amount = Integer

-- State

data State a = Alive a | Dead
instance Show a => Show (State a) where
    show (Alive a) = show a
    show Dead = "Dead" 

instance Eq a => Eq (State a) where
    (Alive a) == (Alive b) = a == b
    Dead == Dead = True
    _ == _ = False

-- Entity

data Entity = Golem Health | HaskellElemental Health

instance Show Entity where
    show (Golem health) = "Golem " ++ show health
    show (HaskellElemental health) = "HaskellElemental " ++ show health

instance Eq Entity where
    (Golem health1) == (Golem health2) = health1 == health2
    (HaskellElemental health1) == (HaskellElemental health2) = health1 == health2
    _ == _ = False

-- Mage

data Mage = Master Name Health Spell

papi = let 
    tunderpor enemyHP
        | enemyHP < 8 = 0
        | even enemyHP = div (enemyHP * 3) 4
        | otherwise = enemyHP - 3
    in Master "Papi" 126 tunderpor
java = Master "Java" 100 (\x ->  x - (mod x 9))
traktor = Master "Traktor" 20 (\x -> div (x + 10) ((mod x 4) + 1))
jani = Master "Jani" 100 (\x -> x - div x 4)
skver = Master "Skver" 100 (\x -> div (x+4) 2)

instance Show Mage where
    show (Master name health spell)
        | health < 5 = "Wounded " ++ name
        | otherwise = name

instance Eq Mage where
    (Master name1 health1 spell1) == (Master name2 health2 spell2) = name1 == name2 && health1 == health2

-- Unit

data Unit = M (State Mage) | E (State Entity)
recreate :: Unit -> Unit
recreate (M (Alive (Master name health spell)))
    | health <= 0 = M Dead
    | otherwise = M (Alive (Master name health spell))
recreate (E (Alive (Golem health)))
    | health <= 0 = E Dead
    | otherwise = E (Alive (Golem health))
recreate (E (Alive (HaskellElemental health)))
    | health <= 0 = E Dead
    | otherwise = E (Alive (HaskellElemental health))
recreate (M Dead) = M Dead
recreate (E Dead) = E Dead

instance Show Unit where
    show (M a) = show a
    show (E a) = show a

instance Eq Unit where
    (M a) == (M b) = a == b
    (E a) == (E b) = a == b
    _ == _ = False

-- Elesettek

formationFix :: Army -> Army
formationFix [] = []
formationFix army = formationFixer army [] [] where
    formationFixer [] acc1 acc2 = acc1 ++ acc2
    formationFixer (x:xs) acc1 acc2
        | x == (E Dead) || x == (M Dead) = formationFixer xs acc1 (acc2 ++ [x])
        | otherwise = formationFixer xs (acc1 ++ [x]) acc2

-- Vége?

over :: Army -> Bool

over [] = True
over (x:xs)
    | show x /= "Dead" = False
    | otherwise = over xs 

potionMaster = 
  let plx x
        | x > 85  = x - plx (div x 2)
        | x == 60 = 31
        | x >= 51 = 1 + mod x 30
        | otherwise = x - 7 
  in Master "PotionMaster" 170 plx

-- Ütközet

fightHelp :: Spell -> Army -> Army
fightHelp spell [] = []
fightHelp spell (E (Alive (Golem health)):rest) = recreate (E (Alive (Golem (spell health)))) : fightHelp spell rest
fightHelp spell (E (Alive (HaskellElemental health)):rest) = recreate (E (Alive (HaskellElemental (spell health)))): fightHelp spell rest
fightHelp spell (M (Alive (Master name health spell2)):rest) = recreate (M (Alive (Master name (spell health) spell2))): fightHelp spell rest
fightHelp spell (E Dead:rest) = E Dead: fightHelp spell rest
fightHelp spell (M Dead:rest) = M Dead: fightHelp spell rest

damageUnit :: Unit -> Health -> Health
damageUnit (E (Alive (Golem x))) health = health - 1
damageUnit (E (Alive (HaskellElemental x))) health = health - 3

fight :: EnemyArmy -> Army -> Army

fight _ [] = []
fight [] ys = ys
fight (M (Alive (Master name health spell)):xs) (E (Alive (Golem health2)):ys) = recreate(E (Alive (Golem (spell health2)))):fight xs (fightHelp spell ys)
fight (M (Alive (Master name health spell)):xs) (E (Alive (HaskellElemental health2)):ys) = recreate ((E (Alive (HaskellElemental (spell health2))))): fight xs (fightHelp spell ys) 
fight (M (Alive (Master name health spell)):xs) (M (Alive (Master name2 health2 spell2)):ys) = recreate ((M (Alive (Master name2 (spell health2) spell2)))): fight xs (fightHelp spell ys)
fight (E Dead:xs) (y:ys) = y: fight xs ys
fight (M Dead:xs) (y:ys) = y: fight xs ys
fight (x:xs) (E Dead:ys) = E Dead: fight xs ys
fight (x:xs) (M Dead:ys) = M Dead: fight xs ys
fight (x:xs) (E (Alive (Golem health)):ys) = recreate (E (Alive (Golem (damageUnit x health)))):fight xs ys 
fight (x:xs) (E (Alive (HaskellElemental health)):ys) = recreate (E (Alive (HaskellElemental (damageUnit x health)))):fight xs ys
fight (x:xs) (M (Alive (Master name health spell)):ys) = recreate ((M (Alive (Master name (damageUnit x health) spell)))): fight xs ys


-- Robbanások

blastHelper :: Army -> Integer -> Army 
blastHelper [] _ = []
blastHelper rest 5 = rest
blastHelper ((E (Alive (Golem health)):rest)) acc = recreate (E (Alive (Golem (health - 5)))): blastHelper rest (acc + 1) 
blastHelper ((E (Alive (HaskellElemental health)):rest)) acc = recreate (E (Alive (HaskellElemental (health - 5)))): blastHelper rest (acc + 1)
blastHelper (M (Alive (Master name health spell)):rest) acc = recreate (M (Alive (Master name (health - 5) spell))): blastHelper rest (acc + 1)
blastHelper (E Dead:rest) acc = E Dead: blastHelper rest (acc + 1) 
blastHelper (M Dead:rest) acc = M Dead: blastHelper rest (acc + 1) 


sumHealths :: Army -> [Integer]
sumHealths army
    | genericLength army >= 5 = sumHealth (take 5 army): sumHealths (drop 1 army)
    | otherwise = [] where
        sumHealth [] = 0
        sumHealth ((E (Alive (Golem health)):rest))
            | health < 5 = health + sumHealth rest
            | otherwise = 5 + sumHealth rest
        sumHealth ((E (Alive (HaskellElemental health)):rest))
            | health < 5 = health + sumHealth rest
            | otherwise = 5 + sumHealth rest
        sumHealth ((M (Alive (Master name health spell)):rest))
            | health < 5 = health + sumHealth rest 
            | otherwise = 5 + sumHealth rest
        sumHealth (E Dead:rest) = sumHealth rest 
        sumHealth (M Dead:rest) = sumHealth rest

haskellBlast :: Army -> Army
haskellBlast [] = []
haskellBlast army = take (findBetter (sumHealths army) 0 0 0) army ++ (blastHelper (drop (findBetter (sumHealths army) 0 0 0) army) 0) where
    findBetter [] _ maxIndex _ = maxIndex
    findBetter (damage:damages) maxDamage maxIndex currentIndex
        | damage > maxDamage = findBetter damages damage currentIndex (currentIndex + 1)
        | otherwise = findBetter damages maxDamage maxIndex (currentIndex + 1)

-- Heal (if it works it works)

multiHeal :: Health -> Army -> Army
multiHeal _ [] = []
multiHeal heal army = healHelper heal army [] False where
    healHelper heal [] acc boolean 
        | boolean = multiHeal heal acc
        | otherwise = acc
    healHelper heal (E (Alive (Golem health)):rest) acc boolean
        | heal > 0 && not boolean = healHelper (heal - 1) rest (acc ++ [E (Alive (Golem (health + 1)))]) True
        | heal > 0 = healHelper (heal - 1) rest (acc ++ [E (Alive (Golem (health + 1)))]) True
        | otherwise = acc ++ (E (Alive (Golem health)):rest) 
    healHelper heal (E (Alive (HaskellElemental health)):rest) acc boolean
        | heal > 0 && not boolean = healHelper (heal - 1) rest (acc ++ [E (Alive (HaskellElemental (health + 1)))]) True
        | heal > 0 = healHelper (heal - 1) rest (acc ++ [E (Alive (HaskellElemental (health + 1)))]) True
        | otherwise = acc ++ (E (Alive (HaskellElemental health)):rest) 
    healHelper heal (M (Alive (Master name health spell)):rest) acc boolean
        | heal > 0 && not boolean = healHelper (heal - 1) rest (acc ++ [M (Alive (Master name (health + 1) spell))]) True
        | heal > 0 = healHelper (heal - 1) rest (acc ++ [M (Alive (Master name (health + 1) spell))]) True
        | otherwise = acc ++ (M (Alive (Master name health spell)):rest) 
    healHelper heal (E Dead:rest) acc boolean 
        | boolean = healHelper (heal) rest (acc ++ [E Dead]) True
        | otherwise = healHelper (heal) rest (acc ++ [E Dead]) False
    healHelper heal (M Dead:rest) acc boolean 
        | boolean = healHelper (heal) rest (acc ++ [M Dead]) True
        | otherwise = healHelper (heal) rest (acc ++ [M Dead]) False

-- chain kicsit janky de működik

chain :: Amount -> (Army, EnemyArmy) -> (Army, EnemyArmy)
chain _ ([],[]) = ([],[])
chain _ ([],ys) = ([],ys)
chain amount (xs, ys) 
    | amount <= 0 = (xs, ys) 
    | otherwise = chainhelper amount xs ys [] [] 0 where
        chainhelper 0 xs ys acc1 acc2 _ = (acc1 ++ xs, acc2 ++ ys)
        chainhelper amount [] (E (Alive (Golem health)):ys) acc1 acc2 _ = (acc1,acc2 ++ (recreate (E (Alive (Golem (health - amount)))):ys))
        chainhelper amount [] (E (Alive (HaskellElemental health)):ys) acc1 acc2 _ = (acc1,acc2 ++ (recreate (E (Alive (HaskellElemental (health - amount)))):ys))
        chainhelper amount [] (M (Alive (Master name health spell)):ys) acc1 acc2 _ = (acc1,acc2 ++ (recreate (M (Alive (Master name (health - amount) spell))):ys))
        chainhelper amount (E (Alive (Golem health)):xs) [] acc1 acc2 _ = (acc1 ++ (E (Alive (Golem (health + amount))):xs),acc2)
        chainhelper amount (E (Alive (HaskellElemental health)):xs) [] acc1 acc2 _ = (acc1 ++ (E (Alive (HaskellElemental (health + amount))):xs),acc2)
        chainhelper amount (M (Alive (Master name health spell)):xs) [] acc1 acc2 _ = (acc1 ++ (M (Alive (Master name (health + amount) spell)):xs),acc2)
        chainhelper amount [] ys acc1 acc2 _ = (acc1,acc2 ++ ys)
        chainhelper amount xs [] acc1 acc2 _ = (acc1 ++ xs,acc2)
        chainhelper amount (E (Alive (Golem health)):xs) ys acc1 acc2 0 = chainhelper (amount - 1) xs ys (acc1 ++ [E (Alive (Golem (health + amount)))]) acc2 1
        chainhelper amount (E (Alive (HaskellElemental health)):xs) ys acc1 acc2 0 = chainhelper (amount - 1) xs ys (acc1 ++ [E (Alive (HaskellElemental (health + amount)))]) acc2 1
        chainhelper amount (M (Alive (Master name health spell)):xs) ys acc1 acc2 0 = chainhelper (amount - 1) xs ys (acc1 ++ [(M (Alive (Master name (health + amount) spell)))]) acc2 1
        chainhelper amount (x:xs) ys acc1 acc2 0 = chainhelper amount xs ys (acc1 ++ [x]) acc2 1
        chainhelper amount xs (E (Alive (Golem health)):ys) acc1 acc2 1 = chainhelper (amount - 1) xs ys acc1 (acc2 ++ [recreate (E (Alive (Golem (health - amount))))]) 0
        chainhelper amount xs (E (Alive (HaskellElemental health)):ys) acc1 acc2 1 = chainhelper (amount - 1) xs ys acc1 (acc2 ++ [recreate (E (Alive (HaskellElemental (health - amount))))]) 0
        chainhelper amount xs (M (Alive (Master name health spell)):ys) acc1 acc2 1 = chainhelper (amount - 1) xs ys acc1 (acc2 ++ [recreate (M (Alive (Master name (health - amount) spell)))]) 0
        chainhelper amount xs (y:ys) acc1 acc2 1 = chainhelper amount xs ys acc1 (acc2 ++ [y]) 0

-- na jó erre a 2-re actually büszke vagyok

-- OneVOne

helperOneVOne :: OneVOne -> Integer -> String
helperOneVOne (Winner name) acc
    | acc > 0 = "|| " ++ "Winner " ++ name ++ " ||>"
    | otherwise = "<|| " ++ "Winner " ++ name ++ " ||>"
helperOneVOne (You health onevone) acc
    | acc == 0 = "<You " ++ show(health) ++ "; " ++ helperOneVOne onevone (acc + 1)
    | otherwise = "You " ++ show(health) ++ "; " ++ helperOneVOne onevone (acc + 1)
helperOneVOne (HaskellMage health onevone) acc
    | acc == 0 = "<HaskellMage " ++ show(health) ++ "; " ++ helperOneVOne onevone (acc + 1)
    | otherwise = "HaskellMage " ++ show(health) ++ "; " ++ helperOneVOne onevone (acc + 1)

data OneVOne = Winner String | You Health OneVOne | HaskellMage Health OneVOne deriving Eq
instance Show OneVOne where
    show (Winner name) = helperOneVOne (Winner name) 0 
    show (You health onevone) = helperOneVOne (You health onevone) 0 
    show (HaskellMage health onevone) = helperOneVOne (HaskellMage health onevone) 0 where

-- finalBattle

finalBattle :: Health -> Health -> OneVOne
finalBattle youHealth mageHealth = finalBattleHelper youHealth mageHealth 0 where
    finalBattleHelper youHealth mageHealth 0
        | mageHealth <= 0 = HaskellMage 0 (Winner "You")
        | youHealth <= 0 = You 0 (Winner "HaskellMage")
        | mageHealth < 4 = HaskellMage mageHealth (finalBattleHelper (youHealth `div` 2) (mageHealth * 4) 1)
        | mageHealth >= 4 && youHealth > 20 = HaskellMage mageHealth (finalBattleHelper ((youHealth * 3) `div` 4) mageHealth 1)
        | otherwise = HaskellMage mageHealth (finalBattleHelper (youHealth - 11) mageHealth 1)
    finalBattleHelper youHealth mageHealth 1
        | mageHealth <= 0 = HaskellMage 0 (Winner "You")
        | youHealth <= 0 = You 0 (Winner "HaskellMage")
        | youHealth < 4 = You youHealth (finalBattleHelper (youHealth * 4) mageHealth 0)
        | youHealth >= 4 && mageHealth > 15 = You youHealth (finalBattleHelper youHealth ((mageHealth * 3) `div` 5) 0)
        | otherwise = You youHealth (finalBattleHelper youHealth (mageHealth - 9) 0)
