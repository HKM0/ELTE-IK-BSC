module Ropi9_10 where
{-
Minden definiálandó függvényhez adjuk meg a hozzátartozó típusát is! A feladatok után a zárójelben lévő név azt jelzi, milyen néven szükséges definiálni az adott függvényt, kifejezést. A forrásfáljban ügyeljetek arra, hogy minden kifejezés rendelkezzen helyes típus deklarációval!

A röpdolgozat feladat fájl moduljának a neve legyen Ropi9-10!
1. Kő-papír-olló adattípus (0.5 pont)

Készítsünk adattípust, amellyel a kő-papír-olló játék opcióinak ábrázolására! Az adatszerkezet neve legyen RPS és rendelkezzen az alábbi három paraméter nélküli adatkonstruktorral:

- `Rock` -- a kő kicsorbítja az ollót: a kő győz
- `Paper` -- a papír becsomagolja a követ: a papír győz
- `Scissors` -- az olló elvágja a papírt: az olló győz

Kérjünk a fordítótól automatikus példányosítást a Show és Eq típusosztályokra!
Kő-papír-olló nyertese (0.5 pont)

-}
data RPS = Rock | Paper | Scissors deriving (Show, Eq)

{-
Definiáld a winner függvényt, amely megadja egy kő-papír-olló játék nyertesét! Amennyiben nem döntetlen a játék, a nyertest csomagolja Just konstruktorba, egyéb esetben pedig adjon vissza Nothing-ot.

gameWon Rock Paper      == Just Paper
gameWon Paper Rock      == Just Paper
gameWon Rock Scissors   == Just Rock
gameWon Paper Scissors  == Just Scissors
gameWon Scissors Rock   == Just Rock
gameWon Paper Paper     == Nothing
gameWon Rock Rock       == Nothing
Definiáld a gameWon függvényt, amely megadja egy kő-papír-olló játék nyertesét! Amennyiben nem döntetlen a játék, a nyertest csomagolja Just konstruktorba, egyéb esetben pedig adjon vissza Nothing-ot.
-}

gameWon :: RPS -> RPS -> Maybe RPS
gameWon Rock Paper = Just Paper
gameWon Paper Rock = Just Paper
gameWon Rock Scissors = Just Rock
gameWon Scissors Rock = Just Rock
gameWon Paper Scissors = Just Scissors
gameWon Scissors Paper = Just Scissors
gameWon _ _ = Nothing

{-
2. Párok cseréje (1 pont)

Adott egy rendezett párokat tartalmazó lista. Definiáld a swapIfCond :: (a -> Bool) -> [(a,a)] -> [(a,a)] függvényt, amely megcseréli egy párban az elemek sorrendjét, ha a pár első elemére teljesül a paraméterként kapott feltétel.

swapIfCond even [] == []
swapIfCond even [(1,2),(3,4),(5,6)] == [(1,2),(3,4),(5,6)]
swapIfCond odd [(1,2),(3,4),(5,6)] == [(2,1),(4,3),(6,5)]
swapIfCond odd [(1,2),(2,3),(3,4),(4,5),(5,6)] == [(2,1),(2,3),(4,3),(4,5),(6,5)]
-}
swapIfCond :: (a -> Bool) -> [(a,a)] -> [(a,a)] 
swapIfCond _ [] = []
swapIfCond asd ((a,b):xy)
    | asd a = (b,a) : swapIfCond asd xy
    | otherwise = (a,b) : swapIfCond asd xy