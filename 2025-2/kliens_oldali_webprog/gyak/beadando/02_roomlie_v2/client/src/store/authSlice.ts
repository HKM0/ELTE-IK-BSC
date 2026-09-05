import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { User } from '../types';

interface AuthState {
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('roomlie_token'),
    user: localStorage.getItem('roomlie_user')
        ? JSON.parse(localStorage.getItem('roomlie_user')!)
        : null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<{ token: string; user: User }>) {
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem('roomlie_token', action.payload.token);
            localStorage.setItem('roomlie_user', JSON.stringify(action.payload.user));
        },
        logout(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem('roomlie_token');
            localStorage.removeItem('roomlie_user');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;