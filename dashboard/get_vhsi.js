#!/usr/bin/env node
const { chromium } = require('playwright');

async function getVHSI() {
  console.log('Starting browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Try a public VHSI chart
    console.log('Navigating to TradingView VHSI...');
    await page.goto('https://www.tradingview.com/chart/?symbol=HSI%3AVHSI', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    await page.waitForTimeout(3000);
    
    const title = await page.title();
    console.log('Page title:', title);
    
    // Get body text
    const bodyText = await page.textContent('body');
    console.log('Page content (first 3000 chars):', bodyText.substring(0, 3000));
    
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
}

getVHSI();