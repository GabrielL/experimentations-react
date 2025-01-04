import { useMemo, useState } from "react";

import ComputerIcon from "@mui/icons-material/Computer";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useAllJokesQuery } from "../api.ts";
import { Joke } from "../server/jokes.ts";

type AllJokesProps = {
  jokes: Joke[];
  isLoading?: boolean;
  onSelect?: (jokeId: number | null) => void;
};

const AllJokes = ({
  jokes,
  isLoading = false,
  onSelect = () => {},
}: AllJokesProps) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "Id" },
    { field: "type", headerName: "Type" },
    { field: "setup", headerName: "Setup", flex: 1 },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "60%" }}>
      <DataGrid
        checkboxSelection
        disableMultipleRowSelection
        onRowSelectionModelChange={(row) => {
          if (row.length == 0) {
            onSelect(null);
            return;
          }
          const id = parseInt(row[0].toString(), 10);
          onSelect(id);
        }}
        columns={columns}
        rows={jokes}
        loading={isLoading}
        pageSizeOptions={[5, 10]}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
      />
    </Box>
  );
};

const findJoke = (jokes: Joke[], jokeId: number | null) =>
  jokes.find((joke) => joke.id == jokeId);

type JokeIconProps = {
  joke: Joke;
};

const JokeIcon = ({ joke }: JokeIconProps) => {
  switch (joke.type) {
    case "general":
      return <PsychologyAltIcon />;
    case "knock-knock":
      return <MeetingRoomIcon />;
    case "programming":
      return <ComputerIcon />;
  }
};

type JokeContentProps = {
  joke: Joke | undefined;
};

const JokeContent = ({ joke }: JokeContentProps) => {
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
