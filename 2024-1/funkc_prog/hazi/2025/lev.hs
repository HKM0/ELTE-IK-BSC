leibniz :: Integer -> Double
leibniz n = 4.0 * lebSeged n 1.0 1.0 0.0

-- tag szam - nevezo most - elojel most - resz osszeg 
lebSeged :: Integer -> Double -> Double -> Double -> Double
lebSeged nMaradek nevezo elojel osszeg
    | nMaradek <= 0 = osszeg -- maradek tag szam 0, kilepek
    | otherwise = lebSeged (nMaradek - 1) (nevezo + 2.0) (elojel * (-1.0)) (osszeg + (elojel / nevezo)) --rekurziv hivasok
