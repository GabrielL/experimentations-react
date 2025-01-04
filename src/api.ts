import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BACKEND } from "@/server/const.ts";
import { ApiJoke } from "@/server/jokes.ts";

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
