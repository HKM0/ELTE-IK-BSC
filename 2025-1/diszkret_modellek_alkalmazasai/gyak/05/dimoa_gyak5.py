# GCD (Greatest Common Divisor) and LCM (Least Common Multiple)

# Feladat 1
def lnko(a, b):
    result = 1
    for num1, exp1 in factor(a):
        for num2, exp2 in factor(b):
            if num1==num2:
                result *= num1 ^ min(exp1,exp2)
    return result

print(f"Sajat lnko: {lnko(12,18)}, beepitett lnko: {gcd(12,18)}")
print(f"Sajat lnko: {lnko(12680,7800)}, beepitett lnko: {gcd(12680,7800)}")


# Feladat 2
def lkkt(a, b):
    result = 1
    for num1, exp1 in factor(a):
        for num2, exp2 in factor(b):
            if num1==num2:
                result *= num1 ^ max(exp1,exp2)
    for num, exp in factor(a):
        if result%num != 0:
            result *= num ^ exp
    
    for num, exp in factor(b):
        if result%num != 0:
            result *= num ^ exp
            
    return result

print(f"Sajat lkkt: {lkkt(12,18)}, beepitett lnko: {lcm(12,18)}")
print(f"Sajat lkkt: {lkkt(1263,78)}, beepitett lnko: {lcm(1263,78)}")



# Feladat 3
import time

def gcd_w_factor(a, b):
    result = 1
    for num1, exp1 in factor(a):
        for num2, exp2 in factor(b):
            if num1==num2:
                result *= num1 ^ min(exp1,exp2)
    return result

def gcd_w_eukl(a,b):
    q = a//b
    r = a%b
    while r != 0:
        a = b
        b = r
        q = a//b
        r = a%b
    return b

data = []
for i in range(5,20+1):
    runtime_of_euc_gcd = 0
    runtime_of_fac_gcd = 0
    for j in range(10):
        a = randint(10^i,10^(i+1))
        b = randint(10^i,10^(i+1))
        c = gcd(a,b)
        start = time.time()
        assert gcd_w_eukl(a,b) == c
        runtime_of_euc_gcd += time.time() - start
        start = time.time()
        assert gcd_w_factor(a,b) == c
        runtime_of_fac_gcd += time.time() - start
    runtime_of_euc_gcd /= 10
    runtime_of_fac_gcd /= 10
    data.append([i,runtime_of_euc_gcd,runtime_of_fac_gcd])

plot1 = point([(d[0],d[1]) for d in data], color="red", legend_label="Eucl")
plot2 = point([(d[0],d[2]) for d in data], legend_label="Factor")
show(plot1+plot2)



# Feladat 4
def extended_euclidean_algorithm(a, b):
    x0, y0, r0 = 1, 0, a
    x1, y1, r1 = 0, 1, b
    
    while r1 != 0:
        q = r0 // r1
        
        r0, r1 = r1, r0 - q * r1
        x0, x1 = x1, x0 - q * x1
        y0, y1 = y1, y0 - q * y1
    
    return r0, x0, y0

a = 120
b = 230

gcd1, x1, y1 = xgcd(a, b)
print(f"Beepitett:\n r: {gcd1}, x: {x1}, y: {y1}")
gcd2, x2, y2 = extended_euclidean_algorithm(a, b)
print(f"Sajat:\n r: {gcd2}, x: {x2}, y: {y2}")
assert (gcd1, x1, y1) == (gcd2, x2, y2), "Ellenőrzés sikertelen!"
print(f"Ellenőrzés sikeres!")


# Feladat 5
# Változók definiálása
x, y = var('x y')
t_0 = var('t_0')
a, b, c = 47, 79, 100000

# Feltételek beállítása (x és y egész számok)
assume(x, 'integer')
assume(y, 'integer')
assume(t_0, 'integer')

# Megoldjuk a lineáris egyenletet a és b szerint
solution = solve([a*x + b*y == c], x, y)

# Kivesszük az x_t és y_t megoldásokat
x_t = solution[0]
y_t = solution[1]

print(f"X_t: {x_t}")
print(f"Y_t: {y_t}")

# Feltétel megoldása, hogy x és y nemnegatívak legyenek
# Megoldjuk az egyenlőtlenséget, hogy megtudjuk, milyen t_0 esetén nemnegatívak az x és y
conditions = solve([x_t >= 0, y_t >= 0], t_0)
print("Feltételek: ", conditions)

