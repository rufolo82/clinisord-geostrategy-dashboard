import { chromium } from 'playwright';

async function checkCompetitorCounts() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  try {
    console.log('=== Checking Competitor Counts ===\n');

    await page.goto('https://2vbvpv4ok032.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Check Madrid first
    console.log('1. Madrid competitors (before clicking):');
    const madridPanel = await page.textContent('.glass-panel');
    const madridGAES = madridPanel.match(/GAES.*?(\d+)/);
    const madridAural = madridPanel.match(/Aural.*?(\d+)/);
    console.log('   GAES:', madridGAES ? madridGAES[1] : 'Not found');
    console.log('   Aural:', madridAural ? madridAural[1] : 'Not found');

    // Click Barcelona
    console.log('\n2. Clicking Barcelona...');
    await page.click('button:has-text("Barcelona")');
    await page.waitForTimeout(3000);

    // Check Barcelona
    console.log('\n3. Barcelona competitors (after clicking):');
    const barcelonaPanel = await page.textContent('.glass-panel');
    const barcelonaGAES = barcelonaPanel.match(/GAES.*?(\d+)/);
    const barcelonaAural = barcelonaPanel.match(/Aural.*?(\d+)/);
    console.log('   GAES:', barcelonaGAES ? barcelonaGAES[1] : 'Not found');
    console.log('   Aural:', barcelonaAural ? barcelonaAural[1] : 'Not found');

    // Check map markers
    console.log('\n4. Map markers:');
    const markers = await page.$$('.leaflet-marker-icon');
    console.log('   Total markers:', markers.length);

    // Check for any errors
    console.log('\n5. Errors:');
    if (errors.length === 0) {
      console.log('   No errors!');
    } else {
      errors.forEach(e => console.log('   -', e.substring(0, 100)));
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

checkCompetitorCounts();
