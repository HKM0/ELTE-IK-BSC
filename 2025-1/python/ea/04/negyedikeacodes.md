def readfromfile(filename):
    try:
        with open(filename, "r") as filestream:
            for line in filestream:
                print(line) 
    except FileNotFoundError as e:
        print(f"Hibaüzenet: {e}")
        print(f"Exception típusa: {type(e).__name__}")
        print(f"{e}")
    except Exception as e:
        print(f"Általános hiba: {e}")

a = readfromfile("alma.txt")
print(a)

'''
Hibaüzenet: [Errno 2] No such file or directory: 'alma.txt'
Exception típusa: FileNotFoundError
[Errno 2] No such file or directory: 'alma.txt'
None
'''

# 1. Egyszerű raise használata 
# nullával osztásnál
def safe_divide(a, b):
    """
    Biztonságos osztás nullával 
    való ellenőrzéssel
    """
    if b == 0:
        raise ZeroDivisionError(f"Nullával nem lehet osztani! ({a} / {b})")
    return a / b

# 2. Saját kivétel osztály 
# matematikai hibákhoz
class MathError(Exception):
    #Saját kivétel matematikai műveletekhez
    def __init__(self, operation, values, message):
        self.operation = operation
        self.values = values
        self.message = message
        super().__init__(f"{operation} hiba: {message} - értékek: {values}")

def calculate_average(numbers):
    #Átlag számítás üres lista ellenőrzéssel
    if not numbers:
        raise MathError("Átlag számítás", 
                        numbers, "Üres listából nem számítható átlag")
    if any(not isinstance(n, (int, float)) for n in numbers):
        raise MathError("Átlag számítás", 
                        numbers, "Csak számok engedélyezettek")
    return sum(numbers) / len(numbers)

# 3. Kivétel újradobása módosított információkkal
def complex_calculation(x, y):
    #Összetett számítás hibakezeléssel
    try:
        step1 = safe_divide(x, y)
        step2 = safe_divide(100, step1)
        return step2
    except ZeroDivisionError as e:
        # Eredeti kivétel újradobása több kontextussal
        raise ZeroDivisionError(f"Összetett számítás sikertelen x={x}, y={y}: {e}") from e

# Példák használata
if __name__ == "__main__":
    print("=== Matematikai raise példák ===\n")
    
    # 1. példa - egyszerű nullával osztás
    try:
        result = safe_divide(10, 0)
    except ZeroDivisionError as e:
        print(f"1. Osztási hiba: {e}")
    
    # 2. példa - saját kivétel
    try:
        avg = calculate_average([])
    except MathError as e:
        print(f"2. Saját kivétel: {e}")
        print(f"   Művelet: {e.operation}")
        print(f"   Értékek: {e.values}")
    
    
    # 3. példa - kivétel újradobása
    try:
        result = complex_calculation(5, 0)
    except ZeroDivisionError as e:
        print(f"3. Újradobott kivétel: {e}")
        print(f"   Eredeti hiba: {e.__cause__}")
    
    # Sikeres példák
    print(f"\nSikeres műveletek:")
    print(f"10 / 2 = {safe_divide(10, 2)}")
    print(f"Átlag [1,2,3,4,5] = {calculate_average([1,2,3,4,5])}")
    print(f"Összetett számítás (10, 2) = {complex_calculation(10, 2)}")

    # 1. Egyszerű érték ellenőrzés
def calculate_square(x):
    #Négyzet számítása pozitív számokra
    # Assert segítségével ellenőrizzük, 
    # hogy a bemenet pozitív szám-e
    assert x >= 0, "A szám nem lehet negatív!"
    return x * x

# Használat:
result = calculate_square(5)  # Működik: 25
# calculate_square(-3)  
# # AssertionError: A szám nem lehet negatív!

# 2. Lista típus és méret ellenőrzés
def get_average(numbers):
    #Lista elemeinek átlaga
    # Ellenőrizzük, hogy lista típusú-e a paraméter
    assert isinstance(numbers, 
                      list), "A paraméter lista kell legyen!"
    # Ellenőrizzük, hogy nem üres-e a lista
    assert len(numbers) > 0, "A lista nem lehet üres!"
    return sum(numbers) / len(numbers)

# Használat:
avg = get_average([1, 2, 3, 4, 5])  # Ha működik: 3.0
# get_average([])  
# # AssertionError: A lista nem lehet üres!
# get_average("123")  
# # AssertionError: A paraméter lista kell legyen!

# 3. Feltételes ellenőrzés osztályban
class BankAccount:
    def __init__(self, initial_balance=0):
        # Kezdő egyenleg nem lehet negatív
        assert initial_balance >= 0, "A kezdő egyenleg nem lehet negatív!"
        self.balance = initial_balance
    
    def withdraw(self, amount):
        #Pénz felvétele
        # Ellenőrizzük, hogy pozitív 
        # összeget akarunk-e felvenni
        assert amount > 0, "A felvett összeg pozitív kell legyen!"
        # Ellenőrizzük, hogy van elég fedezet
        assert self.balance >= amount, "Nincs elegendő fedezet!"
        
        self.balance -= amount
        return self.balance

