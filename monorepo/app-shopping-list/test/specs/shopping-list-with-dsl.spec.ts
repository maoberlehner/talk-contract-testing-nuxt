import { test as it } from '@playwright/test';

import { makeShoppingList } from '../shopping-list.dsl';

it('should be possible to add a new item', async ({ page }) => {
  const shoppingList = await makeShoppingList(page);

  await shoppingList.open();
  await shoppingList.addNewItem('Butter');
  await shoppingList.expectItem('Butter');
});
