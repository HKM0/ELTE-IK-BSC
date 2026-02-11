

import dis

lista = [1, 2, 3, 4]
lista.append(5)
print(lista)

def fun1():
    lista = lista.append(6)
    print(lista)

dis.dis(fun1)

'''
  8           LOAD_FAST_CHECK          0 (lista)
              LOAD_ATTR                1 (append + NULL|self)
              LOAD_CONST               1 (6)
              CALL                     1
              STORE_FAST               0 (lista)
              
Itt a STORE_FAST 0 (lista) utasítás a lista 
változót az append metódus visszatérési 
értékére (None) állítja. Ezután a print(lista) utasítás 
a None értéket fogja kiírni:
'''

a = True
b = False

print(not a)
print(not b)
print(not False)

print(not (a and b))
print((not a) or (not b))
print(f"(not (a and b)) == ((not a) or (not b)) = {(not (a and b)) == ((not a) or (not b))}")

'''
(not (a and b)) == ((not a) or (not b)) = True
(not (a or b)) == ((not a) and (not b)) = True
'''

print(f"(not (a and b)) == ((not a) or (not b))",
      f"= {(not (a and b)) == ((not a) or (not b))}")

print(f"(not (a or b)) == ((not a) and (not b))",
      f"= {(not (a or b)) == ((not a) and (not b))}")

# Bitműveletek

# Bitenkénti ÉS (AND)
a = 10  # 1010 binárisan
b = 4   # 0100 binárisan

print(f"{a} & {b} = {a & b}")  # 0000 binárisan, ami 0

# Bitenkénti VAGY (OR)
print(f"{a} | {b} = {a | b}")  # 1110 binárisan, ami 14

# Bitenkénti KIZÁRÓ VAGY (XOR)
print(f"{a} ^ {b} = {a ^ b}")  # 1110 binárisan, ami 14

# Bitenkénti NEM (NOT)
print(f"~{a} = {~a}")  # Megfordítja az összes bitet a 10-es számnál

# Bitenkénti balra tolás (left shift)
print(f"{a} << 2 = {a << 2}")  # A 10 (1010) biteket balra tolja 2 pozícióval, eredmény 101000, ami 40

# Bitenkénti jobbra tolás (right shift)
print(f"{a} >> 2 = {a >> 2}")  # A 10 (1010) biteket jobbra tolja 2 pozícióval, eredmény 10, ami 2
print(~10)

# Rövidített műveletek példái
#Short cut kétféle is lehet

#Ez is az:

x = 10
y = 20

max_value = x if x > y else y
print(max_value)  # Ez 20-at fog kiírni, mert y nagyobb mint x


# Ez is shortcut:

'''
Pythonban a logikai kifejezések kiértékelése 
rövidzárásos (short-cut) módszerrel történik. 
Ez azt jelenti, hogy ha az első feltétel igaz, akkor a 
második feltételt is ellenőrzi, de ha az első feltétel 
hamis, akkor a második feltételt már nem értékeli ki.
'''

# Pl.:

a = True
b = False

if a or b:
   print('Igaz')

# Vagy egy összetettebb példa:

def condition1():
    print("check_condition1 called")
    return False

def condition2():
    print("check_condition2 called")
    return True

# Rövidzárásos kiértékelés
if condition1() and condition2():
    print("Feltételek teljesülnek")


# Értékadás és növelés (increment)
x = 5
x += 3  # Ugyanaz, mint x = x + 3
print(f"x += 3 -> x = {x}, vagyis x = x + 3")  # Eredmény: 8

# Értékadás és csökkentés (decrement)
x -= 2  # Ugyanaz, mint x = x - 2
print(f"x -= 2 -> x = {x}")  # Eredmény: 6

# Értékadás és szorzás (multiplication)
x *= 4  # Ugyanaz, mint x = x * 4
print(f"x *= 4 -> x = {x}")  # Eredmény: 24

# Értékadás és osztás (division)
x /= 3  # Ugyanaz, mint x = x / 3
print(f"x /= 3 -> x = {x}")  # Eredmény: 8.0

# Értékadás és egész osztás (floor division)
x //= 2  # Ugyanaz, mint x = x // 2
print(f"x //= 2 -> x = {x}")  # Eredmény: 4.0

