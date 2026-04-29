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
    console.log('=== POSTAL CODE SEARCH TEST ===\n');
    
    await page.goto('https://xxigtofi5n4l.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.leaflet-container', { timeout: 10000 });
    console.log('✓ Map loaded');

    // Store initial logs
    const initialLogs = [...consoleMessages];

    // Find the search input
    console.log('\n📍 Step 1: Looking for search box...');
    const searchInput = await page.$('input[placeholder*="Código postal"]');
    if (searchInput) {
      console.log('✓ Search input found');
    } else {
      console.log('❌ Search input NOT found');
    }

    // Type a postal code
    console.log('\n🔤 Step 2: Typing postal code 28003...');
    await searchInput.fill('28003');
    await page.waitForTimeout(500);

    // Check if suggestions appear
    console.log('\n💡 Step 3: Checking for suggestions...');
    const suggestions = await page.$$('[class*="suggestion"], [class*="autocomplete"], .absolute > button');
    console.log(`   Found ${suggestions.length} suggestion elements`);

    // Check for visible suggestion dropdown
    const suggestionBox = await page.$('.absolute.z-50');
    const isSuggestionVisible = await suggestionBox?.isVisible().catch(() => false);
    console.log(`   Suggestion box visible: ${isSuggestionVisible}`);

    // Try pressing Enter to search
    console.log('\n↵ Step 4: Pressing Enter to search...');
    await searchInput.press('Enter');
    await page.waitForTimeout(2000);

    // Check console logs for the search action
    const dashboardLogs = consoleMessages.filter(m => m.text.includes('[Dashboard]'));
    console.log('\n📋 Dashboard logs:');
    dashboardLogs.forEach(log => console.log(`   ${log.text}`));

    // Check if map zoomed (look for zoom change in logs or check map center)
    const mapLogs = consoleMessages.filter(m => m.text.includes('[MapController]'));
    console.log('\n📋 MapController logs:');
    mapLogs.forEach(log => console.log(`   ${log.text}`));

    // Check for any errors
    const errors = consoleMessages.filter(m => m.type === 'error');
    console.log('\n❌ Console errors:');
    if (errors.length > 0) {
      errors.forEach(err => console.log(`   ${err.text}`));
    } else {
      console.log('   No errors found');
    }

    // Summary
    console.log('\n=== SUMMARY ===');
    if (dashboardLogs.length === 0) {
      console.log('❌ [Dashboard] handlePostalCodeSearch was NOT called');
      console.log('   This means the search input or Enter key is not triggering the search.');
    } else {
      console.log('✅ [Dashboard] handlePostalCodeSearch was called');
      dashboardLogs.forEach(log => console.log(`   ${log.text}`));
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  } finally {
    await browser.close();
  }
})();
