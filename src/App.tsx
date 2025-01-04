import { Container, Paper, Typography } from "@mui/material";

import { Jokes } from "@/pages/jokes/jokes.tsx";

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
