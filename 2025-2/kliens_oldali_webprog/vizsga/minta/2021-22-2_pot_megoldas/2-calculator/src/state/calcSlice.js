import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentValue: 0,
  currentExpression: null,
  editorMode: false,
  history: [],
};

const calcSlice = createSlice({
  name: "calc",
  initialState,
  reducers: {
    numberInput: (state, { payload: number }) => {
      if (state.editorMode) {
        state.currentValue += number.toString();
        state.currentExpression += number.toString();
      } else {
        state.currentValue = number.toString();
        if (state.currentExpression === null) {
          state.currentExpression = number.toString();
        } else {
          state.currentExpression += " " + number.toString();
        }
        state.editorMode = true;
      }
    },
    operandInput: (state, { payload: op }) => {
      if (state.editorMode) {
        state.currentValue = 0;
        state.currentExpression += " " + op;
        state.editorMode = false;
      }
    },
    resultInput: (state) => {
      state.currentValue = eval(state.currentExpression);
      state.history.push(state.currentExpression);
      state.editorMode = false;
      state.currentExpression = null;
    },
  },
});

export const calcReducer = calcSlice.reducer;
export const { numberInput, operandInput, resultInput } = calcSlice.actions;

export const selectCurrentValue = (state) => state.currentValue;

export const selectCurrentExpression = (state) => state.currentExpression;

export const selectHistory = (state) => state.history;
