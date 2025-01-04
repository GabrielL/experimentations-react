import { useEffect, useMemo, useState } from "react";

import { useAllJokesQuery } from "../api.ts";
import { Joke, JokeServiceType } from "./types.ts";

const findJoke = (jokes: Joke[], jokeId: number | null) =>
  jokes.find((joke) => joke.id == jokeId);

export const useStateJokes = (): JokeServiceType => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [displayedJokeId, setDisplayedJokeId] = useState<number | null>(null);

  const { data, isLoading } = useAllJokesQuery();

  useEffect(() => {
    if (isLoading) return;
    if (data) setJokes(data.map((joke) => ({ ...joke, isDisplayed: false })));
  }, [data, isLoading]);

  const displayedJoke = useMemo(() => {
    const joke = findJoke(jokes, displayedJokeId);
    if (!joke) return null;
    return joke;
  }, [jokes, displayedJokeId]);

  const viewJoke = (jokeId: number) => {
    setJokes((prev) =>
      prev.map((joke) => {
        if (joke.id !== jokeId) return joke;
        return { ...joke, isDisplayed: true };
      }),
    );
  };

  return {
    isLoading: isLoading,
    jokes: jokes,
    selectJoke: (jokeId: number | null) => setDisplayedJokeId(jokeId),
    displayedJoke: displayedJoke,
    viewJoke: () => (displayedJokeId ? viewJoke(displayedJokeId) : null),
  };
};
