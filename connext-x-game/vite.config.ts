import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
// https://vite.dev/config/
import path from "path";

export default defineConfig({
  server: { host: true, https: true },
  plugins: [
    mkcert(),
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
