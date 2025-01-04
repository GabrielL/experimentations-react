import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App.tsx";
import { enableMocking } from "./server/mock.ts";
import { store } from "./store.ts";
import { theme } from "./theme.ts";

enableMocking().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </StrictMode>,
  ),
);
