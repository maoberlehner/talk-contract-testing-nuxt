export default defineEventHandler(async (event) => {
  const item = await readBody(event);

  const data = await $fetch('http://localhost:9000/products', {
    method: 'POST',
    body: item,
  });

  return { data };
});
