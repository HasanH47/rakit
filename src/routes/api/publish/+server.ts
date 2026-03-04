import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { env } from '$env/dynamic/private';
import { generateHtml } from '$lib/server/compiler/generateHtml.js';
import type { Block } from '$lib/state/canvas.svelte.js';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const payload = (await request.json()) as { username: string; blocks: Block[] };
        const { username, blocks } = payload;

        if (!username || !blocks || !Array.isArray(blocks)) {
            return json({ success: false, error: 'Invalid payload: username and blocks array are required.' }, { status: 400 });
        }

        const GITHUB_TOKEN = env.GITHUB_TOKEN;
        const GITHUB_REPO = env.GITHUB_REPO; // Format: "owner/repo"

        if (!GITHUB_TOKEN || !GITHUB_REPO) {
            console.error('Rakit Configuration Error: Missing GITHUB_TOKEN or GITHUB_REPO in environment variables.');
            return json({ success: false, error: 'Server configuration error.' }, { status: 500 });
        }

        // 1. Compile the Canvas JSON down into a standalone HTML String 
        const htmlContent = generateHtml(blocks);
        
        // 2. Base64 Encode for GitHub Content API
        // Using Buffer or btoa based on edge compat. btoa is standard web API available in workers.
        // We use targeted generic encoding that survives UTF-8 edge cases usually.
        const base64Content = btoa(unescape(encodeURIComponent(htmlContent)));

        const filePath = `projects/${username}/index.html`;
        const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;

        // 3. Pre-fetch check: Does this file already exist? If so, we need its SHA to update it.
        let fileSha = undefined;
        const checkRes = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Rakit-Web-Builder'
            }
        });

        if (checkRes.ok) {
            const data = (await checkRes.json()) as { sha: string };
            fileSha = data.sha;
        }

        // 4. Execute the File Creation/Update PUT request
        const commitRes = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Rakit-Web-Builder',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `chore: Rakit builder update for @${username}`,
                content: base64Content,
                sha: fileSha // Only attached if updating an existing file
            })
        });

        if (!commitRes.ok) {
            const errorData = await commitRes.json();
            console.error('GitHub API Error:', errorData);
            return json({ success: false, error: 'Failed to commit to GitHub repository.' }, { status: commitRes.status });
        }

        // Response data is consumed for validation length but can be assigned if needed later
        await commitRes.json();

        return json({ 
            success: true, 
            message: 'Website published successfully!',
            url: `/${username}` // The prospective public vanity URL 
        });

    } catch (err: unknown) {
        console.error('Publish Error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
        return json({ success: false, error: errorMessage }, { status: 500 });
    }
};
