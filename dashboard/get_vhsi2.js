#!/usr/bin/env node
const { chromium } = require('playwright');

async function getVHSI() {
  console.log('Starting Chrome...');
  
  const browser = await chromium.launch({ 
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox', '--disable-gpu']
  });
  
  const page = await browser.newPage();
  
  try {
    // Try TradingView's built-in VHSI indicator page
    console.log('Trying TradingView VHSI page...');
    await page.goto('https://www.tradingview.com/symbols/HSI-VHSI/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    
    await page.waitForTimeout(5000);
    
    // Take screenshot
    await page.screenshot({ path: '/tmp/vhsi_page.png', fullPage: true });
    console.log('Screenshot saved');
    
    const title = await page.title();
    console.log('Page title:', title);
    
    const bodyText = await page.textContent('body');
    console.log('\n=== PAGE TEXT ===');
    console.log(bodyText.substring(0, 3000));
    
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
}

getVHSI();