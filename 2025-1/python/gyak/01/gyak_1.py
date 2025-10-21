print("0. feladat")
# Írjuk meg a FizzBuzz feladatot! A feladatot számsorozatra értelmezzük.
# Ha egy szám osztható 3-mal, írjuk ki, hogy Fizz, ha 5-tel, írjuk ki, hogy Buzz, ha 15-tel,
# írjuk ki, hogy FizzBuzz! Ha egyikkel sem, írjuk ki a számot.
szam=int(input("0F szam: "))
if (szam%15==0):
    print("FizzBuzz!")
elif (szam%3==0):
    print("Fizz")
elif (szam%5==0):
    print("Buzz")
else: print(szam)


print('1.feladat')
#1-től 120-ig a számok listában
print([i for i in range(1,121)])

print('2.feladat')
#a lista elemek összege
a = [i for i in range(1,101)]
s = 0; 
szumma = [s:=s+i for i in a][-1]
if sum(a)==szumma: print(szumma)

print('3.feladat')
#3-mal osztható listaelemek a listában
harom_oszthato = [i for i in a if i%3 == 0] 
print(harom_oszthato)


print('4.feladat')
# A listaelemek szorzata
x = 1
b = [i for i in range(1,11)]
szorazata = [x:=x*i for i in b][-1]
print(szorazata)


print('5.feladat')
# Faktoriálisok 1-től 70-ig, rekurzív függvénnyel
print('70-ig a számok faktoriálisa:')
def factorial_to_70():
    x = 1
    factorial_to_70 = [x:=x*i for i in [z for z in range(1,71)]]
    print(factorial_to_70)

def factorial_to_70_1(a,b):
    if (a <=70): 
        return f"{a*b} {factorial_to_70_1(a+1, a*b)}"
    
def factorial_to_70_2(a):
    if (a<=70): 
        x=1
        return f"{[x:=x*i for i in range(1,a+1)][-1]} {factorial_to_70_2(a+1)}"

#print(factorial_to_70())
#print(factorial_to_70_1(1,1))
print(factorial_to_70_2(1))


print('5b.feladat')
# Faktoriálisok kiszámítása rekurzió nélkül
def factorialis(a):
    tmp = 1
    return [tmp:=tmp*i for i in range(1,a+1)][-1]
print(factorialis(5))

print('6.feladat')
# Prímek az eredeti listában és db számuk
def primes(a):
    return [i for i in a if len([z for z in range(1,i+1) if i%z==0])==2]
c = [i for i in range(1,200)]
print(primes(c))

print("7. feladat")
# Generáljunk random számokat 1-99 között, majd tároljuk el őket!
import random
szamok = [random.randint(1,99) for _ in range(5)]
print(szamok)

# Használjuk a random modult!
# HF Generáljunk 2000 random számot 1-99 között, 
ketezer_random=[random.randint(1,99) for _ in range(2000)]
import matplotlib.pyplot as plt
plt.hist(ketezer_random, bins=99)
plt.show()
