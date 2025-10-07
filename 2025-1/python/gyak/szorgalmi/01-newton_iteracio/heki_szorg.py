def newton_m(A, m, a0, n, step=0):
    if n == 0:
        print(f"Iteracio {step}\t=>\t{a0}")
        return a0
    
    an1 = (1/m) * (A / (a0**(m-1)) + (m-1)*a0)
    
    print(f"Iteracio {step}\t=>\t{a0}")

    return newton_m(A, m, an1, n-1, step+1)


# pl 
A = 8       # bemeneti szam
m = 3       # gyok id
a0 = 1.0    # kezdo ertek
n = 10      # iteracio szam

print(f"\nA {A}-as, {m}. gyöke:")
sajat = newton_m(A, m, a0, n)

# beepitett teszt xd
beepitett = A ** (1/m)


print(f"""
============================================================
        Kimenet:
        newton iteracio ki.:\t{sajat}
        bepitett gyokvonas:\t{beepitett}
        eredmenyek kozti hiba:\t{abs(sajat - beepitett)}
============================================================
""")

#heki