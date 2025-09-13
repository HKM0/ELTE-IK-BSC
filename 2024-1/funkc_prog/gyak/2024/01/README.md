# Imperatív programozás gyakorlat

**Kurzus kód:** IP-18UNPEG  
**Oktató:** Erdei Zsófia  
**Beadandók:** [tms.inf.elte.hu](https://tms.inf.elte.hu)  
**Tananyag:** [learnyouahaskell.com](http://learnyouahaskell.com)  
**Telepítés:** [haskell.org/ghcup](https://www.haskell.org/ghcup/)  
**Használt nyelv:** Haskell

---

## Haskell parancsok

| Parancs      | Argumentum      | Leírás                                               |
|--------------|-----------------|------------------------------------------------------|
| `:l`         | (fájl)          | Fájl betöltése (csak ha az adott könyvtárban vagyunk)|
| `:r`         |                 | Újratöltés/frissítés (pl. módosítás után)            |
| `div`        | (szám) (szám)   | Osztás hányadosa egészben                            |
| `mod`        | (szám) (szám)   | Osztás maradéka                                      |

---

## Gyakorlás

```haskell
10 `div` 5         -- 2      csak egészet egésszel, egészet ad vissza, könnyen olvasható
(+) 3 4 * 5        -- 35     összeadja 3-at és 4-et, majd megszorozza 5-tel
(-) 3 4 * 5        -- -5     kivonja 4-et 3-ból, majd megszorozza 5-tel
toEnum (szám) :: Char
```

---

## Feladat

Írj egy függvényt, ami összead két számot és hozzáad ötöt!

```haskell
osszeadPluszOt :: Int -> Int -> Int
osszeadPluszOt x y = x + y + 5
```
