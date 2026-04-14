import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the application
  console.log('Navigating to Clinisord Dashboard...');
  await page.goto('https://ghkhl96de8sp.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });

  await page.waitForTimeout(3000);

  // Expand the Competitor Panel
  console.log('Expanding panel...');
  await page.locator('text=Competencia').first().click();
  await page.waitForTimeout(1000);

  // Get panel HTML to see what's rendered
  const panelHTML = await page.evaluate(() => {
    const panel = document.querySelector('.glass-panel');
    return panel ? panel.innerHTML.substring(0, 3000) : 'Panel not found';
  });
  console.log('\\nPanel HTML (first 3000 chars):');
  console.log(panelHTML);

  // Click "Ocultar todas"
  console.log('\\nClicking Ocultar todas...');
  await page.locator('button:has-text("Ocultar todas")').first().click();
  await page.waitForTimeout(2000);

  // Check panel HTML again
  const panelHTMLAfter = await page.evaluate(() => {
    const panel = document.querySelector('.glass-panel');
    return panel ? panel.innerHTML.substring(0, 3000) : 'Panel not found';
  });
  console.log('\\nPanel HTML after hiding all:');
  console.log(panelHTMLAfter);

  // Get the chainVisibility state from the page
  const visibilityState = await page.evaluate(() => {
    // Try to find any indicator of chain visibility
    const buttons = document.querySelectorAll('button');
    const buttonTexts = Array.from(buttons).map(b => b.textContent);
    return buttonTexts;
  });
  console.log('\\nButton texts found:', visibilityState.filter(t => t.includes('GAES') || t.includes('Ocultar') || t.includes('Mostrar')));

  // Check if the checkboxes are being rendered
  const checkboxInfo = await page.evaluate(() => {
    const panel = document.querySelector('.glass-panel');
    if (!panel) return { found: false };
    
    const checkboxes = panel.querySelectorAll('[class*="border-2"]');
    return {
      found: true,
      count: checkboxes.length,
      classes: Array.from(checkboxes).map(c => c.className)
    };
  });
  console.log('\\nCheckbox info:', checkboxInfo);

  // Let's try clicking using a more specific selector
  console.log('\\n=== Trying specific click on GAES row ===');
  
  // Get all rows that might be chain rows
  const rows = await page.evaluate(() => {
    const divs = document.querySelectorAll('div');
    const chainRows = [];
    divs.forEach(div => {
      if (div.textContent && div.textContent.includes('GAES') && div.textContent.includes('centros')) {
        chainRows.push({
          text: div.textContent.substring(0, 100),
          className: div.className
        });
      }
    });
    return chainRows;
  });
  
  console.log('Found GAES rows:', rows.length);
  rows.forEach((row, i) => {
    console.log(`Row ${i}: ${row.text}`);
    console.log(`Classes: ${row.className}`);
  });

  // Try clicking using evaluate
  await page.evaluate(() => {
    const divs = document.querySelectorAll('div');
    divs.forEach(div => {
      if (div.textContent && div.textContent.includes('GAES') && div.textContent.includes('centros')) {
        console.log('Clicking GAES row via evaluate...');
        div.click();
      }
    });
  });
  
  await page.waitForTimeout(2000);

  // Check markers
  const markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('\\nMarker count after clicking GAES:', markers);

  // Take screenshot
  await page.screenshot({ path: '/workspace/test-gaes-debug.png', fullPage: true });
  console.log('\\nScreenshot saved');

  await browser.close();
})();
