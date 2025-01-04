import { useEffect, useMemo, useReducer } from "react";

import { useAllJokesQuery } from "../api.ts";
import { ApiJoke } from "../server/jokes.ts";
import { Joke, JokeServiceType } from "./types.ts";

type JokeAction = {
  type: "select" | "view" | "loadingFinished";
  jokeId: number | null;
  jokes?: ApiJoke[];
};

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

function jokeReducer(state: JokeState, action: JokeAction): JokeState {
  switch (action.type) {
    case "view":
      return {
        ...state,
        jokes: state.jokes.map((joke) => {
          if (joke.id !== action.jokeId) return joke;
          return { ...joke, isDisplayed: true };
        }),
      };
    case "select":
      return {
        ...state,
        displayedJokeId: action.jokeId,
      };
    case "loadingFinished":
      if (!action.jokes) return state;
      return {
        ...state,
        isLoading: false,
        jokes: action.jokes.map((joke) => {
          return { ...joke, isDisplayed: false };
        }),
      };
  }
}

const findJoke = (jokes: Joke[], jokeId: number | null) =>
  jokes.find((joke) => joke.id == jokeId);

export const useNativeJokes = (): JokeServiceType => {
  const [state, dispatch] = useReducer(jokeReducer, initialState);

  const displayedJoke = useMemo(() => {
    const joke = findJoke(state.jokes, state.displayedJokeId);
    if (!joke) return null;
    return joke;
  }, [state]);

  const { data, isLoading } = useAllJokesQuery();

  useEffect(() => {
    if (isLoading) return;
    dispatch({ type: "loadingFinished", jokes: data, jokeId: null });
  }, [isLoading, data]);

  return {
    isLoading: state.isLoading,
    displayedJoke: displayedJoke,
    jokes: state.jokes,
    selectJoke: (jokeId) => {
      dispatch({ type: "select", jokeId: jokeId });
    },
    viewJoke: () => {
      dispatch({ type: "view", jokeId: state.displayedJokeId });
    },
  };
};
