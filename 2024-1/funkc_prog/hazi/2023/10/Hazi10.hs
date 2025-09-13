module Hazi10 where
import Data.Maybe
import Data.List

data Infix a = Value a | Operation (a -> a -> a) | OpeningBracket | ClosingBracket 

type InfixExpression a = [Infix a]

isCorrectlyParenthesised :: InfixExpression a -> Bool
isCorrectlyParenthesised [] = True
isCorrectlyParenthesised (x:xs) = helper (x:xs) 0 where
    helper [] acc = acc == 0
    helper _ (-1) = False
    helper [OpeningBracket] _ = False
    helper (OpeningBracket:as) acc = helper as (acc + 1) 
    helper (ClosingBracket:as) acc = helper as (acc - 1)
    helper (a:as) acc = helper as acc

evaluateSimple :: InfixExpression a -> a
evaluateSimple (Value a: Operation b: Value c:[]) = (b a c)

helper :: InfixExpression a -> InfixExpression a -> InfixExpression a
helper [] acc = acc
helper (x:xs) acc
    | isCorrectlyParenthesised (acc ++ [x]) = drop 1 $ init (acc ++ [x])
    | otherwise = helper xs (acc ++ [x])

helper2 :: InfixExpression a -> InfixExpression a -> InfixExpression a
helper2 [] acc = acc
helper2 (x:xs) acc
    | isCorrectlyParenthesised (acc ++ [x]) = xs
    | otherwise = helper2 xs (acc ++ [x])

evaluateInfixExpression :: InfixExpression a -> Maybe a
evaluateInfixExpression [] = Nothing
evaluateInfixExpression (x:xs) | not $ isCorrectlyParenthesised (x:xs) = Nothing
evaluateInfixExpression [Value a] = Just a
evaluateInfixExpression (Value a:Operation b: Value c:xs) = evaluateInfixExpression $ (Value (b a c)):xs
evaluateInfixExpression (Value a: Operation b: OpeningBracket:xs) = case evaluateInfixExpression(helper (OpeningBracket:xs) []) of
    Nothing -> Nothing
    Just d -> evaluateInfixExpression (Value a: Operation b: Value d: helper2 (OpeningBracket:xs) [])
evaluateInfixExpression (OpeningBracket:xs) = case evaluateInfixExpression(helper (OpeningBracket:xs) []) of
    Nothing -> Nothing
    Just e ->  evaluateInfixExpression (Value e: helper2 (OpeningBracket:xs) [])
evaluateInfixExpression _ = Nothing
        