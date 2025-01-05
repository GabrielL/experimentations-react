import { useEffect, useMemo, useReducer } from "react";

import { ApiJoke, useAllJokesQuery } from "@/api.ts";

import { Joke, JokeServiceType } from "@services/types.ts";

type Action<Name, T> = { type: Name; payload: T };
type VoidAction<Name> = { type: Name };

type JokeAction =
  | Action<"select", { jokeId: number | null }>
  | VoidAction<"view">
  | Action<"loadingFinished", { jokes: ApiJoke[] }>;

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
          if (joke.id !== state.displayedJokeId) return joke;
          return { ...joke, isDisplayed: true };
        }),
      };
    case "select":
      return {
        ...state,
        displayedJokeId: action.payload.jokeId,
      };
    case "loadingFinished":
      if (!action.payload.jokes) return state;
      return {
        ...state,
        isLoading: false,
        jokes: action.payload.jokes.map((joke) => {
          return { ...joke, isDisplayed: false };
        }),
      };
  }
}

export const useNativeJokes = (): JokeServiceType => {
  const [state, dispatch] = useReducer(jokeReducer, initialState);

  const displayedJoke = useMemo(() => {
    const joke = state.jokes.find((joke) => joke.id == state.displayedJokeId);
    return joke ? joke : null;
  }, [state]);

  const { data, isLoading } = useAllJokesQuery();

  useEffect(() => {
    if (isLoading) return;
    if (data) dispatch({ type: "loadingFinished", payload: { jokes: data } });
  }, [isLoading, data]);

  return {
    isLoading: state.isLoading,
    displayedJoke: displayedJoke,
    jokes: state.jokes,
    selectJoke: (jokeId) => {
      dispatch({ type: "select", payload: { jokeId: jokeId } });
    },
    viewJoke: () => {
      dispatch({ type: "view" });
    },
  };
};
