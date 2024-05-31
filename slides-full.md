---
theme: apple-basic
layout: statement
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
---

# No More <span class="accent">Mocking!</span>

<div class="leading-12">
Write Better Tests for Microservices-powered Nuxt Applications with Contract Tests
</div>

<!--
Storytime:

- We started with an SPA and Microservices
- We wrote a lot of tests
- Did a lot of mocking
- Moved to a BFF
- Now, we did mock requests between SPA and BFF
- We didn't test the whole app
-->

---
layout: statement
---

<img src="/images/spa-start.png" style="width:660px">

---
layout: statement
---

<img src="/images/the-application.png" style="width:660px">

---
layout: statement
---

<img src="/images/the-application-1.png" style="width:660px">

---
layout: statement
---

<img src="/images/the-application-2.png" style="width:660px">

---
layout: intro
---

<ul class="leading-17" style="list-style-type:none;">
  <li>Monoliths, SPAs, and Microservices</li>
  <li>API First and Contract Testing</li>
  <li>Playwright and Specmatic Stub Server</li>
</ul>

---
layout: statement
---

# The <span class="accent">Monolith</span>

---
layout: intro
---

<ul class="leading-17" style="list-style-type:none;">
  <li>Laravel, Ruby on Rails, or Nuxt + Database</li>
  <li>Database Seeding</li>
</ul>

---
layout: statement
---

<img src="/images/the-monolith.png" style="width:660px">

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

# Nuxt and<br><span class="accent">Microservices</span>

---
layout: statement
---

<img src="/images/nuxt.png" style="width:620px">

---
layout: statement
---

<img src="/images/nuxt-1.png" style="width:620px">

---
layout: statement
---

<img src="/images/everything-app.png" style="width:620px">

---
layout: statement
---

<img src="/images/stub-server.png" style="width:620px">

---
layout: statement
---

# <span class="accent">Contract</span> Testing

---
layout: intro
---

<ul class="leading-17" style="list-style-type:none;">
  <li>API First & OpenAPI</li>
  <li>Specmatic Stub Server</li>
</ul>

---
layout: statement
---

# Write <span class="accent">Better Tests</span> For<br>Your <span class="accent">Nuxt</span> App<br>With <span class="accent">Contract Tests</span>

---
layout: intro
---

<div class="leading-8">
  <span class="font-extrabold">Markus Oberlehner</span><br>
  <span style="font-size:0.5em;">Software Architect @ <a href="https://karriere.at">karriere.at</a></span>
</div>

<div class="leading-17 mt-10">
  Twitter: <a href="https://twitter.com/MaOberlehner">@maoberlehner</a><br>
  Book: <a href="https://goodvuetests.com">goodvuetests.com</a>
</div>
