import { useMemo, useState } from "react";

import {
  Box,
  Card,
  CardContent,
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

type JokeContentProps = {
  joke: Joke | undefined;
};

const JokeContent = ({ joke }: JokeContentProps) => {
  if (!joke) return <>No Joke displayed</>;
  return <>{JSON.stringify(joke)}</>;
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
          <Card sx={{ width: "50%" }}>
            <CardContent>
              <JokeContent joke={joke} />
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </>
  );
};
