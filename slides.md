---
theme: apple-basic
layout: statement
colorSchema: light
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
---

# Don't <span class="accent">Mock!</span>

<div class="leading-12">
How to Use Contracts to Write<br>Better Tests for Nuxt Applications
</div>


<!--
There are two common styles of writing tests for microservices-based applications:

1. Mock everything.
2. Mock nothing.

Both methodologies lead to suboptimal tests. In this talk, we explore how we can use OpenAPI specifications to create more reliable tests in sync with our microservices. At the same time, tests relying on OpenAPI specifications are less brittle than classic E2E tests.

First, we'll learn why we must adapt our strategies to the particular type of application we build. Then, we'll look into a concrete example of using contract testing and OpenAPI specifications to ensure we can effectively test our microservices and web applications. -->

<!--
- At my previous job we started building a new application based on SPAs and Microservices
-->

---
layout: statement
---

<img src="/images/system-spa_001.png" style="width:660px">

---
layout: statement
---

<img src="/images/system-spa_002.png" style="width:660px">

---
layout: statement
---

<img src="/images/system-spa_003.png" style="width:660px">

---
layout: statement
---

<img src="/images/system-spa_004.png" style="width:660px">

---
layout: statement
---

<img src="/images/system-spa.png" style="width:660px">

---
layout: statement
---

<img src="/images/system-spa-test_001.png" style="width:630px">

---
layout: statement
---

<img src="/images/system-spa-test_002.png" style="width:630px">

---
layout: statement
---

<img src="/images/system-spa-test_003.png" style="width:630px">

---
layout: statement
---

<img src="/images/system-spa-test.png" style="width:630px">

<!--
- We wrote a lot of tests
- And we did a lot of mocking
- Until this point, everything seemed fine but then ...
- ... we decided we want to add a BFF
-->

---
layout: statement
---

<img src="/images/system-spa-bff_002.png" style="width:680px">

---
layout: intro
---

<div class="leading-8">
  <span class="font-extrabold">Markus Oberlehner</span><br>
  <span style="font-size:0.5em;">Software Engineer @ Austrian Federal Computing Centre</span>
</div>

<div class="leading-17 mt-10">
  Bluesky: <a href="https://bsky.app/profile/markus.oberlehner.net">@markus.oberlehner.net</a><br>
  X: <a href="https://twitter.com/MaOberlehner">@maoberlehner</a><br>
  Book: <a href="https://goodvuetests.com">goodvuetests.com</a>
</div>

---
layout: intro
---

TODO image

---
layout: intro
---

<ol class="leading-17">
  <li style="text-decoration: line-through;">❌ Unit Tests</li>
  <li style="text-decoration: line-through;" v-click>❌ Components Tests</li>
  <li v-click>✅ Application Tests</li>
</ol>

---
layout: statement
---

<img src="/images/application-test_001.png" style="width:660px">

---
layout: statement
---

<img src="/images/application-test_002.png" style="width:660px">

---
layout: statement
---

<img src="/images/application-test_003.png" style="width:660px">

---
layout: statement
---

<img src="/images/application-test.png" style="width:660px">

---
layout: statement
---

<h1>Two Types of<br><span class="accent">Applications</span></h1>

---
layout: statement
---

<img src="/images/monolithic-architecture.png" style="width:380px">

---
layout: intro
---

<ol class="leading-17">
  <li>Next.js / Nuxt / Laravel + Database</li>
  <li v-click>Database Seeding for Testing</li>
</ol>

---
layout: statement
---

<img src="/images/monolithic-architecture-test.png" style="width:580px">

---
layout: intro
---

```php
// Database seeding in Laravel
it('should be possible to remove an item', function () {
    $this->seed(ItemSeeder::class);
 
    // ...
});
```

---
layout: intro
---

```ts
// Database seeding with Prisma
it('should be possible to remove an item', async () => {
    await prisma.item.createMany({
        data: [
            { name: 'Bread' },
            { name: 'Butter' },
        ],
    });
 
    // ...
});
```

---
layout: statement
---

