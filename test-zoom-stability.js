import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push(msg.text());
  });

  try {
    console.log('=== ZOOM STABILITY DETAILED TEST ===\n');
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.leaflet-container', { timeout: 10000 });
    console.log('✓ Map loaded');

    // Store console logs before any action
    const logsBeforeClick = [...consoleMessages];

    // Click on map to select a location (this will zoom to 14)
    console.log('\n📍 Step 1: Clicking on map to select location...');
    await page.click('.leaflet-container', { position: { x: 400, y: 300 } });
    await page.waitForTimeout(2000);

    // Get logs after click
    const logsAfterClick = consoleMessages.filter(m => !logsBeforeClick.includes(m));
    const controllerLogsAfterClick = logsAfterClick.filter(m => m.includes('[MapController]'));
    console.log('   MapController logs after click:', controllerLogsAfterClick);

    // Now zoom in using the zoom controls
    console.log('\n🔍 Step 2: Using zoom controls to zoom in...');
    
    // Click zoom in button multiple times
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => {
        const zoomIn = document.querySelector('.leaflet-control-zoom-in');
        if (zoomIn) zoomIn.click();
      });
      await page.waitForTimeout(300);
    }
    await page.waitForTimeout(1000);

    // Store logs after zoom
    const logsAfterZoom = consoleMessages.filter(m => !logsBeforeClick.includes(m));
    const controllerLogsAfterZoom = logsAfterZoom.filter(m => m.includes('[MapController]'));
    console.log('   MapController logs after zooming:', controllerLogsAfterZoom);

    // Now hover over a marker and check if zoom changes
    console.log('\n🖱️  Step 3: Hovering over markers...');
    const markers = await page.$$('.leaflet-marker-icon');
    console.log(`   Found ${markers.length} markers`);

    if (markers.length > 0) {
      // Hover over the first marker
      console.log('   Hovering over marker 1...');
      await markers[0].hover();
      await page.waitForTimeout(1500);
      
      // Hover over a second marker
      if (markers.length > 1) {
        console.log('   Hovering over marker 2...');
        await markers[1].hover();
        await page.waitForTimeout(1500);
      }

      // Check if MapController was called during hover
      const allLogs = consoleMessages.filter(m => !logsBeforeClick.includes(m));
      const controllerLogs = allLogs.filter(m => m.includes('[MapController]'));
      
      console.log('\n📋 MapController logs summary:');
      if (controllerLogs.length > 0) {
        console.log(`   Total updates: ${controllerLogs.length}`);
        controllerLogs.forEach((log, i) => console.log(`   ${i + 1}. ${log}`));
      } else {
        console.log('   ✅ No MapController updates (zoom should be stable)');
      }

      // Check for any unexpected behavior
      const zoomOutLogs = controllerLogs.filter(l => l.includes('Updating zoom') && l.includes('to 6'));
      if (zoomOutLogs.length > 0) {
        console.log('\n❌ PROBLEM DETECTED: MapController is forcing zoom to 6');
        console.log('   This explains why the map zooms out when hovering.');
      } else {
        console.log('\n✅ MapController is not forcing zoom changes');
      }

      // Verify that the last zoom update was to 14 or higher
      const lastControllerLog = controllerLogs[controllerLogs.length - 1];
      if (lastControllerLog) {
        console.log(`\n📊 Last MapController update: ${lastControllerLog}`);
      }
    }

    console.log('\n=== FINAL RESULT ===');
    const controllerLogsFinal = consoleMessages.filter(m => m.includes('[MapController]'));
    const zoomChanges = controllerLogsFinal.filter(l => l.includes('Updating zoom'));
    
    if (zoomChanges.length > 0) {
      const lastChange = zoomChanges[zoomChanges.length - 1];
      console.log(`MapController updated zoom ${zoomChanges.length} time(s)`);
      console.log(`Last update: ${lastChange}`);
      
      // Check if the last update was to a reasonable zoom level
      if (lastChange.includes('to 6')) {
        console.log('\n❌ PROBLEM: Last zoom was set to 6');
        console.log('   This would cause the map to zoom out after hover.');
      } else {
        console.log('\n✅ Zoom level looks correct');
      }
    } else {
      console.log('✅ No MapController zoom updates detected');
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  } finally {
    await browser.close();
  }
})();
