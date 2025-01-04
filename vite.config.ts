import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { defineConfig } from "vite";
import pluginImport from "vite-plugin-importer";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@mui/material": "@mui/material/modern",
      "@mui/styled-engine": "@mui/styled-engine/modern",
      "@mui/system": "@mui/system/modern",
      "@mui/base": "@mui/base/modern",
      "@mui/utils": "@mui/utils/modern",
      "@mui/lab": "@mui/lab/modern",
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("src/server")) {
            return "server";
          }
        },
      },
    },
  },
  plugins: [
    react(),
    pluginImport({
      libraryName: "@mui/material",
      libraryDirectory: "",
      camel2DashComponentName: false,
    }),
    pluginImport({
      libraryName: "@mui/icons-material",
      libraryDirectory: "",
      camel2DashComponentName: false,
    }),
  ],
});
