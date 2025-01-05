import { produce } from "immer";
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
      return onSelect(state, action.payload.jokeId);
    case "loadingFinished":
      return onLoadingFinished(state, action.payload.jokes);
  }
}

export const useImmerJokes = (): JokeServiceType => {
  const [state, dispatch] = useReducer(jokeReducer, initialState);

  const displayedJoke = useMemo(() => {
    const joke = state.jokes.find((joke) => joke.id == state.displayedJokeId);
    return joke || null;
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
    selectJoke(jokeId) {
      dispatch({ type: "select", payload: { jokeId: jokeId } });
    },
    viewJoke() {
      dispatch({ type: "view" });
    },
  };
};
