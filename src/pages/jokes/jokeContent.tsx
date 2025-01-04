import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

import { Joke } from "../../services/types.ts";
import { JokeIcon } from "./jokeIcon.tsx";

type JokeContentProps = {
  joke: Joke | null;
  onDisplay: () => void;
};

export const JokeContent = ({ joke, onDisplay }: JokeContentProps) => {
  if (!joke) return <>No Joke displayed</>;
  return (
    <>
      <Card>
        <CardActionArea onClick={onDisplay}>
          <CardHeader avatar={<JokeIcon joke={joke} />} title={joke.setup} />
          <CardContent sx={{ textAlign: "center" }}>
            {joke.isDisplayed ? (
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
