module Gy01 where
import System.Win32 (COORD(y))

-- Alaptípusok: Int, Integer, Bool, Char, String, Float, Double

-- ghci-ben:
-- :t <kifejezés> = megadja a kifejezés típusát
-- :r betölteni megpróbált fájlt megpróbálja újra betölteni
-- :q kilépés
-- Többféleképpen lehet betölteni a fájlokat:
-- (1) Ha van nyitva ghci: :l <Haskell fájl elérési útvonala>
-- (2) Windowsba-ban .hs kiterjesztést társítani ghci-hez, utána duplakatt a fájlon.
-- (3) Konzolban/ Terminálban ghci parancsnak átadni paraméterül a betölteni kívánt fájlt
-- '' => karakter (csak egyet!!!)
-- "" => string
-- Int vs Integer: Az Int architektúra függő: 32 bites rendszer esetén=>32 bit a mérete -2^31 -- 2^31-1
-- 64 bites rendszer esetén=>64 bit a mérete -2^63 -- 2^63-1
-- ---> Korlátozott mennyiségű számot tud reprezentálni.
-- Integer --> végtelen
-- Haskell statikusan típusos: Minden értéknek van típusa
-- Haskell tisztán( !! ) funkcionális nyelv:

a :: Int
a = 1
integer :: Integer
integer = 42

f :: Int -> Int 
f x = x + 1

g :: Integer -> Integer -> Integer
g x y = 2 * x - y

-- Folyt. köv: osztás függvény