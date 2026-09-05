Minta 1.ZH / 1.rész Papíron megoldandó feladatok

5 feladat x 4 pont = 20 pont, min.követelmény: 8 pont (40%)
Fejezzük ki a következő lekérdezéseket alap relációs algebrában!
Csak az alap relációs algebrai műveleteket használhatja:
        vetítés (π), szűrés (σ), átnevezés (ρ),
        természetes összekapcsolás (⨝), direkt szorzat (⨯)
        halmazműveleti különbség (-), unió (∪), metszet (∩)

Tegyük fel, hogy adott két reláció, amelyeknek a sémája:
Sz - Szoba (Hotelnév, Szobaszám, Típus, Ár)
        Kulcs: (Hotelnév, Szobaszám)
F -  Foglalás(Azonosító, Ügyfélnév, Hotelnév, Szobaszám, Éjszakák)
        Kulcs: (Azonosító)
        Külső kulcs: (Hotelnév, Szobaszám)

1.feladat (4 pont)
Melyek azok a hotelek, ahol kétágyas és franciaágyas szobatípust is kínálnak?
(Hotelnév)
```
(πHotelnev (σTipus='ketagyas' (Sz))) ∩ (πHotelnev (σTipus='franciaagyas' (Sz)))
```

2.feladat (4 pont)
Melyek azok a hotelek, ahol minden szoba drágább mint 200?
(Hotelnév)
```
πHotelnev(Sz) - πHotelnev(σAr<=200(Sz))
```

3.feladat (4 pont)
Kik azok az ügyfelek, akik legalább két foglalással rendelkeznek ugyanabban a hotelben.
(Ügyfélnév, Hotelnév)
```
πUgyfelnev,Hotelnev (σF1.Azonosito≠F2.Azonosito∧F1.Ugyfelnev=F2.Ugyfelnev∧F1.Hotelnev=F2.Hotelnev) (ρF1 (F))⨯(ρF2 (F))
```

4.feladat (4 pont)
Melyik a leghosszabb foglalás (a legtöbb Éjszakák) és kihez tartozik?
(Éjszakák, Ügyfélnév)
```

πEjszakak, Ugyfelnev ()
```

5.feladat (4 pont)
Itt egy kifejtős kérdés várható, valamelyik fontos alapfogalmat kell elmagyaráznia
(azt kell bemutatnia, hogy ismeri és érti az alapfogalmakat, lekérdezéseket).
Tananyag: Ullman-Widom Tankönyv 2.4. és 6.1-6.4., vagyis ami az Előadáson:
1. EA: 2026. 02. 10. Relációs adatmodell, relációs algebra
2. EA: 2026. 02. 17. SQL bevezetés-1.rész
3. EA: 2026. 02. 24. SQL bevezetés-2.rész, SQL haladó-1.rész