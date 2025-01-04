import { useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { jokesApi } from "./api";
import { jokeReducer } from "./services/jokeSlice.ts";

export const store = configureStore({
  reducer: {
    jokes: jokeReducer,
    [jokesApi.reducerPath]: jokesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jokesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const appDispatch = useDispatch.withTypes<AppDispatch>();
export const appSelector = useSelector.withTypes<RootState>();
