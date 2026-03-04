---
name: Rakit Engine & Builder Operations Skill
description: Domain-specific technical guidelines dictating SvelteKit canvas rendering architecture, GitHub REST API GitOps interactions, and Edge route proxy configurations.
---

# Rakit Engine & Builder Skill

This skill provides specialized technical knowledge and rigid architectural patterns required when developing the Rakit platform. The AI Assistant must reference this knowledge base before analyzing or modifying fundamental platform algorithms.

## 1. Simulating the Svelte Visual Canvas Builder

**Target Context:** The Svelte canvas builder operates on a reactive array containing plain JavaScript objects representing UI blocks. Simulating a visual preview requires dynamic component resolution mechanisms.

**Knowledge Base (AI reference):**

- Block nodes are structured typically as: `[{ id: 'hero-1', type: 'HeroBlock', properties: { title: 'Hello', bannerUrl: 'https://...' } }]`
- Iterating these blocks securely within the `<main>` client-side Svelte view:
  ```svelte
  {#each $canvasStore as block (block.id)}
     <svelte:component this={resolveComponentType(block.type)} {...block.properties} />
  {/each}
  ```
- **Extractor Constraint:** The builder CANNOT push native `.svelte` files to GitHub for the end-user site. In the publish lifecycle, the AI must design logic capable of reliably traversing the JSON Node Canvas State and compiling it via a string-templating engine into a pure, raw `<html>...<body>...</body></html>` payload parsable by any standard web browser.

## 2. Pushing Data via GitHub REST API on the Edge

**Target Context:** Interacting with GitHub API endpoints to simulate a Headless Storage Engine (Database).

**API Algorithm for PUT Operations (Create / Update HTML file):**

1. Because SvelteKit is configured for the Cloudflare Edge runtime, utilizing monolithic NPM packages like `octokit` can trigger build failures or overhead limits. **You MUST use standard native `fetch()` functions universally.**
2. Payload structure strictness: The `content` property of the GitHub API JSON payload MUST be converted from plain-text HTML strings to standard `Base64` encoding before transmission (utilize `btoa` in browser environments or standard JS buffer-to-base64 methods allowable on V8 edge).
3. Benchmark Push Request Format:

   ```typescript
   // Target Endpont
   // PUT https://api.github.com/repos/{OWNER}/{APP_DATA_REPO}/contents/projects/{USERNAME}/index.html

   const options = {
     method: "PUT",
     headers: {
       Authorization: `Bearer ${env.GITHUB_PAT_TOKEN}`,
       Accept: "application/vnd.github.v3+json",
       "User-Agent": "Rakit-Edge-API-Worker", // GitHub mandates User-Agent presence
     },
     body: JSON.stringify({
       message: `Rakit CMS: Automated publish action for ${username}`,
       content: encodeBase64Content(htmlString), // Strictly mandatory Base64
       // 'sha': "xyz..." -> Required ONLY if updating an existing file. AI must implement fetching the file's current SHA via a GET request first to allow overwrite, ignoring if the GET returns a 404 (new file).
     }),
   };
   ```

## 3. Edge Reverse Proxy HTML Render (SvelteKit Dynamic Routing)

**Target Context:** When a visitor hits `domain.com/johndoe`, the SvelteKit Edge Runtime must intercept the request, invisibly fetch `index.html` from John's repository residing on `raw.githubusercontent.com`, and serve it instantly.

**Edge Route Handling Guidelines (`+server.ts`):**

```typescript
import { error } from "@sveltejs/kit";

export async function GET({ params, setHeaders }) {
  const rawUrl = `https://raw.githubusercontent.com/{OWNER}/{APP_DATA_REPO}/main/projects/${params.user}/index.html`;

  const response = await fetch(rawUrl);

  if (!response.ok) {
    throw error(
      404,
      "User page is currently unavailable or has not been published to the cluster yet.",
    );
  }

  const htmlString = await response.text();

  // CRITICAL: You must coerce the MIME content type to HTML. Without this, raw GitHub response defaults to text/plain, resulting in raw source code rendering on the visitor's screen.
  setHeaders({
    "Content-Type": "text/html",
    "Cache-Control": "public, max-age=60, s-maxage=300", // Edge Cache tuning to minimize GitHub Rate Limiting hits
  });

  return new Response(htmlString);
}
```

The AI Assistant MUST memorize and meticulously implement these three technical verticals (Canvas Simulation, GitHub REST File CRUD, Svelte Proxied Endpoints) throughout the development phases.
