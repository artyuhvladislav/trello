import { configureStore } from "@reduxjs/toolkit";
import columnSlice from './reduxSlice'

export const store = configureStore({
  reducer: {
      column: columnSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch