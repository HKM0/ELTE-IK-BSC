def queue_based_bellman_ford(graph, s):

    N = len(graph) # Csúcsok száma

    # d(u): start távolság
    d = {u: float('inf') for u in graph}
    
    # pi(u): szülő elem az útvonalon
    pi = {u: None for u in graph}
    
    # inQ(u): csúcs sorban státusz
    inQ = {u: False for u in graph}
    
    # e(u): útvonal élek szám
    e = {u: 0 for u in graph}

    # --- Start csúcs init ---
    d[s] = 0
    e[s] = 0
    
    # Q: Queue init és start elem hozzáad
    Q = [s]
    inQ[s] = True

    # --- Ciklus ---
    while Q:
        # u := Q.rem(), első elem ki
        u = Q.pop(0)
        inQ[u] = False

        # Szomszédok bejár: Minden v eleme G.A(u)-nak
        if u in graph:
            for v, w in graph[u]:
                
                # --- feltétel ---
                # Ha d(v) > d(u) + G.w(u, v)
                if d[v] > d[u] + w:
                    
                    d[v] = d[u] + w      # Távolság updt.
                    pi[v] = u            # Parent set: pi(v) := u
                    e[v] = e[u] + 1      # Élszám +1: e(v) = e(u) + 1

                    # --- Negatív kör keres---
                    if e[v] >= N:
                        return None, None, v  # Negatív kör van, v csúcs

                    # Ha nincs a sorban, hozzáad
                    if not inQ[v]:
                        Q.append(v)      # Q.add(v)
                        inQ[v] = True    # inQ(v) := true
                
                else:
                    pass

    return d, pi, None

def get_path(parents, start, end):
    if parents is None or (parents[end] is None and start != end):
        return None
    
    path = []
    current = end
    
    # vissza a szülőn keresztül
    while current is not None:
        path.append(current)
        current = parents[current]

        #kilép ha körbe ér
        if len(path) > len(parents) + 1: 
            return None 
            
    return path[::-1]


# ---------------- Tesztek ----------------
# Egyszerű gráf
print("--- 1.\tEgyszerű gráf ---")
graph1 = {
    'a': [('b', 3), ('c', 1)],
    'b': [('d', -2)],
    'c': [('b', -1)],
    'd': [('c', 3)]
}
distances, parents, cycle_node = queue_based_bellman_ford(graph1, 'a')

if cycle_node:
    print(f"Negatív kör van itt: {cycle_node}")
else:
    print(f"Távolságok (d): {distances}")
    print(f"Útvonal a -> d: {get_path(parents, 'a', 'd')}")
print()

# Negatív kör
print("--- 2.\tNegatív kör ---")
graph2 = {
    0: [(1, 1)],
    1: [(2, -3)],
    2: [(0, 1), (3, 1)],
    3: []
}
distances, parents, cycle_node = queue_based_bellman_ford(graph2, 0)

if cycle_node is not None:
    print(f"Negatív kör van! itt: {cycle_node}")
else:
    print(f"Távolságok: {distances}")
print()

# Negatív élek, de nincs negatív kör
print("--- 3.\tNegatív súlyok kör nélkül ---")
graph3 = {
    0: [(1, 5), (2, 3)],
    1: [(3, -2)],
    2: [(1, -1), (3, 4)],
    3: [(4, 2)],
    4: []
}
distances, parents, cycle_node = queue_based_bellman_ford(graph3, 0)

if cycle_node:
    print(f"Negatív kör van itt: {cycle_node}")
else:
    print(f"Távolságok: {distances}")
    print(f"Útvonal 0 -> 4: {get_path(parents, 0, 4)}")