import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ApiJoke } from "../server/jokes.ts";
import { Joke } from "./types.ts";

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

export const jokeSlice = createSlice({
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
    loadingFinished: (state, action: PayloadAction<ApiJoke[]>) => {
      state.jokes = action.payload.map((joke) => {
        return { ...joke, isDisplayed: false };
      });
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { viewJoke, selectJoke, loadingFinished } = jokeSlice.actions;
export const jokeReducer = jokeSlice.reducer;
