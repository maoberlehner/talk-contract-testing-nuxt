import type { Hono } from 'hono';

import { type Product, store } from './store';

export async function registerProductRoutes({ app }: { app: Hono }) {
  app.get('/products', async (c) => c.json(await store.getAll()));

  app.post('/products', async (c) => {
    const product = await store.create(
      (await c.req.json()) as Omit<Product, 'id'>,
    );
    return c.json(product, 201);
  });

  app.get('/products/:productName', async (c) => {
    const { productName } = c.req.param() as { productName: string };
    const product = await store.getByName(productName);

    if (!product) {
      c.status(404);
      throw new Error('Product not found');
    }

    return c.json(product);
  });

  app.put('/products/:productName', async (c) => {
    const { productName } = c.req.param() as { productName: string };
    const productOld = await store.getByName(productName);
    if (!productOld) {
      c.status(404);
      throw new Error('Product not found');
    }

    const product = await store.update(
      productOld.id,
      (await c.req.json()) as Omit<Product, 'id'>,
    );

    if (!product) {
      c.status(404);
      throw new Error('Product not found');
    }

    return c.json(product);
  });
}
