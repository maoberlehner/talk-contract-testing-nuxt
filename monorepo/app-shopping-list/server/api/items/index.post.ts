export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const item = await readBody(event);

  const data = await $fetch(`${config.serviceProductUrl}/products`, {
    method: 'POST',
    body: item,
  });

  return { data };
});
