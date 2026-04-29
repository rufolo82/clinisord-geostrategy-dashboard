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
  let markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Initial marker count:', markers);

  // Check for red markers (competitors)
  let colors = await page.evaluate(() => {
    const m = document.querySelectorAll('.leaflet-marker-icon');
    const c = [];
    m.forEach(marker => {
      const child = marker.firstElementChild;
      if (child) {
        const style = window.getComputedStyle(child);
        c.push(style.background);
      }
    });
    return c;
  });
  console.log('Initial unique colors:', [...new Set(colors)]);

  // Wait 5 seconds without clicking anything
  console.log('Waiting 5 seconds without clicking...');
  await page.waitForTimeout(5000);

  // Check markers again
  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after waiting:', markers);

  // Check colors
  colors = await page.evaluate(() => {
    const m = document.querySelectorAll('.leaflet-marker-icon');
    const c = [];
    m.forEach(marker => {
      const child = marker.firstElementChild;
      if (child) {
        const style = window.getComputedStyle(child);
        c.push(style.background);
      }
    });
    return c;
  });
  console.log('Colors after waiting (unique):', [...new Set(colors)]);

  // NOW try clicking on the panel - but be more careful about WHERE we click
  console.log('\\nNow clicking on Competencia header...');
  
  // Get the panel header bounds
  const panelHeader = await page.locator('text=Competencia').first();
  const headerBounds = await panelHeader.boundingBox();
  
  console.log('Panel header found at:', headerBounds);
  
  // Click on the left side (not the checkbox area)
  if (headerBounds) {
    await page.mouse.click(headerBounds.x + 10, headerBounds.y + headerBounds.height / 2);
    await page.waitForTimeout(2000);
  }

  // Check markers after clicking
  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after clicking header:', markers);

  colors = await page.evaluate(() => {
    const m = document.querySelectorAll('.leaflet-marker-icon');
    const c = [];
    m.forEach(marker => {
      const child = marker.firstElementChild;
      if (child) {
        const style = window.getComputedStyle(child);
        c.push(style.background);
      }
    });
    return c;
  });
  console.log('Colors after clicking header (unique):', [...new Set(colors)]);

  // Take screenshot
  await page.screenshot({ path: '/workspace/test-click-analysis.png', fullPage: true });
  console.log('Screenshot saved');

  await browser.close();
})();
