module Hazi7 where

{-
Definiálj egy modult Hazi7 néven!
1. Szétválasztás választó elem mentén

Definiálj egy olyan függvényt, amely egy adott elem mentén bontja fel a paraméterül kapott listát.
-}

splitOn :: Eq a => a -> [a] -> [[a]]
splitOn = undefined


{-
2. Üres sorok

Készíts egy függvényt, ami megmondja egy szövegben, hogy hányadik sorok az üresek. Mivel a szövegekben (tehát nem a programozás világában) a sorszámozás 1-től kezdődik, így itt is kezdődjön az első sor az 1-es sorszámtól.

A megoldásban ne használj length függvényt, mert felesleges!

Segítség: Az új sor karaktert haskellben a '\n' jelöli, azon a ponton egy új sor kezdődik.
-}

emptyLines :: Num a => String -> [a]
emptyLines = undefined


{-
3. CSV fájl

Bontsd fel egy csv fájl tartalmát a celláira! A sorok '\n'-ekkel, míg egy sorban az elemek ','-vel vannak egymástól elválasztva.

Nem kell konkrét fájlt beolvasni, a fájlunkat egy String reprezentálja. Konkrét fájlbeolvasást csak haladó haskell-es tudással lehet jól végrehajtani.
-}

csv :: String -> [[String]]
csv = undefined

--Tesztesetek
{-

splitOn 'A' "ÉnAelmentemAaAvásárbaAfélApénzzel!" == ["Én","elmentem","a","vásárba","fél","pénzzel!"]
splitOn 'A' "IAstudiedAforAtoday'sAquiz!" == ["I","studied","for","today's","quiz!"]
splitOn ',' "12,23,34," == ["12","23","34",""]
splitOn (2 :: Integer) [1,2,2,3,2] == [[1],[],[3],[]]
splitOn True [True,False,False,True,False,True] == [[],[False,False],[False],[]]
splitOn 1 [1] == [[],[]]
splitOn 1 [] == [[]]
splitOn "a" [] == [[]]
splitOn False [False, True, True, False, False, True] == [[],[True, True],[],[True]]
take 10 (splitOn (1 :: Int) (repeat 1)) == [[],[],[],[],[],[],[],[],[],[]]
take 8 (splitOn 2 (cycle [1,2,3,4])) == [[1],[3,4,1],[3,4,1],[3,4,1],[3,4,1],[3,4,1],[3,4,1],[3,4,1]]
(take 50 (splitOn 5 [1..] !! 1)) == take 50 [6..]

emptyLines "elso\nmasodik\n\nnegyedik\n" == [3 :: Double,5]
emptyLines "theme=dark\n\ntoolbar=0\n\nicons=gnome" == [2,4]
emptyLines "" == [1]
emptyLines "\n\nKicsit lentebb kezdődik\na sor\n\n" == [1,2,5,6]
null (emptyLines "alma")
null (emptyLines "alma\nkörte\nszilva")
take 50 (emptyLines (repeat '\n')) == take 50 [1..]

csv "nev,neptun,jegy\nEndre,ADG1K5,5\nAnna,KRJ25L,5" == [["nev","neptun","jegy"],["Endre","ADG1K5","5"],["Anna","KRJ25L","5"]]
csv "\n\nmegtett km,fogyasztas,\n745,7.1 l/100 km\n800,,megj:nem sikerult lemerni\n796,6.5 l/100 km,,\n\n,,Tovabbi adatok nincsenek!\n\n" == [[],[],["megtett km","fogyasztas",[]],["745","7.1 l/100 km"],["800",[],"megj:nem sikerult lemerni"],["796","6.5 l/100 km",[],[]],[],[[],[],"Tovabbi adatok nincsenek!"],[],[]]
null (csv [])
-}