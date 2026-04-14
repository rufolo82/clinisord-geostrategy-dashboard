import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the application
  console.log('Navigating to Clinisord Dashboard...');
  await page.goto('https://ghkhl96de8sp.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });

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

  // Click "Ocultar todas" to hide all chains
  console.log('Hiding all chains...');
  await page.locator('button:has-text("Ocultar todas")').first().click();
  await page.waitForTimeout(1500);

  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after hiding all:', markers);

  // Now try clicking on the GAES row with force
  console.log('\\n=== Clicking GAES row with force ===');
  
  // Find the GAES row div
  const gaesRow = page.locator('div').filter({ has: page.locator('text=GAES (Amplifon)') }).first();
  
  if (await gaesRow.count() > 0) {
    console.log('Found GAES row, clicking with force...');
    await gaesRow.click({ force: true });
    await page.waitForTimeout(2000);
  } else {
    console.log('GAES row not found with filter, trying alternative approach...');
    
    // Alternative: click on the checkbox area of the first row that contains GAES
    await page.evaluate(() => {
      const rows = document.querySelectorAll('[class*="border-b border-slate-100"]');
      rows.forEach(row => {
        if (row.textContent && row.textContent.includes('GAES') && row.textContent.includes('69 centros')) {
          console.log('Found GAES row via evaluate, clicking...');
          // Try to find a clickable element inside
          const clickables = row.querySelectorAll('div, button, span');
          clickables.forEach(el => {
            if (el.getBoundingClientRect().width > 0) {
              el.click();
              console.log('Clicked element:', el.className, el.textContent?.substring(0, 30));
            }
          });
        }
      });
    });
    await page.waitForTimeout(2000);
  }

  // Check markers
  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('\\nMarker count after clicking GAES:', markers);

  // Check colors
  const colors = await page.evaluate(() => {
    const m = document.querySelectorAll('.leaflet-marker-icon');
    return [...new Set(Array.from(m).map(marker => {
      const child = marker.firstElementChild;
      return child ? window.getComputedStyle(child).background : 'unknown';
    }))];
  });
  console.log('Unique colors:', colors.length);
  console.log('Has red (GAES):', colors.some(c => c.includes('rgb(239, 68, 68)')));

  // If still not working, let's try clicking multiple times
  if (markers === 6) {
    console.log('\\n=== Trying multiple clicks ===');
    
    // Click on the toggle all button first (to show all)
    await page.locator('button:has-text("Mostrar todas")').first().click();
    await page.waitForTimeout(1500);
    
    markers = await page.evaluate(() => {
      return document.querySelectorAll('.leaflet-marker-icon').length;
    });
    console.log('Marker count after "Mostrar todas":', markers);
    
    if (markers > 6) {
      console.log('✓ SUCCESS! The toggle button works!');
    }
  }

  // Take final screenshot
  await page.screenshot({ path: '/workspace/test-final-attempt.png', fullPage: true });
  console.log('\\nScreenshot saved');

  await browser.close();
})();
