import { test as it, expect } from '@playwright/test';

it('should be possible to add a new item', async ({ page }) => {
  await Promise.all([
    fetch('http://localhost:9000/_specmatic/expectations', {
      method: 'POST',
      body: JSON.stringify({
        'http-request': {
          method: 'GET',
          path: '/products',
        },
        'http-response': {
          status: 200,
          body: [
            { id: 'a2eb6544-521c-494f-aec8-b48ccc148ecc', name: 'Milk' },
            { id: 'b2eb6544-521c-494f-aec8-b48ccc148ecc', name: 'Bread' },
          ],
        },
      }),
    }),
    fetch('http://localhost:9000/_specmatic/expectations', {
      method: 'POST',
      body: JSON.stringify({
        'http-request': {
          method: 'POST',
          path: '/products',
        },
        'http-response': {
          status: 200,
          body: { id: 'c2eb6544-521c-494f-aec8-b48ccc148ecc', name: 'Butter' },
        },
      }),
    }),
  ]);
  await page.goto('/');
  await fetch('http://localhost:9000/_specmatic/expectations', {
    method: 'POST',
    body: JSON.stringify({
      'http-request': {
        method: 'GET',
        path: '/products',
      },
      'http-response': {
        status: 200,
        body: [
          { id: 'a2eb6544-521c-494f-aec8-b48ccc148ecc', name: 'Milk' },
          { id: 'b2eb6544-521c-494f-aec8-b48ccc148ecc', name: 'Bread' },
          { id: 'c2eb6544-521c-494f-aec8-b48ccc148ecc', name: 'Butter' },
        ],
      },
    }),
  });

  await page.getByLabel('name').fill('Butter');
  await page.getByRole('button', { name: 'Add item' }).click();

  await expect(page.getByText('Butter')).toBeVisible();
});
