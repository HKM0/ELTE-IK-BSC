print("szia","uram","bojler","eladó",sep="\t-|-\t", end="\n\n")

#bekeres
nev = input(f"Hogy hívnak?")
print(f"Szia {nev}!\tV: ")
#nem tarolando
_ = input("valami")


#indexeles peldak
szamok = [i for i in range(1, 100)]
print(szamok[-1])

# nincs char, csak str.
print(type('a'[0]))

# igazság értéket ad rác
print(isinstance("asd", str))

#típus adás:
age:int = input("korod?\tV: ")

#tuple unpacking !!
t = (1,2,3)
a,b,c = t
print(f"{a} {b} {c}")

#törlés
del(a,b,c)
try:
    print(f"{a} {b} {c}")
except:
    print("törölve lett")

# slicing

szamok=[i for i in range(1,101)]

print(szamok[0:50]) # nulla és 50 közti számok
print(szamok[::2]) # kettesével lépked


print("".join(str(i) for i in range(1,100)))

s = "indula gör"
s += s[-2::-1]
print(s)

