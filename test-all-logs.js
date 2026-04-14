import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture all console messages
  const allLogs = [];
  page.on('console', msg => {
    allLogs.push({ type: msg.type(), text: msg.text() });
  });

  // Navigate to the application
  console.log('Navigating to Clinisord Dashboard...');
  await page.goto('https://u5k0kf755dw0.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });

  await page.waitForTimeout(3000);

  // Initial marker count
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
  console.log('\\nClicking on GAES row...');
  await page.evaluate(() => {
    const rows = document.querySelectorAll('[class*="border-b border-slate-100"]');
    rows.forEach(row => {
      if (row.textContent && row.textContent.includes('GAES (Amplifon)') && row.textContent.includes('69 centros')) {
        row.click();
      }
    });
  });
  await page.waitForTimeout(2000);

  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after clicking GAES:', markers);

  // Print all console logs related to chainVisibility
  console.log('\\n=== Console Logs ===');
  allLogs.forEach(log => {
    if (log.text.includes('chainVisibility')) {
      console.log(`[${log.type}] ${log.text}`);
    }
  });

  await browser.close();
})();
