module Lesson11 where
import Data.Foldable

-- Új ötlet, további általánosítások:

-- Emlékezzünk vissza az alábbi korábban definiált függvényekre:
-- sum, product, elem, (++), concat, any
{-
sum []     = 0
sum (x:xs) = x + sum xs

product []     = 1
product (x:xs) = x * product xs

elem _ []     = False
elem e (x:xs) = e == x || elem e xs

any p []     = False
any p (x:xs) = p x || any p xs
-- Megjegyzés: Hogy lehetne az elem-et megírni az any-vel? (Remélhetőleg egyértelműen látszódik, hogy erősen hasonlítanak egymásra.)

[]     ++ ys = ys
(x:xs) ++ ys = x : xs ++ ys
-}

--any'' :: (a -> Bool) -> [a] -> Bool

elemViaAny :: Eq a => a -> [a] -> Bool
elemViaAny e xs = any (==e) xs
--elemViaAny e xs = any help xs where
--    help x = x == e

-- Definiáld az all' függvényt, amely ellenőrzi, hogy egy adott tulajdonság az összes listaelemre teljesül-e.
all' :: (a -> Bool) -> [a] -> Bool
all' p [] = True
all' p (x:xs) = p x && all' p xs

-- Definiáld az or' függvényt, amely egy listányi Bool-t összevagyol.
or' :: [Bool] -> Bool
or' [] = False
or' (x:xs) = x || or' xs

-- Definiáld az and' függvényt, amely egy listányi Bool-t összeésel.
and' :: [Bool] -> Bool
and' [] = True
and' (x:xs) = x && and' xs

-- Mindegyik függvény definíciója gyakorlatilag ugyanúgy néz ki.
-- Valami az üres listára, meg valami a legalább egy elemre. A rekurzió mindegyikben mindig az egy elemmel kevesebb maradék lista.
-- Hogyan lehetne általánosítani ezt az ötletet?
-- Megj.: Emlékezzünk vissza rá, hogy ilyen fajta rekurzió esetén merre zárójeleződött az eredménykifejezés!

-- Próbáljuk meg lépésenként általánosítani.
-- Amikor hiányzik valami, akkor vegyük hozzá a típushoz, meg a definícióhoz.
generalisedIdeaR :: (a -> b -> b) -> b -> [a] -> b
generalisedIdeaR _ acc [] = acc
generalisedIdeaR f acc (x:xs) = x `f` (generalisedIdeaR f acc xs)

-- Ezt a függvényt hívják foldr-nek!
-- Létezik a foldr' függvény is, amely a foldr-nek a mohó változata és amely a Data.Foldable modulban található.
-- A foldr' NEM MŰKÖDIK végtelen listával!

-- Természetesen nem csak ilyen fajta rekurziónk volt.
-- Emlékezzünk vissza a reverse-re.
{-
reverse = reverseAcc [] where
  reverseAcc acc []     = acc
  reverseAcc acc (x:xs) = reverseAcc (x:acc) xs

Az ötlet használható sum-mal is:
sum' = sumAcc 0 where
  sumAcc acc []     = acc
  sumAcc acc (x:xs) = sumAcc (acc + x) xs

Emlékezzünk, hogy ilyenkor az eredménykifejezés merre van zárójelezve!
Látszik a hasonlóság a függvények között?

Általánosítsuk ennek az ötletét is!
-}
generalisedIdeaL :: (b -> a -> b) -> b -> [a] -> b
generalisedIdeaL _ acc [] = acc
generalisedIdeaL f acc (x:xs) = generalisedIdeaL f (acc `f` x) xs

-- Ezt a függvényt hívják foldl-nek.
-- Létezik a foldl' függvény is, amely a foldl-nek a mohó változata és amely a Data.Foldable modulban található.
-- foldl helyett a foldl'-t érdemes használni!
-- pl. foldr  (+) 0 [1..100000000] futásidejű hibát okoz, mert túl nagy a kiértékeletlen kifejezés a lustaság miatt.
--     foldl  (+) 0 [1..100000000] szintén.
--     foldl' (+) 0 [1..100000000] viszont kiszámítható lesz, mert az akkumulált paramétert mohón kezeli, kiértékeli,
--                                 nem gyűjtögeti a kiértékeletlen kifejezéseket.

-- Ha megnézzük mindkét fold-ot, akkor lényegében mindkettő listát dolgoz fel.
-- Ha úgy tetszik, akkor ez a lista destruktora (más szavakkal iterátora, rekurzora, eleiminátora; mindegyik (kb) ugyanazt jelenti ebben a világban),
-- mert a függvény feldolgozza a lista összes elemét, szintaktikailag megkülönbözteti az összes listát egymástól.

