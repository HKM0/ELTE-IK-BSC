module Hazi6 where

{-
1. Karakter-átalakítás

Alakítsd át egy szöveg 3. karakterét nagy betűre definiálva a toUpperThird nevű függvényt. Minden más karakter maradjon ugyanaz. Ha nincs 3. karakter, akkor adja vissza a kapott szöveget (hiszen nincs mit átalakítani). Ha a 3. helyen szereplő karakter már nagy betű, akkor is maradjon ugyanaz a visszaadott szöveg. Használj mintaillesztést! Ne használj egyenlőségvizsgálatot vagy elágazást vagy indexelést, se take, se drop függvényt, se rekurziót!

Segítség: A Data.Char modulnak a toUpper függvénye jól jöhet.
-}

toUpperThird :: String -> String
toUpperThird = undefined 

----------------------------------------------------------------------------------------
{-
2. Rendezett-e

Definiáld az isSorted nevű függvényt, amely ellenőrzi rendezhető elemek listájáról, hogy az elemei növekvő sorrendben vannak-e. Ha a lista növekvően rendezett, akkor végtelen lista esetén a függvény nem terminál (remélhetőleg értelemszerű okok miatt).
-}

isSorted :: Ord a => [a] -> Bool
isSorted = undefined 

----------------------------------------------------------------------------------------
{-
3. Indexelés "javítása"

Készítsd el a (!!!) függvényt, amely segítségével bele tudunk indexelni egy listába 0-tól kezdve az indexelést. Ha negatív indexet kap a függvény, akkor hátulról adjuk vissza az elemet (feltehető, hogy ebben és csak is ebben az esetben a lista véges). A legutolsó elem a (-1)-es indextől kezdődik. Ne használd a (!!) operátort és a genericIndex függvényt a definícióban! Használj mintaillesztést és rekurziót, take, drop, length és általánosabb variánsaik teljesen feleslegesek, épp ezért nem használhatóak!

Megjegyzés: A megoldás természetesen egy parciális függvény lesz.

Segítség: A hátulról haladáshoz érdemes a reverse függvényt használni egyszer, mert akkor már ugyanúgy elölről lehet haldni.
-}

(!!!) :: Integral b => [a] -> b -> a
(!!!) = undefined 

----------------------------------------------------------------------------------------
{-
4. Format javítása

Az előző házi format függvényét egészítsd ki úgy, hogy a negatív számokra is működjön! A függvény neve maradjon format ugyanúgy. Értelemszerűen negatív hosszra nehéz kiegészíteni; ha negatív a szám, akkor azt csinálja, mintha 0-t kapott volna paraméterül. A megoldás alapjának pontosan az előző beadott házinak kell lennie, azt csak le kell másolni, majd átalakítani jól!
-}

format :: Integral b => b -> String -> String
format = undefined 

----------------------------------------------------------------------------------------
{-
5. Viharos vidék

Adott egy régió összes meteorológiai állomásának mérései. Rendezett 4-esekben tároljuk sorban a mérőállomás nevét, a hőmérsékletet °C-ban megadva, a szél sebességét km/h-ban megadva és hogy az adott napon hányadik rögzített adatot küldi. Definiálj egy függvényt mightyGale néven, amely megadja az első mérőállomás nevét, ahol több mint 110 km/h, azaz orkán erejű szél volt. Ha nem volt sehol sem orkán erejű szél, az eredmény legyen üres String! Használj rekurziót és elágazást! Ne használj listagenerátort!
-}

mightyGale :: (Num a, Ord b, Num b, Integral c) => [(String, a, b, c)] -> String
mightyGale = undefined 

----------------------------------------------------------------------------------------
{-
6. Titkok tudója

Definiáld a cipher függvényt, amely egy titkosított szövegből kinyeri az első olyan kettő hosszú karaktersort, amelyet számjegy követ. 
Ha nincs ilyen, akkor az eredmény legyen üres String. 
A megoldásban használj mintaillesztést és rekurziót! 
A take, drop, length és általánosabb variánsaik teljesen feleslegesek, épp ezért nem használhatóak!

Segítség: Az egyes karakterek azonosításához használjuk a Data.Char függvényeit. 
Hogy melyiket? Azt kell nektek megtalálni.
-}

----------------------------------------------------------------------------------------
{-
7. Dupla elemek

Definiáld a doubleElements függvényt, amely minden egyes lista elemét egyenként megkettőzi egymás után! Használj rekurziót!
-}

doubleElements :: [a] -> [a]
doubleElements = undefined 