# A t_0 alsó és felső határa
t_min = ceil(conditions[1][0].rhs())
t_max = floor(conditions[2][0].rhs())

print(f"t_0 alsó határ: {t_min}, felső határ: {t_max}")

# Kiszámoljuk a különböző megoldások számát
number_of_solutions = t_max - t_min + 1

print(f"Ennyi féleképpen tudjuk kifizetni 100000 pengőt: {number_of_solutions}")

# Példák: megoldások kiszámítása különböző t_0 értékekre
for t in range(t_min, t_max + 1):
    x_val = x_t.subs(t_0 == t)
    y_val = y_t.subs(t_0 == t)
    print(f"t_0 = {t}: (x, y) = ({x_val}, {y_val})")



# Feladat 6
# Változók definiálása
x, y, z = var('x y z')
t_0 = var('t_0')
a, b, c, d = 70, 130, 150, 5000
count = 50
solution_count = 0

# Feltételek beállítása (x és y egész számok)
assume(x, 'integer')
assume(y, 'integer')
assume(z, 'integer')
assume(t_0, 'integer')

# Megoldjuk a lineáris egyenletet a és b szerint
solution = solve([a*x + b*y + c*z == d, x + y + z == count, x>=0, y>=0, z>=0], x, y, z)
print("Megoldások: ", solution)

sol1 = solution[0]
sol2 = solution[1]
sol3 = solution[2]

# Megoldas 1:
print(f"X: {sol1[0].rhs()}, Y: {sol1[1].rhs()}, Z: {sol1[2].rhs()}\n")
solution_count += 1

# Megoldas 2: Nem lesz jo, mert nem egészek

# Megoldas 3:
z_min = floor(sol3[2].lhs())
z_max = ceil(sol3[3].rhs())

print("Z eleme: [", z_min, ";", z_max, "]")

for i in range(z_min, z_max):
    x = sol3[0].rhs()(z=i)
    y = sol3[1].rhs()(z=i)
    if x.is_integer() and y.is_integer():
        print(f"X: {x}, Y: {y}, Z: {i}")
        solution_count += 1
        
print(f"Megoldás: {solution_count}")



# Feladat 7
def num_of_nat_solutions(a, b, c):
    if (a < 0 and b > 0) or (a > 0 and b < 0):
        return oo
    if a < 0 and b < 0:
        return 0
    
    g, x0, y0 = xgcd(a, b)
    print(f"G: {g}, x0: {x0}, y0: {y0}")
    if c % g != 0:
        return 0  # Nincs megoldás, ha c nem osztható gcd(a,b)-vel
    
    # Skálázzuk a megoldást c/gcd(a,b) értékére
    a_g = a // g
    b_g = b // g
    c_g = c // g
    print(f"a_g: {a_g}, b_g: {b_g}, c_g: {c_g}")
    x0 *= c_g
    y0 *= c_g
    print(f"x0: {x0}, y0: {y0}")
    
    t_min = ceil(-x0 / b_g)  # alsó határ
    t_max = floor(y0 / a_g)  # felső határ
    print(f"t_min: {t_min}, t_max: {t_max}")
    
    # Ha t_min <= t_max, akkor van megoldás
    if t_min <= t_max:
        return t_max - t_min + 1  # Megoldások száma
    else:
        return 0  # Nincs megoldás, ha a feltételek nem teljesülnek

assert num_of_nat_solutions(9, 6, 13) == 0
assert num_of_nat_solutions(10, 15, 32) == 0
assert num_of_nat_solutions(12, 30, 72) == 2
assert num_of_nat_solutions(-12, 30, 72) == oo
assert num_of_nat_solutions(12, -30, 72) == oo
assert num_of_nat_solutions(10, 22, 100) == 1
assert num_of_nat_solutions(-10, 22, 100) == oo
assert num_of_nat_solutions(10, -22, 100) == oo

print("OK!")

# Példa használat:
a, b, c = 50, 20, 1000
num_solutions = num_of_nat_solutions(a, b, c)
print(f"\n{a}x + {b}y = {c} egyenlet természetes számok feletti megoldásainak száma: {num_solutions}")

