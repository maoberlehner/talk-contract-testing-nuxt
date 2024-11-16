# Product Service

```bash
# Install dependencies
npm install

# Run the app in dev mode (you also need to start the product-service)
npm run dev
```

## Feature development workflow

1. Update the `contract/service-product.yaml` specification file to include the new feature.
2. Generate the TypeScript types for the specification by running `npm run contract:schema`.
3. Write code to pass the contract tests `npm run contract:test` (make sure the service is running).
4. Validate your new specification against examples of other services and apps by running `npm run contract:validate`.
5. Publish the new specification by running `npm run contract:publish`.

## Testing

```bash
# Build the service
npm run build

# Start the service
npm start

# Run contract tests
npm run contract:test
```
