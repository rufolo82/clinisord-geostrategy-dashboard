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

  // Take initial screenshot
  await page.screenshot({ path: '/workspace/test-initial.png', fullPage: true });
  console.log('Initial screenshot saved');

  // Check if the Competitor Panel is visible
  const competitorPanel = await page.locator('text=Competencia').first();
  const isPanelVisible = await competitorPanel.isVisible();
  console.log('Competitor Panel visible:', isPanelVisible);

  // Click on Competencia to expand the panel
  if (isPanelVisible) {
    await competitorPanel.click();
    await page.waitForTimeout(1000);
  }

  // Uncheck all chains except GAES
  // First, let's see what chains are available
  const allCheckboxes = await page.locator('button:has-text("Ocultar todas")').first();
  if (await allCheckboxes.isVisible()) {
    console.log('Clicking Ocultar todas to hide all');
    await allCheckboxes.click();
    await page.waitForTimeout(500);
  }

  // Now click on GAES to show only GAES
  const gaesRow = await page.locator('text=GAES (Amplifon)').first();
  if (await gaesRow.isVisible()) {
    console.log('Clicking on GAES row to show it');
    
    // Find the parent element that contains the clickable area
    const gaesParent = gaesRow.locator('..');
    await gaesParent.click();
    await page.waitForTimeout(1000);
  }

  // Take screenshot after selecting GAES
  await page.screenshot({ path: '/workspace/test-after-gaes.png', fullPage: true });
  console.log('Screenshot after selecting GAES saved');

  // Zoom in on Madrid multiple times
  await page.evaluate(() => {
    for (let i = 0; i < 5; i++) {
      const zoomIn = document.querySelector('.leaflet-control-zoom-in');
      if (zoomIn) zoomIn.click();
      // Wait a bit between zooms
    }
  });
  await page.waitForTimeout(2000);

  // Take screenshot after zooming
  await page.screenshot({ path: '/workspace/test-after-zoom.png', fullPage: true });
  console.log('Screenshot after zooming saved');

  // Check for any error messages or warnings
  console.log('\n=== Console Messages ===');
  consoleMessages.forEach(msg => {
    if (msg.type === 'error' || msg.type === 'warning') {
      console.log(`[${msg.type}] ${msg.text}`);
    }
  });

  // Try to check if there are any marker elements on the map
  const markers = await page.evaluate(() => {
    const markerElements = document.querySelectorAll('.leaflet-marker-icon');
    return {
      count: markerElements.length,
      hasCustomMarkers: document.querySelectorAll('.custom-marker').length
    };
  });
  console.log('Marker elements found:', markers);

  // Check if map is interactive by clicking on a location
  console.log('Clicking on Madrid city center to select a location...');
  await page.click('.leaflet-container', { position: { x: 400, y: 300 } });
  await page.waitForTimeout(2000);

  // Take screenshot after clicking
  await page.screenshot({ path: '/workspace/test-after-click.png', fullPage: true });
  console.log('Screenshot after clicking on map saved');

  // Check console for any errors after interaction
  console.log('\n=== All Console Messages ===');
  consoleMessages.forEach(msg => {
    console.log(`[${msg.type}] ${msg.text}`);
  });

  await browser.close();
  console.log('Test completed successfully');
})();
