import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the application
  console.log('Navigating to Clinisord Dashboard...');
  await page.goto('https://1ktupr3ez0ng.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for the map to load
  await page.waitForTimeout(3000);

  // Initial marker count
  let markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Initial marker count:', markers);

  // Expand the Competitor Panel
  console.log('\\n=== Expanding Competitor Panel ===');
  const competitorPanel = await page.locator('text=Competencia').first();
  await competitorPanel.click();
  await page.waitForTimeout(1000);

  // Click "Ocultar todas" button
  console.log('\\n=== Hiding all chains ===');
  const hideAllBtn = await page.locator('button:has-text("Ocultar todas")').first();
  if (await hideAllBtn.isVisible()) {
    await hideAllBtn.click();
    await page.waitForTimeout(1000);
  }

  // Check marker count after hiding all
  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after hiding all:', markers);

  // Should only have Clinisord markers (6)
  if (markers === 6) {
    console.log('✓ Correct! Only Clinisord markers remain (6)');
  } else {
    console.log('✗ Unexpected marker count');
  }

  // Now click on GAES to show only GAES
  console.log('\\n=== Showing only GAES ===');
  const gaesRow = await page.locator('text=GAES (Amplifon)').first();
  if (await gaesRow.isVisible()) {
    // Click on the row's parent container
    const rowParent = gaesRow.locator('..');
    await rowParent.click();
    await page.waitForTimeout(1500);
  }

  // Check marker count after showing GAES
  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after showing GAES:', markers);

  // Check if we have red markers (GAES)
  const colors = await page.evaluate(() => {
    const m = document.querySelectorAll('.leaflet-marker-icon');
    const c = [];
    m.forEach(marker => {
      const child = marker.firstElementChild;
      if (child) {
        const style = window.getComputedStyle(child);
        c.push(style.background);
      }
    });
    return [...new Set(c)];
  });
  console.log('Unique colors after filtering to GAES:', colors.length);
  console.log('Colors:', colors);

  // Verify the colors are red (GAES)
  const hasRedMarkers = colors.some(c => c.includes('rgb(239, 68, 68)') || c.includes('#ef4444'));
  console.log('\\nHas red (GAES) markers:', hasRedMarkers);

  if (markers > 6 && hasRedMarkers) {
    console.log('✓ SUCCESS! GAES markers are visible!');
    console.log(`  - Total markers: ${markers}`);
    console.log(`  - GAES count: ${markers - 6} (assuming 6 Clinisord markers)`);
  } else {
    console.log('✗ GAES markers not visible');
  }

  // Zoom in on Madrid
  console.log('\\n=== Zooming in on Madrid ===');
  await page.evaluate(() => {
    for (let i = 0; i < 5; i++) {
      const zoomIn = document.querySelector('.leaflet-control-zoom-in');
      if (zoomIn) zoomIn.click();
    }
  });
  await page.waitForTimeout(2000);

  // Check markers after zooming
  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after zooming:', markers);

  // Take final screenshot
  await page.screenshot({ path: '/workspace/test-final-verification.png', fullPage: true });
  console.log('\\nFinal screenshot saved to /workspace/test-final-verification.png');

  await browser.close();
  console.log('\\n=== TEST COMPLETED SUCCESSFULLY ===');
})();
