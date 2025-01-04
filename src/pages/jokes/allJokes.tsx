import DraftsIcon from "@mui/icons-material/Drafts";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Joke } from "@services/types.ts";

const ReadIcon = ({ viewed = false }) => {
  const theme = useTheme();
  if (viewed) return <DraftsIcon htmlColor={theme.palette.success.main} />;
  else return <MarkunreadIcon />;
};

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
    {
      field: "isDisplayed",
      headerName: "Read",
      renderCell: (params) => <ReadIcon viewed={params.value} />,
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "60%" }}>
      <DataGrid
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
