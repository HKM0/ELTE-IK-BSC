# Fontos tudnivalók

**Az 1., 2., és 4. feladatok változnak kitöltésenként!**

## 1. Traversal sorrendek  
- `process()` **1. helyen** → **preorder**  
- `process()` **2. helyen** → **inorder**  
- `process()` **3. helyen** → **postorder**  

## 2. Kezdőelem kiválasztása  
Figyelj arra, hogy **az első kiírt elem az legyen, amelynek a `left` pointere `NIL`**.  
Ez minden kisebb részfára is érvényes!  

## 4. Csúcsok vizsgálata  
- **Belső csúcs tesztelése:** `left != 0 VAGY right != 0`  
- **Levél tesztelése:** `left == 0 ÉS right == 0`  