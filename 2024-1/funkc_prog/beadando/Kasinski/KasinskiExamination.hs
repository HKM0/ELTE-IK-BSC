module KasinskiExamination where

import Data.List
import Data.Function

type Cipher = String
type Term = String

isPrefixRepeated :: Int -> Cipher -> Bool
isPrefixRepeated a b
    | a == 0 = True
    | a > 0 = any (prefix `isPrefixOf`) (slices rest)
    | otherwise = False
 where
 prefix = take a b
 rest = drop a b
slices :: [a] -> [[a]]
slices [] = []
slices xs = xs : slices (tail xs)

repetitionOfLen :: Int -> Cipher -> [Term]
repetitionOfLen n b
    | n <= 0 || not (hasAtLeast n b) = [] 
    | prefix `isPrefixRepeatedIn` rest = prefix : repetitionOfLen n (tail b)
    | otherwise = repetitionOfLen n (tail b)
  where
    prefix = take n b
    rest = drop n b

hasAtLeast :: Int -> [a] -> Bool
hasAtLeast 0 _ = True
hasAtLeast _ [] = False
hasAtLeast k (_:xs) = hasAtLeast (k - 1) xs


isPrefixRepeatedIn :: Eq a => [a] -> [a] -> Bool
isPrefixRepeatedIn prefix rest = any (isPrefixOf prefix) (slices rest)
--ez nem jó
repetitions :: Cipher -> [Term]
repetitions b =  nub (concatMap (repetitionOfLenInCipher b) [3 .. cipherHossz b])

repetitionOfLenInCipher :: Cipher -> Int -> [Term]
repetitionOfLenInCipher cipher n = repetitionOfLen n cipher

cipherHossz :: Cipher -> Int
cipherHossz [] = 0
cipherHossz (_:xs) = 1 + cipherHossz xs

removeDuplicates :: Eq a => [a] -> [a]
removeDuplicates [] = []
removeDuplicates (x:xs)
    | x `elem` xs = removeDuplicates xs
    | otherwise = x : removeDuplicates xs


countOccurrences :: Term -> Cipher -> Int
countOccurrences s b = length (filter (isPrefixOf s) (tails b))

termStartPositions :: Term -> Cipher -> [Int]
termStartPositions t b = go b 0
 where
 go [] _ = []
 go rest start
  | take (length t) rest == t = start : go (drop 1 rest) (start + 1)
  | otherwise = go (drop 1 rest) (start + 1)

differences :: [Int] -> [Int]
differences [] = []
differences [x] = []
differences (x:y:xs) = (y - x) : differences (y:xs)

repeatedTermDistances :: Cipher -> [Int]
repeatedTermDistances b = concatMap distances repeatT
 where
 repeatT = removeDuplicates (concatMap (`repetitionOfLen` b) [3..length b])
 distances t = differences (termStartPositions t b) 
 
divisors :: Int -> [Int]
divisors n = filter (divider n) [1..n]

divider :: Int -> Int -> Bool
divider n x = n `mod` x == 0

factors :: [Int] -> [Int]
factors xs = sort (concatMap (\x -> filter (>2) (divide x)) xs)
  where
    divide n = [d | d <- [1..n], n `mod` d == 0]

type KeyLength = Int
type Frequency = Int

analyseCipher :: Cipher -> [(Frequency, KeyLength)]
analyseCipher b = sort (frequency (factors (repeatedTermDistances b)))
 where
  frequency :: (Ord a) => [a] -> [(Int, a)]
  frequency xs = map (\l -> (length l, head l)) (group (sort xs))