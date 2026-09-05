# React cheat sheet – useState, useEffect, Props, Context, Redux

## Bevezetés

Ez a cheat sheet összefoglalja a React fejlesztés legfontosabb mintáit TypeScript-tel. Minden egység önállóan is értelmezhető, de a sorrend logikus: az egyszerű lokális állapottól haladunk a globális állapotkezelés felé.

| Témakör | Mire való |
|---|---|
| useState | Lokális állapot egy komponensben |
| useEffect | Mellékhatások kezelése (fetch, timer, feliratkozás) |
| Kontrollált bevitel | Beviteli mező értékének React-ben tartása |
| Props | Adatok és callback-ek átadása szülő → gyermek irányban |
| TypeScript interfész (interface) | Props típusbiztos leírása |
| React Context | Globális állapot prop drilling nélkül |
| Redux Toolkit | Skálázható globális állapot nagy alkalmazásokhoz |

## 1. useState – lokális állapotkezelés

A `useState` hook egy értéket tárol a komponensben, és minden változáskor újrarendereli azt.

### Alap szintaxis

```tsx
const [value, setValue] = useState(initialValue);
```

A változó neve és a setter neve szabad – az egyezmény szerint a setter neve `set` + a változó neve.

### Számláló példa

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Jelenlegi érték: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Visszaállítás</button>
    </div>
  );
}
```

### Boolean állapot (pl. megjelenítés ki/be)

```tsx
function CollapsiblePanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Bezárás' : 'Megnyitás'}
      </button>
      {isOpen && <p>Ez a tartalom csak nyitott állapotban látható.</p>}
    </div>
  );
}
```

### Objektum állapot

Ha több összefüggő értéket szeretnénk egyben tárolni, objektumot is használhatunk.

```tsx
interface User {
  name: string;
  age: number;
}

function UserProfile() {
  const [user, setUser] = useState<User>({
    name: 'Kovács Péter',
    age: 21,
  });

  function handleBirthday() {
    // A spread operátorral minden korábbi mezőt megőrzünk
    setUser({ ...user, age: user.age + 1 });
  }

  return (
    <div>
      <p>{user.name} – {user.age} éves</p>
      <button onClick={handleBirthday}>Születésnap!</button>
    </div>
  );
}
```

> ⚠️ **Figyelem**
> Az állapotot sosem módosítsuk közvetlenül (pl. `user.age = 22`). Mindig a setter függvényt (`setUser`) hívjuk, különben a React nem fog újrarenderelni.

## 2. useEffect – mellékhatások

A `useEffect` hook olyan kódot futtat, amelynek a renderelés után kell végrehajtódnia: adatlekérés, feliratkozás, időzítők, DOM-manipuláció.

### Szintaxis

```tsx
useEffect(() => {
  // itt fut a mellékhatás

  return () => {
    // opcionális cleanup – a komponens lecsatolásakor fut
  };
}, [dependencies]);
```

| Második paraméter | Mikor fut az effect? |
|---|---|
| Nincs megadva | Minden render után |
| `[]` (üres tömb) | Csak az első render után (egyszer) |
| `[a, b]` | Az első render után, majd ha `a` vagy `b` megváltozik |

### Adatlekérés az API-ról

```tsx
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []); // üres tömb → csak egyszer fut le

  if (isLoading) return <p>Betöltés...</p>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.title} – {product.price} USD
        </li>
      ))}
    </ul>
  );
}
```

### Cleanup – takarítás a komponens lecsatolásakor

```tsx
function TimerExample() {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // cleanup: ha a komponens eltűnik, az időzítőt le kell állítani
    return () => clearInterval(intervalId);
  }, []);

  return <p>Eltelt idő: {seconds} másodperc</p>;
}
```

> 💡 **Tipp**
> Ha egy `useEffect`-en belül *async* függvényt szeretnél használni, definiáld azt a `useEffect`-en belül, majd azonnal hívd meg — ne tegyd magát az effect callback-et async-ká.
> 
> ```tsx
> useEffect(() => {
>   async function fetchData() {
>     const res = await fetch('/api/data');
>     const json = await res.json();
>     setData(json);
>   }
>   fetchData();
> }, []);
> ```

## 3. Kontrollált beviteli mezők

Kontrollált beviteli mező esetén a mező értékét React állapotban tároljuk. Az `onChange` esemény minden gombnyomáskor frissíti az állapotot, a `value` prop pedig visszaadja azt a mezőnek.

### Egy mező

```tsx
import { useState } from 'react';

