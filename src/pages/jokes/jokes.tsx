import { useMemo, useState } from "react";

import { Box, Container, Stack, Typography } from "@mui/material";

import { useAllJokesQuery } from "../../api.ts";
import { Joke } from "../../server/jokes.ts";
import { AllJokes } from "./allJokes.tsx";
import { JokeContent } from "./jokeContent.tsx";

const findJoke = (jokes: Joke[], jokeId: number | null) =>
  jokes.find((joke) => joke.id == jokeId);

export const Jokes = () => {
  const { data: jokes, isLoading } = useAllJokesQuery();
  const [jokeId, setJokeId] = useState<number | null>(null);

  const onSelect = (jokeId: number | null) => {
    console.log("selected", jokeId);
    setJokeId(jokeId);
  };

  const joke = useMemo(
    () => findJoke(jokes ? jokes : [], jokeId),
    [jokes, jokeId],
  );

  return (
    <>
      <Container>
        <Typography variant="h2">Jokes</Typography>
        <Stack
          title="Jokes"
          direction="row"
          spacing={1}
          alignContent="space-between"
        >
          <AllJokes
            jokes={jokes ? jokes : []}
            isLoading={isLoading}
            onSelect={onSelect}
          />
          <Box sx={{ width: "50%" }}>
            <JokeContent joke={joke} />
          </Box>
        </Stack>
      </Container>
    </>
  );
};
