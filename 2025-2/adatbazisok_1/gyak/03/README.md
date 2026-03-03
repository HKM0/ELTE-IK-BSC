# Adatbázisok 1 - 3. gyakorlat

## [Relax környezet](https://dbis-uibk.github.io/relax/calc/gist/47d64885afcf7b9cb394ed668be88fce)

# Első feladat: Dolgozo
## Tábla

<details>
<summary>Táblák adatai (kattints a megnyitáshoz)</summary>

```
group: AB1 Dolgozo
description[[ Dolgozo(dkod, dnev, foglalkozas, fonoke, belepes, fizetes, jutalek, oazon) relation ]]
Dolgozo={
dkod:number, dnev:string, foglalkozas:string, fonoke:number, belepes:date, fizetes:number, jutalek:number, oazon:number
7369,	SMITH,	CLERK,     7902,	1980-12-17,   800, null,   20
7499,	ALLEN,	SALESMAN,  7698,	1981-02-20,  1600,   300,  30
7521,	WARD,	SALESMAN,  7698,	1981-02-22,  1250,   500,  30
7566,	JONES,	MANAGER,   7839,	1981-04-02,  2975,  null,  20
7654,	MARTIN,	SALESMAN,  7698,	1981-09-28,  1250,  1400,  30
7698,	BLAKE,	MANAGER,   7839,	1981-05-01,  4250,  null,  30
7782,	CLARK,	MANAGER,   7839,	1981-06-09,  2450,   200,  10
7788,	SCOTT,	ANALYST,   7566,	1982-12-09,  3000,  null,  20
7839,	KING,	PRESIDENT, null,        1981-11-17,  5000,  null,  10
7844,	TURNER,	SALESMAN,  7698,	1981-09-08,  1500,    10,  30
7876,	ADAMS,	CLERK,     7788,	1983-01-12,  1100,  null,  20
7900,	JAMES,	CLERK,     7698,	1981-12-03,   950,  null,  30
7902,	FORD,	ANALYST,   7566,	1981-12-03,  3000,   700,  20
7934,	MILLER,	CLERK,     7782,	1982-01-23,  1300,   600,  10
8001,   COOK,   MANAGER,   7839,        1981-06-09,  3800,  null,  50
8002,   HART,   SALESMAN,  8001,        1982-05-09,  1600,   200,  50
8003,   WOLF,   CLERK,     8001,        1983-04-09,  1000,   null, 50
}

Osztaly={
oazon:number, onev:string, telephely:string
10,  ACCOUNTING,  'NEW YORK'
20,  RESEARCH,    'DALLAS'
30,  SALES,       'CHICAGO'
40,  OPERATIONS,  'BOSTON'
50,  MARKETING,   'DENVER'
}

Fiz_kategoria={
kategoria:number, also:number, felso:number
1,   700,  1200
2,  1201,  1400
3,  1401,  2000
4,  2001,  3000
5,  3001,  9999
}
```
</details>

## Relációs algebra feladatok

### 1. Kik azok a dolgozók, akiknek a főnöke KING? (dkod, dnev, fizetes)
```
π dkod, dnev, fizetes (σ d.fonoke = k.dkod (Dolgozo ⨯ ρ k (σ dnev = 'KING' (Dolgozo))))
```

### 2. Kik azok a dolgozók, akik főnökének a főnöke KING?
```
π d1.dkod, d1.dnev (ρ d1 (Dolgozo) ⋈ d1.fonoke = d2.dkod (ρ d2 (Dolgozo) ⋈ d2.fonoke = k.dkod ρ k (σ dnev = 'KING' (Dolgozo))))
```

### 3. Adjuk meg azokat a dolgozókat, akik többet keresnek a főnöküknél.
```
π d.dkod, d.dnev (σ d.fizetes > f.fizetes (ρ d (Dolgozo) ⋈ d.fonoke = f.dkod ρ f (Dolgozo)))
```

### 4. Kik azok a dolgozók, akik osztályának telephelye DALLAS vagy CHICAGO
```
π dnev (Dolgozo ⋈ σ telephely = 'DALLAS' ∨ telephely = 'CHICAGO' (Osztaly))
```

### 5. Kik azok a dolgozók, akik osztályának telephelye nem DALLAS és nem CHICAGO?
```
π dnev (Dolgozo ⋈ σ telephely != 'DALLAS' ∧ telephely != 'CHICAGO' (Osztaly))
```

### 6. Kik azok a dolgozók, akiknek a legmagasabb a fizetésük?
```
Dolgozo - π d1.* (ρ d1 (Dolgozo) ⋈ d1.fizetes < d2.fizetes ρ d2 (Dolgozo))
```

### 7. Kik azok a dolgozók, akiknek van 2000-nél nagyobb fizetésű beosztottja.
```
π f.dnev (ρ f (Dolgozo) ⨝ f.dkod = b.fonoke σ fizetes > 2000 (ρ b (Dolgozo)))
```

### 8. Kik azok a dolgozók, akiknek nincs 2000-nél nagyobb fizetésű beosztottja.
```
π dnev (Dolgozo) - π f.dnev (ρ f (Dolgozo) ⨝ f.dkod = b.fonoke σ fizetes > 2000 (ρ b (Dolgozo)))
```

### 9. Mely telephelyeken van elemző (ANALYST) foglalkozású dolgozó.
```
π telephely (Osztaly ⨝ σ foglalkozas = 'ANALYST' (Dolgozo))
```

### 10. Mely telephelyeken nincs elemző (ANALYST) foglalkozású dolgozó.
```
π telephely (Osztaly) - π telephely (Osztaly ⨝ σ foglalkozas = 'ANALYST' (Dolgozo))
```

