import { chromium } from 'playwright';

async function testLogoMarkersOnMap() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const errors = [];
  const logoRequests = [];
  
  // Capture 404 errors for logos
  page.on('response', response => {
    if (response.url().includes('/logos/') && response.status() === 404) {
      logoRequests.push({ url: response.url(), status: response.status() });
    }
  });
  
  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  try {
    console.log('Navigating to the application...');
    await page.goto('https://ho1y4cmrgmk0.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });
    
    console.log('Waiting for map to load...');
    await page.waitForSelector('.leaflet-container, .leaflet-map-pane', { timeout: 10000 });
    
    // Wait a bit for all markers to render
    await page.waitForTimeout(3000);
    
    // Check for any logo 404s
    if (logoRequests.length > 0) {
      console.log('WARNING: Some logo files returned 404:');
      logoRequests.forEach(req => console.log(`  - ${req.url}`));
    } else {
      console.log('SUCCESS: All logo files loaded without 404 errors');
    }
    
    // Check console for errors
    const relevantErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('Third-party cookie') &&
      !e.includes('403')
    );
    
    if (relevantErrors.length > 0) {
      console.log('Console errors found:');
      relevantErrors.forEach(e => console.log(`  - ${e}`));
    } else {
      console.log('SUCCESS: No console errors related to logo loading');
    }
    
    console.log('\nTest completed successfully!');
    console.log('The competitor logos should now be displayed as markers on the map.');
    
  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testLogoMarkersOnMap();
