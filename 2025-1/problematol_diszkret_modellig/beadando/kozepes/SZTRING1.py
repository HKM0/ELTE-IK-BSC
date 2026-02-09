def sztring1(reads, k):
    edges = {}
    out_degree = {}
    in_degree = {}
    nodes = set()

    # de bruijn graf epitese
    for r in reads:
        if len(r) < k:
            raise ValueError("Minden stringnek legalább k hosszúnak kell lennie.")
        for i in range(len(r) - k + 1):
            kmer = r[i:i+k]
            prefix = kmer[:-1]
            suffix = kmer[1:]

            if prefix not in edges:
                edges[prefix] = []
            edges[prefix].append(suffix)

            out_degree[prefix] = out_degree.get(prefix, 0) + 1
            in_degree[suffix] = in_degree.get(suffix, 0) + 1

            nodes.add(prefix)
            nodes.add(suffix)

    if not nodes:
        return ""

    # dfs osszefuggoseg check
    def dfs_weak(start):
        visited = set()
        stack = [start]

        # iranyitatlan graf felepites
        undirected = {}
        for u in nodes:
            undirected[u] = set()
        for u in edges:
            for v in edges[u]:
                undirected[u].add(v)
                undirected[v].add(u)

        while stack:
            u = stack.pop()
            if u not in visited:
                visited.add(u)
                stack.extend(undirected[u] - visited)

        return visited

    non_isolated = {v for v in nodes if out_degree.get(v, 0) + in_degree.get(v, 0) > 0}
    start = next(iter(non_isolated))
    if dfs_weak(start) != non_isolated:
        raise ValueError("A gráf nem összefüggő.")

    # euler ut feltetelek check
    start_nodes = []
    end_nodes = []

    for node in nodes:
        diff = out_degree.get(node, 0) - in_degree.get(node, 0)
        if diff == 1:
            start_nodes.append(node)
        elif diff == -1:
            end_nodes.append(node)
        elif diff != 0:
            raise ValueError("Nincs Euler út a gráfban.")

    if len(start_nodes) > 1 or len(end_nodes) > 1:
        raise ValueError("Nincs egyértelmű Euler út.")

    if start_nodes:
        start_node = start_nodes[0]
    else:
        start_node = start

    # euler ut bejaras
    path = []
    stack = [start_node]

    while stack:
        u = stack[-1]
        if u in edges and edges[u]:
            v = edges[u].pop()
            stack.append(v)
        else:
            path.append(stack.pop())

    path.reverse()

    if not path:
        return ""

    # string osszerak
    supstring = path[0]
    for node in path[1:]:
        supstring += node[-1]

    # minden string benne check
    for r in reads:
        if r not in supstring:
            raise AssertionError("Nincs minden string az eredményben.")

    return supstring

# teszteles
bemenet = ["AAT", "ATG", "GCT", "TGC", "CTT"]
k_ertek = 3
eredmeny = sztring1(bemenet, k_ertek)

print(f"Bemenet: {bemenet}")
print(f"Eredmény: {eredmeny}")

# heki