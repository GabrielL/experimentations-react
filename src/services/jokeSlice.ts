import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { jokesApi } from "../api.ts";
import { RootState } from "../store.ts";
import { Joke } from "./types.ts";

export type JokeState = {
  isLoading: boolean;
  jokes: Joke[];
  displayedJokeId: number | null;
};

const initialState: JokeState = {
  isLoading: true,
  jokes: [],
  displayedJokeId: null,
};

export const apiLoad = createAsyncThunk(
  "jokes/initialLoading",
  async (_, thunkAPI) => {
    const { data } = await thunkAPI.dispatch(
      jokesApi.endpoints.allJokes.initiate(),
    );
    return data ? data : [];
  },
);

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
  },
  extraReducers: (builder) => {
    builder.addCase(apiLoad.fulfilled, (state, action) => {
      state.jokes = action.payload.map((joke) => {
        return { ...joke, isDisplayed: false };
      });
      state.isLoading = false;
    });
  },
});

export const selectJokesLoading = (state: RootState) => state.jokes.isLoading;

export const selectDisplayedJoke = (state: RootState) => {
  const joke = state.jokes.jokes.find(
    (joke) => joke.id == state.jokes.displayedJokeId,
  );
  if (!joke) return null;
  return joke;
};

export const selectAllJokes = (state: RootState) => state.jokes.jokes;

// Action creators are generated for each case reducer function
export const { viewJoke, selectJoke } = jokeSlice.actions;
export const jokeReducer = jokeSlice.reducer;
