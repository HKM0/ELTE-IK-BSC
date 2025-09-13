module Hazi3 where
import Data.List

-- Taketwo vagy netalán 2K(you know Take-Two, the publisher, ami 2K is)

takeTwo :: [a] -> [a]
takeTwo [] = []
takeTwo [x] = [x]
takeTwo (x : y : _) = (x : y : [])

-- TEACHER I SUSPECT THE ANSWER TO THIS QUESTION IS FOUR... TEACHER!

reverseAtMostFour :: [a] -> [a]
reverseAtMostFour [] = []
reverseAtMostFour [a] = [a]
reverseAtMostFour [a, b] = [b, a]
reverseAtMostFour [a, b, c] = [c, b, a]
reverseAtMostFour (egy : ket : ha : a : xs) = (a : ha : ket : egy : xs)

-- Hmm I seen something like this before, is this Deja Vu I feel?

exactlyTwo :: [a] -> Bool
exactlyTwo (deja : vu : []) = True
exactlyTwo _ = False

{-
Egy icipici egész felmászott a kódban,
Jött egy hibás teszteset, elbukott azon nyomban,
De megjavult a kód és így már nincs gondban,
Így az icipici egész felmászott a kódban.
-}

smallEvens :: [Integer] -> [Integer]
smallEvens xs = [x | x <- xs, even x, x < 100]

-- A BandiRAR függvény (Early Access)

decompress :: [(Char, Integer)] -> String
decompress c = [y | (x,xs) <- c, z <- [1..xs], y <- [x]]

-- (Amazon / Twitch) Prime, vagy az üditőital

prime :: Integer -> Bool
prime 1 = False
prime y = genericLength([ osztok | osztok <- [1..y], y `mod` osztok == 0]) <= 2

-- Most már több is van

primes :: [Integer]
primes = [primenums | primenums <- [1..], prime primenums] -- To infinity and BEYOND! Now with only *Szelektív kiértékelés*
