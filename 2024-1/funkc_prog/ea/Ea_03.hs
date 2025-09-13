{- A típusosztályok jelentőségét tekintettük át. Röviden megbeszéltük 
újra a Num, Integral, Fractional, Floating, típusosztályokat, 
műveleteiket.
Megnéztük a length függvény típusát, ami: length :: Foldable t => t a -> Int
A Foldable típusosztályról majd később lesz szó, egyelőre tekintsük ezt
listának. A listákat hamarosan részletesen tárgyaljuk az előadáson is,
a gyakorlatokon már volt róla szó.

Egyelőre a Foldable típusosztály megszorításokkal adott függvényeket
egyszerűsítve fogjuk megnézni, így ezt leegyszerűsítjük: length :: [a] -> Int

Ad-hoc vs. parametrikus polimorfizmus.

Parametrikus polimorfizmus: típusváltozó szerepel a típusban, 
azokra nincs semmilyen megszorítás. Limitált, hogy mit tudunk így 
definiálni. Példaként megnéztük az identitás `id` függvényt.

Ad-hoc polimorfizmus: a függvény több típusra is definiálva van, de 
korlátozások mellett (típusosztály megszorítás). pl. (+) :: (Num a) => a 
-> a -> a

Fixitás: kötési erősség és asszociativitás iránya. pl. infixl 6 +, 
infixl 7 `div`

A kötési erősség 0-9 közötti érték lehet, ahol a 9 a legerősebb. Az 
asszociativitás lehet bal (infixl), jobb (infixr), vagy nem asszociatív a 
művelet (infix). Ezek csak az infix módon való felhasználás esetén 
érvényesek.

Operátorok használhatók prefix módon, kétparaméteres függvények 
használhatók infix módon. Operátorokat be kell zárójelezni felsorolni a 
paramétereit, a függvénynevek/azonosítók "köré" backticket/visszafelé 
aposztrófot kell írni. pl. (+) 3 4, 120 `div` 4
A kötési irányok a használati módnak megfelelően változhat, azaz infix 
módon a megadott, prefix módon a legerősebb szintre lép.

Példák:
(+) 3 4 ^ 2 vs. 3 + 4 ^ 2
div 120 4 ^ 2 vs. 120 `div` 4 ^ 2
-}

-- id :: a -> a
-- id x = x

{-
Az inc függvényt definiáltuk és megbeszéltük annak lehetséges típusait, 
pl:
inc :: Int -> Int
inc :: Integer -> Integer
inc :: Double -> Double
inc :: Integral a => a -> a

A legáltalánosabb típus, ami a definícióra megadható:
inc :: Num a => a -> a

Az összeadás a Num típusosztályban adott, így ez határozza meg a 
megadható típust.

Ha a definíció `inc x = x + 1.0` lenne, akkor a legáltalánosabb típus 
már a Fractional típusosztályra korlátozódna, mert az 1.0 értéket
használtuk.
-}
inc :: Num a => a -> a
inc x = x + 1

sqr x = x * x

sqrInc x = sqr (inc x)

{-
Lusta és mohó kiértékelési stratégia bemutatása.

Mohó kiértékelés (eager/strict evaluation): Előbb a paraméterek 
kerülnek kiértékelésre, aztán a függvény. 

Lusta kiértékelés (lazy evaluation): A függvény kerül kiértékelésre és 
amikor majd szükséges, akkor a paraméterül kapott kifejezések is.

A lusta olyan esetekben találhat megoldást, amikor a mohó nem. Persze a 
lusta kiértékelésnek is lehetnek hátrányai. pl. többször kerül 
kiértékelésre ugyanazon kifejezés.

A Haskell a lusta kiértékelési stratégiát követi, de kikényszeríthető 
bizonyos fokú mohóság.
-}

{-
-- lusta
sqrInc 7
sqr (inc 7)
(inc 7) * (inc 7)
(7 + 1) * (inc 7)
8 * (7+1)
8 * 8
64

-- mohó
sqrInc 7
sqr (inc 7)
sqr 8
8 * 8
64

-}

{-
Mintaillesztés

Formái:
- változók: x, y, z, xs, n 
- "értékek": 0, 1, True, False, 'a', 'b'
- joker: _
- összetettebb konstrukciók: rendezett n-esek (x,y), (x,y,z), majd 
később lista, stb.

A voltozókra és a jokerre minden illeszkedik. A változóneveknek 
különbözniük kell egy mintán belül, azok nem ismételhetők (Erlangban 
igen, mert ott speciális jelentése van). A jokerre nem vonatkozik ez, 
tetszőlegesen sokszor lehet használni egy mintán belül. A jokerrel 
"fogadott" érték nem hivatkozható a törzsön belül, hiszen ezzel azt 
jelezzük, hogy erre az értékre nincs szükségünk az adott definícióban.

Egy függvény több definiáló egyenlőséggel adható meg, a minták számának 
megfelelően. Fontos a sorrend, a legspeciálisabb mintától haladunk az 
általános felé. lehetőleg az összes lehetséges esetre definiáljuk a 
függvényt. Megnéztük a logikai és művelet naiv megközelítésű 
definícióját, illetve annak egyszerűsítéseit.

Megbeszéltük a rendezett n-eseket, amelyeknek alakjai: (1,2), (1,2,3), 
(1,2,3,4) stb. A rendezett n-esek használhatók összetartozó értékek 
csoportosítására, vagy ha egy függvénynek több értéket kell 
eredményként adnia. pl. divMod :: Integral a => a -> a -> (a, a)

A rendezett párok a (,) konstruktorral hozhatók létre. pl. (1,2) vagy 
(,) 1 2. A mintaillesztésben erre a konstruktorra illesztünk, például a 
"becsomagolt" értékek hivatkozása miatt. pl. az fst, snd függvények
-}

--fact 0 = 1
--fact n = ...

(&:&) True x = x
(&:&) _    _ = False
--False &:& True  = False
--False &:& False = False

{- Amennyiben szükséges olyan művelet, ami nincs importálva, akkor azt 
az import direktívával lehet megtenni. pl

import Data.List (sort)

vagy, ha a Prelude-on keresztül automatikusan importál függvényt 
szeretnénk elrejteni, akkor ezt is megtehetjük. pl. 

import Prelude hiding ((&&))
-}

-- mintaillesztés számokra

isPrime 2 = True
isPrime 3 = True
isPrime 5 = True
inPrime _ = False

-- mintaillesztés rendezett párokra

fst' :: (a,b) -> a 
fst' (x,y) = x

