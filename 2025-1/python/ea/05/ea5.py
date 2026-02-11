
# class A(B, C)

class Test1:
    pass

print(type(Test1()))
print(type(Test1))

Test1 = type('Test1', (), {"x":"10"})

class Test1:
    x = 10

t = Test1()
# Type típus'

class ClassA:
    def pr(self):
        print('hi')

def fun(self):
    print(self.x)

Test = type('Test', (ClassA,), {"x":10, 'fun':fun})

t = Test()
print(t.x)
t.fun()

# Meta classes

class baseClass(type): # Meta class by type
    def __new__(self, class_name, bases, attr):
        print(attr)
        print(class_name)
        print(bases)
        return type(class_name, bases, attr)
    
class Human(ClassA, metaclass=baseClass):
    x = 5
    y = 10
    
H = Human()

"""
{'__module__': '__main__',
 '__qualname__': 'Human',
 '__firstlineno__': 23, 'x': 5, 'y': 10, 
 // --> //'__static_attributes__': ()}
 Human
 (<class '__main__.ClassA'>,)
"""

    

# Encapsulation

class BankSzámla:
    db = 10
    #...

    def __init__(self, egyenleg):
        self.__egyenleg += 1        # privát attribútum
        BankSzámla.db += 1
        
    def betét(self, mennyi):
        self.__egyenleg += mennyi
        
    def kivét(self, mennyi):
        if mennyi <= self.__egyenleg :
            self.__egyenleg -= mennyi
        else:
            print("Nincs fedezet")

# Inheritance

class Jarmu:
    def __init__(self, sebesség):
        self. sebesség = sebesség
    def halad(self):
        return f"Halad {self.sebesség} sebességgel"

class Auto(Jarmu):
    #def __init__(self, ujsebesseg):
        
    def halad(self):
        return f"Az autó halad {self.sebesség} sebességgel"

# Polymorphism

class Animal:
    def speak(self):
        pass
    
class Dog(Animal):
    def speak(self):
        return "Woof"
    
class Cat(Animal):
    def speak(self):
        return "Meow"

class AlienAnimal(Dog, Cat):
    pass
    
alien = AlienAnimal()
print(alien.speak())

# Class, Object, konstruktor

class Kutya: # osztály definíció
    def __init__(slefislehetne, nev):  # Constructor 
          slefislehetne.nev = nev
          
my_dog = Kutya("Kizsgugya")	# példány definíció
print(my_dog.név)

# Destructor __del__

class Kutya:
    def __init__(self, név):
        self.név = név
    def __del__(self):
        print(f"{self.név} megszűnik")
    def __str__(self):
        return f'Test object with name: {self.name}'
# Hasznos lehet smart pointerek készítésére, 
# erőforráskezelésre

class Fajl:
    def __init__(self, fajlnev):
        self.__fajlnev = fajlnev
        self.__fajl = open(fajlnev, 'w')
        print(f"A(z) {self.__fajlnev} fájl megnyitva írásra.")
    
    def írás(self, szoveg):
        self.__fajl.write(szoveg)
        
    def __del__(self):
        self.__fajl.close()
        print(f"A(z) {self.__fajlnev} fájl lezárva.")

# Class fields

class kor:
    pi = 3.1416 # Osztályattribútum
    
    def __init__(self, sugar):
        self.sugar = sugar # Objektum attribútum
    # kor1 = kor(10)
    def terulet(self):
        return kor.pi * (self.sugar ** 2)
    
    @classmethod
    def getPI(cls):
        return cls.pi


#k = kor(10)
#print(k.getPI)
print(kor.getPI())   
    
# __main__

if __name__ == "__main__":
    print(type(Test1))
    # A kód csak akkor fut le, ha a fájlt közvetlenül futtatják
    print("A fájlt közvetlenül futtatják")
else:
    # A kód akkor fut le, ha a fájlt importálják
    print("A fájlt importálták")
    
# Static methods

class Stat:
    @staticmethod
    def add(x, y):
        return x + y
    
print(Stat.add(10, 20))

# nem csak statikusan hívható
# a lényeg, hogy meghívható az oztály-ból

'''
A @classmethod dekorátorral ellátott metódus az 
osztályra vonatkozik, nem az osztály példányaira.
Az első paramétere mindig a cls, amely az aktuális osztályra utal.
Használható az osztály szintű állapot vagy viselkedés módosítására.

A @staticmethod dekorátorral ellátott metódus nem kap sem az 
osztályra (cls), sem az osztály példányára (self) vonatkozó 
referenciát.
Olyan funkciókhoz használható, amelyek logikailag 
kapcsolódnak az osztályhoz, de nem igénylik az osztály 
vagy az osztály példányának elérését.
'''
class MathUtils:
    @staticmethod
    def is_even(number):
        return number % 2 == 0

# A statikus metódus hívása az osztályon keresztül
print(MathUtils.is_even(4))  # Output: True
print(MathUtils.is_even(7))  # Output: False

'''
Ebben a példában az is_even metódus logikailag kapcsolódik a 
MathUtils osztályhoz, mivel egy matematikai segédfüggvény. 
Azonban nem igényli sem az osztály, sem az osztály 
példányának elérését, ezért @staticmethod-ként van definiálva.
'''

S = Stat()
print(S.add(10, 20))
    
# Objektumok számlálása

class howMany:
    db = 0
    
    def __init__(self):
        howMany.inc()
        print(howMany.db)
    
    @classmethod
    def inc(cls):
        howMany.db +=1

    @classmethod
    def dbb(cls):
        return howMany.db

        
class elso(howMany):
    pass

class masodik(howMany):
    pass

c1 = elso()
c2 = masodik()
c3 = masodik()

# Az ősosztály és a super()

class Jarmu:
    def __init__(self, sebesseg):
        self.sebesseg = sebesseg

    def halad(self):
        return f"Halad {self.sebesseg} sebességgel"

class Auto(Jarmu):
    
    def __init__(self, sebesseg, marka):
        super().__init__(sebesseg)  # Az ősosztály konstruktorának hívása
        self.marka = marka
        

    def halad(self):
        return f"Az autó halad {self.sebesseg} km/h sebességgel, a márkája: {self.marka}"

# Példányosítás és használat
a = Auto(120, "Toyota")
b = Auto(200, "Suzuki")
print(a.halad())
print(b.halad())


#property

class BankSzámla:
    def __init__(self, egyenleg):
        self.__egyenleg = egyenleg  # privát attribútum

    @property
    def egyenleg(self): # szamla1.egyenleg = 10
        return self.__egyenleg

    @egyenleg.setter
    def egyenleg(self, összeg):
        if összeg >= 0:
            self.__egyenleg = összeg
        else:
            print("Az egyenleg nem lehet negatív.")

    def betét(self, mennyi):
        self.__egyenleg += mennyi

    def kivét(self, mennyi):
        if mennyi <= self.__egyenleg:
            self.__egyenleg -= mennyi
        else:
            print("Nincs fedezet")

# Példányosítás és használat

számla = BankSzámla(1000)
print(számla.egyenleg)  # Getter hívása
számla.egyenleg = 1500  # Setter hívása
print(számla.egyenleg)
számla.egyenleg = -500  # Negatív érték beállítása, hibaüzenet
