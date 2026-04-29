import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  try {
    console.log('=== ZOOM STABILITY DEBUG TEST ===\n');
    
    await page.goto('https://5ucx5n7uhi0l.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.leaflet-container', { timeout: 10000 });
    console.log('✓ Map loaded');

    // Store initial logs
    const initialLogs = [...consoleMessages];

    // Click on map to select a location (zooms to 14)
    console.log('\n📍 Step 1: Clicking on map...');
    await page.click('.leaflet-container', { position: { x: 400, y: 300 } });
    await page.waitForTimeout(2000);

    // Click zoom in 10 times
    console.log('\n🔍 Step 2: Zooming in 10 times...');
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => {
        const zoomIn = document.querySelector('.leaflet-control-zoom-in');
        if (zoomIn) zoomIn.click();
      });
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(1000);

    // Get logs after zooming
    const logsAfterZoom = consoleMessages.filter(m => !initialLogs.includes(m));
    const mapControllerLogs = logsAfterZoom.filter(m => m.text.includes('[MapController]'));
    console.log(`   MapController logs after zooming: ${mapControllerLogs.length}`);
    mapControllerLogs.forEach(log => console.log(`   - ${log.text}`));

    // Now hover over markers
    console.log('\n🖱️  Step 3: Hovering over markers...');
    const markers = await page.$$('.leaflet-marker-icon');
    console.log(`   Found ${markers.length} markers`);

    // Hover over each marker
    for (let i = 0; i < Math.min(5, markers.length); i++) {
      console.log(`   Hovering over marker ${i + 1}...`);
      await markers[i].hover();
      await page.waitForTimeout(500);
    }

    // Get logs during hover
    const logsAfterHover = consoleMessages.filter(m => !initialLogs.includes(m));
    const hoverMapControllerLogs = logsAfterHover.filter(m => m.text.includes('[MapController]'));
    console.log(`\n📊 MapController logs during hover: ${hoverMapControllerLogs.length}`);
    hoverMapControllerLogs.forEach(log => console.log(`   - ${log.text}`));

    // Check for any zoom changes
    const zoomChangeLogs = logsAfterHover.filter(m => m.text.includes('Updating zoom'));
    console.log(`\n🔄 Zoom change logs: ${zoomChangeLogs.length}`);
    zoomChangeLogs.forEach(log => console.log(`   - ${log.text}`));

    // Summary
    console.log('\n=== SUMMARY ===');
    if (hoverMapControllerLogs.length > 0) {
      console.log('❌ PROBLEM: MapController is updating during hover');
      console.log('   This causes the zoom to reset.');
      hoverMapControllerLogs.forEach(log => console.log(`   ${log.text}`));
    } else {
      console.log('✅ MapController is NOT updating during hover');
      console.log('   The zoom should be stable.');
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();
