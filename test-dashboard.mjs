import { chromium } from 'playwright';

async function testDashboard() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  // Collect page errors
  const pageErrors = [];
  page.on('pageerror', err => {
    pageErrors.push(err.message);
  });

  try {
    console.log('Loading dashboard...');
    await page.goto('https://2vbvpv4ok032.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Page loaded');

    // Wait a bit for any dynamic content
    await page.waitForTimeout(2000);

    // Check if main elements exist
    const sidebar = await page.$('.bg-white.shadow-xl');
    const map = await page.$('.leaflet-container');

    console.log('\n=== Test Results ===');
    console.log('Sidebar found:', !!sidebar);
    console.log('Map found:', !!map);

    console.log('\n=== Console Messages ===');
    consoleMessages.forEach(msg => {
      if (msg.type === 'error' || msg.type === 'warning') {
        console.log(`[${msg.type.toUpperCase()}]: ${msg.text}`);
      }
    });

    console.log('\n=== Page Errors ===');
    if (pageErrors.length === 0) {
      console.log('No errors found');
    } else {
      pageErrors.forEach(err => console.log('ERROR:', err));
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

testDashboard();
