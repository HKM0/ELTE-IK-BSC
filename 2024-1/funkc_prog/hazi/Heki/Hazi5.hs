module Hazi5 where

{-1. Hegy -}
mountain :: Integral i => i -> String
mountain 0 = ""
mountain 1 = "#"
mountain a = mountain (a - 1) ++ "\n" ++ replicate (fromIntegral a) '#'
--putStrLn (mountain 10)


{-2. 'a' karakterek egy szövegben-}
countAChars :: Num i => String -> i
countAChars [] = 0
countAChars ('a':xs) = 1 + countAChars xs
countAChars (_:xs) = countAChars xs


{-3. Lucas-sorozat-}
lucas :: (Integral a, Num b) => a -> b
lucas 0 = 2
lucas 1 = 1
lucas a = lucas (a - 1) + lucas (a - 2)

{-4. Hasznos függvény a jövőben-}
longerThan :: Integral i => [a] -> i -> Bool
longerThan [] 0 = False
longerThan _ n | n <= 0 = True
longerThan [] _ = False
longerThan (_:xs) 0 = False
longerThan (_:xs) n = longerThan xs (n - 1)
--ezt lehet sokkal egyszerűbben csak buta vagyok

{-5. Kiegészítés-}
format :: Integral i => i -> String -> String
format 0 a = a
format a "" = ' ' : format (a - 1) ""
format a (x:xs) = x : format (a - 1) xs

{-6. Összefésülés-}
merge :: [a] -> [a] -> [a]
merge [] y = y
merge x [] = x
merge (x:xs) (y:ys) = x : y : merge xs ys



{-
--unatkoztam szóval itt egy karácsonyfa: 

sor :: Integral i => i -> i -> String
sor szelesseg a = replicate (fromIntegral (szelesseg - a))' ' ++ replicate (fromIntegral(2 * a - 1)) '#'
fa :: Integral i => i -> String
fa 0 = ""
fa a = init (concatMap (\x -> sor a x ++ "\n")[1..a]) 
--http://zvon.org/other/haskell/Outputprelude/map_f.html 
--http://zvon.org/other/haskell/Outputprelude/concat_f.html
--http://zvon.org/other/haskell/Outputprelude/concatMap_f.html
torzs :: Integral i => i -> String
torzs a | a <= 3 = replicate (fromIntegral (a - 1)) ' ' ++ "|"
torzs a = replicate (fromIntegral (a - 2)) ' ' ++ "|||"
teljesfa :: Integral i => i -> String
teljesfa a = fa a ++ "\n" ++ torzs a

--putStrLn (teljesfa 10)
-}