# Használat:
account = BankAccount(1000)
account.withdraw(200)  # Ha működik, egyenleg: 800
# account.withdraw(-50)  
# # AssertionError: A felvett összeg pozitív kell legyen!
# account.withdraw(1500)  
# # AssertionError: Nincs elegendő fedezet!


def readfromfile(filename):
    with open(filename, "r") as filestream:
        for line in filestream:
            yield line 

def listexpression():
    for i in range(10):
        yield i

if __name__ == "__main__":
    lines = readfromfile("file.txt")
    nums = listexpression()
    print(next(lines), end="")
    print(next(lines), end="")
    print(next(nums))
    print(next(nums))

def map2(func, iterable):
    res = []
    for item in iterable:
        newitem = func(item)
        res.append(newitem)
    return res

data = map2(lambda x: x**2, [1, 2, 3, 4, 5])
print(data)

def filter2(func, iterable):
    res = []
    for item in iterable:
        if func(item):
            res.append(item)
    return res


data = filter2(lambda x: x % 2 == 0, 
               [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
print(data)  # [2, 4, 6, 8, 10]



# PÉLDA 1: *args használata
def osszegzes(*args):
    """
    *args használata: tetszőleges számú pozicionális 
    argumentum fogadása Az *args egy tuple-t hoz létre 
    az összes átadott argumentumból
    """
    print(f"Átadott argumentumok: {args}")
    print(f"Args típusa: {type(args)}")
    
    osszeg = 0
    for szam in args:
        osszeg += szam
    return osszeg

# PÉLDA 2: **kwargs használata
def bemutatkozas(**kwargs):
    """
    **kwargs használata: tetszőleges számú kulcsszó 
    argumentum fogadása
    A **kwargs egy dictionary-t hoz 
    létre a kulcs-érték párokból
    """
    print(f"Átadott kulcsszó argumentumok: {kwargs}")
    print(f"Kwargs típusa: {type(kwargs)}")
    
    print("Bemutatkozás:")
    for kulcs, ertek in kwargs.items():
        print(f"{kulcs}: {ertek}")

# PÉLDA 3: *args és **kwargs kombinálva
def teljes_fuggveny(kotelezo_param, *args, **kwargs):
    """
    Kombinált használat: kötelező paraméter + *args + **kwargs
    Sorrend: normál paraméterek, *args, **kwargs
    """
    print(f"Kötelező paraméter: {kotelezo_param}")
    print(f"További pozicionális argumentumok (*args): {args}")
    print(f"Kulcsszó argumentumok (**kwargs): {kwargs}")
    
    # Args feldolgozása
    if args:
        print("Args elemei:")
        for i, arg in enumerate(args):
            print(f"  {i+1}. elem: {arg}")
    
    # Kwargs feldolgozása
    if kwargs:
        print("Kwargs elemei:")
        for kulcs, ertek in kwargs.items():
            print(f"  {kulcs} = {ertek}")

# Teszt:

if __name__ == "__main__":
    print("=" * 50)
    print("PÉLDA 1: *args ")
    print("=" * 50)
    
    # *args tesztelése különböző számú argumentummal
    eredmeny1 = osszegzes(1, 2, 3)
    print(f"osszegzes(1, 2, 3) eredménye: {eredmeny1}")
    print()
    
    eredmeny2 = osszegzes(10, 20, 30, 40, 50)
    print(f"osszegzes(10, 20, 30, 40, 50) eredménye: {eredmeny2}")
    print()
    
    print("=" * 50)
    print("PÉLDA 2: **kwargs demonstráció")
    print("=" * 50)
    
    # **kwargs tesztelése
    bemutatkozas(nev="János", kor=25, varos="Budapest")
    print()
    
    bemutatkozas(nev="Anna", foglalkozas="programozó", kedvenc_szin="kék", hobbi="olvasás")
    print()
    
    print("=" * 50)
    print("PÉLDA 3: Kombinált használat")
    print("=" * 50)
    
    # Kombinált tesztelés
    teljes_fuggveny("Kötelező érték", "extra1", "extra2", 42, 
                   nev="Péter", kor=30, email="peter@example.com")
    print()
    
    # Csak kötelező paraméterrel
    teljes_fuggveny("Csak kötelező")
    print()
    
    # EXTRA: Lista és dictionary kicsomagolása
    print("=" * 50)
    print("EXTRA: Lista és dictionary kicsomagolása")
    print("=" * 50)
    
    # Lista kicsomagolása *args-hoz
    szamok = [5, 10, 15, 20]
    eredmeny3 = osszegzes(*szamok)  # * operátorral kicsomagoljuk a listát
    print(f"osszegzes(*{szamok}) eredménye: {eredmeny3}")
    print()
    
    # Dictionary kicsomagolása **kwargs-hoz
    adatok = {"nev": "Zsófia", "kor": 28, "varos": "Szeged"}
    bemutatkozas(**adatok)  # ** operátorral kicsomagoljuk a dictionary-t