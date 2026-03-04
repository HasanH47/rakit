# Product Requirements Document (PRD): Rakit

## 1. Project Overview

Rakit is a lightweight, open-source web builder and deployment engine designed to operate at exactly $0 billing cost (100% free infrastructure). The project allows users to design static web pages through a visual drag-and-drop interface and instantly distribute them using a GitHub Repository as headless storage and Cloudflare Pages as the edge routing and delivery layer.

## 2. Goals & Objectives

- Provide an intuitive visual web builder requiring zero traditional server or database configuration.
- Transparently implement GitOps concepts where user build artifacts (HTML/CSS) are committed directly to GitHub via its REST API.
- Achieve minimal routing latency and global availability for end-user public URLs.
- Empower non-technical users to host their own landing pages without vendor lock-in or recurring subscription fees.

## 3. Target Audience

- **Developers & Hobbyists:** Individuals needing rapid, free landing pages or prototyping environments.
- **Non-Technical Users:** Professionals, freelancers, or students seeking to create simple digital portfolios or personal sites without registering for paid hosting services.

## 4. Architecture & Technology Stack

- **Meta-Framework (Frontend & API):** SvelteKit. Chosen for its zero-virtual-DOM approach, extremely lightweight client bundle size, and robust Server-Side Rendering (SSR) capabilities tailored for edge routing.
- **Hosting & Infrastructure:** Cloudflare Pages (Free Tier).
- **Storage Backend (Database Alternative):** GitHub Repository (a separate app-data repository, strictly isolated from the application's source code).
- **Data Communication:** GitHub REST API (handling CRUD operations for user-generated `.html` files).
- **Styling:** Tailwind CSS (utility-first approach to minimize external CSS dependencies and simplify component inline styling).

## 5. Feature Scope (MVP - Minimum Viable Product)

### Phase 1: Web Builder Interface (Client-Side)

- Interactive drag-and-drop or click-to-add canvas workspace.
- Pre-built structural blocks collection: Header, Hero Section, Text Block, Image Box, Footer, and Grid Layouts.
- Real-time live preview powered by Svelte's reactive state binding.
- Basic customization property panels for blocks (e.g., text content, background colors, image URLs).

### Phase 2: Compilation & Storage Engine (Server-Side)

- Parser/Generator to extract the visual Svelte component structure from the canvas JSON state into raw, static HTML/CSS strings.
- Dedicated internal API endpoint: `POST /api/publish`.
- Automated GitHub REST API integration: Specifically utilizing `PUT /repos/{owner}/{repo}/contents/projects/{username}/index.html` to commit the generated markup directly to the remote repository.
- Base64 encoding pipeline to safely transmit HTML strings via JSON payloads to GitHub.

### Phase 3: Routing & Distribution System (Edge / SSR)

- SvelteKit dynamic route handler: `src/routes/[user]/+server.ts`.
- Edge fetch proxy logic targeting `raw.githubusercontent.com` to retrieve the active HTML file based on the `[user]` URL parameter.
- Edge response manipulation injecting `Content-Type: text/html` and robust `Cache-Control` headers ensuring the raw text is rendered visually by the visitor's browser.
- Fallback UI for 404/Not Found states (e.g., handles cases when a username doesn't exist or hasn't published yet).

## 6. Out of Scope (For MVP)

- Custom domain mapping per user (initial focus restricted to `maindomain.com/username`).
- Dynamic backend features for users (e.g., functional contact forms paired with a database backend).
- Complex authentication/authorization systems (initial MVP may utilize a simple session model or a completely login-less experimental sandbox mode).

## 7. Success Metrics

- **Deployment Latency:** Time from clicking the "Publish" button to a confirmed successful GitHub API commit must be under 3 seconds.
- **Edge Routing Performance:** Public URL load times should register under 1 second globally, leveraging Cloudflare's Edge delivery combined with direct `raw` fetching.
- **Builder Interaction:** Zero perceptible UI blocking or lag while dragging and dropping components containing >20 nested elements.
