import { useEffect } from "react";

import { useAllJokesQuery } from "../api.ts";
import { appDispatch, appSelector } from "../store.ts";
import { loadingFinished, selectJoke, viewJoke } from "./jokeSlice.ts";
import { JokeServiceType } from "./types.ts";

export const useJokes = (): JokeServiceType => {
  const dispatch = appDispatch();

  const { data, isLoading } = useAllJokesQuery();

  useEffect(() => {
    if (isLoading) return;
    if (data) dispatch(loadingFinished(data));
  }, [isLoading, data]);

  return {
    isLoading: appSelector((state) => state.jokes.isLoading),
    displayedJoke: appSelector((state) => {
      const joke = state.jokes.jokes.find(
        (joke) => joke.id == state.jokes.displayedJokeId,
      );
      if (!joke) return null;
      return joke;
    }),
    jokes: appSelector((state) => state.jokes.jokes),
    selectJoke: (jokeId) => {
      dispatch(selectJoke(jokeId));
    },
    viewJoke: () => {
      dispatch(viewJoke());
    },
  };
};
