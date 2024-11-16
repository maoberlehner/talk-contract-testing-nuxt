export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const data = await $fetch(`${config.serviceProductUrl}/products`);
  return { data };
});
