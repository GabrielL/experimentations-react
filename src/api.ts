import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BACKEND } from "./server/const";
import { Joke } from "./server/jokes";

export const jokesApi = createApi({
  reducerPath: "jokes-api",
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND }),
  tagTypes: ["jokes"],
  endpoints: (builder) => ({
    allJokes: builder.query<Joke[], void>({
      query: () => ({ url: "/jokes" }),
      providesTags: ["jokes"],
    }),
  }),
});

export const { useAllJokesQuery } = jokesApi;
