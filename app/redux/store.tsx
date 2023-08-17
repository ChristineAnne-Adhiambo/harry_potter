import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./slices";
export const store = configureStore({
  reducer: { characterReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
