#!/usr/bin/env node
const { chromium } = require('playwright');

async function getVHSIHistorical() {
  console.log('Starting Chrome...');
  
  const browser = await chromium.launch({ 
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox', '--disable-gpu']
  });
  
  const page = await browser.newPage();
  
  try {
    // Try to access VHSI chart directly and get historical data
    console.log('Going to VHSI chart page...');
    await page.goto('https://www.tradingview.com/chart/?symbol=HSI%3AVHSI', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    
    await page.waitForTimeout(8000);
    
    // Take screenshot
    await page.screenshot({ path: '/tmp/vhsi_chart2.png', fullPage: true });
    console.log('Screenshot saved to /tmp/vhsi_chart2.png');
    
    const title = await page.title();
    console.log('Page title:', title);
    
    // Look for numerical data
    const bodyText = await page.textContent('body');
    
    // Look for VHSI values
    if (bodyText.includes('VHSI')) {
      console.log('\n=== VHSI Data Found ===');
      const vhsiMatch = bodyText.match(/VHSI[\s\S]{0,500}/);
      if (vhsiMatch) console.log(vhsiMatch[0].substring(0, 500));
    }
    
    // Try to extract data from specific elements
    const priceElement = await page.$('[class*="price"]');
    if (priceElement) {
      const price = await priceElement.textContent();
      console.log('\nPrice element:', price);
    }
    
    console.log('\n=== Looking for chart data ===');
    // Check for any numerical values related to VHSI
    const numbers = bodyText.match(/\d{2}\.\d{2}/g);
    if (numbers) {
      console.log('Found numbers:', numbers.slice(0, 20));
    }
    
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
}

getVHSIHistorical();