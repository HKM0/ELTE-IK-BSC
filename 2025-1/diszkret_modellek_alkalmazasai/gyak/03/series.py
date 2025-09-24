'''
Feladat (Hányados-sorozat)

Természetes számok esetén definiálhatjuk a következő sorozatot:
(s0=n;si+1=σ(si)−si),
(s0​=n;si+1​=σ(si​)−si​),

ahol a σ(n)σ(n) az nn osztóinak összege. 
A sorozat vagy terminál nulla értékkel, vagy periodikussá válik. 
Készíts programot, amely egy adott természetes szám esetén kiszámolja a fenti sorozatot! 
Amennyiben a sorozat nem terminál, akkor az első periódus legyen az eredmény!
'''
def divisor_sum_iteration(k):
    seq = [k]
    seen = {}
    while True:
        nxt = sigma(seq[-1],1) - seq[-1]
        if nxt == 0:
            seq.append(0)
            return seq
        if nxt in seen:
            return seq[seen[nxt]:] if seq[seen[nxt]] == nxt else seq
        seen[nxt] = len(seq)
        seq.append(nxt)

assert divisor_sum_iteration(3) == [3, 1, 0]
assert divisor_sum_iteration(4) == [4, 3, 1, 0]
assert divisor_sum_iteration(5) == [5, 1, 0]
assert divisor_sum_iteration(6) == [6, 6]
assert divisor_sum_iteration(7) == [7, 1, 0]
assert divisor_sum_iteration(8) == [8, 7, 1, 0]
assert divisor_sum_iteration(10) == [10, 8, 7, 1, 0]
assert divisor_sum_iteration(20) == [20, 22, 14, 10, 8, 7, 1, 0]
assert divisor_sum_iteration(50) == [50, 43, 1, 0]
assert divisor_sum_iteration(100) == [100, 117, 65, 19, 1, 0]
assert divisor_sum_iteration(25) == [25, 6, 6]
assert divisor_sum_iteration(28) == [28, 28]
assert divisor_sum_iteration(95) == [95, 25, 6, 6]
assert divisor_sum_iteration(119) == [119, 25, 6, 6]
assert divisor_sum_iteration(143) == [143, 25, 6, 6]
print("OK!")
