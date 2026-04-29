import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture console messages for debugging
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  // Navigate to the application
  console.log('Navigating to Clinisord Dashboard...');
  await page.goto('https://yluolpb9rf69.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for the map to load
  await page.waitForTimeout(3000);

  // Get initial marker count
  const initialMarkers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Initial marker count:', initialMarkers);

  // Click on Competencia to expand the panel
  const competitorPanel = await page.locator('text=Competencia').first();
  await competitorPanel.click();
  await page.waitForTimeout(1000);

  // Check the visible count in the panel
  const panelInfo = await page.evaluate(() => {
    const panelText = document.body.textContent;
    const match = panelText.match(/(\d+)\/(\d+)/);
    return match ? { visible: match[1], total: match[2] } : null;
  });
  console.log('Panel visibility count:', panelInfo);

  // Click directly on the checkbox icon for GAES (more precise)
  console.log('Looking for GAES checkbox...');
  
  // Find all chain rows and their checkboxes
  const chainRows = await page.locator('[class*="border-b border-slate-100"]').all();
  console.log('Found chain rows:', chainRows.length);

  // Let's try a different approach - inject a console log to see the chainVisibility state
  const chainVisibility = await page.evaluate(() => {
    // Try to access the React component state (this is tricky)
    // Instead, let's check what's being rendered in the UI
    
    // Get all checked checkboxes
    const checkedBoxes = document.querySelectorAll('[class*="bg-primary-500"]');
    return {
      checkedCount: checkedBoxes.length,
      pageHTML: document.body.innerHTML.substring(0, 5000)
    };
  });
  
  console.log('Checked boxes found:', chainVisibility.checkedCount);

  // Let's try clicking with force
  console.log('Trying to click GAES with force...');
  
  // Get the GAES row by looking for its name
  const gaesRow = page.locator('text=GAES (Amplifon)').first();
  const rowBounds = await gaesRow.boundingBox();
  
  if (rowBounds) {
    console.log('GAES row found at:', rowBounds);
    // Click on the checkbox area (right side of the row)
    await page.mouse.click(rowBounds.x + rowBounds.width - 30, rowBounds.y + rowBounds.height / 2);
    await page.waitForTimeout(2000);
  }

  // Check markers again
  const markersAfterClick = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after clicking GAES:', markersAfterClick);

  // Check if there are markers with red color (GAES should be red)
  const markerColors = await page.evaluate(() => {
    const markers = document.querySelectorAll('.leaflet-marker-icon');
    return Array.from(markers).map(m => {
      const style = window.getComputedStyle(m.firstElementChild || m);
      return style.background;
    });
  });
  
  console.log('Marker backgrounds:', markerColors.slice(0, 10));

  // Take a screenshot
  await page.screenshot({ path: '/workspace/test-final-check.png', fullPage: true });
  console.log('Final screenshot saved');

  await browser.close();
})();
