import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture console messages
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  // Navigate to the application
  console.log('Navigating to Clinisord Dashboard...');
  await page.goto('https://fkoz318dbj8d.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });

  await page.waitForTimeout(3000);

  // Get initial marker count
  let markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Initial marker count:', markers);

  // Expand the Competitor Panel
  console.log('\\nExpanding panel...');
  await page.locator('text=Competencia').first().click();
  await page.waitForTimeout(1000);

  // Click "Ocultar todas"
  console.log('\\nClicking Ocultar todas...');
  await page.locator('button:has-text("Ocultar todas")').first().click();
  await page.waitForTimeout(2000);

  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after hiding all:', markers);

  // Click on GAES row
  console.log('\\nClicking GAES row...');
  const gaesRow = page.locator('div').filter({ has: page.locator('text=GAES (Amplifon)') }).first();
  await gaesRow.click({ force: true });
  await page.waitForTimeout(2000);

  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after clicking GAES:', markers);

  // Print console logs
  console.log('\\n=== Console Logs ===');
  consoleLogs.forEach(log => {
    if (log.text.includes('handleChainToggle') || log.text.includes('handleToggleAllChains') || 
        log.text.includes('chainVisibility') || log.text.includes('Updating')) {
      console.log(`[${log.type}] ${log.text}`);
    }
  });

  await browser.close();
})();
