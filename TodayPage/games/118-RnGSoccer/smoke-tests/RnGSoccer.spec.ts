import { test, expect } from '../../../../LivePage/testgame_core/base-fixture';
import { RnGSoccerConfig } from '../configs/gameconfig';
import { getRnGSoccerLocator } from '../configs/locators';
import { ENV } from '../../../../LivePage/Commons/EnvVars';
import { GameEnvironment } from '../../../../LivePage/Configs/gameconfig_base';
import { placeBet } from '../../../../LivePage/Commons/PlaceBet';

// Hàm check odds
async function checkOdds(page, oddsLocator, expectedOdds) {
    const oddsElement = page.locator(oddsLocator);
    await oddsElement.waitFor({ state: 'visible' });
    const oddsText = (await oddsElement.textContent())?.trim();
    if (oddsText === expectedOdds) {
        console.log('✅ Check odds thành công:', oddsText);
    } else {
        console.error(`❌ Check odds thất bại! Expected: "${expectedOdds}", Actual: "${oddsText}"`);
        throw new Error('Check odds failed');
    }
}

// Hàm wait new round cho RNG Soccer
async function waitNewRound(page, timerLocator, timerStart) {
    while (true) {
        const timerText = await page.locator(timerLocator).textContent();
        // Parse số giây từ chuỗi "00:xx"
        const match = timerText?.match(/00:(\d{2})/);
        if (match) {
            const seconds = parseInt(match[1], 10);
            if (seconds === timerStart) {
                console.log(`✅ New round started at timer: ${timerText}`);
                break;
            }
        }
        //await page.waitForTimeout(30000);
    }
}

test('RNG Soccer - Today Page Full Flow', async ({ todayGameBase }) => {
    test.setTimeout(120000);
    console.log('🚀 Starting RNG Soccer test...');
    
    // Get the page from the fixture (already logged in)
    const page = todayGameBase.page;
    console.log('✅ Using pre-logged in page from fixture');

    // Wait for page to be fully loaded
    console.log('📝 Step 1: Waiting for Chơi Ngay button...');
    await page.waitForSelector('//button[text()="Chơi Ngay"]', { timeout: 20000 });
    console.log('✅ Chơi Ngay button is visible');

    // Check and click "Chơi Ngay" button using the correct XPath
    try {
        console.log('📝 Step 2: Finding and clicking "Chơi Ngay" button...');
        
        // Use the correct XPath provided by user
        const playNowXPath = '//button[text()="Chơi Ngay"]';
        const playNowButton = page.locator(`xpath=${playNowXPath}`);
        
        // Wait for button to be visible
        console.log('⏳ Waiting for "Chơi Ngay" button to be visible...');
        await playNowButton.waitFor({ state: 'visible', timeout: 30000 });
        console.log('✅ "Chơi Ngay" button is visible');
        
        // Check if button is enabled/clickable
        const isEnabled = await playNowButton.isEnabled();
        console.log('🔘 Button is enabled:', isEnabled);
        
        // Click the button
        console.log('🖱️ Clicking "Chơi Ngay" button...');
        await playNowButton.click({ timeout: 20000 });
        console.log('✅ Successfully clicked "Chơi Ngay" button');
        
        // Wait for page to load after clicking
        //await page.waitForSelector("//div[contains(@class, 'c-match c-in-play')]//*[contains(text(), 'Bóng Đá RNG')]", { timeout: 20000 })
        
        await page.waitForSelector("//div[@id='mainArea']//div[contains(text(),'Bóng Đá RNG')]", { timeout: 20000 });
        console.log('✅ Page loaded after clicking button');
        
    } catch (error) {
        console.error('❌ Error with "Chơi Ngay" button:', error);
        
        // Take a screenshot for debugging
        await page.screenshot({ path: 'debug-choi-ngay-error.png' });
        throw error;
    }

  //  console.log('📝 Step 3: Setting up game configuration...');
    const gameConfig = RnGSoccerConfig(ENV as GameEnvironment);
   const locators = getRnGSoccerLocator(ENV);
    const oddsLocator = locators.oddsLocators.checkodds;
    await checkOdds(page, oddsLocator, gameConfig.expectedOdds);

    // Wait for new round (dùng hàm chung)
    console.log('📝 Step 5: Waiting for new round...');
    await waitNewRound(page, locators.timerLocator, gameConfig.timerStart);

    // Place Bet (dùng hàm chung)
    console.log('📝 Step 6: Placing bet...');
    const firstChoice = gameConfig.choices[0];
   await placeBet(page, firstChoice, gameConfig, locators, waitNewRound)

    console.log('🎉 Test completed successfully!');
});