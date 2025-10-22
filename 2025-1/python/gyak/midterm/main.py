# 1.
a = "Never odd or even"
print(a[::-1])

# 2.
d = { "Adam" : 11, "Jerry" : 4, "Michael" : 45, "Ben" : 10}
print([i for i in d.keys() if d.get(i)>10])

# 3.
lst = [33, 22, 33, 21, 33, 44, 33, 11, 11, 2, 1]
s = {33, 22, 45, 47, 42, 52}
lst=set(lst)
print(lst | s, lst & s, lst - s)

# 4. 
from functools import reduce
a = lambda *szamok: reduce(lambda acc, x: acc+x if x>5 else acc, szamok, 0)
print(a(1,2,3,4,5,6,10))

# 5.
c=lambda str_cucc : str_cucc.lower().count("wop")
print(c("wopwompmpwopwop"))

# 6.
c = lambda a: [i for i in a if isinstance(i,str) and len(i)>5]
print(c([1,2,3,"asdasd","basdbasd","szia"]))

# 7.
c = lambda dict_cucc: sorted(dict_cucc.items(), key=lambda a: a[1])
print(c({ "Adam" : 11, "Jerry" : 4, "Michael" : 45, "Ben" : 10}))

# 8.
c = lambda szamok: reduce(lambda min,x: min if min <= x else x, szamok)
print(c([1,2,3,4,45,5,-82]))

# 9.
c = lambda *args: [(s[:1]*2 + s[1:]) for s in args]
print(c("szex","bogyo","barni"))

# 10.
class Flower:
    def __init__(self,nev,szin,szepseg):
        self.nev=nev
        self.szin=szin
        self.szepseg=szepseg
    def __str__(self):
        return f"{self.szin} {self.nev}"

    def __eq__(self, other):
        return self.szepseg == other.szepseg

    def __lt__(self, other):
        return self.szepseg < other.szepseg

    def __le__(self, other):
        return self.szepseg <= other.szepseg

    def __gt__(self, other):
        return self.szepseg > other.szepseg

    def __ge__(self, other):
        return self.szepseg >= other.szepseg

class Rose(Flower):
    def __init__(self, nev, szin, szepseg):
        
        super().__init__(nev, szin, szepseg)
        szepseg*=2
    def __str__(self):
        return f"{super().__str__()} {self.szepseg*2}"
class Tulip(Flower):
    def __init__(self, nev, szin, szepseg):
        super().__init__(nev, szin, szepseg)
        szepseg*=1.5
    def __str__(self):
        return f"{super().__str__()} {self.szepseg*1.5}"
class Daisy(Flower):
    def __init__(self, nev, szin, szepseg):
        super().__init__(nev, szin, szepseg)
    def __str__(self):
        return f"{super().__str__()} {self.szepseg}"

class Bouquet:
    num=0
    def __init__(self,viragok):
        self.viragok=viragok
        Bouquet.num+=1
    def __str__(self):
        rendezett = sorted(self.viragok, key=lambda v: v.szepseg, reverse=True)
        virag_szoveg = ', '.join(f"{v.szin} {v.nev} ({v.szepseg})" for v in rendezett)
        return f"Bouquet #{Bouquet.num}: {virag_szoveg}"

v1 = Flower("rózsa", "piros", 10)
v2 = Flower("tulipán", "sárga", 7)
v3 = Flower("margaretta", "fehér", 5)

csokor = Bouquet([v1, v2, v3])
print(csokor)
