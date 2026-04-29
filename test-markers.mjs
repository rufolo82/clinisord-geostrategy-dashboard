import { chromium } from 'playwright';

async function testMarkerCount() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  try {
    console.log('=== Testing Marker Counts by City ===\n');

    await page.goto('https://2vbvpv4ok032.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Get initial marker count (Madrid)
    console.log('1. Madrid markers:');
    let markers = await page.$$('.leaflet-marker-icon');
    console.log('   Count:', markers.length);

    // Click Barcelona
    console.log('\n2. Clicking Barcelona...');
    await page.click('button:has-text("Barcelona")');
    await page.waitForTimeout(3000);

    // Get Barcelona marker count
    console.log('\n3. Barcelona markers:');
    markers = await page.$$('.leaflet-marker-icon');
    console.log('   Count:', markers.length);

    // Click Madrid
    console.log('\n4. Clicking Madrid...');
    await page.click('button:has-text("Madrid")');
    await page.waitForTimeout(3000);

    // Get Madrid marker count again
    console.log('\n5. Madrid markers again:');
    markers = await page.$$('.leaflet-marker-icon');
    console.log('   Count:', markers.length);

    // Report errors
    console.log('\n6. Errors:');
    if (errors.length === 0) {
      console.log('   No errors!');
    } else {
      errors.forEach(e => console.log('   -', e.substring(0, 100)));
    }

    // Summary
    console.log('\n=== Summary ===');
    console.log('If Madrid has ~250 markers and Barcelona has ~100 markers,');
    console.log('then the city filtering is working correctly.');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

testMarkerCount();
