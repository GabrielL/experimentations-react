import ComputerIcon from "@mui/icons-material/Computer";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";

import { Joke } from "../../server/jokes.ts";

type JokeIconProps = {
  joke: Joke;
};

export const JokeIcon = ({ joke }: JokeIconProps) => {
  switch (joke.type) {
    case "general":
      return <PsychologyAltIcon />;
    case "knock-knock":
      return <MeetingRoomIcon />;
    case "programming":
      return <ComputerIcon />;
  }
};
