import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BACKEND } from "@/server/const.ts";
import { ApiJoke as ServerJoke } from "@/server/jokes.ts";

export type ApiJoke = ServerJoke;

export const jokesApi = createApi({
  reducerPath: "jokes-api",
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND }),
  tagTypes: ["jokes"],
  endpoints: (builder) => ({
    allJokes: builder.query<ApiJoke[], void>({
      query: () => ({ url: "/goodJokes" }),
      providesTags: ["jokes"],
    }),
  }),
});

export const { useAllJokesQuery } = jokesApi;
