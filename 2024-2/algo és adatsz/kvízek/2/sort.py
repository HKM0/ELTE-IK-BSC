#--------------------------
#       első feladat
#--------------------------

def insertionSort(arr):
    mozgatasLista = []
    osszehasonlitasLisa = []

    print(f"Kezdeti rendezett résztömb: A[ 0..0 ] = {GREEN}{arr[0]}{RESET}\n")

    for i in range(1, len(arr)):
        elem = arr[i]
        j = i - 1
        mozgatasSzam = 1
        osszehasonlitasSzam = 0

        while j >= 0 and elem < arr[j]:
            arr[j + 1] = arr[j] 
            j -= 1
            mozgatasSzam += 1  
            osszehasonlitasSzam += 1  

        if j != i - 1:  
            arr[j + 1] = elem
            mozgatasSzam += 1  
        else : mozgatasSzam = 0

        if j >= 0:
            osszehasonlitasSzam += 1

        mozgatasLista.append(mozgatasSzam)
        osszehasonlitasLisa.append(osszehasonlitasSzam)

        if i in [2, 5]:
            print(f"{i}. menet után a rendezett résztömb: A[ 0..{i} ] = {GREEN}{','.join(map(str, arr[:i+1]))}{RESET}")

    print(f"\n1-4. menetekben összehasonlítások: {GREEN}{','.join(map(str, osszehasonlitasLisa[:4]))}{RESET}")
    print(f"5-7. menetekben összehasonlítások: {GREEN}{','.join(map(str, osszehasonlitasLisa[4:]))}{RESET}")

    print(f"\n1-4. menetekben adatmozgatások: {GREEN}{','.join(map(str, mozgatasLista[:4]))}{RESET}")
    print(f"5-7. menetekben adatmozgatások: {GREEN}{','.join(map(str, mozgatasLista[4:]))}{RESET}")
    return arr

#--------------------------
#     második feladat
#--------------------------

global szamlalo
global n
global forras
global ketteslista 
GREEN = "\033[92m"
RESET = "\033[0m"
YELLOW = "\033[93m"

def reOrder(doubleArr):
    a = [doubleArr[1], doubleArr[0]]
    b = [doubleArr[2], doubleArr[3]]
    c = [doubleArr[-1], doubleArr[-2]]
    doubleArr = doubleArr[4:-2]
    return f"{b[0]},{b[1]},{a[0]},{a[1]},{','.join(map(str, doubleArr))},{c[0]},{c[1]}"

def mergeSort(arr, level=1, kiindulas="A", szarmazek=None):
    global szamlalo
    global n
    global forras
    global ketteslista 
    comparisons = 0
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid] 
        R = arr[mid:]  

        if level == 1:
            ketteslista = L + R  

        mergeSort(L, level + 1, "A", kiindulas)  
        mergeSort(R, level + 1, "B", kiindulas) 

        i = j = k = 0

        while i < len(L) and j < len(R):
            comparisons += 1  
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

        print(f"{szamlalo}. {GREEN}{','.join(map(str, arr))}{RESET}") 
        szamlalo += 1

        if szamlalo == n:
            print(f"\nHány összehasonlítás történt az utolsó ({n-1}.) összefésülésnél: {GREEN}{comparisons}{RESET}")

        if szamlalo == 5:
            forras.append(kiindulas) 
            forras.append(szarmazek)  
    return arr


#main
A = [24, 9, 2, 7, 19, 28, 24, 12]
print(f"\n--------------------------------\n\t{YELLOW}első feladat{RESET}\n--------------------------------\n")

print(f"\nrendezve: {YELLOW}{insertionSort(A)}{RESET}")

B = [36, 27, 12, 24, 32, 15, 22, 35, 10]
szamlalo = 1
n = len(B)
forras = []  
ketteslista = [] 

print(f"\n--------------------------------\n\t{YELLOW}második feladat{RESET}\n--------------------------------\n")

rendezett = mergeSort(B)

if len(forras) >= 2:
    print(f"\nMelyik tömbből, melyik tömbbe történt az 5. összefésülés? Melyikből: {GREEN}{forras[0]}{RESET}, melyikbe: {GREEN}{forras[1]}{RESET}")
else:
    print("\nNem volt 5. összefésülés")
print(f"\nMi az elemek sorrendje az összefésülés után abban a tömbben, ahová az összefésülés történt?: {GREEN}{reOrder(ketteslista)}{RESET}")
print(f"\nrendezve: {YELLOW}{rendezett}{RESET}")


# -Heki