import { randomUUID } from 'node:crypto';

import { expect, type Page } from '@playwright/test';

import type { Item } from '~/entities/item';

const itemsDefault: Item[] = [
  { id: 'a2eb6544-521c-494f-aec8-b48ccc148ecc', name: 'Milk' },
  { id: 'b2eb6544-521c-494f-aec8-b48ccc148ecc', name: 'Bread' },
];

const hasItems = async (items: Item[] = itemsDefault) => {
  await fetch('http://localhost:9000/_specmatic/expectations', {
    method: 'POST',
    body: JSON.stringify({
      'http-request': {
        method: 'GET',
        path: '/products',
      },
      'http-response': {
        status: 200,
        body: items,
      },
    }),
  });
};

const canAddItem = async (name: Item['name']) => {
  const item = { id: randomUUID(), name };
  await fetch('http://localhost:9000/_specmatic/expectations', {
    method: 'POST',
    body: JSON.stringify({
      'http-request': {
        method: 'POST',
        path: '/products',
      },
      'http-response': {
        status: 200,
        body: item,
      },
    }),
  });
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
      await hasItems([...itemsDefault, item]);

      await page.getByLabel('name').fill(name);
      await page.getByRole('button', { name: 'Add item' }).click();
    },
    async expectItem(name: Item['name']) {
      await expect(page.getByText(name)).toBeVisible();
    },
  };
};
