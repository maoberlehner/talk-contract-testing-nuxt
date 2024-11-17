import { randomUUID } from 'node:crypto';

import { expect, type Page } from '@playwright/test';

import type { Item } from '~/entities/item';

import productsGet200 from './contract/service-product_examples/products_GET_200.json' assert { type: 'json' };
import productsPost200 from './contract/service-product_examples/products_POST_200.json' assert { type: 'json' };

const STUB_URL = 'http://localhost:9000/_specmatic/expectations';

const hasItems = async (items?: Item[]) => {
  const body = items
    ? {
        ...productsGet200,
        'http-response': { ...productsGet200['http-response'], body: items },
      }
    : productsGet200;
  const response = await fetch(STUB_URL, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to set expectations: ${await response.text()}`);
  }
};

const canAddItem = async (name: Item['name']) => {
  const item = { id: randomUUID(), name };
  const body = {
    ...productsPost200,
    'http-request': { ...productsPost200['http-request'], body: { name } },
    'http-response': { ...productsPost200['http-response'], body: item },
  };
  const response = await fetch(STUB_URL, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to set expectations: ${await response.text()}`);
  }

  return item;
};

export const makeShoppingList = async (page: Page) => {
  return {
    async open() {
      await hasItems();
      await page.goto('/');
    },
    async addNewItem(name: Item['name']) {
      const item = await canAddItem(name);
      await hasItems([...productsGet200['http-response'].body, item]);

      await page.getByLabel('name').fill(name);
      await page.getByRole('button', { name: 'Add item' }).click();
    },
    async expectItem(name: Item['name']) {
      await expect(page.getByText(name)).toBeVisible();
    },
  };
};
