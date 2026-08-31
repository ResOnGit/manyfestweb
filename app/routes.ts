import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("read/:volId", "routes/read.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
