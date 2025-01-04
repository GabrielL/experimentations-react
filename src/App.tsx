import { Container, Paper, Typography } from "@mui/material";

import { Jokes } from "./pages/jokes";

function App() {
  return (
    <>
      <Container component={Paper}>
        <Typography variant="h1">Sample</Typography>
        <Jokes />
      </Container>
    </>
  );
}

export default App;