function NameInput() {
  const [name, setName] = useState<string>('');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add meg a neved"
      />
      <p>Üdvözlünk, {name || 'ismeretlen'}!</p>
    </div>
  );
}
```

### Több mező egy objektumban

Nagy formok esetén érdemes az összes mező értékét egyetlen objektumban tárolni, és egy generikus handler-t írni.

```tsx
import { useState, ChangeEvent } from 'react';

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    password: '',
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Beküldött adatok:', formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name"     value={formData.name}     onChange={handleChange} placeholder="Teljes név" />
      <input name="email"    value={formData.email}    onChange={handleChange} placeholder="E-mail cím" type="email" />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Jelszó"     type="password" />
      <button type="submit">Regisztráció</button>
    </form>
  );
}
```

A `[name]: value` szintaxis (dinamikus kulcs) lehetővé teszi, hogy egyetlen handler kezelje az összes beviteli mezőt. Ehhez az `input`-ok `name` attribútumának pontosan egyeznie kell az objektum kulcsával.

> ℹ️ **Infó**
> Az `e.preventDefault()` megakadályozza az alapértelmezett böngészőviselkedést, azaz az oldal újratöltését form beküldésekor.

## 4. Props – adatok átadása komponensek között

A props (tulajdonságok) a szülő komponenstől a gyermek felé irányuló adatáramlás eszközei. Mindig felülről lefelé áramlanak.

### Egyszerű példa

```tsx
// Gyermek komponens
function WelcomeMessage({ name }: { name: string }) {
  return <h2>Szia, {name}!</h2>;
}

// Szülő komponens
function App() {
  return <WelcomeMessage name="Anna" />;
}
```

### Callback függvény átadása

Gyermek komponensek nem módosíthatják a szülő állapotát közvetlenül – helyette a szülő átad egy függvényt propként, amelyet a gyermek meghívhat.

```tsx
interface ActionButtonProps {
  label: string;
  onClick: () => void;
}

