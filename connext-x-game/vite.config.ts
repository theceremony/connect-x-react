import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// https://vite.dev/config/
import path from "path";

export default defineConfig({
  server: {
    host: true,
    // proxy: {
    //   "/socket.io": {
    //     target: "//localhost:443/socket.io",
    //     rewriteWsOrigin: true,
    //     ws: true,
    //   },
    // },
  },
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
