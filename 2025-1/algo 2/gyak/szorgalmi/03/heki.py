from collections import deque

def bfs(graph, start):
    """
    kb ez volt a stukiban szoval igy jott ossze.

    bemenet:
    graph - dictionary pl. {'A': ['B', 'C'], 'B': ['A', 'D'], ...}
    start - kedocsucs
    
    kimenet:
    d  - tavolsag a kezdocsucstol
    pi - parent node
    """
    color = {u: 'feher' for u in graph}
    d = {u: "∞" for u in graph}
    pi = {u: "∅" for u in graph}
    
    color[start] = 'szurke'
    d[start] = 0
    
    Q = deque([start])
    
    while Q:
        u = Q.popleft()
        for v in graph[u]:
            if color[v] == 'feher':
                color[v] = 'szurke'
                d[v] = d[u] + 1
                pi[v] = u
                Q.append(v)
        color[u] = 'fekete'
    
    return d, pi

if __name__ == "__main__":
    """
    graph = {
        # azt beszéltük így lesz megadva a vizsgán szóval így csináltam.
        'A': ['B', 'C'],
        'B': ['A', 'D', 'E'],
        'C': ['A', 'F'],
        'D': ['B'],
        'E': ['B', 'F'],
        'F': ['C', 'E']
    }
    """
    # ez a példa van az oldalon
    graph = {
        'A': ['B'],
        'B': ['E', 'C'],
        'C': ['E'],
        'D': ['A'],
        'E': ['D'],
        'F': ['C', 'E']
    }

    d, pi = bfs(graph, 'A')

    print("d vegso ertekei:")
    for node in d:
        print(f"{node}: {d[node]}")

    print("\npi vegso ertekei:")
    for node in pi:
        print(f"{node}: {pi[node]}")
