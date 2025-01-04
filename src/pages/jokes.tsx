import { Card, CardContent, CardHeader } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useAllJokesQuery } from "../api.ts";
import { Joke } from "../server/jokes.ts";

type AllJokesProps = {
  jokes: Joke[];
  isLoading?: boolean;
};

const AllJokes = ({ jokes, isLoading = false }: AllJokesProps) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "Id" },
    { field: "type", headerName: "Type" },
    { field: "setup", headerName: "Setup" },
  ];
  return (
    <DataGrid
      columns={columns}
      rows={jokes}
      loading={isLoading}
      pageSizeOptions={[5, 10]}
      initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
    />
  );
};

export const Jokes = () => {
  const { data: jokes, isLoading } = useAllJokesQuery();

  return (
    <Card>
      <CardHeader title="jokes" />
      <CardContent>
        <AllJokes jokes={jokes ? jokes : []} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};
