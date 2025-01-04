import { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Container component={Paper}>
        <Typography variant="h1">Vite + React</Typography>
        <Card>
          <CardContent>
            <Button
              variant="outlined"
              onClick={() => setCount((count) => count + 1)}
            >
              count is {count}
            </Button>
            <Typography>
              Edit <code>src/App.tsx</code> and save to test HMR
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default App;
