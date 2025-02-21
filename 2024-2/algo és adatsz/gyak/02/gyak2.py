def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
# T(n) ∈  Θ(n^2)
#mT(n) = MT(n)
#Öh(n) ∈ Θ(n^2)

def optimized_bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
# T(n) ∈  Θ(n^2)
#mT(n) = MT(n)


# múveleti idő T(n) az alprogram hívások száma + ciklusiteráicók száma
# az összehaasonlításon alapuló algoritmusokra a műveleti idő közel azonos mint amikor azt számoluk meg hogy hány műveletet végzett az algoritmus.
# van amikor csak felső/ alsóbecslést tudunk adni, ilyenkor jön a minimális, maximális és átlagos sorrendben: mT(n), MT(n) és T(n) 
# buborék rendezés esetén
# T(n) ∈  Θ(n^2)
# mT(n) = MT(n)
# összehasonlítások száma szerint: Öh(n) ∈ Θ (n^2)
# inverziószám, hogy mennyire rendezetlen az adott tömb. => a cserék száma megegyezik az inverziók számával.
# Egy A tömbben 2 elem : A[i] és A[j] inverzióban áll, ha i<j és A[i] > A[j].

#Állítás: buborék rendezésben a cserék száma = A-beli inverziók száma
# pl 3,1,5,3,2,6
# 3 inverzióvan van az 1-el és 2-vel,
# a 4-es pedig a hármassal, és kettessel.
# az inverziók száma = a cserék számával, 

#------------------------------------------------------
# maximum kiválasztásos rendezés:
#------------------------------------------------------

# a kimenet nekem itt csökkenő sorrendben lesz.
def max_selection_sort(arr):
    n = len(arr)
    for i in range(n):
        max_idx = i
        for j in range(i+1, n):
            if arr[j] > arr[max_idx]:
                max_idx = j
        arr[i], arr[max_idx] = arr[max_idx], arr[i]
    return arr 

#rövid leírás: a rendezetlen részben kiválasztjuk a legnagyobb elemet és az utolsó helyre tesszük
# a rendezetlen rész méretét csökkentjük eggyel
# T(n) ∈ Θ(n^2)
# Öh(n) ∈ Θ(n^2)
# Csere(n) ∈ Θ(n)


#------------------------------------------------------
# minimum kiválasztásos rendezés:
#------------------------------------------------------

def min_selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# rövid leírás: a rendezetlen részben kiválasztjuk a legkisebb elemet és az első helyre tesszük
# a rendezetlen rész méretét csökkentjük eggyel
# T(n) ∈ Θ(n^2)
# Öh(n) ∈ Θ(n^2)
# Csere(n) ∈ Θ(n)


#------------------------------------------------------
# naive insertion sort (naiv beszúró rendezés):
#------------------------------------------------------

def naive_insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        for j in range(i, 0, -1):
            if arr[j] < arr[j-1]:
                arr[j], arr[j-1] = arr[j-1], arr[j]
            else:
                break
    return arr

# rövid leírás: minden elemet a helyére teszünk a rendezetlen részben, a helyére kerülésig cserélgetjük
# mT(n) ∈ Θ(n)
# MT(n) ∈ Θ(n^2)
# Öh(n) ∈ Θ(n^2)
# Csere(n) ∈ Θ(n^2)

#------------------------------------------------------
# insertion sort (beszúró rendezés):
#------------------------------------------------------

def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# rövid leírás: minden elemet a helyére teszünk a rendezetlen részben, a helyére kerülésig tologatjuk
# mT(n) ∈ Θ(n)
# MT(n) ∈ Θ(n^2)
# Öh(n) ∈ Θ(n^2)
# Csere(n) ∈ Θ(n)

#------------------------------------------------------
# összefésülő rendezés (osszd meg és uralkodj típusú):
#------------------------------------------------------

def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        merge_sort(L)
        merge_sort(R)

        i = j = k = 0

        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1

    return arr

# rövid leírás: Oszd meg és uralkodj típusú algoritmus, rekurzívan felosztja a listát kisebb részekre, majd azokat összefésüli egy rendezett listába. 

# ezek kérdésesek de szerintem ezek az adatok jönnek ki rá:
#T(n) ∈ O(n log⁡ n)
#Öh(n) ∈ Θ(n log⁡ n)
#Cserék ∈ O(n log⁡ n) 



# kérdések a kvízben, melyik tömbből melyikbe ment az elem, (merge sort)
# zh előtti példák: láncolt listák, verem és sor


#------------------------------------------------------
# verem
#------------------------------------------------------
# egy olyan elemi adatszerkezet amiben adatokat tárolhatunk, de mindig csak egy bizonyos adathoz férhetünk hozzá.
#nagyon alap szinten így tudtam megírni py ban.

class Stack:
    def __init__(self, size): #konverzió
        self.size = size
        self.stack = [None] * size
        self.top = -1

def ÜRES(S):
    if S.top == -1:
        return True
    else:
        return False

def VEREMBE(S, x):
    if S.top < S.size - 1:
        S.top += 1
        S.stack[S.top] = x
    else:
        raise Exception("sok elem")

def VEREMBőL(S):
    if ÜRES(S):
        raise Exception("kevés elem")
    S.top -= 1
    return S.stack[S.top + 1]





# példa
if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    sorted_arr = bubble_sort(arr)
    print("Buborék rendezve:", sorted_arr)

    arr = [64, 34, 25, 12, 22, 11, 90]
    sorted_arr = optimized_bubble_sort(arr)
    print("Jobb buborék rendezéssel:", sorted_arr)
    
    arr = [64, 34, 25, 12, 22, 11, 90]
    sorted_arr = max_selection_sort(arr)
    print("Maximum kiválasztással:", sorted_arr)
    
    arr = [64, 34, 25, 12, 22, 11, 90]
    sorted_arr = min_selection_sort(arr)
    print("Minimum kiválasztással:", sorted_arr)
    
    arr = [64, 34, 25, 12, 22, 11, 90]
    sorted_arr = naive_insertion_sort(arr)
    print("Naiv beszúró rendezett lista:", sorted_arr)
    
    arr = [64, 34, 25, 12, 22, 11, 90]
    sorted_arr = insertion_sort(arr)
    print("Beszúró rendezett lista:", sorted_arr)

    arr = [12, 11, 13, 5, 6, 7]
    sorted_arr = merge_sort(arr)
    print("Összefésüléses rendezés:", sorted_arr)

    stack = Stack(5)
    print("Üres a verem:", ÜRES(stack))
    VEREMBE(stack, 10)
    VEREMBE(stack, 20)
    print("Üres a verem:", ÜRES(stack))
    print("Veremből kivett elem:", VEREMBőL(stack))
    print("Veremből kivett elem:", VEREMBőL(stack))
    print("Üres a verem:", ÜRES(stack))
