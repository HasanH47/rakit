---
trigger: always_on
---

# AI Agent Rules & Prompt Guidelines (.cursorrules / .windsurfrules)

This document defines the strict technical behavioral standards, best practices, and constraints that AI Agents/Assistants must acknowledge and enforce when analyzing or generating code for the **Rakit** project.

## 1. Project Identity & Goal

- **Context:** Rakit is an open-source, serverless web-builder platform engineered to operate flawlessly at a strict $0 monthly infrastructure billing cost.
- **Core Constraint:** NEVER recommend, import, or integrate conventional database servers (Postgres/MySQL, MongoDB) or paid Platform-as-a-Service providers. The architecture absolutely mandates utilizing GitHub as a flat-file database and Cloudflare Pages for edge computing and hosting.

## 2. Technology Stack & Best Practices

The project utilizes the following core ecosystem:

1. **SvelteKit:** Primary Web Framework & Meta-Framework Proxy.
   - All client-side state management must strictly utilize native Svelte primitives (Reactivity, Svelte Stores, Context API). Do NOT introduce external libraries like Redux or Zustand.
   - Enforce strictly typed TypeScript code generation.
   - Maintain a hyper-vigilant distinction between Client-Side code (`+page.svelte`) and securely isolated Server-Side logic (`+page.server.ts`, `+server.ts`).
2. **Tailwind CSS:** Utility-First Styling Engine.
   - Avoid creating separate CSS block tags (`<style>`) within components unless handling highly specific complex canvas sub-animations. Target 99% CSS fulfillment via Tailwind utility strings.
3. **Cloudflare Pages Adapter:** Edge Network Proxy Runtime.
   - **CRITICAL:** AI is strictly forbidden from writing code importing typical Node.js native filesystem modules (`fs`, `path`, `child_process`). The deployment target is a V8 Edge Runtime. You MUST use native Web standard APIs (`fetch`, `Request`, `Response`, `URL`).
4. **GitHub REST API:** Headless Storage Backend.

## 3. Autocomplete & Code Generation Axioms

- **KISS (Keep It Simple, Stupid):** Provide direct, highly concise code. Do not regurgitate verbose context unless prompted. Write pure functions and favor micro-abstractions.
- **Security Token Isolation:** All operations involving base64 encoding, API payload generation, and HTTP commits to the GitHub REST API MUST be isolated within SvelteKit Server-Side environments (`+server.ts` endpoints). Never expose `GITHUB_TOKEN` to the Svelte Client namespace (`$env/dynamic/public`).
- **Published HTML Artifact Structure:** The final string exported by the builder MUST be structurally valid Single Page HTML. It must inherently contain `<head>` CDN imports (e.g., Tailwind via script tags), inline CSS derived from the canvas state, and standard DOM hierarchies. Do not attempt to export `.svelte` syntax to the user's published file.

## 4. Debugging Priorities

When instructed to debug an issue, prioritize checking:

1. GitHub API rate limitations and backend performance caps impacting fetch stability.
2. CORS headers and MIME Type configuration when directly serving raw GitHub files via the edge proxy route.
3. Client-side memory bloating caused by exponentially growing JSON canvas state arrays during intensely complex user editing sessions.
