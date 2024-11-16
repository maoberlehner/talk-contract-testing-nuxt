import { serve } from '@hono/node-server';

import { makeApp } from './server';

async function start() {
  const app = makeApp();
  serve({ fetch: app.fetch, port: 3333 }, (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
  });
}

start();
