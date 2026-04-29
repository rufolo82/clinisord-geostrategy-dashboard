import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

const consoleMessages = [];
const errors = [];

page.on('console', msg => {
  const text = msg.text();
  consoleMessages.push({ type: msg.type(), text });
  if (msg.type() === 'error') {
    errors.push(text);
  }
});

page.on('pageerror', err => {
  errors.push(err.message);
});

try {
  console.log('Navigating to dashboard...');
  await page.goto('https://j79cxva4ug3v.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Wait for the map to load
  await page.waitForSelector('.leaflet-container', { timeout: 10000 });
  console.log('Map loaded successfully\n');
  
  // Check initial state (Madrid)
  console.log('=== Initial State (Madrid) ===');
  
  // Get all competitor markers
  const initialMarkers = await page.$$('.leaflet-marker-icon');
  console.log(`Initial markers count: ${initialMarkers.length}`);
  
  // Click on Barcelona button
  console.log('\n=== Switching to Barcelona ===');
  const barcelonaBtn = await page.$('button:has-text("Barcelona")');
  if (barcelonaBtn) {
    await barcelonaBtn.click();
    console.log('Clicked Barcelona button');
    
    // Wait for map to update
    await page.waitForTimeout(2000);
    
    // Get markers after switching to Barcelona
    const barcelonaMarkers = await page.$$('.leaflet-marker-icon');
    console.log(`Markers after switching to Barcelona: ${barcelonaMarkers.length}`);
    
    // Check console for filtering logs
    console.log('\n=== Console Logs ===');
    const mapLogs = consoleMessages.filter(m => m.text.includes('[Map]'));
    mapLogs.forEach(log => console.log(`[${log.type}] ${log.text}`));
    
    // Switch back to Madrid
    console.log('\n=== Switching back to Madrid ===');
    const madridBtn = await page.$('button:has-text("Madrid")');
    if (madridBtn) {
      await madridBtn.click();
      console.log('Clicked Madrid button');
      
      // Wait for map to update
      await page.waitForTimeout(2000);
      
      // Get markers after switching back to Madrid
      const madridMarkers = await page.$$('.leaflet-marker-icon');
      console.log(`Markers after switching back to Madrid: ${madridMarkers.length}`);
    }
    
    // Verify markers exist
    console.log('\n=== Verification ===');
    if (barcelonaMarkers.length > 10) {
      console.log('✓ Barcelona has competitors displayed');
    } else {
      console.log('✗ Barcelona has NO or very few competitors displayed');
    }
    
    if (madridMarkers.length > 100) {
      console.log('✓ Madrid has competitors displayed');
    } else {
      console.log('✗ Madrid has NO or very few competitors displayed');
    }
    
  } else {
    console.log('✗ Barcelona button not found');
  }
  
  // Check for errors
  if (errors.length > 0) {
    console.log('\n=== Errors Found ===');
    errors.forEach(err => console.log(`ERROR: ${err}`));
  } else {
    console.log('\n✓ No JavaScript errors detected');
  }
  
} catch (error) {
  console.error('Test failed:', error.message);
} finally {
  await browser.close();
}
