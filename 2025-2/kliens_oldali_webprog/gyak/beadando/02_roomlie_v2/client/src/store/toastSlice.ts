import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface ToastState {
    message: string | null;
    type: 'success' | 'error' | 'info' | null;
}

const initialState: ToastState = { message: null, type: null };

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast(state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hideToast(state) {
            state.message = null;
            state.type = null;
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;
export const selectToast = (state: RootState) => state.toast;
export default toastSlice.reducer;