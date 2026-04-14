import { test, expect } from '@playwright/test';

test.describe('Logo Verification', () => {
  test('should display Centro Social del Audífono logo in sidebar', async ({ page }) => {
    await page.goto('https://ho1y4cmrgmk0.space.matrix.io');
    
    // Wait for the sidebar to load
    await page.waitForSelector('aside', { timeout: 10000 });
    
    // Check that the main logo is present
    const mainLogo = page.locator('aside img[alt*="Centro Social"], aside img[src*="centro-social"]').first();
    await expect(mainLogo).toBeVisible({ timeout: 5000 });
    
    // Verify the logo loads successfully (not a 404)
    const logoSrc = await mainLogo.getAttribute('src');
    console.log('Main logo source:', logoSrc);
  });

  test('should display competitor logos in the panel', async ({ page }) => {
    await page.goto('https://ho1y4cmrgmk0.space.matrix.io');
    
    // Wait for the competitor panel to load
    await page.waitForSelector('.space-y-2', { timeout: 10000 });
    
    // Check for competitor logos (there should be multiple img elements for competitors)
    const competitorLogos = page.locator('img[src*="/logos/logo-"]');
    const count = await competitorLogos.count();
    
    console.log(`Found ${count} competitor logos`);
    
    // We expect at least some competitor logos to be present
    expect(count).toBeGreaterThan(0);
    
    // Take a screenshot for visual verification
    await page.screenshot({ path: 'tests/screenshots/logo-verification.png', fullPage: true });
    console.log('Screenshot saved to tests/screenshots/logo-verification.png');
  });

  test('should not have 404 errors for logo images', async ({ page }) => {
    const failed404s = [];
    
    page.on('response', response => {
      if (response.url().includes('/logos/') && response.status() === 404) {
        failed404s.push(response.url());
      }
    });
    
    await page.goto('https://ho1y4cmrgmk0.space.matrix.io');
    await page.waitForTimeout(3000); // Wait for all resources to load
    
    if (failed404s.length > 0) {
      console.log('Failed to load logos:', failed404s);
    }
    
    expect(failed404s).toHaveLength(0);
  });
});
