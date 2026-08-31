import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "vite";
import { defineConfig } from "vite";

function redirectBareBasename(): Plugin {
  return {
    name: "redirect-bare-manyfestweb",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/" || req.url === "/manyfestweb") {
          res.statusCode = 302;
          res.setHeader("Location", "/manyfestweb/");
          res.end();
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base: "/manyfestweb/",
  plugins: [tailwindcss(), redirectBareBasename(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    open: "/manyfestweb/",
  },
});
