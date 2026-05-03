#!/usr/bin/env node
const { chromium } = require('playwright');

async function getVHSI() {
  console.log('Starting Chromium...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to VHSI page...');
    await page.goto('https://www.tradingview.com/symbols/HSI-VHSI/', {
      waitUntil: 'networkidle',
      timeout: 45000
    });
    
    await page.waitForTimeout(5000);
    
    // Take screenshot
    console.log('Taking screenshot...');
    await page.screenshot({ path: '/tmp/vhsi.png', fullPage: true });
    console.log('Screenshot saved to /tmp/vhsi.png');
    
    // Get page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Get body text
    const body = await page.textContent('body');
    console.log('\n=== Page Content ===');
    console.log(body.substring(0, 5000));
    
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
    console.log('\nDone');
  }
}

getVHSI();