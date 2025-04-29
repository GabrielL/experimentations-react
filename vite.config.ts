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
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks(id) {
          // if (id.includes("node_modules")) {
          //   return "vendor";
          // }
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
