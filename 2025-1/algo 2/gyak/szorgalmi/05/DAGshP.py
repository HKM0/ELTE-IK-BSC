def df_visit(graph, u, dcg, stack, color, pi):
    color[u] = 'grey'
    if u in graph:
        for v, w in graph[u]:
            if dcg: break
            if color[v] == 'white':
                pi[v] = u
                df_visit(graph, v, dcg, stack, color, pi)
            elif color[v] == 'grey':
                pi[v] = u
                dcg.append(v)
    color[u] = 'black'
    stack.append(u)

def topological_sort(graph, start, dcg, stack):
    color = {u: 'white' for u in graph}
    pi = {u: None for u in graph}
    df_visit(graph, start, dcg, stack, color, pi)

def dag_sh_ps(graph, stack):
    distances = {v: float('inf') for v in graph}
    parents = {v: None for v in graph}
    
    if not stack:
        return distances, parents

    s = stack.pop()
    distances[s] = 0
    u = s

    while stack:
        if u in graph:
            for v, w in graph[u]:
                if distances[v] > distances[u] + w:
                    distances[v] = distances[u] + w
                    parents[v] = u
        u = stack.pop()

    return distances, parents

def dag_shortest_paths(graph, start):
    stack = []
    dcg = [] 
    
    topological_sort(graph, start, dcg, stack)
    
    if dcg:
        return None, None
        
    return dag_sh_ps(graph, stack)

def get_path(parents, start, end):
    if parents is None or (parents[end] is None and start != end):
        return None
    
    path = []
    current = end
    
    while current is not None:
        path.append(current)
        current = parents[current]
        if len(path) > len(parents): 
            return None
    
    return path[::-1]

# tesztek
print("--- teszt 1. ---")
graph_dag = {
    'a': [('b', 1), ('d', 3), ('e', 3)],
    'b': [('e', 1), ('f', 3)],
    'c': [('b', 1), ('f', 3)],
    'd': [],
    'e': [('d', 0), ('f', 2)],
    'f': []
}

distances, parents = dag_shortest_paths(graph_dag, 'a')

if distances is None:
    print("Kör van!")
else:
    print(f"Distances: {distances}")
    for target in ['b', 'd', 'e', 'f']:
        print(f"Path to {target}: {get_path(parents, 'a', target)}")

print("\n--- teszt 2. ---")
graph_cycle = {
    'a': [('b', 3), ('c', 1)],
    'b': [('d', -2)],
    'c': [('b', -1)],
    'd': [('c', 3)]
}

distances, parents = dag_shortest_paths(graph_cycle, 'a')

if distances is None:
    print("Kör van!")
else:
    print(f"Distances: {distances}")