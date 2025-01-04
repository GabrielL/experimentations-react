import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { jokesApi } from "./api";

export const store = configureStore({
  reducer: {
    [jokesApi.reducerPath]: jokesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jokesApi.middleware),
});

setupListeners(store.dispatch);
