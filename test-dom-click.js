import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the application
  console.log('Navigating to Clinisord Dashboard...');
  await page.goto('https://ghkhl96de8sp.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for the map to load
  await page.waitForTimeout(3000);

  // Initial marker count
  let markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Initial marker count:', markers);

  // Expand the Competitor Panel
  console.log('\\n=== Expanding Competitor Panel ===');
  await page.locator('text=Competencia').first().click();
  await page.waitForTimeout(1000);

  // Click "Ocultar todas" button
  console.log('\\n=== Hiding all chains ===');
  await page.locator('button:has-text("Ocultar todas")').first().click();
  await page.waitForTimeout(1500);

  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after hiding all:', markers);

  // Now let's try clicking on the GAES checkbox SVG directly
  console.log('\\n=== Clicking GAES checkbox directly ===');
  
  // Find all checkboxes (SVG elements with checkmark)
  const checkboxes = await page.locator('svg[fill="currentColor"]').all();
  console.log('Found SVG checkboxes:', checkboxes.length);

  // The GAES checkbox should be somewhere in the list. Let's try clicking the first one
  // that's NOT the header icon
  const panelSvg = page.locator('.glass-panel svg[fill="currentColor"]');
  const svgCount = await panelSvg.count();
  console.log('SVG in panel:', svgCount);

  // Click on the second SVG (which should be the first chain checkbox)
  if (svgCount > 1) {
    console.log('Clicking on second SVG in panel...');
    await panelSvg.nth(1).click();
    await page.waitForTimeout(2000);
  }

  // Check marker count
  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after clicking checkbox:', markers);

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

  // If still not working, let's try a different approach - evaluate in page context
  console.log('\\n=== Trying programmatic click ===');
  
  await page.evaluate(() => {
    // Find the GAES row and click it using native DOM methods
    const rows = document.querySelectorAll('[class*="border-b border-slate-100"]');
    rows.forEach(row => {
      if (row.textContent.includes('GAES')) {
        console.log('Found GAES row via DOM:', row.textContent.substring(0, 50));
        row.click();
      }
    });
  });
  
  await page.waitForTimeout(2000);

  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after DOM click:', markers);

  // Check colors again
  const colorsAfterDOM = await page.evaluate(() => {
    const m = document.querySelectorAll('.leaflet-marker-icon');
    return [...new Set(Array.from(m).map(marker => {
      const child = marker.firstElementChild;
      return child ? window.getComputedStyle(child).background : 'unknown';
    }))];
  });
  console.log('Colors after DOM click:', colorsAfterDOM.length);
  console.log('Has red markers:', colorsAfterDOM.some(c => c.includes('rgb(239, 68, 68)')));

  // Take screenshot
  await page.screenshot({ path: '/workspace/test-final-dom.png', fullPage: true });
  console.log('\\nScreenshot saved');

  await browser.close();
})();