# Értékadás és maradékos osztás (modulus)
x %= 3  # Ugyanaz, mint x = x % 3
print(f"x %= 3 -> x = {x}")  # Eredmény: 1.0

# Értékadás és hatványozás (exponentiation)
x **= 3  # Ugyanaz, mint x = x ** 3
print(f"x **= 3 -> x = {x}")  # Eredmény: 1.0

# Bit lekérdezése & operátorral

# Példa: Ellenőrizzük, hogy a 3. bit be van-e állítva egy számban
# A 3. bit maszkja: 0b100 (binárisan), ami 4 (decimálisan)

szam = 10  # 1010 binárisan

# Ellenőrizzük, hogy a 3. bit be van-e állítva (1-re)
if szam & 4:
    print(f"A(z) {szam} szám 3. bitje be van állítva.")
else:
    print(f"A(z) {szam} szám 3. bitje nincs beállítva.")
    
    
# Példa a bit lekérdezésére & operátorral

# A flag_register változó értéke 45, ami binárisan 0b00101101
flag_register = 45   # 0b00101101 

# A the_mask változó értéke 4, ami binárisan 0b00000100
the_mask = 4         # 0b00000100

# Ellenőrizzük, hogy a flag_register változóban a the_mask 
# által jelzett bit be van-e állítva
if flag_register & the_mask:
    print('A vizsgált bit 1')  
    # Ha az eredmény nem nulla, akkor a bit be van állítva (1)
else:
    print('A vizsgált bit 0')  
    # Ha az eredmény nulla, akkor a bit nincs beállítva (0)
    
"""
Ebben a példában a flag_register változó értéke 45 
(binárisan 0b00101101), és a the_mask változó értéke 
4 (binárisan 0b00000100). Az & operátor segítségével 
ellenőrizzük, hogy a flag_register változóban a 
the_mask által jelzett bit (a harmadik bit) be 
van-e állítva. Ha az eredmény nem nulla, akkor 
a bit be van állítva (1), különben nincs beállítva (0).

Mi a 0b?

0b00101101
  ||||||||
  |||||||+-- 1 (2^0)
  ||||||+--- 0 (2^1)
  |||||+---- 1 (2^2)
  ||||+----- 1 (2^3)
  |||+------ 0 (2^4)
  ||+------- 1 (2^5)
  |+-------- 0 (2^6)
  +--------- 0 (2^7)
"""    

#IF ELSE ELIF

"""
if feltétel1:
    # A kód, amely akkor fut le, ha a feltétel1 igaz
elif feltétel2:
    # A kód, amely akkor fut le, ha a feltétel1 hamis és a feltétel2 igaz
else:
    # A kód, amely akkor fut le, ha egyik feltétel sem igaz
""" 

x = 10

if x > 15:
    print("x nagyobb, mint 15")
elif x > 5:
    print("x nagyobb, mint 5, de kisebb vagy egyenlő 15-nél")
else:
    print("x kisebb vagy egyenlő 5-nél")

# WHILE

'''
while feltétel:
    # A kód, amely akkor fut le, ha a feltétel igaz
'''

# Példa a while ciklusra

szam = 0

while szam < 5:
    print(szam)
    szam += 1  
    # Növeljük a szam változó értékét 1-gyel 
    # minden iterációban

'''
while True:
    infinite loop

Ctrl + c
'''

# FOR

'''
for elem in iterálható_objektum:
    # A kód, amely minden elemre lefut
'''

# Példa a for ciklusra

lista = [1, 2, 3, 4, 5]

for elem in lista:
    print(elem)
    
# Példa a range használatára a for ciklusban

for i in range(5):
    print(i)
    
# Példa a for ciklusra stringeken

szoveg = "hello"

for karakter in szoveg:
    print(karakter)
    
'''
A for ciklus egy hatékony eszköz a Pythonban, 
amely lehetővé teszi, hogy egy iterálható 
objektum elemein végighaladva ismételjük a kódot. 
Használható listákon, tuple-ökön, stringeken, 
és más iterálható objektumokon is. 
A range függvény segítségével könnyen 
létrehozhatunk számtartományokat, 
amelyeken végighaladhatunk a for ciklus segítségével.
'''


#BREAK és Continue

