import { useEffect } from "react";

import { appDispatch, appSelector } from "../store.ts";
import {
  apiLoad,
  selectAllJokes,
  selectDisplayedJoke,
  selectJoke,
  selectJokesLoading,
  viewJoke,
} from "./jokeSlice.ts";
import { JokeServiceType } from "./types.ts";

export const useJokes = (): JokeServiceType => {
  const dispatch = appDispatch();

  const isLoading = appSelector(selectJokesLoading);

  useEffect(() => {
    dispatch(apiLoad());
  }, [dispatch, isLoading]);

  return {
    isLoading: isLoading,
    displayedJoke: appSelector(selectDisplayedJoke),
    jokes: appSelector(selectAllJokes),
    selectJoke: (jokeId) => {
      dispatch(selectJoke(jokeId));
    },
    viewJoke: () => {
      dispatch(viewJoke());
    },
  };
};
