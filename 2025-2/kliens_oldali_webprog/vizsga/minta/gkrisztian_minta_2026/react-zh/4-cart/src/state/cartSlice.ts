import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

export type ItemCategory = 'food' | 'drink' | 'other';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: number;
  category: ItemCategory;
  selected: boolean;
}

export interface CartState {
  items: CartItem[];
  budget: number;
}

// TODO: implement Redux slice
/*export const cartReducer = (_state: CartState = { items: [], budget: 15000 }, _action: { type: string }) => {
  return { items: [
    { id: '1', name: 'Kenyér', price: 400, weight: 0.5, category: 'food' as ItemCategory, selected: false },
    { id: '2', name: 'Cola', price: 300, weight: 1.5, category: 'drink' as ItemCategory, selected: true },
  ], budget: 15000 };
};*/


const initialState: CartState = {
  items: [
    { id: '1', name: 'Kenyér', price: 400, weight: 0.5, category: 'food', selected: false },
    { id: '2', name: 'Cola', price: 300, weight: 1.5, category: 'drink', selected: true },
  ],
  budget: 15000,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ name: string; price: number; weight: number; category: ItemCategory}>) {
      const currentWeight = state.items.reduce((sum, item) => sum + item.weight, 0);

      if(currentWeight + action.payload.weight > 30) return;

      state.items.push({
          id: (state.items.length + 1).toString(),
          name: action.payload.name,
          price: action.payload.price,
          weight: action.payload.weight,
          selected: false,
          category: action.payload.category
      });
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(x=> x.id != action.payload);
    },
    toggleSelect(state, action: PayloadAction<string>) {
      const item = state.items.find(x => x.id === action.payload);
      if(item) item.selected = !item.selected;
    }

  }
});

export const { addToCart, removeFromCart, toggleSelect } = cartSlice.actions;


export default cartSlice.reducer;