----------------------------------------------------------------------------------------
{-
8. Sok szóköz

Definiáld a deleteDuplicateSpaces függvényt, amely egy szövegből eltávolítja a több egymás mellett álló szóközöket, azokból egyet meghagyva. A szöveg eleji és szöveg legvégi szóközöket teljes egészében dobja el a függvény. Feltehető, hogy a szöveg kisbetűből, nagybetűből, számból és szóközből áll csak.

Segítség: Ne bonyolítsuk túl a megoldást!
-}

deleteDuplicateSpaces :: String -> String
deleteDuplicateSpaces = undefined 


--Tesztesetek
{-

toUpperThird "a" == "a"
toUpperThird "az" == "az"
toUpperThird "kap" == "kaP"
toUpperThird "alma" == "alMa"
toUpperThird "ALMA" == "ALMA"
take 20 (toUpperThird (repeat 'b')) == "bbBbbbbbbbbbbbbbbbbb"
isSorted ([] :: [Integer])
isSorted [1::Int]
isSorted [1::Integer]
isSorted [1::Double]
isSorted "a"
isSorted [5,6,9,10]
isSorted "aabcddddefg"
isSorted [(-2),(-1),1,9,10,19]
isSorted "adn"
not (isSorted [10,9,8,7,6,5,4,3,2,1,0])
not (isSorted "alma")
not (isSorted [10,9..])
not (isSorted ([1..10] ++ [9,8..]))
[0..] !!! (136 :: Integer) == 136
"alma" !!! (2 :: Int) == 'm'
[False, True, False, False, True, False] !!! ((-5) :: Integer)
[0..10] !!! (-1) == 10
[0..10] !!! (-11) == 0
[0..10] !!! 0 == 0
format (10 :: Int) "alma" == "alma      "
format (4 :: Integer) "" == "    "
format (5 :: Integer) "szilva" == "szilva"
format (0 :: Int) "" == ""
format (0 :: Integer) "barack" == "barack"
take 50 (format (60 :: Integer) (repeat 'a')) == replicate 50 'a'
format ((-10) :: Int) "alma" == "alma"
format ((-4) :: Integer) "" == ""
format ((-5) :: Integer) "szilva" == "szilva"
take 50 (format ((-60) :: Integer) (repeat 'a')) == replicate 50 'a'
mightyGale [("Pest6", 23.2 :: Double, 54.5 :: Float, 2 :: Int), ("Buda2", 21.1, 77.7, 5), ("KPest1", 19.8, 89.9, 1)] == ""
mightyGale [("Kamut1", 19 :: Integer, 55 :: Int, 1 :: Integer), ("Szentes2", 18, 112, 2), ("Cegled3", 18, 113, 5)] == "Szentes2"
mightyGale [("Szergeny3", 23 :: Integer, 1 :: Double, 1 :: Int), ("Nagytevel1", 30, 12, 5), ("Himod4", 1, 130, 1)] == "Himod4"
mightyGale [("Jaszbereny1", 19.1 :: Float, 55 :: Integer, 1), ("Jaszbereny2", 18.9, 57, 2), ("Jaszfelsoszentgyorgy1", 18, 113, 5), ("Jaszapati1", 20, 63, 3)] == "Jaszfelsoszentgyorgy1"
mightyGale [("Sopron1", 0, 100, 1), ("Szekesfehervar2", 1, 110, 10), ("Siofok1", (-1), 110.1, 3)] == "Siofok1"
cipher "PYdg7iT4vdO0n4AgmGfUpRzogAf" == "dg"
cipher "PYdgaiTLvdOKnAAgmGfUpRzogA4" == "gA"
cipher "4vkYyAO174midQTt0" == "AO"
cipher "BwxwEwqCKHuMTAaPn" == ""
cipher ['\0'..] == "./"
cipher "dM7" == "dM"
cipher "777" == "77"
cipher "Kmz" == ""
cipher "Zk"  == ""
cipher "T4"  == ""
cipher "" == ""
doubleElements [1,2,3] == [1,1,2,2,3,3]
null (doubleElements [])
doubleElements "alma" == "aallmmaa"
take 10 (doubleElements [0..]) == [0,0,1,1,2,2,3,3,4,4]
deleteDuplicateSpaces "alma  szilva    barack" == "alma szilva barack"
deleteDuplicateSpaces "    alma  szilva    barack    eper   " == "alma szilva barack eper"
deleteDuplicateSpaces "    alma  szilva    barack    eper" == "alma szilva barack eper"
deleteDuplicateSpaces "    alma  szilva    barack    eper " == "alma szilva barack eper"
deleteDuplicateSpaces "alma  szilva    barack    eper  " == "alma szilva barack eper"
deleteDuplicateSpaces " alma  szilva    barack    eper   " == "alma szilva barack eper"
take 12 (deleteDuplicateSpaces (cycle "a   b")) == "a ba ba ba b"
null (deleteDuplicateSpaces "       ")
null (deleteDuplicateSpaces "")

-}