### 11. Adjuk meg azon osztályok nevét és telephelyét, amelyeknek van 1-es fizetési kategóriájú dolgozója.
```
π onev, telephely (Osztaly ⨝ (Dolgozo ⨝ σ kategoria = 1 (Fiz_kategoria ⨝ also <= fizetes ∧ fizetes <= felso)))
```

### 12. Adjuk meg azon osztályok nevét és telephelyét, amelyeknek nincs 1-es fizetési kategóriájú dolgozója.
```
π onev, telephely (Osztaly) - π onev, telephely (Osztaly ⨝ (Dolgozo ⨝ σ kategoria = 1 (Fiz_kategoria ⨝ also <= fizetes ∧ fizetes <= felso)))
```

# Második feladat: Áruház

## Tábla

<details>
<summary>Táblák adatai (kattints a megnyitáshoz)</summary>

```
group: AB1 PC Termek

Termek = {gyarto:string, modell:number, tipus:string
'A',1001,'pc'
'A',1002,'pc'
'A',1003,'pc'
'A',2004,'laptop'
'A',2005,'laptop'
'A',2006,'laptop'
'B',1004,'pc'
'B',1005,'pc'
'B',1006,'pc'
'B',2007,'laptop'
'C',1007,'pc'
'D',1008,'pc'
'D',1009,'pc'
'D',1010,'pc'
'D',3004,'nyomtató'
'D',3005,'nyomtató'
'E',1011,'pc'
'E',1012,'pc'
'E',1013,'pc'
'E',2001,'laptop'
'E',2002,'laptop'
'E',2003,'laptop'
'E',3001,'nyomtató'
'E',3002,'nyomtató'
'E',3003,'nyomtató'
'F',2008,'laptop'
'F',2009,'laptop'
'G',2010,'laptop'
'H',3006,'nyomtató'
'H',3007,'nyomtató'
}

PC = { modell:number, sebesseg:number, memoria:number, merevlemez:number,ar:number
1001,2.66,1024,250,2114
1002,2.10,512,250,995
1003,1.42,512,80,478
1004,2.80,1024,250,649
1005,3.20,512,250,630
1006,3.20,1024,320,1049
1007,2.20,1024,200,510
1008,2.20,2048,250,770
1009,2.00,1024,250,650
1010,2.80,2048,300,770
1011,1.86,2048,160,959
1012,2.80,1024,160,649
1013,3.06,512,80,529
}

Laptop = {modell:number, sebesseg:number, memoria:number,merevlemez:number, kepernyo:number,ar:number
2001,2.00,2048,240,20.1,3673
2002,1.73,1024,80,17.0,949
2003,1.80,512,60,15.4,549
2004,2.00,512,60,13.3,1150
2005,2.16,1024,120,17.0,2500
2006,2.00,2048,80,15.4,1700
2007,1.83,1024,120,13.3,1429
2008,1.60,1024,100,15.4,900
2009,1.60,512,80,14.1,680
2010,2.00,2048,160,15.4,2300
}

Nyomtato = {modell:number, szines:string, tipus:string,ar:number
3001,'igen','tintasugaras',3673
3002,'nem','lézer',949
3003,'igen','lézer',549
3004,'igen','tintasugaras',1150
3005,'nem','lézer',2500
3006,'igen','tintasugaras',1700
3007,'igen','lézer',1429
}
```

</details>

## Relációs algebra feladatok

### 1. PC-k legalább 3.00 sebességgel
```
πmodell(σsebesseg≥3.00(PC))
```

### 2. Legalább 100 GB HDD-vel rendelkező laptopok gyártói
```
πgyarto(Termek⋈σmerevlemez≥100(Laptop))
```

### 3. 'B' gyártó termékeinek modellszáma és ára
```
πmodell,ar(σgyarto='B'(Termek)⋈(πmodell,ar(PC)∪πmodell,ar(Laptop)∪πmodell,ar(Nyomtato)))
```

### 4. Színes lézernyomtatók modellszámai
```
πmodell(σszines='igen'∧tipus='lezer'(Nyomtato))
```

### 5. Gyártók, akik árulnak laptopot, de PC-t nem
```
πgyarto(σtipus='laptop'(Termek))-πgyarto(σtipus='pc'(Termek))
```

### 6. Merevlemezméretek, amelyek legalább két PC-ben megtalálhatók
```
πP1.merevlemez (σP1.merevlemez = P2.merevlemez ∧ P1.modell < P2.modell (ρP1 PC x ρP2 PC))
```

### 7. Azonos sebességű és memóriájú PC párok (duplikátum nélkül)
```
πP1.modell, P2.modell (σP1.sebesseg = P2.sebesseg ∧ P1.memoria = P2.memoria ∧ P1.modell < P2.modell (ρP1 PC x ρP2 PC))
```

### 8. Leggyorsabb gép gyártója
```
S = πmodell, sebesseg (PC) ∪ πmodell, sebesseg (Laptop)
S -
πS1.modell, S1.sebesseg σS1.sebesseg < S2.sebesseg (ρS1 S x ρS2 S)
```

### 9. Legalább három különböző sebességű PC-t gyártó gyártó
```
TPC = πgyarto, sebesseg (Termek ⋈ PC)
πT1.gyarto (σT1.gyarto = T2.gyarto ∧ T2.gyarto = T3.gyarto ∧ T1.sebesseg < T2.sebesseg ∧ T2.sebesseg < T3.sebesseg (ρT1 TPC x ρT2 TPC x ρT3 TPC))
```