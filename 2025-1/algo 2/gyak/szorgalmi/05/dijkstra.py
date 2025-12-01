def dijkstra(graph, s):
    d = {v: float('inf') for v in graph}
    pi = {v: None for v in graph}
    visited = set()
    d[s] = 0
    
    while len(visited) < len(graph):
        # min unvisited
        u = None
        min_dist = float('inf')
        
        for v in graph:
            if v not in visited and d[v] < min_dist:
                min_dist = d[v]
                u = v
        
        if u is None or d[u] == float('inf'):
            break
            
        visited.add(u)
        
        if u in graph:
            for v, w in graph[u]:
                if d[v] > d[u] + w:
                    d[v] = d[u] + w
                    pi[v] = u
                    
    return d, pi

def get_path(parents, start, end):
    if parents[end] is None and start != end:
        return None
    
    path = []
    current = end
    
    while current is not None:
        path.append(current)
        current = parents[current]
    
    return path[::-1]



print("teszt 1")
graph_anim = {
    'a': [('b', 3), ('c', 1)],
    'b': [('d', -2)],
    'c': [('b', -1)],
    'd': [('c', 3)]
}

distances, parents = dijkstra(graph_anim, 'a')
print(f"Distances: {distances}")

for target in ['b', 'c', 'd']:
    print(f"Path to {target}: {get_path(parents, 'a', target)}")

print("--- teszt 2 ---")
graph_anim = {
    'a': [('b', 3), ('c', 1)],
    'b': [('d', -2)],
    'c': [('b', -1)],
    'd': [('c', 3)]
}

distances, parents = dijkstra(graph_anim, 'a')
print(f"Distances: {distances}")

for target in ['b', 'c', 'd']:
    print(f"Path to {target}: {get_path(parents, 'a', target)}")
print()

print("--- teszt 3 ---")
graph_complex = {
    'a': [('b', 1), ('d', 3), ('e', 3)],
    'b': [('a', 1), ('e', 1), ('f', 3)],
    'c': [],
    'd': [('a', 3), ('e', 0)],
    'e': [('a', 3), ('b', 1), ('d', 0), ('f', 2)],
    'f': [('b', 3), ('e', 2)]
}

distances, parents = dijkstra(graph_complex, 'a')
print(f"Distances: {distances}")

for target in ['b', 'c', 'd', 'e', 'f']:
    print(f"Path to {target}: {get_path(parents, 'a', target)}")