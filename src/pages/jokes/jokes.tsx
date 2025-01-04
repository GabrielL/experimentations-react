import { Box, Container, Stack, Typography } from "@mui/material";

import { useImmerJokes } from "../../services/immer-service.ts";
import { AllJokes } from "./allJokes.tsx";
import { JokeContent } from "./jokeContent.tsx";

export const Jokes = () => {
  const jokes = useImmerJokes();

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
            jokes={jokes.jokes}
            isLoading={jokes.isLoading}
            onSelect={jokes.selectJoke}
          />
          <Box sx={{ width: "50%" }}>
            <JokeContent
              joke={jokes.displayedJoke}
              onDisplay={jokes.viewJoke}
            />
          </Box>
        </Stack>
      </Container>
    </>
  );
};
