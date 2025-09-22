#1
import datetime
import math
kor=input("Hány éves vagy?\nv:\t")
print(f"Te {datetime.datetime.today().year-int(kor)} évben születtél valószínűleg!")
#2
a = 505
b = 745
a,b = b,a
#3
a, b = input("Kérek két számot (1, 2)\nV:\t").strip().split(",")
a = int(a)
b = int(b)
print(f"Az atfogo az {math.sqrt(a**2 + b**2)} lesz.")
#4
line = "Fah-fah, fah-fah-fah, fah-fah, fah"
print(f"összesen {line.count("fah")} darab 'fah szó van'")
#5
lst = [1, [ [], [2, ["polizei"], 3], 4], "off"]
lst[1][1][1][0]= "poli"
print(lst[1][1][1])
#6
lst = [ [ [], [ [], [], [] ] ], [], [ [] ], [] ]