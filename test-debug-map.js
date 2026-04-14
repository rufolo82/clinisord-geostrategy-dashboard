import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleMessages = [];

  // Capture all console messages
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push({ type: msg.type(), text });
  });

  try {
    console.log('Navigating to the dashboard...');
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for map to load
    await page.waitForSelector('.leaflet-container', { timeout: 10000 });
    console.log('Map loaded successfully');

    // Wait for initial render
    await page.waitForTimeout(3000);

    // Check initial marker count
    const initialMarkerCount = await page.evaluate(() => {
      return document.querySelectorAll('.leaflet-marker-icon').length;
    });
    console.log(`\nInitial marker count: ${initialMarkerCount}`);

    // Get initial [DEBUG] logs
    const initialDebugLogs = consoleMessages.filter(m => m.text.includes('[DEBUG]'));
    console.log('\n=== Initial [DEBUG] Logs ===');
    initialDebugLogs.forEach(log => {
      console.log(log.text);
    });

    // Find the competitor panel
    console.log('\n=== Finding Competitor Panel ===');
    const panelExists = await page.locator('text=Competencia').first().isVisible();
    console.log('Competitor panel visible:', panelExists);

    // Find all chain rows in the panel
    const chainRows = await page.locator('[class*="border-b border-slate-100"]').all();
    console.log(`Found ${chainRows.length} potential chain rows`);

    // Click on the "Mostrar todas" / "Ocultar todas" button first
    const toggleAllButton = await page.locator('text=/Mostrar todas|Ocultar todas/i').first();
    const toggleAllVisible = await toggleAllButton.isVisible();
    console.log('Toggle All button visible:', toggleAllVisible);

    if (toggleAllVisible) {
      console.log('\n=== Clicking "Ocultar todas" button ===');
      await toggleAllButton.click();
      await page.waitForTimeout(2000);

      // Check for new logs
      const afterHideLogs = consoleMessages.filter(m => m.text.includes('[DEBUG]'));
      console.log('\n=== [DEBUG] Logs After Hiding All ===');
      afterHideLogs.forEach(log => {
        console.log(log.text);
      });

      // Check marker count
      const afterHideCount = await page.evaluate(() => {
        return document.querySelectorAll('.leaflet-marker-icon').length;
      });
      console.log(`\nMarker count after hiding all: ${afterHideCount}`);

      // Now click on GAES to show only GAES
      console.log('\n=== Looking for GAES row to click ===');
      
      // Find GAES by searching for text that includes GAES
      const gaesRow = await page.locator('text=/GAES/i').first();
      const isGaesVisible = await gaesRow.isVisible();
      console.log('GAES text visible:', isGaesVisible);

      if (isGaesVisible) {
        // Try to find the parent row that contains the click handler
        const gaesParentRow = await page.locator('text=GAES').locator('xpath=../..');
        console.log('Clicking on GAES parent row...');
        await gaesParentRow.click();
        
        await page.waitForTimeout(2000);

        // Check for new logs
        const afterGaesLogs = consoleMessages.filter(m => m.text.includes('[DEBUG]'));
        console.log('\n=== [DEBUG] Logs After Showing GAES ===');
        afterGaesLogs.forEach(log => {
          console.log(log.text);
        });

        // Check marker count
        const afterGaesCount = await page.evaluate(() => {
          return document.querySelectorAll('.leaflet-marker-icon').length;
        });
        console.log(`\nMarker count after showing GAES: ${afterGaesCount}`);
      }
    }

    // Get all [DEBUG] logs
    const allDebugLogs = consoleMessages.filter(m => m.text.includes('[DEBUG]'));
    console.log('\n=== All [DEBUG] Logs ===');
    allDebugLogs.forEach(log => {
      console.log(log.text);
    });

    // Get Dashboard logs too
    const dashboardLogs = consoleMessages.filter(m => m.text.includes('chainVisibility') || m.text.includes('handleChainToggle'));
    console.log('\n=== Dashboard Logs ===');
    dashboardLogs.forEach(log => {
      console.log(log.text);
    });

  } catch (error) {
    console.error('Test error:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();
