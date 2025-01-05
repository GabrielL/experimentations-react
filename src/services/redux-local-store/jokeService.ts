import { useEffect, useReducer } from "react";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ApiJoke, useAllJokesQuery } from "@/api.ts";

import { Joke, JokeServiceType } from "@services/types.ts";

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
    loadingFinished: (state, action: PayloadAction<ApiJoke[]>) => {
      state.isLoading = false;
      state.jokes = action.payload.map((joke) => {
        return { ...joke, isDisplayed: false };
      });
    },
  },
});

const { viewJoke, selectJoke, loadingFinished } = jokeSlice.actions;

const allJokes = (state: JokeState) => state.jokes;

const displayedJoke = (state: JokeState) => {
  const joke = state.jokes.find((joke) => joke.id == state.displayedJokeId);
  return joke ? joke : null;
};

export const useContextReduxJokes = (): JokeServiceType => {
  const [state, dispatch] = useReducer(
    jokeSlice.reducer,
    jokeSlice.getInitialState(),
  );

  const { data, isLoading } = useAllJokesQuery();

  useEffect(() => {
    if (isLoading) return;
    if (data) dispatch(loadingFinished(data));
  }, [isLoading, data]);

  return {
    jokes: allJokes(state),
    isLoading: state.isLoading,
    displayedJoke: displayedJoke(state),
    viewJoke() {
      dispatch(viewJoke());
    },
    selectJoke(jokeId: number | null) {
      dispatch(selectJoke(jokeId));
    },
  };
};
