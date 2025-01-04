import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Joke } from "../../server/jokes.ts";

type AllJokesProps = {
  jokes: Joke[];
  isLoading?: boolean;
  onSelect?: (jokeId: number | null) => void;
};

export const AllJokes = ({
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
