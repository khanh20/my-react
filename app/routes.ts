import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("create-product", "routes/create-product.tsx"),
  route("detail-product/:id", "routes/detail-product.tsx"),
] satisfies RouteConfig;
