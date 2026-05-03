#!/usr/bin/env node
const { chromium } = require('playwright');

async function getTradingViewData() {
  console.log('Starting Chrome...');
  
  const browser = await chromium.launch({ 
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to TradingView VHSI chart...');
    await page.goto('https://www.tradingview.com/chart/lQZyJuQL/?symbol=HSI%3AVHSI', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    
    // Wait for chart to load
    console.log('Waiting for chart to load...');
    await page.waitForTimeout(10000);
    
    // Take screenshot
    console.log('Taking screenshot...');
    await page.screenshot({ path: '/tmp/vhsi_chart.png', fullPage: true });
    console.log('Screenshot saved to /tmp/vhsi_chart.png');
    
    // Get page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Get visible text
    const bodyText = await page.textContent('body');
    console.log('\n=== PAGE TEXT (first 5000 chars) ===');
    console.log(bodyText.substring(0, 5000));
    
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
    console.log('Done');
  }
}

getTradingViewData();