function ActionButton({ label, onClick }: ActionButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

function App() {
  function handleClick() {
    alert('Megnyomták a gombot!');
  }

  return <ActionButton label="Kattints ide" onClick={handleClick} />;
}
```

### `children` prop

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

// Használat
<Card title="Fontos információ">
  <p>Ez a tartalom a children prop-on keresztül érkezik.</p>
</Card>
```

## 5. TypeScript interfészek props-hoz

Az `interface` kulcsszóval pontosan meghatározhatjuk, hogy egy komponens milyen prop-okat vár, milyen típussal, és melyek kötelezők.

### Interfész definiálása

```ts
interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;           // opcionális (? jel)
  onAddToCart: (id: number) => void;
}
```

### Interface extends – örököltetés

Ha két interfész között kód-ismétlést szeretnénk elkerülni:

```ts
interface BaseProduct {
  id: number;
  name: string;
  price: number;
}

interface FeaturedProductProps extends BaseProduct {
  discountPercent: number; // csak a kiemeltnél van
}
```

### Teljes komponens interfésszel

```tsx
import { useState } from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (id: number) => void;
}

function ProductCard({ id, name, price, imageUrl, onAddToCart }: ProductCardProps) {
  const [isInCart, setIsInCart] = useState<boolean>(false);

  function handleAddToCart() {
    onAddToCart(id);
    setIsInCart(true);
  }

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt={name} />}
      <h3>{name}</h3>
      <p>{price} Ft</p>
      <button onClick={handleAddToCart} disabled={isInCart}>
        {isInCart ? 'Kosárban van' : 'Kosárba'}
      </button>
    </div>
  );
}
```

> 💡 **Tipp**
> Az interfészt érdemes különálló `types/` mappában tárolni (`types/index.ts`), ha több komponens is használja, így elkerüljük a kód ismétlést.

## 6. React Context – globális állapot prop drilling nélkül

Ha egy állapotot mélyen egymásba ágyazott komponensek is használnak, a prop drilling (prop-ok végigadogatása szintről szintre) átláthatatlan lesz. A Context lehetővé teszi, hogy az állapotot bármelyik leszármazott komponens közvetlenül elérhesse.

### Mikor használj Context-et?

- Témakezelés (dark/light mód)
- Bejelentkezett felhasználó adata
- Nyelvi beállítások
- Kis és közepes méretű alkalmazások globális állapota

### A három lépés

1. **Létrehozás** – `createContext`
2. **Biztosítás** – `Provider` becsomagolja a fa egy részét
3. **Fogyasztás** – `useContext` az értéket elolvassa

### Teljes példa – kosár kontextus

```tsx
// contexts/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(newItem: Omit<CartItem, 'quantity'>) {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Egyéni hook – szebb és biztonságosabb, mint a közvetlen useContext
export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart csak CartProvider-en belül használható!');
  }
  return ctx;
}
```

```tsx
// main.tsx
import { CartProvider } from './contexts/CartContext';

<CartProvider>
  <App />
</CartProvider>
```

```tsx
// Bármely mélységű komponensben
import { useCart } from '../contexts/CartContext';

function ProductPage() {
  const { addToCart } = useCart();

  return (
    <button onClick={() => addToCart({ id: 1, name: 'Cipő', price: 12000 })}>
      Kosárba
    </button>
  );
}

function CartSummary() {
  const { items, clearCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <p>Összesen: {total} Ft</p>
      <button onClick={clearCart}>Kosár ürítése</button>
    </div>
  );
}
```

> ℹ️ **Infó**
> A Context nem cseréli le a props-okat, csak a prop drilling problémáját oldja meg. Ha az állapot egyetlen szinten van és egy-két gyermeknek kell, props elegendő.

## 7. Redux Toolkit – skálázható globális állapotkezelés

A Redux Toolkit (RTK) a Redux modern, ajánlott verziója. Jelentősen kevesebb boilerplate-tel dolgozik, TypeScript-barát, és egységes mintát kínál.

### Mikor érdemes Redux-ot választani Context helyett?

| Context | Redux Toolkit |
|---|---|
| Kis és közepes alkalmazás | Nagy, összetett alkalmazás |
| Ritka frissítések | Sűrű állapotmódosítások |
| Egyszerű logika | Összetett reducer-ek, több szelet |
| Nincs szükség dev tools-ra | Redux DevTools integráció |

### Telepítés

```bash
npm install @reduxjs/toolkit react-redux
```

### Fájlstruktúra

```text
src/
├── store/
│   ├── store.ts          # Konfiguráció és típusok
│   ├── hooks.ts          # Típusos hook-ok
│   └── counterSlice.ts   # Egy szelet (slice) = egy funkció állapota
└── main.tsx              # Provider
```

### 1. lépés – Szelet (slice) létrehozása

A slice tartalmazza az állapot kezdőértékét és az összes reducer-t (módosító függvényt) egy helyen.

```tsx
// store/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;  // Immer miatt közvetlenül módosítható!
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Action creator-ök exportálása – ezeket dispatch-eljük majd
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// A reducer exportálása a store-ba
export default counterSlice.reducer;
```

> ℹ️ **Infó**
> A Redux Toolkit az Immer könyvtárat használja a háttérben, ezért a reducer-eken belül úgy tűnik, mintha közvetlenül módosítanánk az állapotot (`state.value += 1`). Valójában az Immer egy új, megváltoztatlan objektumot hoz létre – nem sértjük meg az immutabilitás elvét.

### 2. lépés – Store konfigurálása

```ts
// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // ide kerülnek a többi szelet reducer-ei is
  },
});

// Típusok a TypeScript-hez – ezeket exportálni kell
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 3. lépés – Típusos hook-ok

A `useSelector` és `useDispatch` alapértelmezés szerint nem ismerik a store típusát. Egyszer kell létrehozni a típusos változataikat:

```ts
// store/hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Ezeket használd useSelector és useDispatch helyett a komponensekben!
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

### 4. lépés – Provider beágyazása

```tsx
// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

### 5. lépés – Használat komponensekben

```tsx
// components/Counter.tsx
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { increment, decrement, incrementByAmount, reset } from '../store/counterSlice';

function Counter() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Számlált érték: {value}</h2>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
      <button onClick={() => dispatch(reset())}>Nullázás</button>
    </div>
  );
}

export default Counter;
```

A `useAppSelector` kiolvassa az értéket a store-ból, a `useAppDispatch` + `dispatch(action())` pedig módosítja azt.

### Több szelet – pl. felhasználó is

```tsx
// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  name: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
```

```tsx
// store/store.ts – bővítve
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

```tsx
// Komponensben
const name = useAppSelector((state) => state.user.name);
const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
```

> 💡 **Tipp**
> A Redux DevTools böngészőbővítménnyel (Chrome/Firefox) valós időben láthatod az állapot minden változását, az action előzményeket, és visszatekerhetsz korábbi állapotokhoz. Fejlesztés közben nélkülözhetetlen eszköz.

## Összefoglalás – mikor mit?

| Igény | Megoldás |
|---|---|
| Egyetlen komponens saját állapota | `useState` |
| API-hívás, timer, eseményfeliratkozás | `useEffect` |
| `<input>` értékének React-ben tartása | Kontrollált mező (`value` + `onChange`) |
| Adat átadása szülőtől gyermeknek | Props |
| Prop-ok típusbiztos leírása | TypeScript `interface` |
| Megosztott állapot kis alkalmazásban | React Context + `useContext` |
| Megosztott állapot nagy alkalmazásban | Redux Toolkit (`createSlice`, `useAppSelector`, `useAppDispatch`) |