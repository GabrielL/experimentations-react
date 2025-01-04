import { useState } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

import { Joke } from "../../server/jokes.ts";
import { JokeIcon } from "./jokeIcon.tsx";

type JokeContentProps = {
  joke: Joke | undefined;
};

export const JokeContent = ({ joke }: JokeContentProps) => {
  const [displayJoke, setDisplayJoke] = useState(false);
  if (!joke) return <>No Joke displayed</>;
  return (
    <>
      <Card>
        <CardActionArea
          onClick={() => {
            setDisplayJoke((prev) => !prev);
          }}
        >
          <CardHeader avatar={<JokeIcon joke={joke} />} title={joke.setup} />
          <CardContent sx={{ textAlign: "center" }}>
            {displayJoke ? (
              <Typography>{joke.punchline}</Typography>
            ) : (
              <Box sx={{ display: "flex", margin: "auto", width: "20%" }}>
                <HelpOutlineIcon fontSize="large" />
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
