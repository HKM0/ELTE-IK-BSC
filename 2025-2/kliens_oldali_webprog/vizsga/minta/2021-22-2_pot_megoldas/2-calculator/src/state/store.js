import { configureStore } from "@reduxjs/toolkit";

import { calcReducer } from "./calcSlice";

export const store = configureStore({
  reducer: calcReducer,
});
