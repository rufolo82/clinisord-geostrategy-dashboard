import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('=== COMPETITOR PANEL TEST ===\n');
    
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.leaflet-container', { timeout: 10000 });
    console.log('✓ Map loaded');

    // Initial state
    const initialCount = await page.evaluate(() => document.querySelectorAll('.leaflet-marker-icon').length);
    console.log(`\n📍 Initial state: ${initialCount} markers`);
    console.log('   (All competitors + Clinisord centers)');

    // Click "Ocultar todas" button
    console.log('\n🖱️  Clicking "Ocultar todas" button...');
    await page.locator('text=/Ocultar todas/i').click();
    await page.waitForTimeout(2000);
    
    const afterHideCount = await page.evaluate(() => document.querySelectorAll('.leaflet-marker-icon').length);
    console.log(`📍 After hiding all: ${afterHideCount} markers`);
    console.log('   (Only Clinisord centers should remain)');

    // Click on GAES row
    console.log('\n🖱️  Clicking on GAES row to show only GAES...');
    const gaesRow = await page.locator('text=/^GAES/i').first();
    await gaesRow.click();
    await page.waitForTimeout(2000);
    
    const afterGaesCount = await page.evaluate(() => document.querySelectorAll('.leaflet-marker-icon').length);
    console.log(`📍 After selecting GAES: ${afterGaesCount} markers`);
    const gaesOnlyCount = afterGaesCount - 6; // Subtract Clinisord markers
    console.log(`   (${gaesOnlyCount} GAES centers + 6 Clinisord centers)`);

    // Now zoom in to see more detail
    console.log('\n🔍 Zooming in on Madrid...');
    await page.evaluate(() => {
      const map = document.querySelector('.leaflet-container');
      if (map) {
        // Simulate zoom by scrolling or clicking zoom buttons
        const zoomButtons = document.querySelectorAll('.leaflet-control-zoom a');
        if (zoomButtons.length >= 2) {
          zoomButtons[1].click(); // Click zoom in button
        }
      }
    });
    await page.waitForTimeout(1500);
    
    const afterZoomCount = await page.evaluate(() => document.querySelectorAll('.leaflet-marker-icon').length);
    console.log(`📍 After zooming in: ${afterZoomCount} markers`);

    // Take a screenshot
    console.log('\n📸 Taking screenshot...');
    await page.screenshot({ path: '/workspace/gaes-filter-test.png', fullPage: true });
    console.log('   Screenshot saved to: /workspace/gaes-filter-test.png');

    // Summary
    console.log('\n=== TEST SUMMARY ===');
    console.log(`✅ Initial load: ${initialCount} markers`);
    console.log(`✅ After hiding all: ${afterHideCount} markers`);
    console.log(`✅ After selecting GAES: ${afterGaesCount} markers`);
    console.log(`✅ After zooming: ${afterZoomCount} markers`);
    
    if (afterHideCount === 6 && afterGaesCount > 6 && afterGaesCount < initialCount) {
      console.log('\n🎉 COMPETITOR PANEL IS WORKING CORRECTLY!');
      console.log('   The filtering logic is functioning as expected.');
    } else {
      console.log('\n⚠️  Unexpected results - may need further investigation');
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  } finally {
    await browser.close();
  }
})();
