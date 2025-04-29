import { useAllJokesQuery } from "@/api.ts";
import { appDispatch, appSelector } from "@/store.ts";

import {
  selectAllJokes,
  selectDisplayedJoke,
  selectJoke,
  selectJokesLoading,
  viewJoke,
} from "@services/jokeSlice.ts";
import { JokeServiceType } from "@services/types.ts";

export const useJokes = (): JokeServiceType => {
  const dispatch = appDispatch();

  // trigger load
  useAllJokesQuery();

  return {
    isLoading: appSelector(selectJokesLoading),
    displayedJoke: appSelector(selectDisplayedJoke),
    jokes: appSelector(selectAllJokes),
    selectJoke(jokeId) {
      dispatch(selectJoke(jokeId));
    },
    viewJoke() {
      dispatch(viewJoke());
    },
  };
};
