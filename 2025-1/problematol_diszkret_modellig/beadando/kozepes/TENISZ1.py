#import sys

# ha tulfutna az elnyelo elerese elott, novelem a rekurzios limitet
#sys.setrecursionlimit(2000)

def esely_szamol(aktualis_a, aktualis_b, cel, p_a_nyer):
    """
    sima markov-lanc szim.:
    kiszamolja, mi az eselye, hogy 'A' eleri a megadott 'cel' erteket, mielőtt 'B' elerne azt.
    
    aktualis_a, aktualis_b  =>  jelenlégi allas
    cel                     =>  gyozelemhez szukseges mennyiseg
    p_a_nyer                =>  valoszinuseg, kov lepest 'A' nyeri.
    """

    # elnyelo allapotok 
    if aktualis_a == cel:
        return 1.0  # 'A' nyert
    if aktualis_b == cel:
        return 0.0  # 'B' nyert, 'A' vesztett

    # Markov tulajdonsag szerint nincs memoria, szoval kov allapot valoszinusege csak a jelenegitol fugg
    # P(Jelenlegi) = p * P(A lep egyet) + (1-p) * P(B lep egyet)
    return p_a_nyer * esely_szamol(aktualis_a + 1, aktualis_b, cel, p_a_nyer) + (1 - p_a_nyer) * esely_szamol(aktualis_a, aktualis_b + 1, cel, p_a_nyer)


# a szetteknel a valoszinuseg valtozik fuggoen hogy ki adogat jatekonkent, itt ezt is kezelni kell.
memoria_szett = {} # gyorsitashoz 

def szett_esely_szamol(jatek_a, jatek_b, cel_jatek, p_a_szerval_jatek, p_a_fogad_jatek):
    """
    kiszamolja a szett nyeresi eselyet, kezeli az adogatas valtozasat.
    az nyer aki elobb eleri a 'cel_jatek'-ot.
    """

    # megnezem hogy ki lett -e mar szamolva
    allapot = (jatek_a, jatek_b)
    if allapot in memoria_szett:
        return memoria_szett[allapot]

    # elnyelo allapotok
    if jatek_a == cel_jatek:
        return 1.0
    if jatek_b == cel_jatek:
        return 0.0

    # feltetelezve hogy minden jatek utan szerva csere van, valtom az adogatot
    ossz_jatek = jatek_a + jatek_b
    if ossz_jatek % 2 == 0:
        p_aktualis_jatek_nyeres = p_a_szerval_jatek
    else:
        p_aktualis_jatek_nyeres = p_a_fogad_jatek

    # rekurzio, atmenet
    esely = p_aktualis_jatek_nyeres * szett_esely_szamol(jatek_a + 1, jatek_b, cel_jatek, p_a_szerval_jatek, p_a_fogad_jatek) + (1 - p_aktualis_jatek_nyeres) * szett_esely_szamol(jatek_a, jatek_b + 1, cel_jatek, p_a_szerval_jatek, p_a_fogad_jatek)
    
    memoria_szett[allapot] = esely
    return esely


#-----------------------------------
try:
    P_labdamenet_A_szerval = float(input("'A' játékos szerva esélye (float ertek 0 es 1 kozott)\nV: "))
    P_labdamenet_B_szerval = float(input("'B' játékos szerva esélye (float ertek 0 es 1 kozott)\nV: "))
except:
    print("hibás érték bevitel!")
    exit()

#P_labdamenet_A_szerval = 0.62
#P_labdamenet_B_szerval = 0.60 

P_labdamenet_A_fogad = 1.0 - P_labdamenet_B_szerval

#-----------------------------------
# 1. jatek,  4 pont szerzese a cel
# esely, 'A' nyer ha 'A' szerval
esely_jatek_A_szerva = esely_szamol(0, 0, 4, P_labdamenet_A_szerval)

# esely, 'A' nyer ha 'B' szerval
esely_jatek_A_fogad = esely_szamol(0, 0, 4, P_labdamenet_A_fogad)

print(f"{50*"-"}\n1.\t egyetlen játékra esélyek:\n'A' nyerési esélye szerválóként: {(esely_jatek_A_szerva*100):.4f}%\n'A' nyerési esélye fogadóként: {(esely_jatek_A_fogad*100):.4f}%\n{50*"-"}")

#-----------------------------------
# 2. szett, 6 jatek nyerese a cel
memoria_szett = {}
esely_jatszma_A = szett_esely_szamol(0, 0, 6, esely_jatek_A_szerva, esely_jatek_A_fogad)

print(f"2.\t szett esély\n'A' nyerési esélye a játszmában: {(esely_jatszma_A*100):.4f}%\n{50*"-"}")

#-----------------------------------
# 3. merkozes, 2/3 menet nyerese  a cel
esely_merkozes_A = esely_szamol(0, 0, 2, esely_jatszma_A)

print(f"3.\t mérkőzés esély:\n'A' nyerési esélye a meccsen: {(esely_merkozes_A*100):.4f}%\n{50*"-"}")


# heki
