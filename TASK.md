# Rakit - Agile/Scrum Task Board

## Epics

1. **Epic 1: Web Builder Interface (Client-Side Foundation)**
2. **Epic 2: Compilation Engine & Storage Integration (Server-Side)**
3. **Epic 3: Edge Routing & Public Distribution Mechanism (Delivery)**

## Product Backlog & Sprints

### Sprint 1: Foundation & Web Builder UI (Epic 1)

- [x] **Story:** As a user, I want a drag-and-drop canvas area so I can construct my web page visually.
  - [x] **Task:** Initialize the SvelteKit project and configure Tailwind CSS.
  - [x] **Task:** Scaffold the main layout structure (Component Sidebar list, Canvas workspace area, Topbar/Toolbar).
  - [x] **Task:** Integrate a drag-and-drop library (e.g., `svelte-dnd-action`) within the canvas boundaries.
  - **Acceptance Criteria:** Components can be dragged from the sidebar and dropped into a sequentially ordered list on the canvas.
- [x] **Story:** As a user, I want standard building blocks to construct my page.
  - [x] **Task:** Create `HeaderBlock.svelte` component.
  - [x] **Task:** Create `HeroSectionBlock.svelte` component.
  - [x] **Task:** Create `TextBlock.svelte` component.
  - [x] **Task:** Create `ImageBoxBlock.svelte` component.
  - [x] **Task:** Create `FooterBlock.svelte` component.
  - [x] **Task:** Define a global Svelte Store (`canvasStore.ts`) to manage the array of active blocks and their reactive properties.
- [x] **Story:** As a user, I want to see a live preview of my modifications instantly.
  - [x] **Task:** Utilize Svelte's reactivity and `<svelte:component>` binding to map the `canvasStore` state directly onto the canvas view.
  - **Acceptance Criteria:** Editing text or attributes in the side panel instantly reflects in the canvas representation without a page reload.

### Sprint 2: Compilation Engine & Storage Integration (Epic 2)

- [x] **Story:** As the system, I need to translate the JSON canvas representation into native HTML/CSS strings.
  - [x] **Task:** Develop a generator/parser utility function (`generateHtml.ts`) that maps the JSON state objects and their properties to raw HTML markup encompassing standard `<html>`, `<head>`, and `<body>` tags.
  - [x] **Task:** Inject Tailwind CSS via CDN script in the generated `<head>` to maintain component styling natively.
- [x] **Story:** As a user, I want to "Publish" my website to the internet.
  - [x] **Task:** Implement the backend endpoint `POST /api/publish` using SvelteKit server routes.
  - [x] **Task:** Write the integration for the GitHub REST API mapping the operation to `PUT /repos/{owner}/{repo}/contents/projects/{username}/index.html`.
  - [x] **Task:** Configure headless GitHub repository authentication via `.env` (using PAT or GitHub App Tokens).
  - [x] **Task:** Wire the frontend "Publish" button to trigger the `fetch` POST call with the serialized canvas state.
  - **Acceptance Criteria:** A successful publish action results in a new or updated `index.html` file visibly committed in the target GitHub repository.

### Sprint 3: Public Routing Mechanism & Edge Distribution (Epic 3)

- [x] **Story:** As a visitor, I can quickly access the published user portfolios seamlessly.
  - [x] **Task:** Implement wildcard dynamic route handler `src/routes/[user]/+server.ts` in SvelteKit.
  - [x] **Task:** Implement the proxy `fetch` logic routing to `raw.githubusercontent.com` depending on the `[user]` URL parameter.
  - [x] **Task:** Manipulate the incoming raw response, injecting the HTTP Header `Content-Type: text/html` to ensure browser rendering.
  - [x] **Task:** Implement friendly Error 404 fallback handling if the GitHub API returns a File Not Found error.
- [x] **Story:** As a user, my public URL should load in under 1 second globally.
  - [x] **Task:** Install and configure the Cloudflare Pages adapter (`@sveltejs/adapter-cloudflare`).
  - [x] **Task:** Configure appropriate `Cache-Control` edge caching headers within the `+server.ts` proxy route to reduce GitHub API hits and accelerate delivery.

### Sprint 4: Polish, E2E Testing & Documentation

- [ ] **Task:** Conduct End-to-End (E2E) testing via Playwright simulating: Publish action -> Access URL -> Verify rendered DOM.
- [ ] **Task:** UI/UX refinement (implement skeleton loaders, toaster notifications, and error boundary alerts during the Publish flow).
- [ ] **Task:** Write comprehensive `README.md` containing local installation steps, `.env` file templates, and Cloudflare deployment community guidelines.
