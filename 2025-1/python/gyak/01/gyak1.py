import matplotlib
# 1. gyakorlat: bevezető feladatok
# Ajánlott VSCode bővítmények: Pylance, Code Runner, Python (Microsofté)
# Ha nincs telepítve a matplotlib: pip install matplotlib
#                     ezzel telepíthető a csomag az utolsó feladathoz (cmd környezetben)

print("0. feladat")
# Írjuk meg a FizzBuzz feladatot! A feladatot számsorozatra értelmezzük.
# Ha egy szám osztható 3-mal, írjuk ki, hogy Fizz, ha 5-tel, írjuk ki, hogy Buzz, ha 15-tel,
# írjuk ki, hogy FizzBuzz! Ha egyikkel sem, írjuk ki a számot.
oneTohundered = [i for i in range(1,120)]
for i in oneTohundered:
    if (i%15==0):
        print("FizzBuzz", end=" ")
    elif (i%3):
        print("Fizz", end=" ")
    elif(i%5):
        print("Buzz", end=" ")
    else:
        print(i, end=" ")


print('1.feladat')
#1-től 120-ig a számok listában
oneTohundered = [i for i in range(1,100)]


print('2.feladat')
#a lista elemek összege
oneTohundered = [i for i in range(1,100)]
sumOfHunder= sum(oneTohundered)

print('3.feladat')
#3-mal osztható listaelemek a listában
listOFDiv3 = [i for i in range(1, 100) if i % 3 == 0]
print(listOFDiv3)

print('4.feladat')
# A listaelemek szorzata
listOFDiv3 = [i for i in range(1, 100) if i % 3 == 0]
product = 1
for i in listOFDiv3:
    product *= i
print(product)

print('5.feladat')
# Faktoriálisok 1-től 70-ig, rekurzív függvénnyel
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)
temporalFact = [factorial(i) for i in range(1, 71)]

print('5b.feladat')
# Faktoriálisok kiszámítása rekurzió nélkül
temporalFact2 = [1]
for i in range(2,100):
    temporalFact2.append(i*temporalFact2[i-2])
print(temporalFact2)

print('6.feladat')
# Prímek az eredeti listában és db számuk


print("7. feladat")
# Generáljunk random számokat 1-99 között, majd tároljuk el őket!
# Használjuk a random modult!
# HF Generáljunk 2000 random számot 1-99 között, 
# Rajzoljuk ki az eloszlásukat a matplotlib könyvtár segítségével!