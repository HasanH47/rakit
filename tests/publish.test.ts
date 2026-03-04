import { test, expect } from '@playwright/test';

test.describe('Epic 4: Rakit Builder E2E Loop', () => {
    
    test('Visitor can boot the builder, construct a site, and trigger a publish', async ({ page }) => {
        
        // 1. Visit the actual Builder UI
        await page.goto('/builder');
        await expect(page).toHaveTitle(/Builder/);
        
        // Ensure "Publish" button exists in the Topbar and is ready
        const publishButton = page.getByRole('button', { name: 'Publish', exact: true });
        await expect(publishButton).toBeVisible();

        // 2. Drag a block to populate the canvas
        // Locator targets the draggable Hero Block in the sidebar -> Drops into Canvas Area
        await page.locator('text=Hero Section').dragTo(page.locator('div[role="region"]'));

        // 3. We mock the API interaction natively since real publishing hits GitHub API limits quickly in CI
        await page.route('/api/publish', async route => {
            const request = route.request();
            expect(request.method()).toBe('POST');
            
            const payload = request.postDataJSON();
            // Assert that the canvas state logic bounds are shipped properly down to the server-side API!
            expect(payload).toHaveProperty('username');
            expect(payload).toHaveProperty('blocks');
            expect(payload.blocks.length).toBeGreaterThan(0); // Assure the drag & drop succeeded internally
            
            // Fulfill the route returning an artificial network success
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true })
            });
        });

        // 4. Trigger the Publish action programmatically within the UI
        await publishButton.click();

        // 5. Assert that the Svelte State switches dynamically displaying native Topbar feedback
        await expect(page.locator('text=Published successfully')).toBeVisible({ timeout: 5000 });
    });
    
    test('Wildcard Edge CDN Proxy handles empty profiles appropriately', async ({ page }) => {
        // Assume trying to resolve an invalid or non-existent profile like `/nonexistent-user`
        const res = await page.goto('/nonexistent-test-user');
        
        // Ensure Cloudflare intercepts and throws our precise 404 HTML layout instead of crashing
        expect(res?.status()).toBe(404);
        
        // Assert Edge Rendering Output matched our specific Branded Fallback template
        await expect(page.locator('h1.text-brand-400')).toHaveText('404');
        await expect(page.locator('text=Site Not Found')).toBeVisible();
    });
});
