import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/forms.tsx'),
  route('debug', 'routes/debug.tsx'),
  route('debug/components-test', 'routes/debug/components-test.tsx'),
  route('schemas', 'routes/schemas.tsx'),
  route('create-schema', 'routes/create-schema.tsx'),
  route('my-forms', 'routes/my-forms.tsx'),
  route('forms/:id', 'routes/view-form.tsx'),
] satisfies RouteConfig;
