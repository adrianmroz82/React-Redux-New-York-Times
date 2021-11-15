import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../features/articles/articlesSlice";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
