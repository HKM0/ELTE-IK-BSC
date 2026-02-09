import math

#1 Implementáljuk a verem adatszerkezetet egy Stack osztállyal!
# (Használjuk a beépített lista műveleteit!)
# Kezeld a szélsőséges eseteket! (Üres veremből kivétel)
# Eszerint implementáld: https://people.inf.elte.hu/pgm6rw/algo/Algo1/ElementaryDataStructures/stack/index.html

class Stack:
    def __init__(self, m: int):
        if not isinstance(m, int):
            raise ValueError("A méretnek egész számnak kell lennie!")
        self.A = [None] * m #üres lista létrehozása
        self.n = 0 #listában lévő elemek száma (nem None)

    def push(self, x):
        if self.is_full():
            raise IndexError("Tele a verem!")
        self.A[self.n] = x
        self.n += 1

    def pop(self):
        if self.is_empty():
            raise IndexError("Üres veremből nincs mit kivenni!")
        self.n -= 1
        return self.A[self.n]

    def top(self):
        if self.is_empty():
            raise IndexError("Üres verem!")
        return self.A[self.n - 1]

    def is_full(self):
        return self.n == len(self.A)

    def is_empty(self):
        return self.n == 0
    
    def setEmpty(self):
        self.n = 0

    def __str__(self):
        return str(self.A[:self.n])

#2 Készítsünk egy Book osztályt, ami tartalmazza egy könyv címét, íróját, oldalszámát.
# Definiáljuk rá a minimum összehasonlító műveleteket, hogy rendezhetőek legyenek oldalszám szerint!
# Kivételekkel kezeld le, ha hiányzik egy-egy tulajdonság példányosításkor!

class Book:
    def __init__(self, title, author, pages):
        if not title or not author or not pages:
            raise ValueError("Minden tulajdonság megadása kötelező!")
        self.title = title
        self.author = author
        self.pages = pages
        if not isinstance(pages, int) or pages <= 0:
            raise ValueError("Az oldalszámnak pozitív egész számnak kell lennie!")

    def __lt__(self, other):
        if not isinstance(other, Book):
            raise Exception("Összehasonlíthatatlan adatok!")
        return self.pages < other.pages

    def __eq__(self, other):
        if not isinstance(other, Book):
            raise Exception("Összehasonlíthatatlan adatok!")
        return self.pages == other.pages

    def __str__(self):
        return f"{self.title} - {self.author} ({self.pages} oldal)"

#3 Készítsünk egy Library osztályt, ami az előző feladatban megoldott könyveket tartalmazza!
# Egy Library példány tárolja osztály szinten, és példány szinten is a könyveket a nyilvántartás miatt.
# Biztosíts lehetőséget arra, hogy a len függvény egy adott példányban elhelyezett könyvek számát adja vissza!
# Hozzáadáskor bizonyosodj meg isinstance-cel, hogy valóban könyveket tárolunk a Libraryban!
# A könyvgyűjtemény kiiratásakor a könyvek lapszám szerint sorrendben jelenjenek meg.
# Kivételekkel kezeld le az esetleges hibákat!

class Library:
    overall_books = [] #osztályváltozó!

    def __init__(self):
        self.books = []

    def add_book(self, book):
        if not isinstance(book, Book):
            raise TypeError("Csak Book típusú objektumok tárolhatóak a könyvtárban!")
        self.books.append(book)
        Library.overall_books.append(book)
    
    def __len__(self):
        return len(self.books)
    
    def __str__(self):
        sorted_books = sorted(self.books)
        return "\n".join(str(book) for book in sorted_books)

#4 Készítsünk egy Shape osztályt, ami bizonyos geometriai alakzatok alapját fogja adni.
# Valósítsd meg a Circle (kör), Sphere (gömb), Cube (kocka) osztályt!
# isinstance-cel vizsgáld meg, hogy helyes értékeket kapjanak példányosításkor az adatok!
# (Működjön float és int típussal is!)
# Adott metódusokkal kérdezzük le a térfogatukat, felszínüket, oldal (vagy sugár) méretüket is!
# Kezeld kivételekkel a szélsőséges eseteket!

class Shape:
    def __init__(self, size):
        if not isinstance(size, (int, float)):
            raise TypeError("A méret számmal legyen megadva (tört, vagy egész!)")
        if size <= 0:
            raise ValueError("A méretnek > 0-nak kell lennie!")
        self.size = float(size)

    def get_size(self):
        return self.size

    def get_volume(self):
        raise NotImplementedError

    def get_surface_area(self):
        raise NotImplementedError


class Circle(Shape):
    def __init__(self, radius):
        super().__init__(radius)

    def get_area(self): 
        #egyértelműsítés/tisztább kód miatt
        return self.get_surface_area()

    def get_volume(self):
        # nincs térfogat (2D)
        return 0

    def get_surface_area(self):
        # tulajdonképpen terület
        return math.pi * self.size ** 2

    def __str__(self):
        return f"Kör (sugár: {self.size:.2f})"


class Sphere(Shape):
    def __init__(self, radius):
        super().__init__(radius)

    def get_volume(self):
        return (4/3) * math.pi * self.size ** 3

    def get_surface_area(self):
        return 4 * math.pi * self.size ** 2

    def __str__(self):
        return f"Gömb (sugár: {self.size:.2f})"


class Cube(Shape):
    def __init__(self, side):
        super().__init__(side)

    def get_volume(self):
        return self.size ** 3

    def get_surface_area(self):
        return 6 * self.size ** 2

    def __str__(self):
        return f"Kocka (oldal: {self.size:.2f})"