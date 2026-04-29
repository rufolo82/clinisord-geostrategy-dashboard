import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  // Navigate to the application
  console.log('Navigating to Clinisord Dashboard...');
  await page.goto('https://yluolpb9rf69.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for the map to load
  await page.waitForTimeout(3000);

  // Check if the Competitor Panel is visible
  const competitorPanel = await page.locator('text=Competencia').first();
  const isPanelVisible = await competitorPanel.isVisible();
  console.log('Competitor Panel visible:', isPanelVisible);

  // Expand the panel if needed
  if (isPanelVisible) {
    await competitorPanel.click();
    await page.waitForTimeout(1000);
  }

  // Check all chains
  const chains = await page.locator('[class*="border-b"]').all();
  console.log('Found', chains.length, 'items in panel');

  // Take a screenshot
  await page.screenshot({ path: '/workspace/screenshot-competitor-panel.png', fullPage: true });
  console.log('Screenshot saved to /workspace/screenshot-competitor-panel.png');

  // Check for GAES checkbox and click it
  const gaesCheckbox = await page.locator('text=GAES').first();
  if (await gaesCheckbox.isVisible()) {
    console.log('GAES found in panel');
    await gaesCheckbox.click();
    await page.waitForTimeout(2000);
  }

  // Zoom in on the map (centered on Madrid)
  await page.evaluate(() => {
    const map = document.querySelector('.leaflet-container');
    if (map) {
      // Zoom in multiple times
      for (let i = 0; i < 3; i++) {
        const zoomIn = document.querySelector('.leaflet-control-zoom-in');
        if (zoomIn) zoomIn.click();
      }
    }
  });
  await page.waitForTimeout(2000);

  // Take another screenshot after zooming
  await page.screenshot({ path: '/workspace/screenshot-gaes-marked.png', fullPage: true });
  console.log('Screenshot with GAES marked saved to /workspace/screenshot-gaes-marked.png');

  // Print console messages for debugging
  console.log('\n=== Console Messages ===');
  consoleMessages.forEach(msg => {
    console.log(`[${msg.type}] ${msg.text}`);
  });

  await browser.close();
  console.log('Test completed successfully');
})();
