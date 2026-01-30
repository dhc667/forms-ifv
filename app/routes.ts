import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("debug", "routes/debug.tsx"),
  route("debug/components-test", "routes/debug/components-test.tsx"),
  route("forms", "routes/forms.tsx"),
  route("schemas", "routes/schemas.tsx"),
  route("create-schema", "routes/create-schema.tsx"),
  route("my-forms", "routes/my-forms.tsx"),
] satisfies RouteConfig;
