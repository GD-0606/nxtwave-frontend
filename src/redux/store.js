import { configureStore } from "@reduxjs/toolkit";
import listsReducer from "./features/listsSlice";
export const store = configureStore({
  reducer: {
    lists: listsReducer,
  },
});
