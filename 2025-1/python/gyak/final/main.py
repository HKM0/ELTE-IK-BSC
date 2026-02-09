#-------------------------------------------------------------------------

"""Írj egy függvényt, ami egy stringben kicseréli a „one” szavakat 1-esekre kis és
nagybetűtől függetlenül! A visszatérési érték string legyen."""

#def elso(be:str)-> str:
#    return be.lower().replace("one","1")
#
#print(elso("oneOneyipeeonen"))

def elso(be:str) -> str:
    gyujto = ""
    ki=""
    for c in be:
        if gyujto.lower()=="on" and c.lower()=="e":
            ki+="1"
            gyujto=""
        elif gyujto.lower()== "o" and c.lower() =="n":
            gyujto+="n"
        elif gyujto=="" and c.lower()=="o":
            gyujto+="o"
        else:
            ki+=gyujto+c
            gyujto=""
    return ki
print(elso("oneOneyiPeeonen"))

#-------------------------------------------------------------------------

"""Írj egy lambda függvényt tetszőleges számú paraméterrel, ami a reduce
magasabb rendű függvény segítségével megszámolja a 3 karakternél hosszabb
stringeket!
(Feltételezhetjük, hogy ezesetben csak stringeket adunk át a függvénynek)
(Segítség: functools modulban található a reduce függvény)"""
from functools import reduce
be=["asdas","as","ba","asd","hi"]
ki = reduce(lambda acc, x: acc+ (1 if len(x)>=3 else 0), be, 0)

#-------------------------------------------------------------------------

"""Írj egy lambda függvényt, ami megszámolja, hogy hányszor szerepel egy stringben
a „hop” szó!"""
be="hipityhophophiphopMI BOMBA"
ki = (lambda a: len(a.split("hop"))-1)
print(ki(be))

#-------------------------------------------------------------------------

"""Írj komprehenzív listát, ami egy dictionary elemein végigiterálva kiválogatja azokat
a kulcsokat, ahol a hozzátartozó érték nagyobb, mint 2!"""
be = {"elso":1, "masodik":2, "harmadik":3, "negyedik":4}
ki = [x[0] for x in be.items() if be[x[0]]>=2]
print(ki)

#-------------------------------------------------------------------------

"""Adott az alábbi csv : (spotify_yt.csv (minta kedvéért a beadandóból)).
Olvasd be egy DataFrame-be a csv fájl tartalmát a pandas könyvtár segítségével!"""
