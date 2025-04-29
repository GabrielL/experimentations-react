import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

import { jokesApi } from "@/api.ts";
import { RootState } from "@/store.ts";

import { Joke } from "@services/types.ts";

type JokeState = {
  isLoading: boolean;
  jokes: Joke[];
  displayedJokeId: number | null;
};

const initialState: JokeState = {
  isLoading: true,
  jokes: [],
  displayedJokeId: null,
};

const jokeSlice = createSlice({
  name: "jokes",
  initialState: initialState,
  reducers: {
    viewJoke: (state) => {
      const index = state.jokes.findIndex(
        (joke) => joke.id === state.displayedJokeId,
      );
      if (index !== -1) state.jokes[index].isDisplayed = true;
    },
    selectJoke: (state, action: PayloadAction<number | null>) => {
      state.displayedJokeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      jokesApi.endpoints.allJokes.matchFulfilled,
      (state, action) => {
        state.jokes = action.payload.map((joke) => {
          return { ...joke, isDisplayed: false };
        });
        state.isLoading = false;
      },
    );
  },
});

const jokesState = (state: RootState) => state.jokes;
const allJokes = (state: JokeState) => state.jokes;

export const selectJokesLoading = createSelector(
  jokesState,
  (state: JokeState) => state.isLoading,
);

export const selectDisplayedJoke = createSelector(
  jokesState,
  (state: JokeState) => {
    const joke = state.jokes.find((joke) => joke.id == state.displayedJokeId);
    return joke || null;
  },
);

export const selectAllJokes = createSelector(jokesState, allJokes);

export const { viewJoke, selectJoke } = jokeSlice.actions;
export const jokeReducer = jokeSlice.reducer;
