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

  // Get initial marker count
  const initialMarkers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Initial marker count:', initialMarkers);

  // Check marker colors
  const markerColors = await page.evaluate(() => {
    const markers = document.querySelectorAll('.leaflet-marker-icon');
    return Array.from(markers).map(m => {
      const child = m.firstElementChild;
      if (child) {
        const style = window.getComputedStyle(child);
        return style.background;
      }
      return 'unknown';
    });
  });
  console.log('Initial marker colors (sample):', markerColors.slice(0, 5));

  // Click on Competencia to expand the panel
  const competitorPanel = await page.locator('text=Competencia').first();
  await competitorPanel.click();
  await page.waitForTimeout(1000);

  // Check panel info
  const panelInfo = await page.evaluate(() => {
    const panelText = document.body.textContent;
    const match = panelText.match(/(\d+)\/(\d+)/);
    return match ? { visible: match[1], total: match[2] } : null;
  });
  console.log('Panel visibility count:', panelInfo);

  // Get markers after panel opens
  const markersAfterPanel = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after panel opens:', markersAfterPanel);

  // Zoom in on Madrid
  await page.evaluate(() => {
    for (let i = 0; i < 5; i++) {
      const zoomIn = document.querySelector('.leaflet-control-zoom-in');
      if (zoomIn) zoomIn.click();
    }
  });
  await page.waitForTimeout(2000);

  // Check markers after zooming
  const markersAfterZoom = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after zooming:', markersAfterZoom);

  // Check marker colors after zooming
  const colorsAfterZoom = await page.evaluate(() => {
    const markers = document.querySelectorAll('.leaflet-marker-icon');
    const colors = [];
    markers.forEach(m => {
      const child = m.firstElementChild;
      if (child) {
        const style = window.getComputedStyle(child);
        colors.push(style.background);
      }
    });
    return colors;
  });
  console.log('Marker colors after zooming (unique):', [...new Set(colorsAfterZoom)].slice(0, 5));

  // Check for GAES markers (red color)
  const hasRedMarkers = colorsAfterZoom.some(c => c.includes('rgb(239, 68, 68)') || c.includes('#ef4444'));
  console.log('Has red (GAES) markers:', hasRedMarkers);

  // Check for cyan markers (Clinisord)
  const hasCyanMarkers = colorsAfterZoom.some(c => c.includes('rgb(14, 165, 233)') || c.includes('#0ea5e9'));
  console.log('Has cyan (Clinisord) markers:', hasCyanMarkers);

  // Take screenshot
  await page.screenshot({ path: '/workspace/test-fixed.png', fullPage: true });
  console.log('Screenshot saved to /workspace/test-fixed.png');

  await browser.close();
  console.log('\nTest completed successfully!');
})();
