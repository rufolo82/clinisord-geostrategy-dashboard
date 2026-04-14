import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the application
  console.log('Navigating to Clinisord Dashboard...');
  await page.goto('https://yluolpb9rf69.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for the map to load
  await page.waitForTimeout(3000);

  // Click on Competencia to expand the panel
  const competitorPanel = await page.locator('text=Competencia').first();
  if (await competitorPanel.isVisible()) {
    await competitorPanel.click();
    await page.waitForTimeout(1000);
  }

  // Hide all chains first
  const hideAllBtn = await page.locator('button:has-text("Ocultar todas")').first();
  if (await hideAllBtn.isVisible()) {
    console.log('Hiding all chains...');
    await hideAllBtn.click();
    await page.waitForTimeout(500);
  }

  // Now show only GAES - click on the GAES row
  // Let's find the GAES checkbox area
  const gaesRow = await page.locator('text=GAES (Amplifon)').first();
  if (await gaesRow.isVisible()) {
    console.log('Found GAES row, clicking...');
    await gaesRow.locator('..').click();
    await page.waitForTimeout(1000);
  }

  // Take screenshot
  await page.screenshot({ path: '/workspace/test-gaes-visible.png', fullPage: true });
  console.log('Screenshot after selecting GAES only');

  // Check the marker elements
  const markerInfo = await page.evaluate(() => {
    const markers = document.querySelectorAll('.leaflet-marker-icon');
    const markerDetails = [];
    
    markers.forEach((marker, index) => {
      const style = window.getComputedStyle(marker);
      const backgroundColor = style.background;
      markerDetails.push({
        index,
        backgroundColor,
        width: style.width,
        height: style.height
      });
    });

    // Also check for custom markers with gradient
    const customMarkers = document.querySelectorAll('.custom-marker');
    const customMarkerCount = customMarkers.length;

    return {
      totalMarkers: markers.length,
      customMarkers: customMarkerCount,
      markerDetails,
      htmlContent: Array.from(markers).map(m => m.innerHTML).slice(0, 3)
    };
  });

  console.log('Marker analysis:');
  console.log('- Total leaflet markers:', markerInfo.totalMarkers);
  console.log('- Custom markers:', markerInfo.customMarkers);
  markerInfo.markerDetails.forEach(m => {
    console.log(`  - Marker ${m.index}: bg=${m.backgroundColor}, size=${m.width}x${m.height}`);
  });

  // Check if there are any GAES-related popup content
  const popupContent = await page.evaluate(() => {
    const popups = document.querySelectorAll('.leaflet-popup-content');
    return Array.from(popups).slice(0, 3).map(p => p.textContent.substring(0, 200));
  });
  
  console.log('\nPopup content (first 3):');
  popupContent.forEach((content, i) => {
    console.log(`${i + 1}. ${content}...`);
  });

  await browser.close();
  console.log('\nTest completed');
})();
