import Data.Char

lista :: [Int]
lista = [x | x <- [1..100], mod x 2 == 0]

indexString :: String -> [(Integer, Char)]
indexString s = indexSeged 1 s

indexSeged :: Integer -> String -> [(Integer, Char)]
indexSeged _ [] = []
indexSeged n (x:xs) = (n, x): indexSeged (n+1) xs


splitQuadruple :: (a,b,c,d) -> ((a,b),(c,d))
splitQuadruple (a,b,c,d) = ((a,b),(c,d))

parseCSV :: String -> [String]
parseCSV [] = [""]
parseCSV (x:xs)
    | x == ';' = [] : (parseCSV xs)
    | otherwise = (x : head (parseCSV xs)) : tail (parseCSV xs)


compressLetters :: String -> String
compressLetters "" = ""
compressLetters [a] = [a]
compressLetters (x:y:xs)
    | x == y && isLower x = toUpper x : compressLetters xs
    | otherwise = x : compressLetters (y:xs)

lengthOfShorter :: [a] -> [b] -> Integer
lengthOfShorter x y = listaSeged x y 0

listaSeged :: [a] -> [b] -> Integer -> Integer
listaSeged [] _ szam = szam
listaSeged _ [] szam = szam
listaSeged (_:xs) (_:ys) szam = listaSeged xs ys (szam+1)

