import { chromium } from 'playwright';

async function testFullFunctionality() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const allConsoleMessages = [];
  const errors = [];

  page.on('console', msg => {
    allConsoleMessages.push({ type: msg.type(), text: msg.text() });
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    errors.push('Page Error: ' + err.message);
  });

  try {
    console.log('=== Testing Clinisord Dashboard ===\n');

    // 1. Load page
    console.log('1. Loading dashboard...');
    await page.goto('https://2vbvpv4ok032.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    console.log('   ✓ Page loaded\n');

    // 2. Check main elements
    console.log('2. Checking main elements...');
    const sidebar = await page.$('aside');
    const mapContainer = await page.$('.leaflet-container');
    const citySelector = await page.$('button:has-text("Barcelona")');
    const competitorPanel = await page.$('text=Competencia');

    console.log(`   - Sidebar: ${sidebar ? '✓' : '✗'}`);
    console.log(`   - Map: ${mapContainer ? '✓' : '✗'}`);
    console.log(`   - City selector: ${citySelector ? '✓' : '✗'}`);
    console.log(`   - Competitor panel: ${competitorPanel ? '✓' : '✗'}\n`);

    // 3. Test Barcelona
    console.log('3. Testing Barcelona...');
    const barcelonaBtn = await page.$('button:has-text("Barcelona")');
    if (barcelonaBtn) {
      await barcelonaBtn.click();
      await page.waitForTimeout(3000);

      // Check if competitor panel shows Barcelona
      const panelHtml = await page.$eval('.glass-panel', el => el.innerHTML).catch(() => 'No panel found');
      const hasBarcelonaInPanel = panelHtml.includes('Barcelona') || panelHtml.includes('barcelona');

      console.log(`   - Panel shows Barcelona: ${hasBarcelonaInPanel ? '✓' : '✗'}`);
      console.log(`   - Panel HTML preview: ${panelHtml.substring(0, 200)}...\n`);
    }

    // 4. Test Madrid return
    console.log('4. Testing return to Madrid...');
    const madridBtn = await page.$('button:has-text("Madrid")');
    if (madridBtn) {
      await madridBtn.click();
      await page.waitForTimeout(3000);
      console.log('   ✓ Returned to Madrid\n');
    }

    // 5. Report errors
    console.log('=== Console Errors ===');
    const criticalErrors = errors.filter(e =>
      !e.includes('Google Maps') &&
      !e.includes('favicon') &&
      !e.includes('404')
    );

    if (criticalErrors.length === 0) {
      console.log('No critical errors found! ✓\n');
    } else {
      console.log(`Found ${criticalErrors.length} critical errors:`);
      criticalErrors.forEach((err, i) => {
        console.log(`  ${i + 1}. ${err.substring(0, 150)}`);
      });
      console.log('');
    }

    // 6. Check competitors
    console.log('=== Competitor Panel Test ===');
    const allGAES = await page.$$('text=/GAES/');
    console.log(`GAES mentions on page: ${allGAES.length}`);

    // Check map markers
    const mapMarkers = await page.$$('.leaflet-marker-icon');
    console.log(`Map markers visible: ${mapMarkers.length}`);

  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

testFullFunctionality();
