import { randomUUID } from 'node:crypto';

import type { components } from './specification';

export type Product = components['schemas']['Product'];

const products = new Map<string, Product>();

export const store = {
  getAll: async (): Promise<Product[]> => {
    console.log('Get all products');
    return Array.from(products.values());
  },
  getByName: async (name: string): Promise<Product | null> => {
    console.log('Get product:', name);
    return products.get(name) || null;
  },
  create: async (data: Omit<Product, 'id'>): Promise<Product> => {
    const id = randomUUID();
    const product = { id, ...data };
    products.set(product.name, product);
    console.log('Create product:', product);
    return product;
  },
  update: async (
    id: string,
    data: Omit<Product, 'id'>,
  ): Promise<Product | null> => {
    const product = { id, ...data };
    products.set(product.name, product);
    console.log('Update product:', product);
    return product;
  },
};
