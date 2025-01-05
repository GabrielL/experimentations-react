import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

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

export const apiLoad = createAsyncThunk(
  "jokes/initialLoading",
  async (_, thunkAPI) => {
    const { data } = await thunkAPI.dispatch(
      jokesApi.endpoints.allJokes.initiate(),
    );
    return data ? data : [];
  },
);

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
    builder.addCase(apiLoad.fulfilled, (state, action) => {
      state.jokes = action.payload.map((joke) => {
        return { ...joke, isDisplayed: false };
      });
      state.isLoading = false;
    });
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
    return joke ? joke : null;
  },
);

export const selectAllJokes = createSelector(jokesState, allJokes);

export const { viewJoke, selectJoke } = jokeSlice.actions;
export const jokeReducer = jokeSlice.reducer;
