import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { env } from '$env/dynamic/private';

// Define core application routes that should NEVER be intercepted by the wildcard.
const RESERVED_ROUTES = new Set(['api', 'builder', '_app']);

export const GET: RequestHandler = async ({ params, setHeaders }) => {
    const { user } = params;

    // 1. Route Guard: Prevent native SvelteKit app intersections
    if (!user || RESERVED_ROUTES.has(user.toLowerCase())) {
        throw error(404, 'Not Found');
    }

    const GITHUB_TOKEN = env.GITHUB_TOKEN;
    const GITHUB_REPO = env.GITHUB_REPO;

    if (!GITHUB_REPO) {
        console.error('Rakit Delivery Error: Missing GITHUB_REPO');
        throw error(500, 'Server configuration error');
    }

    // 2. Target the Raw GitHub Storage Backend
    // Example: https://raw.githubusercontent.com/hasanh47/rakit-sites/main/projects/demo-user/index.html
    const branch = 'main'; // Assume main branch for production storage
    const fetchUrl = `https://raw.githubusercontent.com/${GITHUB_REPO}/${branch}/projects/${user}/index.html`;

    const fetchHeaders: Record<string, string> = {
        'User-Agent': 'Rakit-Edge-Delivery'
    };

    // If GITHUB_TOKEN exists, inject it to bypass Private Repo visibility. 
    // If not, it relies on Public Repo accessibility automatically.
    if (GITHUB_TOKEN) {
        fetchHeaders['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    try {
        const response = await fetch(fetchUrl, { headers: fetchHeaders });

        if (!response.ok) {
            // 404 Fallback: The project doesn't exist yet natively
            if (response.status === 404) {
                // Return a beautiful branded 404 page directly inside the proxy logic
                const fallbackHtml = `
                    <!DOCTYPE html>
                    <html lang="en" class="antialiased dark">
                    <head>
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <title>Website Not Found - Rakit</title>
                        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
                        <style type="text/tailwindcss">
                            @theme { --color-dark-950: #020617; --color-dark-800: #1e293b; --color-brand-400: #2dd4bf; --color-brand-600: #0d9488; }
                            body { @apply bg-dark-950 text-white font-sans flex items-center justify-center min-h-screen text-center p-6; }
                        </style>
                    </head>
                    <body>
                        <div class="max-w-2xl bg-dark-800/50 p-12 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm">
                            <h1 class="text-6xl font-bold mb-6 text-brand-400">404</h1>
                            <h2 class="text-3xl font-bold mb-4">Site Not Found</h2>
                            <p class="text-gray-400 text-lg mb-8 leading-relaxed">
                                The Rakit portfolio for <strong>@${user}</strong> hasn't been published yet or the URL is incorrect.
                            </p>
                            <a href="/" class="inline-block px-8 py-4 rounded-full bg-linear-to-br from-brand-400 to-brand-600 font-bold text-white shadow-lg hover:scale-105 transition-transform">
                                Go Home
                            </a>
                        </div>
                    </body>
                    </html>
                `;

                return new Response(fallbackHtml, {
                    status: 404,
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            }

            // Other GitHub API errors (Rate Limit, etc)
            throw error(502, `Storage Backend Error: ${response.statusText}`);
        }

        // 3. Output Translation
        const htmlContent = await response.text();

        // 4. Edge HTTP Caching Injection
        // Instruct Edge nodes to hold this generic HTML content natively for 60 seconds.
        // During high traffic (e.g., getting slashdotted/Hacker News), 
        // 99.9% of requests will hit the Cloudflare Edge Cache, preserving GitHub API rate-limits entirely!
        setHeaders({
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=60'
        });

        // Push raw body downstream directly mapped as a Web API response
        return new Response(htmlContent);

    } catch (err) {
        console.error(`Edge Delivery Error for /${user}:`, err);
        throw error(500, 'Internal Edge Delivery Failure');
    }
};
