import { chromium } from 'playwright';

async function testCityChange() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const pageErrors = [];
  page.on('pageerror', err => {
    pageErrors.push(err.message);
  });

  try {
    console.log('1. Loading dashboard...');
    await page.goto('https://2vbvpv4ok032.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    console.log('   Dashboard loaded successfully');

    // Check initial state (Madrid)
    const initialMapCenter = await page.evaluate(() => {
      return window.map ? { lat: map.getCenter().lat, lng: map.getCenter().lng } : null;
    });
    console.log('   Initial map center:', initialMapCenter);

    // Click on Barcelona button
    console.log('\n2. Clicking Barcelona button...');
    const barcelonaButton = await page.$('button:has-text("Barcelona")');
    if (barcelonaButton) {
      await barcelonaButton.click();
      await page.waitForTimeout(2000);
      console.log('   Barcelona button clicked');

      // Check if panel shows Barcelona
      const panelText = await page.textContent('.glass-panel');
      console.log('   Panel contains Barcelona:', panelText.includes('Barcelona'));

      // Check map center changed
      const newMapCenter = await page.evaluate(() => {
        return window.map ? { lat: map.getCenter().lat, lng: map.getCenter().lng } : null;
      });
      console.log('   New map center:', newMapCenter);

      // Check competitors panel
      const competitorsPanel = await page.$('text=Competencia');
      console.log('   Competitors panel found:', !!competitorsPanel);

    } else {
      console.log('   ERROR: Barcelona button not found');
    }

    // Click on Madrid button to return
    console.log('\n3. Clicking Madrid button to return...');
    const madridButton = await page.$('button:has-text("Madrid")');
    if (madridButton) {
      await madridButton.click();
      await page.waitForTimeout(2000);
      console.log('   Madrid button clicked');

      const returnedCenter = await page.evaluate(() => {
        return window.map ? { lat: map.getCenter().lat, lng: map.getCenter().lng } : null;
      });
      console.log('   Returned map center:', returnedCenter);
    }

    // Report errors
    console.log('\n=== Console Errors ===');
    if (consoleErrors.length === 0) {
      console.log('No console errors');
    } else {
      consoleErrors.forEach(err => console.log('ERROR:', err));
    }

    console.log('\n=== Page Errors ===');
    if (pageErrors.length === 0) {
      console.log('No page errors');
    } else {
      pageErrors.forEach(err => console.log('ERROR:', err));
    }

  } catch (error) {
    console.error('\nTest failed:', error.message);
  } finally {
    await browser.close();
  }
}

testCityChange();
