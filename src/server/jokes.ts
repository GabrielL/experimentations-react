export type JokeType = "general" | "knock-knock" | "programming";

export type ApiJoke = {
  id: number;
  type: JokeType;
  setup: string;
  punchline: string;
};
