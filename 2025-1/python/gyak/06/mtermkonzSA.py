from functools import reduce

st = "Never odd or even"
#print(st[::-1])

#print(dir(st))

d = { "Adam" : 11, "Jerry" : 4, "Michael" : 45, "Ben" : 10}
#érték nagyobb, mint 10
#print(d.items()) #dict_items([('Adam', 11), ('Jerry', 4), ('Michael', 45), ('Ben', 10)])
#print(dir(d))
d2filtered = [item[0] for item in d.items() if item[1] > 10]
#print(d2filtered)

lst = [33, 22, 33, 21, 33, 44, 33, 11, 11, 2, 1]
s = {33, 22, 45, 47, 42, 52}
#print(set(lst) | s, set(lst) & s, s - set(lst))

def sumfun(*nums):
    summa = 0
    for i in nums:
        if i > 5:
            summa += i
    return summa
#print(sumfun(1,2,3,4,5,6,7))
sumifmorethan5 = lambda *args : reduce(lambda acc, i: acc+i if i > 5 else acc, args, 0)
#print(sumifmorethan5(3,4,5,6,7))

countwops = lambda st : st.lower().count("wop")
#print(countwops("WOPwopwups"))

countmorethan5len = lambda lst: list(filter(lambda x: len(x) > 5, lst))
#print(countmorethan5len(["tttttt","st"]))
countmorethan5len = lambda lst: [x for x in lst if len(x) > 5]
#print(countmorethan5len(["tttttt","st"]))

d = { "Adam" : 11, "Jerry" : 4, "Michael" : 45, "Ben" : 10}
dsorter = lambda dct : sorted(dct.items(), key=lambda x: x[1])
#print(dsorter(d))

minselector = lambda lst : reduce(lambda mini, i: mini if mini < i else i, lst)
#print(minselector([3,23,2,45]))

dadogos = lambda *strs : list(map(lambda st: st[0]+st, strs))
#print(dadogos("juj", "vacog", "hideg"))

class Flower:
    def __init__(self, name, color, beauty):
        self.name = name
        self.color = color
        if (isinstance(beauty, int) and (beauty <= 10 and beauty >= 1)):
            self.beauty = beauty
        else:
            raise AttributeError("Rossz példány!")
        
    def __str__(self):
        return f"{self.name} ilyen színű {self.color}, ilyen szép {self.beauty}"
    
    #def __repr__(self):
    #    return f"{self.name} ilyen színű {self.color}, ilyen szép {self.beauty}"
    
    def __eq__(self, other):
        if isinstance(other, Flower):
            return self.beauty == other.beauty
        
    def __lt__(self, other):
        if isinstance(other, Flower):
            return self.beauty < other.beauty
        
class Rose(Flower):
    def __init__(self, name, color, beauty):
        super().__init__(name, color, beauty)
        self.beauty = min(self.beauty*2, 10)

    def __str__(self):
        return super().__str__()

class Tulip(Flower):
    def __init__(self, name, color, beauty):
        super().__init__(name, color, beauty)
        self.beauty = min(self.beauty*1.5, 10)

    def __str__(self):
        return super().__str__()

class Daisy(Flower):
    def __init__(self, name, color, beauty):
        super().__init__(name, color, beauty)
        self.beauty = min(self.beauty*1, 10)

    def __str__(self):
        return super().__str__()

class Bouquet:
    total_bouquets = 0

    def __init__(self, *plants):
        Bouquet.total_bouquets += 1
        self.flowers = [f for f in plants if isinstance(f, Flower)]

    def add_flowers(self, *flwrs):
        self.flowers += [f for f in flwrs if isinstance(f, Flower)]

    def __str__(self):
        strflowers = sorted(self.flowers)
        return f"{[str(f) for f in strflowers]}"

print(Rose("ro", "red", 6))
b = Bouquet(42, 41, Rose("ro", "red", 6), Tulip("tu", "red", 6))
b2 = Bouquet(42, 41)
b.add_flowers(Daisy("d", "yellow", 5), Tulip("tu", "blue", 8))
print(Bouquet.total_bouquets)
print(b)

