<script setup lang="ts">
import type { Item } from '../entities/item';

const props = defineProps<{
  items: Item[];
}>();
</script>

<template>
  <ul class="space-y-2">
    <li v-for="item in props.items" :key="item.id" class="item">
      <div
        class="rounded px-4 py-3 bg-teal-600 text-white text-left w-full transition-colors"
      >
        {{ item.name }}
      </div>
    </li>
  </ul>
</template>