-- A végtelen listás szabályok ugyanúgy érvényesek foldr és foldl-re is,
-- tehát a foldr tud működni végtelen listán, mert előbb használjuk a műveletet, mint a rekurziót,
-- a foldl nem tud működni végtelen listán, mert akkumulál, gyűjtöget.

-- Definiáljuk újra a fenti függvényeket foldr-et vagy foldl-et használva.

--foldr (&&) True $ repeat False

sumViaFold :: Num a => [a] -> a
--sumViaFold = foldl' (+) 0
sumViaFold = foldl' (\acc x -> acc + x) 0

productiaFold :: Num a => [a] -> a
productiaFold = foldl' (*) 1

(+++) :: [a] -> [a] -> [a]
--(+++) xs ys = foldr (:) ys xs
(+++) xs ys = foldr (\x acc -> x : acc) ys xs

concatViaFold :: [[a]] -> [a]
concatViaFold xs = foldr (++) [] xs

--foldl + lambda/segédfüggvény VAGY az egyik előző órán vett függvénnyel
reverseViaFold :: [a] -> [a]
--reverseViaFold = foldl (\acc x -> x : acc) []
reverseViaFold xs = foldl (flip (:)) [] xs

elemViaFold :: Eq a => a -> [a] -> Bool
--elemViaFold e xs = foldr (\x acc -> x == e || acc) False xs
elemViaFold e xs = foldr ((||).(==e)) False xs

orViaFold :: [Bool] -> Bool
orViaFold xs = foldr (||) False xs

andViaFold :: [Bool] -> Bool
andViaFold xs = foldr (&&) True xs

anyViaFoldr :: (a -> Bool) -> [a] -> Bool
anyViaFoldr p = foldr (\x acc -> p x || acc ) False

allViaFold :: (a -> Bool) -> [a] -> Bool
allViaFold p = undefined

-- Definiáljuk a foldr1' függvényt, amely ugyanazt csinálja, mint a foldr,
-- csak a kezdőértéke a lista első eleme lesz.
-- Ez természetesen feltételezi, hogy a lista nem üres.
foldr1' :: undefined
foldr1' = undefined

-- Ugyanígy létezik foldl1 is.
foldl1' :: undefined
foldl1' = undefined

-- Ezekkel érdemes definiálni például az alábbiakat:
-- Definiáld a maximum' függvényt, amely egy visszaadja egy lista legnagyobb elemét.
-- Feltehető, hogy a lista nem üres és véges.
maximum' :: undefined
maximum' = undefined
-- Megj.: minimum hasonlóan definiálható.

-- Létezik olyan fajta hajtogatás is, amely az egyes részeredményeket is visszaadja eredményként.
-- Ezt magyarul pásztázásnak hívjuk (bár az angol neve (scanning) sokkal értelmesebb).

-- Definiáljuk a jobbról való pásztázást!
-- scanr'' (:) [] "pásztáznivaló" == ["pásztáznivaló", "ásztáznivaló", "sztáznivaló", "ztáznivaló", "táznivaló", "áznivaló", "znivaló", "nivaló", "ivaló", "való", "aló", "ló", "ó", []]
-- scanr'' (+) 0 [1..10] == [55, 54, 52, 49, 45, 40, 34, 27, 19, 10, 0]

scanr'' :: undefined
scanr'' = undefined
-- Az eredeti függvény a scanr.
-- A scanr NEM MŰKÖDIK végtelen listával!

-- A scanr-ből hogyan kaphatjuk vissza a foldr műveletét?
-- Válasz:

-- Definiáljuk a balról való pásztázást!
-- scanl'' (\acc x -> x : acc) [] "pásztáznivaló" == [[], "p", "áp", "sáp", "zsáp", "tzsáp", "átzsáp", "zátzsáp", "nzátzsáp", "inzátzsáp", "vinzátzsáp", "avinzátzsáp", "lavinzátzsáp", "ólavinzátzsáp"]
-- scanl'' (+) 0 [1..10] == [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55]
scanl'' :: undefined
scanl'' = undefined
-- Az eredeti függvény a scanl, de létezik scanl' is, amely a mohó változata a scanr-nek.
-- Meglepő módon a scanl működik végtelen listával!
-- A mohó változat is!

-- A scanl-ből hogyan kaphatjuk vissza a foldl műveletét?
-- Válasz:

-- A scan-eknek is létezik az 1-es változata, tehát scanr1 és scanl1.
-- Amire az 1-es változatoknál vigyázni kell, hogy nem lehet különböző típusú a bemeneti lista és az eredménylista,
-- hiszen a kezdőérték a bemeneti lista első eleme.
