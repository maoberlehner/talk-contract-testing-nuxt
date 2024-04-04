<script setup lang="ts">
import type { Item } from '../entities/item';

import ShoppingList from './ShoppingList.vue';

const {
  data: response,
  refresh,
  pending: isLoading,
} = await useFetch<{ data: Item[] }>('/api/items');
const items = computed(() => response.value?.data || []);

const itemNewName = ref(``);
const addItem = async () => {
  await $fetch('/api/items', {
    method: 'POST',
    body: { name: itemNewName.value },
  });
  await refresh();
  itemNewName.value = ``;
};
</script>

<template>
  <div>
    <div class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl">Shopping list</h2>
        <ShoppingList :items="items" />
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl">Add new item</h2>
        <form @submit.prevent="addItem">
          <label for="name"> Name </label>
          <div class="flex gap-2">
            <input
              id="name"
              v-model="itemNewName"
              name="name"
              class="flex-grow border border-teal-900 rounded p-2"
            />
            <button
              class="add-button rounded px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white transition-colors"
              :class="isLoading ? 'opacity-50 cursor-not-allowed' : ''"
              :disabled="isLoading"
            >
              Add item
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
