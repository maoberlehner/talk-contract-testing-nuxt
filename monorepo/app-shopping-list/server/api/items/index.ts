export default defineEventHandler(async () => {
  const data = await $fetch('http://localhost:9000/products');
  return { data };
});
