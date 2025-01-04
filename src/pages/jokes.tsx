import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  List,
  ListItem,
} from "@mui/material";

import { useAllJokesQuery } from "../api.ts";
import { Joke } from "../server/jokes.ts";

const AllJokes = ({ jokes }: { jokes: Joke[] }) => {
  return (
    <List>
      {jokes.map((joke) => (
        <ListItem>{joke.id}</ListItem>
      ))}
    </List>
  );
};

export const Jokes = () => {
  const { data: jokes, isLoading } = useAllJokesQuery();

  return (
    <Card>
      <CardHeader title="jokes" />
      <CardContent>
        {isLoading && <CircularProgress />}
        {jokes && (
          <>
            There is {jokes.length} jokes
            <AllJokes jokes={jokes} />
          </>
        )}
      </CardContent>
    </Card>
  );
};
