-- Kollár András (WQ2GNV)
{-
Kezdés: 10:15
Követelmények:
    - órai jelenlétek (max 3 hiányzás)
    - minizh (+/-) 12 * 2 (2 * 1 pont)
    - összesen 24 pont, ebből 12 kell
    - olvasható legyen

    - házi feladatok
    - az összes elfogadott állapotban kell legyen (kötelező)
    - másolás - 1-szer lehet DE bünti jár érte, védéssel

    - konzultációk:
    - péntek 12-14 Déli 2-107

    - nagybeadandó (kötelező)
        - pluszpontok (5 pont) opcionális rész
        - kb 2 hét, december 1. hete
    - félév végi vizsga:
        - beugró rész (elméleti kérdések) 12 pont, el kell érni 7 pontot legalább
        - összesen 2db vizsgán lehet részt venni
        - vizsgára neptunban kell majd jelentkezni
        - gyakorlati rész 18 pont, kb 8 feladat lesz 180 perc
        - 9 pontot el kell érni 
        - egy rekurzív függvényt kell írni 
    Összesen 30 + 5 pontot lehet szerezni

    Osztályzatok:
    5 - 30<=
    4 - 26<=
    3 - 22<=
    2 - 18<= 
Felületek:
    - teams - kommunikáció, felvételek, órai anyagok
    - TMS - házik, beadandó, vizsga 
    - Canvas - pontszámok, jelenlét
    - lambda.inf.elte.hu
    - https://hoogle.haskell.org/
    - hackage 

GHCi parancsok:
    - terminál/powershell/cmd: ghci (-Wall)
    - :l <elérési út> - fájl betöltése
    - :r - legutóbbi betöltött fájl újratöltése
    - :q - kilépés
    - :t <kifejezés> - megadja a függvény típusát


-}
module Gy01 where
-- statikusan típusozott nyelv - mindennek típusa van a fájl betöltésekor


{-
Típusok:
    - Int
    - Integer
    - Double
    - Bool
    - Char
    - String
-}

b :: Int 
b = 4

incB :: Int -> Int
incB b = b + 1 


one :: Int 
one = 1

two :: Int 
two = 1 + one

inc :: Integer -> Integer
inc x = x + 1

add' :: Integer -> Integer -> Integer
add' x y = x + y 

bool :: Bool
bool = True 

-- logikai műveletek
-- not - tagadás 
-- < > <= >= 
-- == - egyenlő-e
-- /= -logikai nem egyenlő

-- eldönti hogy az első-e  a nagyobb 
greater :: Int -> Int -> Bool 
greater almafa1 almafa2 = almafa1 > almafa2



