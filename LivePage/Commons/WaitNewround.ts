import { Page } from "playwright";
import { IGameConfig } from "../Configs/gameconfig_base";

/**
 * Wait until a new round starts
 * @param page - Current Playwright page
 * @param gameId - Game ID
 * @param gameConfig - Game configuration
 * @returns Promise<void>
 */
export async function WaitNewround(page: Page, gameId: number, gameConfig: IGameConfig): Promise<void> {
    if (!gameId) {
        throw new Error('❌ gameId must be provided to WaitNewround.');
    }

    if (!gameConfig.gameName) {
        throw new Error(`❌ Game name not found in config for game ID: ${gameId}`);
    }

    const gameName = gameConfig.gameName;
    console.log(`⏳ Waiting for new round in ${gameName} (timer = ${gameConfig.timerStart})...`);

    if (page.isClosed()) {
        throw new Error('❌ Page was closed.');
    }

    // Find timer element using gameName instead of gameTab
    const timerLocator = page.locator(`xpath=//div[text()='${gameName}']//following::div[contains(@class,'in-play')][1]//div[2]/div[1]/div[2]/span[1]`);
    
    try {
        // Wait for timer element to appear
        console.log(`🔍 Waiting for timer element to appear for ${gameName}...`);
        await timerLocator.waitFor({ 
            state: 'visible', 
            timeout: 60000
        });
    } catch (error) {
        const errorScreenshotPath = `test-results/timer-not-found-${gameId}-${Date.now()}.png`;
        await page.screenshot({ path: errorScreenshotPath });
        console.error(`❌ Timer not found after 60s for game ${gameName}. Screenshot: ${errorScreenshotPath}`);
        throw error;
    }

    const maxTimeout = 60000;
    const startTime = Date.now();
    let lastTimerValue = '';

    while (Date.now() - startTime < maxTimeout) {
        try {
            // Check if page is closed
            if (page.isClosed()) {
                throw new Error('❌ Page was closed while waiting for new round.');
            }

            // Wait for timer element
            await timerLocator.waitFor({ 
                state: 'visible', 
                timeout: 500
            });

            // Get timer value
            const timerValue = await timerLocator.evaluate((el) => el.textContent?.trim() || '');

            // Log if timer changes
            if (timerValue !== lastTimerValue) {
                lastTimerValue = timerValue;
            }

            // Check if new round has started
            if (timerValue === gameConfig.timerStart.toString()) {
                console.log(`✅ New round started (timer = ${timerValue})`);
                return;
            }

        } catch (error) {
            // Skip error and continue loop
        }

        // Wait 500ms before checking again
        await page.waitForTimeout(500);
    }

    // Take screenshot if timeout
    const errorScreenshotPath = `test-results/round-timeout-${gameId}-${Date.now()}.png`;
    await page.screenshot({ path: errorScreenshotPath });
    throw new Error(`❌ New round not found after ${maxTimeout / 1000}s for game ${gameName}. Screenshot: ${errorScreenshotPath}`);
}

export default WaitNewround;