# 1. Írj egy függvényt, ami eldönti, hogy a megadott évszám szökőév-e!
# (Ha 4-gyel osztható - szökőév, ha 100-zal osztható - nem az, de ha 400-zal osztható - szökőév)
def szokoev(ev):
    return ((False if ev%100==0 else True) if (ev%400==0 or ev%4==0) else False)
print(szokoev(2025))

# 2. Írj egy függvényt, ami generál egy véletlen számot egy adott intervallumban, 
# majd addig kér be a felhasználótól számokat, ameddig nem találja ki a generált számot!
# a. Segíts a felhasználónak azzal, hogy kiírod kisebb vagy nagyobb-e a gondolt szám!
import random

def kitalalos(a,b):
    szam = random.randint(a,b)
    tipp= int(input("Mi a szám?\tV: "))
    while(tipp!=szam):
        print(f"A szám {"kisebb" if tipp > szam else "nagyobb"}!")
        tipp = int(input("Mi a szám?\tV: "))
    print(f"Eltaláltad, a szám a {szam} volt!")

# kitalalos(1,100)

# 3. Adott az alábbi listánk:
lst = [1, 2, 1, 2, 3, 3, 3, 2, 1, 2, 4, 5, 13, 5, 6]
# Írj egy függvényt, ami a fenti listából kiszedi az ismétlődő elemeket! Használj hozzá ciklust!
lista=[]
[lista.append(i) if not i in lista else "" for i in lst]
print(lista)


# 4.
# a. Írj egy függvényt, ami megvalósítja a Caesar-kódolást!
# A Caesar-kódolás eltolja a karaktereket egy adott irányba egy adott mennyiséggel.
# Használd a ord() és chr() függvényt a betűk kódjának változtatására!
# példa: "abc" jobbra eggyel eltolva: "bcd"
def caesar(a,sz):
    c = ""
    return  [c:= c + chr(ord(i)+a) for i in sz][-1]
#print(caesar(-1,"teszt"))
# b. Írj egy függvényt, ami dekódolja a szöveget az összes lehetséges Caesar titkosításból

def decode_ceasar(a,sz):
    c = ""
    return [c:= c+ chr(ord(i)-a) for i in sz][-1]
print(decode_ceasar(1,"teszt") == caesar(-1,"teszt"))

# 5. Adottak az alábbi fájlnevek egy listában:
files = ["py.py", "py.py.txt", "hello.docx", "music.json", "names.txt", "doctor_x.xlsx", "voorhees.json", "asd.txt"]
# a. Gyűjtsük össze milyen különböző kiterjesztései vannak a fájloknak!
k = []
[k.append(i.split(".")[-1]) if i.split(".")[-1] not in k else "" for i in files ]
print(len(k))
# b. Számoljuk meg egy kiterjesztésből hány darab van a listában!
c = []
[c.append([e.split(".")[-1], sum(1 for i in files if i.split(".")[-1] == e.split(".")[-1])]) for e in files if not any(e.split(".")[-1] == x[0] for x in c)]
print(c)
# c. Csoportosítsuk, majd írassuk ki a fájlneveket kiterjesztések alapján!
f_nevek = [[e, [f for f in files if f.split(".")[-1] == e]] for e in set(i.split(".")[-1] for i in files)]
print(f_nevek)

# 6. Írj egy függvényt, ami egy fokszámot radiánba vált át! Használd a math modult!

import math
def rad(a):
    return f"{math.radians(a)/math.pi} rad"
print(rad(720))

# 7.
# a. Írj egy függvényt, ami kér egy fokszámot, majd mindig hozzáadja egy belső változóhoz! A függvény hívásakor
# radiánban íródjon ki az eredmény!
a=0
def fok_gyujto():
    global a
    a += int(input("Adj szamot\tV: "))
    return f"{math.radians(a)/math.pi} rad"
# print(fok_gyujto())
# print(fok_gyujto())

# b. Az eredmény egyszerűsödjön le a [0,2π] intervallumra!
a=0
def fok_gyujto_egyszerusitett():
    global a
    a += int(input("Adj szamot\tV: "))
    return f"{math.radians(a%360)/math.pi} rad"

print(fok_gyujto_egyszerusitett())

# 8. A Jaccard-index egy olyan index, ami két halmaznak a hasonlóságát méri. 
# Implementáld ezt a függvényt a képlet alapján!

def jacard_index(a,b):
    s1 = set(a)
    s2 = set(b)
    i = s1 & s2
    u = s1 | s2
    if not u:
        return 1.0
    return len(i) / len(u)

print(jacard_index([1,2,3,4,5],[1,2,4,5]))

#9. Írj egy függvényt, ami visszaadja az első n darab Fibonacci számot! 
def fib_to(n):
    tmp=[]
    for i in range(n):
        if (len(tmp)>=2):
            tmp.append(tmp[i-2]+tmp[i-1])
        else:
            tmp.append(i)
    return tmp
print(fib_to(100))

# 10. Adott egy mátrix:
mx = [ [1,2,3], [4,5,6], [7,8,9] ]
# Listagenerátorral írd ki a mátrix elemeit egymás után sorba!

[[print(i,end=", ") for i in a] for a in mx]

# 11. *Implementáld a Quicksortot listagenerátorokkal, 
# lambda függvényként egy sorban! Használj rekurziót!

