# Shopping List App

```bash
# Install dependencies
npm install

# Run the app in dev mode (you also need to start the product-service)
npm run dev
```

## Feature development workflow

1. Create a new test in the `test/specs` directory.
2. Create example responses for the services you need in the `test/contract/service-NAME_examples` directories.
3. Write code to pass the test.
4. Validate examples by running `npm run contract:validate`.  
   If the examples are not valid, this either means that your example responses are not correct or, for your new feature to work, the service needs to be updated.
5. Publish examples by running `npm run contract:publish`.

## Testing

```bash
# Start stubbed services
npm run stub

# Run app in test mode
npm run dev -- --dotenv .env.test

# Run tests
npx playwright test
```
