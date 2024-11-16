import { Hono } from 'hono';

import { registerProductRoutes } from './routes';

export const makeApp = () => {
  const app = new Hono();

  registerProductRoutes({ app });

  return app;
};