<img src="/images/microservices-architecture.png" style="width:580px">

---
layout: statement
---

<img src="/images/microservices-architecture-test-mocks.png" style="width:580px">

---
layout: statement
---

TODO example code

---
layout: statement
---

<h1>The Problem<br><span class="accent">with Mocking</span></h1>

---
layout: statement
---

<img src="/images/system-spa-bff_001.png" style="width:680px">

---
layout: statement
---

<img src="/images/system-spa-bff_002.png" style="width:680px">

---
layout: statement
---

<img src="/images/system-spa-bff.png" style="width:680px">

---
layout: statement
---

<img src="/images/system-spa-bff-test_001.png" style="width:680px">

---
layout: statement
---

<img src="/images/system-spa-bff-test_002.png" style="width:680px">

---
layout: statement
---

<img src="/images/system-spa-bff-test_003.png" style="width:680px">

---
layout: statement
---

<img src="/images/system-spa-bff-test_004.png" style="width:680px">

---
layout: statement
---

<img src="/images/system-spa-bff-test.png" style="width:680px">

<!--
- Now, we did mock requests between SPA and BFF
- But this meant, our tests didn't test the whole app
- We had a problem!
-->

---
layout: statement
---

TODO CODE showing that we can't use playwright mocking features to mock requests from BFF to Microservices

---
layout: statement
---

TODO nuxt example

---
layout: intro
---

<ol class="leading-17">
  <li>We're not testing the whole application!</li>
</ol>

TODO explain problem with microservice changing but mocks stay the same and test does not break

---
layout: intro
---

<ol class="leading-17">
  <li>We're not testing the whole application!</li>
  <li v-click>Do (not) break on microservice API changes</li>
</ol>

---
layout: statement
---

<h1>Don't Mock Requests<br>from <span class="accent">Applications to Microservices!</span></h1>

---
layout: statement
---

# <span class="accent">SPAs</span>

---
layout: statement
---

<img src="/images/spa.png" style="width:620px">

---
layout: intro
---

```ts
// Mocking with Playwright
it('should be possible to remove an item', () => [
  await page.route('*/**/api/items', async route => {
    const json = [{ name: 'Butter', id: 1 }];
    await route.fulfill({ json });
  });

  // ...
]);
```

---
layout: statement
---

# SSR Applications<br>and <span class="accent">Microservices</span>

---
layout: statement
---

<img src="/images/ssr-app.png" style="width:620px">

---
layout: statement
---

<img src="/images/ssr-app-2.png" style="width:620px">

---
layout: statement
---

<img src="/images/everything-app.png" style="width:620px">

---
layout: statement
---

# <span class="accent">Contract</span> Testing

---
layout: statement
---

<img src="/images/contract.png" style="width:500px">

---
layout: intro
---

```yaml
openapi: 3.0.0
info:
  title: Product Service
  description: A service for managing products
paths:
  /products:
    get:
      responses:
        '200':
          description: A list of products
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Product'
```

---
layout: intro
---

```yaml
components:
  schemas:
    Product:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        name:
          type: string
      required:
        - name
```

---
layout: statement
---

<img src="/images/everything-app.png" style="width:620px">

---
layout: statement
---

<img src="/images/stub-server.png" style="width:620px">

---
layout: intro
---

<ol class="leading-17">
  <li>API First & OpenAPI</li>
  <li>Specmatic Stub Server</li>
</ol>

---
layout: statement
---

<h1>Don't Mock Requests<br>from <span class="accent">SPA to BFF!</span></h1>

---
layout: statement
---

# Write <span class="accent">Better Tests</span><br>With <span class="accent">Contract Tests</span>

---
layout: intro
---

<div class="leading-8">
  <span class="font-extrabold">Markus Oberlehner</span><br>
  <span style="font-size:0.5em;">Senior Full-stack Developer</span>
</div>

<div class="leading-17 mt-10">
  Twitter: <a href="https://twitter.com/MaOberlehner">@maoberlehner</a><br>
  Book: <a href="https://goodvuetests.com">goodvuetests.com</a>
</div>
