import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the application
  console.log('Navigating to Clinisord Dashboard...');
  await page.goto('https://fkoz318dbj8d.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });

  await page.waitForTimeout(3000);

  // Expand the Competitor Panel
  console.log('Expanding panel...');
  await page.locator('text=Competencia').first().click();
  await page.waitForTimeout(1000);

  // Click "Ocultar todas"
  console.log('Clicking Ocultar todas...');
  await page.locator('button:has-text("Ocultar todas")').first().click();
  await page.waitForTimeout(2000);

  // Get all chain rows
  const chainRows = await page.evaluate(() => {
    const rows = document.querySelectorAll('[class*="border-b border-slate-100"]');
    return Array.from(rows).map((row, i) => ({
      index: i,
      text: row.textContent?.substring(0, 80) || '',
      visible: row.offsetWidth > 0 && row.offsetHeight > 0,
      opacity: window.getComputedStyle(row).opacity
    }));
  });
  
  console.log('\\nChain rows found:');
  chainRows.forEach(row => {
    console.log(`  ${row.index}: ${row.text} | visible: ${row.visible} | opacity: ${row.opacity}`);
  });

  // Find the GAES row specifically
  const gaesRow = chainRows.find(row => row.text.includes('GAES (Amplifon)'));
  console.log('\\nGAES row index:', gaesRow?.index);
  console.log('GAES row visible:', gaesRow?.visible);
  console.log('GAES row opacity:', gaesRow?.opacity);

  // Click on the GAES row using its index
  console.log('\\nClicking on GAES row using evaluate...');
  
  await page.evaluate(() => {
    const rows = document.querySelectorAll('[class*="border-b border-slate-100"]');
    rows.forEach((row, i) => {
      if (row.textContent && row.textContent.includes('GAES (Amplifon)') && row.textContent.includes('69 centros')) {
        console.log(`Clicking row ${i}: ${row.textContent.substring(0, 50)}`);
        row.click();
      }
    });
  });
  
  await page.waitForTimeout(2000);

  // Check the state after clicking
  const stateAfterClick = await page.evaluate(() => {
    const rows = document.querySelectorAll('[class*="border-b border-slate-100"]');
    return Array.from(rows).map((row, i) => ({
      index: i,
      text: row.textContent?.substring(0, 80) || '',
      opacity: window.getComputedStyle(row).opacity
    })).filter(r => r.text.includes('GAES') || r.text.includes('Aural') || r.text.includes('Audika'));
  });
  
  console.log('\\nRows after clicking GAES:');
  stateAfterClick.forEach(row => {
    console.log(`  ${row.index}: ${row.text} | opacity: ${row.opacity}`);
  });

  // Check markers
  const markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('\\nMarker count:', markers);

  await browser.close();
})();
