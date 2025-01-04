import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App.tsx";
import { enableMocking } from "./server/mock.ts";
import { theme } from "./theme.ts";

enableMocking().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>,
  ),
);
