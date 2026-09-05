import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import cartReducer  from './state/cartSlice';

export const store = configureStore({
  reducer: { cart: cartReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
