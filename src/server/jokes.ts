export type JokeType = "general" | "knock-knock" | "programming";

export type Joke = {
  id: number;
  type: JokeType;
  setup: string;
  punchline: string;
};
