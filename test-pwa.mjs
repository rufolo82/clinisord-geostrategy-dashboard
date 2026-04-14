import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

const consoleMessages = [];

page.on('console', msg => {
  const text = msg.text();
  consoleMessages.push({ type: msg.type(), text });
});

try {
  console.log('=== PWA Verification Test ===\n');
  
  // Test 1: Check if manifest is accessible
  console.log('Test 1: Checking manifest...');
  const manifestResponse = await page.goto('https://rox5pejaivu5.space.minimax.io/manifest.json', { 
    waitUntil: 'networkidle' 
  });
  console.log(`Manifest status: ${manifestResponse.status()}`);
  
  // Test 2: Check if service worker is registered
  console.log('\nTest 2: Checking service worker registration...');
  await page.goto('https://rox5pejaivu5.space.minimax.io', { waitUntil: 'networkidle' });
  
  // Wait a bit for service worker to register
  await page.waitForTimeout(2000);
  
  // Check for service worker registration message
  const swLogs = consoleMessages.filter(m => m.text.includes('ServiceWorker') || m.text.includes('service worker'));
  swLogs.forEach(log => console.log(`  [${log.type}] ${log.text}`));
  
  // Test 3: Check for PWA meta tags
  console.log('\nTest 3: Checking PWA meta tags...');
  const themeColor = await page.$eval('meta[name="theme-color"]', el => el.content).catch(() => 'NOT FOUND');
  const appleMobileWebAppCapable = await page.$eval('meta[name="apple-mobile-web-app-capable"]', el => el.content).catch(() => 'NOT FOUND');
  console.log(`  Theme color: ${themeColor}`);
  console.log(`  Apple mobile web app capable: ${appleMobileWebAppCapable}`);
  
  // Test 4: Check for manifest link
  console.log('\nTest 4: Checking manifest link...');
  const manifestLink = await page.$eval('link[rel="manifest"]', el => el.href).catch(() => 'NOT FOUND');
  console.log(`  Manifest URL: ${manifestLink}`);
  
  // Test 5: Check icons exist
  console.log('\nTest 5: Checking icons...');
  const icon192Response = await page.goto('https://rox5pejaivu5.space.minimax.io/icons/icon-192.svg', { 
    waitUntil: 'networkidle' 
  });
  const icon512Response = await page.goto('https://rox5pejaivu5.space.minimax.io/icons/icon-512.svg', { 
    waitUntil: 'networkidle' 
  });
  console.log(`  Icon 192 SVG: ${icon192Response.status()}`);
  console.log(`  Icon 512 SVG: ${icon512Response.status()}`);
  
  // Summary
  console.log('\n=== PWA Verification Summary ===');
  const allChecks = [
    manifestResponse.status() === 200,
    themeColor !== 'NOT FOUND',
    appleMobileWebAppCapable !== 'NOT FOUND',
    manifestLink !== 'NOT FOUND',
    icon192Response.status() === 200,
    icon512Response.status() === 200
  ];
  
  const passedChecks = allChecks.filter(Boolean).length;
  console.log(`Passed: ${passedChecks}/${allChecks.length} checks`);
  
  if (passedChecks === allChecks.length) {
    console.log('\n✅ PWA configuration is complete!');
  } else {
    console.log('\n⚠️ Some PWA features may not be working correctly');
  }
  
} catch (error) {
  console.error('Test failed:', error.message);
} finally {
  await browser.close();
}