'''
A break utasítás megszakítja a legbelsőbb ciklust, amelyben található, és a ciklus utáni kódrészlet végrehajtására ugrik. Ez hasznos lehet, ha egy bizonyos feltétel teljesülésekor ki szeretnél lépni a ciklusból.
'''

for i in range(10):
    if i == 5:
        break
    print(i)

"""
A példában a ciklus 0-tól 4-ig fogja kiírni a 
számokat, majd amikor i értéke 5 lesz, a break 
megszakítja a ciklust.
"""


"""
A continue utasítás megszakítja a ciklus 
aktuális iterációját, és a következő iterációra 
ugrik. Ez hasznos lehet, ha egy bizonyos feltétel 
teljesülésekor át szeretnél ugrani egy iterációt, 
de folytatni szeretnéd a ciklust.
"""

for i in range(10):
    if i == 5:
        continue
    print(i)

"""
A példában a ciklus 0-tól 9-ig 
fogja kiírni a számokat, kivéve 
az 5-öt, mert amikor i értéke 5 lesz, 
a continue utasítás átugorja az aktuális iterációt.
"""


# FOR / While és az esle ág

'''
Az else ág használata ezekkel a ciklusokkal 
egy kevésbé ismert, de hasznos funkció.
A while ciklus addig hajt végre egy kódrészletet, 
amíg a feltétel igaz (True).
'''

i = 0
while i < 5:
    print(i)
    i += 1
else:
    print("A ciklus véget ért.")


'''
Ebben a példában a while ciklus addig fut, 
amíg az i változó értéke kisebb, mint 5. 
Amikor a feltétel hamissá válik, az else 
ág végrehajtódik, és kiírja, hogy 
"A ciklus véget ért."
'''

# Ugyanez a for esetén de break is van benne

for i in range(5):
    if i == 3:
        break
    print(i)
else:
    print("A ciklus véget ért.")


"""
Mire jó ez?

Olyan kódot tudunk írni, ami csak akkor 
hajtódik végre, ha a ciklus normál módon 
ér véget (nem a break-el).
"""

'''
Egy függvény definiálása Python-ban a def 
kulcsszóval történik. A függvény paramétereket 
is fogadhat, amelyek a függvény nevét követő 
zárójelek között vannak felsorolva.
'''

def my_function(param1, param2):
    # A függvény törzse
    print(param1, param2)

"""
A függvények paramétereihez alapértelmezett 
értékeket is rendelhetünk.
"""

def fun(param1, param2="default"):
    print(param1, param2)

fun("value1")  # Kimenet: value1 default
fun("value1", "value2")  # Kimenet: value1 value2

"""
A return utasítással adhatunk vissza értéket 
a függvényből. Ha a return utasítás nincs 
megadva, a függvény None értéket ad vissza.
"""

def add(a, b):
    return a + b

result = add(3, 4)  # result értéke 7 lesz

"""
A mellékhatások olyan változások, amelyeket a 
függvény végrehajtása okoz a környezetében, 
például globális változók módosítása 
vagy fájlok írása.

"""


global_var = 0

def modify_global():
    global global_var
    global_var = 10

modify_global()
print(global_var)  # Kimenet: 10

"""
A mellékhatások elkerülése érdekében érdemes 
a függvényeket úgy tervezni, hogy azok 
ne módosítsák a külső állapotot, 
hanem csak a bemeneti paraméterekkel 
dolgozzanak és visszatérési értéket adjanak
"""

# Hibák:

def osszead(a, b, c):
    print(a + b + c)

# Helyes hívás pozíciós argumentumokkal
# összead(3, 1, 2)

# Vagy helyes hívás kulcs-érték argumentumokkal
# összead(a=3, b=1, c=2)


# A kulcs-érték argumentumok után nem lehet pozíciós 
# argumentumot megadni. Fordítva lehet.

def fun(a, b, c):
    print(a, b, c)

# Helyes hívás pozíciós argumentumokkal
fun(1, 2, 3)

# Helyes hívás kulcs-érték argumentumokkal
fun(a=1, b=2, c=3)

# Helyes hívás kevert argumentumokkal (pozíciós, majd kulcs-érték)
fun(1, b=2, c=3)

# Hibás hívás (kulcs-érték után pozíciós)
#fun(a=1, 2, c=3)  # Ez hibás
#fun(a = 1, b =  2, 3) # Ez is hibás


