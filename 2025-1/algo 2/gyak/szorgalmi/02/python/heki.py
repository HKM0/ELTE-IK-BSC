class Node:
    def __init__(self, value):
        self.value = value
        self.first_child = None
        self.next_sibling = None

def parse_tree(s):
    stack = []
    i = 0
    root = None
    prev_node = None

    while i < len(s):
        if s[i].isalnum():
            node = Node(s[i])
            if not root:
                root = node
            if stack:
                parent = stack[-1]
                if not parent.first_child:
                    parent.first_child = node
                else:
                    sib = parent.first_child
                    while sib.next_sibling:
                        sib = sib.next_sibling 
                    sib.next_sibling = node
            prev_node = node
            i += 1
        elif s[i] == '(':
            if prev_node:
                stack.append(prev_node)
            i += 1
        elif s[i] == ')':
            if stack:
                stack.pop()
            i += 1
        else:
            i += 1
    return root


class GeneralTree:
    def __init__(self, root):
        self.root = root

    def preorder(self, node=None, result=None):
        if result is None:
            result = []
        if node is None:
            node = self.root
        result.append(node.value)
        child = node.first_child
        while child:
            self.preorder(child, result)
            child = child.next_sibling
        return result

    def postorder(self, node=None, result=None):
        if result is None:
            result = []
        if node is None:
            node = self.root
        child = node.first_child
        while child:
            self.postorder(child, result)
            child = child.next_sibling
        result.append(node.value)
        return result

if __name__ == "__main__":
    example1 = "(1(2(5))(3)(4(6)(7)))"
    example_root = parse_tree(example1)
    example_tree = GeneralTree(example_root)
    print(f"Preorder bejárás: {example_tree.preorder()}\nPostorder bejárás: {example_tree.postorder()}\n\n")

    s = input("Add meg a fát zárójelezett formában (pl. '(1(2(5))(3)(4(6)(7)))' ):\nV:\t")
    try:
        root = parse_tree(s)
        tree = GeneralTree(root)
        print(f"Preorder bejárás: {tree.preorder()}")
        print(f"Postorder bejárás: {tree.postorder()}")
    except:
        print("hibás bemenet!")