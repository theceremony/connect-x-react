import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
import path from "path";

export default defineConfig({
  server: { host: true },
  plugins: [
    react({
      babel: {
        plugins: [
          "babel-plugin-react-compiler", // must run first!
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add more aliases as needed
    },
  },
});
