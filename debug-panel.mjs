import { chromium } from 'playwright';

async function debugPanel() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Console Error:', msg.text());
    }
  });

  try {
    console.log('Loading dashboard...');
    await page.goto('https://2vbvpv4ok032.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    console.log('\nInitial state - Looking for city indicator...');
    const initialCityIndicator = await page.$('.bg-primary-50');
    if (initialCityIndicator) {
      const html = await initialCityIndicator.innerHTML();
      console.log('Initial city indicator:', html);
    }

    console.log('\nClicking Barcelona...');
    await page.click('button:has-text("Barcelona")');
    await page.waitForTimeout(3000);

    console.log('\nAfter clicking Barcelona:');
    const cityIndicators = await page.$$('.bg-primary-50');
    console.log('Found', cityIndicators.length, 'elements with bg-primary-50 class');

    for (let i = 0; i < cityIndicators.length; i++) {
      const el = cityIndicators[i];
      const html = await el.innerHTML();
      console.log('\nElement', i + 1, ':');
      console.log(html);
    }

    // Also check if panel is open
    const glassPanel = await page.$('.glass-panel');
    if (glassPanel) {
      console.log('\nGlass panel content:');
      const panelHTML = await glassPanel.innerHTML();
      console.log(panelHTML.substring(0, 500));
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

debugPanel();
