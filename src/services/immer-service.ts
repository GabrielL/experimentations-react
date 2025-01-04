import { produce } from "immer";
import { useEffect, useMemo, useReducer } from "react";

import { ApiJoke, useAllJokesQuery } from "@/api.ts";

import { Joke, JokeServiceType } from "@services/types.ts";

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

function onLoadingFinished(state: JokeState, jokes: ApiJoke[]) {
  return produce(state, (draft) => {
    draft.jokes = jokes.map((joke) => {
      return { ...joke, isDisplayed: false };
    });
    draft.isLoading = false;
  });
}

function onSelect(state: JokeState, jokeId: number | null) {
  return produce(state, (draft) => {
    draft.displayedJokeId = jokeId;
  });
}

function onView(state: JokeState) {
  return produce(state, (draft) => {
    const index = draft.jokes.findIndex(
      (joke) => joke.id === state.displayedJokeId,
    );
    if (index !== -1) draft.jokes[index].isDisplayed = true;
  });
}

function jokeReducer(state: JokeState, action: JokeAction): JokeState {
  switch (action.type) {
    case "view":
      return onView(state);
    case "select":
      return onSelect(state, action.jokeId);
    case "loadingFinished":
      if (!action.jokes) return state;
      return onLoadingFinished(state, action.jokes);
  }
}

const findJoke = (jokes: Joke[], jokeId: number | null) =>
  jokes.find((joke) => joke.id == jokeId);

export const useImmerJokes = (): JokeServiceType => {
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
