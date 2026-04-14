import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the application
  console.log('Navigating to Clinisord Dashboard...');
  await page.goto('https://ghkhl96de8sp.space.minimax.io', { waitUntil: 'networkidle', timeout: 30000 });

  await page.waitForTimeout(3000);

  // Initial marker count
  let markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Initial marker count:', markers);

  // Expand the Competitor Panel
  console.log('\\nExpanding panel...');
  await page.locator('text=Competencia').first().click();
  await page.waitForTimeout(1000);

  // Click "Ocultar todas" to hide all chains
  console.log('Hiding all chains...');
  await page.locator('button:has-text("Ocultar todas")').first().click();
  await page.waitForTimeout(1500);

  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after hiding all:', markers);

  // Now try to simulate the chain toggle by directly calling the handler
  console.log('\\n=== Directly triggering chain toggle ===');
  
  // Let's try to find the Dashboard component state and modify it
  const result = await page.evaluate(() => {
    // Try to access the React component
    const dashboard = document.querySelector('[class*="flex h-screen"]');
    
    // Get all divs that might contain chain data
    const allDivs = document.querySelectorAll('div');
    let chainDiv = null;
    allDivs.forEach(div => {
      if (div.textContent && div.textContent.includes('GAES (Amplifon)') && div.textContent.includes('69 centros')) {
        chainDiv = div;
      }
    });
    
    // Try clicking the chain row directly
    if (chainDiv) {
      // Create a click event
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      chainDiv.dispatchEvent(clickEvent);
      console.log('Dispatched click event on chain row');
    }
    
    return {
      found: !!chainDiv,
      text: chainDiv ? chainDiv.textContent.substring(0, 100) : null,
      classes: chainDiv ? chainDiv.className : null
    };
  });
  
  console.log('Chain row info:', result);
  
  await page.waitForTimeout(2000);

  // Check markers again
  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('\\nMarker count after dispatching click:', markers);

  // Check if the opacity changed (indicating state change)
  const opacityInfo = await page.evaluate(() => {
    const allDivs = document.querySelectorAll('div');
    let gaesDiv = null;
    allDivs.forEach(div => {
      if (div.textContent && div.textContent.includes('GAES (Amplifon)') && div.textContent.includes('69 centros')) {
        gaesDiv = div;
      }
    });
    
    if (gaesDiv) {
      const style = window.getComputedStyle(gaesDiv);
      return {
        opacity: style.opacity,
        className: gaesDiv.className
      };
    }
    return { found: false };
  });
  console.log('GAES div opacity:', opacityInfo);

  // Try a different approach - directly call the React event handler
  console.log('\\n=== Trying direct React handler invocation ===');
  
  await page.evaluate(() => {
    // Find all event listeners attached to the page (this won't work for React synthetic events)
    // Instead, let's try to find the React component instance
    
    // The simplest approach is to just reload the page with different URL params
    // But for now, let's try to trigger a re-render
    
    // Find the container and force a re-render by toggling a class
    const panels = document.querySelectorAll('.glass-panel');
    panels.forEach(panel => {
      panel.classList.add('force-update');
      setTimeout(() => panel.classList.remove('force-update'), 100);
    });
  });
  
  await page.waitForTimeout(1000);

  markers = await page.evaluate(() => {
    return document.querySelectorAll('.leaflet-marker-icon').length;
  });
  console.log('Marker count after force update:', markers);

  // Take final screenshot
  await page.screenshot({ path: '/workspace/test-direct-state.png', fullPage: true });
  console.log('\\nScreenshot saved');

  await browser.close();
})();
