# 1. Írj egy programot, ami bekéri a felhasználó életkorát, majd kiszámolja mikor született!
import datetime
kor = input("korod?\t\tV: ")
print(f"Te {datetime.date.today().year-int(kor)} évben születtél")

# 2. Adott két változónk:
a = 505
b = 745
# Cseréljük fel az értékeiket egy sornyi kóddal!
a,b=b,a
print(a,b)


# 3. Írj egy programot, ami kiszámolja egy derékszögű háromszög átfogóját két bekért oldal után! (Feltételezzük, hogy helyes a bemenet!)
import math
def haromszog_atfogo(a,b):
    return math.sqrt(int(a)**2 + int(b)**2)
a,b = input("oldalak? pl '1,2' \t\tV: ").split(",")
print(haromszog_atfogo(a,b))


# 4. Adott egy változónk:
line = "Fah-fah, fah-fah-fah, fah-fah, fah"

#Számoljuk meg hányszor szerepel a szövegben a „fah” szó!
#Oldjuk meg egy sorban, kis-nagybetűtől függetlenül számoljunk!
print(line.lower().count("fah"))


# 5. Adott egy változónk:
lst = [1, [ [], [2, ["polizei"], 3], 4], "off"]
# Szedjük ki a változónkból az "ize" szórészletet!
print(lst[1][1][1][0][3:6])

# 6. Adott egy változónk:
lst = [ [ [], [ [], [], [] ] ], [], [ [] ], [] ]
# Számoljuk meg összesen hány üres lista van a változónkban!
# Oldjuk meg egy sorban, csak a gyakorlaton tanult anyagok alapján!
def ures_keres(lista):
    tmp=0
    for i in lista:
        if (len(i)==0): tmp+=1
        else: tmp += ures_keres(i)
    return tmp
print(ures_keres(lst))

# vagy ilyen goofy ah modon is lehet:
print(str(lst).count("[]"))


# 7. Adott egy változónk:
lst = [ [], set([1,1,1]), 123, (1, 2, "python", 4)]
# Adjuk meg a változónk hosszát!
print(len(lst))


# 8. Adott egy listánk:
lst = [300, 400, 150, 9000, 9001, -9001]
# Adjuk meg a listának a maximális elemét!
# Használjunk beépített függvényeket!
print(max(lst))


# 9. Mik az eredményei az alábbi műveleteknek?
# 9%3**2        0
# 2**3**2       512
# 5 % 0         hiba
# 5**4**0.5?    25.0



# 10. Írj egy programot, ami kirajzol egy piramist egy bekért írásjellel!
# Használj string műveleteket hozzá! (Feltételezzük, hogy helyes a bemenet!)
def piramis(jel,meret):
    for i in range(1,meret,2):
        for b in range((meret-i)//2):
            print(" ",end="")
        for b in range(i):
            print(jel,end="")
        print()
piramis("#",10)



# 11. Írj egy programot, ami kirajzol egy lefelé mutató nyilat!
# Használj string műveleteket hozzá!
def lefele(jel,meret):
    print("   ###\n"*5,end="")
    for i in range(0,meret,2):
        for b in range(i//2):
            print(" ",end="")
        for b in range(meret-i-1):
            print(jel,end="")
        print()
lefele("#",10)


# 12. Adott két változónk:
lst = [[1,2], [3,4]]
lst_copy = lst[:]
lst[0][1] = 0

# Mi fog történni az lst_copy-ban? Miért történik ez?


# 13. Próbáljuk ki az alábbi dolgokat!
# Mi történik, ha tuple-t szeletelünk?
# Tuple szeleteléses másolásánál mi lesz az új változó memóriacíme?
# Mi történik, ha halmazt szeletelünk?
# Mi történik, ha dictionary-t szeletelünk?
# Mi történik, ha lista típust erőltetünk az inputra, de nem listát kap?
# Mi történik, ha lista típust erőltetünk az inputra, és listát kap?


# 14. Adottak a változóink:
lst = [1,2,3,4,5]
a, b, *c = lst
lst2 = [1,2]
d, e, *f = lst2
# Mi fog történni?


# 15. Adott egy változónk:
t = (1, 2, [10, 20])
# Mi fog történni a t[2] += [30, 40] utasítás után?


# 16. Helyesek-e az alábbi műveletek?
'''
"2" + 2     nem
2 + "2"     nem
"2" * 3     igen
3 * "2"     igen
'''


# 17. Adott az alábbi lista:
lst = [1, 2, 3, 4]
# Forgassuk el a benne lévő elemeket n-nel szeletelést használva!
# (pl. n = -2 esetén: [3, 4, 1, 2] – azaz ekkor jobbra forgattuk!)


# 18. Adott az alábbi lista:
lst = [100, 200, 300, 400, 500, 600, 700, 800, 900]

# Szedjük ki a listából a 3 középső elemet! Használjunk szeletelést!