import random
import math
import sys

# 1. Szökőév 
def szokoev(ev):
    return (ev % 4 == 0 and ev % 100 != 0) or (ev % 400 == 0)

# 2. Számkitaláló
def szamkitalalo(minimum, maximum):
    gondolt = random.randint(minimum, maximum)
    while True:
        tipp = int(input(f"Tippelj egy számot [{minimum}, {maximum}]: "))
        if tipp < gondolt:
            print("Nagyobb.")
        elif tipp > gondolt:
            print("Kisebb.")
        else:
            print("Yippeee!")
            break

# 3. Ismétlődők
def egyedi_elemek(lst):
    egyediek = []
    for elem in lst:
        if elem not in egyediek:
            egyediek.append(elem)
    return egyediek

# 4a. Caesar encode
def caesar_kodol(szoveg, eltol):
    kodolt = ""
    for c in szoveg:
        if c.isalpha():
            alap = ord('A') if c.isupper() else ord('a')
            kodolt += chr(alap + (ord(c) - alap + eltol) % 26)
        else:
            kodolt += c
    return kodolt

# 4b. Caesar össz decode
def caesar_osszes_dekodol(szoveg):
    return [caesar_kodol(szoveg, -i) for i in range(1, 26)]

# 5. Fájl kiterjesztések
def kulonbozo_kiterjesztesek(files):
    return set(f.split('.')[-1] for f in files)

def kiterjesztes_szamolas(files):
    szamlalo = {}
    for f in files:
        ext = f.split('.')[-1]
        szamlalo[ext] = szamlalo.get(ext, 0) + 1
    return szamlalo

def csoportositas_kiterjesztes(files):
    csoport = {}
    for f in files:
        ext = f.split('.')[-1]
        csoport.setdefault(ext, []).append(f)
    return csoport

# 6. fokszam radian
def fok_rad(fok):
    return fok * math.pi / 180

# 7a. fokszam hozzaad
def fok_osszegzo():
    osszeg = 0
    def belso(fok):
        nonlocal osszeg
        osszeg += fok
        return fok_rad(osszeg)
    return belso

# 7b. intervallum egyszerusites
def fok_osszegzo_modulo():
    osszeg = 0
    def belso(fok):
        nonlocal osszeg
        osszeg += fok
        rad = fok_rad(osszeg) % (2 * math.pi)
        return rad
    return belso

# 8. jaccard index
def jaccard(a, b):
    a, b = set(a), set(b)
    metszet = a & b
    unio = a | b
    return len(metszet) / len(unio) if unio else 1.0

# 9. fibonacci szamok
def fibonacci(n):
    fibs = [0, 1]
    for _ in range(2, n):
        fibs.append(fibs[-1] + fibs[-2])
    return fibs[:n]

# 10. Mátrix elemei sorba listgen
def matrix_sorba(mx):
    return [elem for sor in mx for elem in sor]

# 11. Quicksort listgennel
quicksort = lambda l: l if len(l) <= 1 else quicksort([x for x in l[1:] if x < l[0]]) + [l[0]] + quicksort([x for x in l[1:] if x >= l[0]])

# 12. Méretek
def meretek():
    print(sys.getsizeof(range(10**10000)))
    print(sys.getsizeof(list(range(10**7))))
    print(sys.getsizeof(4))
    print(sys.getsizeof(256))
    print(sys.getsizeof(257))
    print(sys.getsizeof(100000))
    print(sys.getsizeof(2147483648))
    print(sys.getsizeof(9999999999999))
    print(sys.getsizeof(6.0))
    print(sys.getsizeof(""))
    print(sys.getsizeof("a"))
    print(sys.getsizeof([]))
    print(sys.getsizeof(["a"]))
    print(sys.getsizeof([1, 2, 3]))
    print(sys.getsizeof([1, 2, 3, 4]))
    print(sys.getsizeof(set()))
    print(sys.getsizeof(dict()))
    print(sys.getsizeof(tuple()))
    print(sys.getsizeof((1,)))
    print(sys.getsizeof(True))
    print(sys.getsizeof(None))

if __name__ == "__main__":
    # 1.
    #print(szokoev(2024))

    # 2.
    szamkitalalo(1, 10)
    
    # 3
    #lst = [1, 2, 1, 2, 3, 3, 3, 2, 1, 2, 4, 5, 13, 5, 6]
    #print(egyedi_elemek(lst))
    
    # 4.
    #print(caesar_kodol("abc", 1))  # "bcd"
    #print(caesar_osszes_dekodol("bcd"))


    # 5.
    #files = ["py.py", "py.py.txt", "hello.docx", "music.json", "names.txt", "doctor_x.xlsx", "voorhees.json"]
    #print(kulonbozo_kiterjesztesek(files))
    #print(kiterjesztes_szamolas(files))
    #print(csoportositas_kiterjesztes(files))
    
    # 6.
    #print(fok_rad(180))  # pi
    
    # 7.
    #f = fok_osszegzo()
    #print(f(90))
    #print(f(90))
    #f2 = fok_osszegzo_modulo()
    #print(f2(90))
    #print(f2(360))

    # 8.
    #print(jaccard([1,2,3], [2,3,4]))
    
    # 9.
    #print(fibonacci(10))
    
    # 10.
    #mx = [ [1,2,3], [4,5,6], [7,8,9] ]
    #print(matrix_sorba(mx))
    
    # 11.
    #print(quicksort([3,1,4,1,5,9,2,6]))
    
    # 12.
    # meretek()
