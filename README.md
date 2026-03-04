# Rakit - Free, Serverless Web Builder

Rakit is a hyper-optimized, open-source visual web builder explicitly engineered to operate entirely at a **$0 monthly infrastructure cost**.

It bypasses traditional databases and expensive backend servers by relying on a GitOps-driven architecture: using **GitHub as a Headless Database** to store flat HTML files, and **Cloudflare Pages/Workers** to distribute those files directly through their edge network.

## Core Features

- **Drag-and-Drop Visual Canvas**: Build premium, Tailwind-powered websites using pre-built primitive blocks (Hero, Grid, Text, Footer).
- **Serverless Compilation Engine**: Svelte visual components are translated completely on the Edge into standalone, highly performant generic `index.html` static templates.
- **Zero-Cost Storage & Hosting**: Your websites are committed automatically via the GitHub REST API and delivered via Edge CDN Wildcard routing. No Postgres, No Mongo, No VMs.
- **Premium Interface Boundaries**: Designed incorporating sleek glassmorphism, native Svelte 5 Runes for ultra-responsive logic, and custom Tailwind v4 aesthetics.

## Architecture

1. **Frontend**: SvelteKit + Tailwind CSS v4. Operates the Visual Canvas and Inspector.
2. **Backend**: SvelteKit Edge Endpoints (`/api/publish`). Compiles Svelte JSON state to raw HTML with infused CDNs and pushes identically to the GitHub repo.
3. **Delivery Framework**: Wildcard Edge Proxy Routes (`/[user]`). Intercepts user vanity URLs to fetch and cache raw HTML from the GitHub repository locally on the Cloudflare CDN, avoiding API throttles.

## Local Development Setup

To test and run the builder locally, you need a GitHub Personal Access Token (PAT) configured to authorize the internal Git engine to act as your backend database.

### 1. Configure the Environment

Copy the `.env.example` file to create your local active configuration.

```bash
cp .env.example .env
```

Inside `.env`, define the required credentials:

- `GITHUB_TOKEN`: Your GitHub PAT (requires generic `repo` access).
- `GITHUB_REPO`: The repository you wish to use as Rakit's storage backend (e.g., `hasanh47/rakit`).

### 2. Install Dependencies

Make sure you have Node or Bun installed, then run:

```bash
npm install
# or
bun install
```

### 3. Start Development Server

Boot up the SvelteKit development runtime:

```bash
npm run dev
# or
bun run dev
```

Navigate to `http://localhost:5173`. You can access the builder layout at `/builder`.

## Production Deployment (Cloudflare)

Rakit uses `@sveltejs/adapter-cloudflare` resolving to Cloudflare Workers natively. Since it's a zero-cost architecture, deploying to Cloudflare Pages is the recommended path.

### Deploying via Cloudflare Dashboard (Recommended)

1. **Push your code to GitHub:** Ensure your entire Rakit repository is pushed to a GitHub repository (e.g., `github.com/your-username/rakit`).
2. **Access Cloudflare Dashboard:** Log in to [dash.cloudflare.com](https://dash.cloudflare.com/).
3. **Create Application:** Navigate to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
4. **Select Repository:** Choose your Rakit repository from the list.
5. **Configure Build Settings:**
   - **Framework preset:** SvelteKit
   - **Build command:** `npm run build`
   - **Build output directory:** `.svelte-kit/cloudflare`
6. **Set Environment Variables:** Before clicking deploy, add your required secrets:
   - `GITHUB_TOKEN`: Your Personal Access Token.
   - `GITHUB_REPO`: The target storage repository (e.g., `your-username/rakit`).
7. **Deploy:** Click **Save and Deploy**. Cloudflare will automatically build and distribute Rakit to the Edge network.
