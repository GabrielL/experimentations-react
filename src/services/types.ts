import { ApiJoke } from "@/api";

export type Joke = ApiJoke & { isDisplayed: boolean };

export interface JokeServiceType {
  isLoading: boolean;
  jokes: Joke[];
  selectJoke: (jokeId: number | null) => void;
  viewJoke: () => void;
  displayedJoke: Joke | null;
}
