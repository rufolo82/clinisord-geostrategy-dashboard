import { chromium } from 'playwright';

async function testCityFilter() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  try {
    console.log('=== Testing City Filter ===\n');

    await page.goto('https://ucp2kvkfc99y.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // 1. Check Madrid
    console.log('1. Madrid (initial):');
    let markers = await page.$$('.leaflet-marker-icon');
    console.log('   Markers:', markers.length);

    // 2. Go to Barcelona
    console.log('\n2. Going to Barcelona...');
    await page.click('button:has-text("Barcelona")');
    await page.waitForTimeout(3000);
    markers = await page.$$('.leaflet-marker-icon');
    console.log('   Markers:', markers.length);

    // 3. Go back to Madrid
    console.log('\n3. Going back to Madrid...');
    await page.click('button:has-text("Madrid")');
    await page.waitForTimeout(3000);
    markers = await page.$$('.leaflet-marker-icon');
    console.log('   Markers:', markers.length);

    // 4. Check Valencia
    console.log('\n4. Going to Valencia...');
    await page.click('button:has-text("Valencia")');
    await page.waitForTimeout(3000);
    markers = await page.$$('.leaflet-marker-icon');
    console.log('   Markers:', markers.length);

    // 5. Check Sevilla
    console.log('\n5. Going to Sevilla...');
    await page.click('button:has-text("Sevilla")');
    await page.waitForTimeout(3000);
    markers = await page.$$('.leaflet-marker-icon');
    console.log('   Markers:', markers.length);

    // 6. Errors
    console.log('\n=== Errors ===');
    if (errors.length === 0) {
      console.log('No errors!');
    } else {
      errors.forEach(e => console.log(' -', e.substring(0, 100)));
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

testCityFilter();
