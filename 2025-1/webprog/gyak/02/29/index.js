//+feladat
//„Igaz-e, hogy van legalább egy olyan pozitív szám, aminek a tizedesrésze 0.4 vagy nagyobb?”
const existsPlus = temps.some(x => x > 0 && (x - Math.floor(x)) >= 0.4)

//++feladat
//„Add meg az első olyan negatív számot, amely kisebb, mint -1!”
const existsPlusPlus = temps.find(x => x < -1);
