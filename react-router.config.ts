import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  basename: "/manyfestweb/",
  // Tiny static comic site — load all routes with the first HTML file
  // so Caddy does not need to serve a /__manifest endpoint.
  routeDiscovery: { mode: "initial" },
} satisfies Config;
