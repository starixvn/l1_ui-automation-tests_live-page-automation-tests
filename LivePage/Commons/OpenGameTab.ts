import { Page } from "playwright";
import gameIdToTabName from "../Configs/gameTabMap";

export async function OpenGameTab(page: Page, gameId: number) {
    try {
        const gameTab = gameIdToTabName[gameId];
        if (!gameTab) {
            throw new Error(`Game tab not found for game ID: ${gameId}`);
        }

        console.log(`🎮 Opening game tab: ${gameTab}...`);

        // Find game tab with different locators
        const tabLocators = [
            page.getByText(gameTab, { exact: true }),
            page.getByText(gameTab, { exact: false }),
            page.locator(`text=${gameTab}`),
            page.locator(`div:has-text("${gameTab}")`)
        ];

        let maxRetries = 3;
        let retryCount = 0;
        let lastError = null;

        while (retryCount < maxRetries) {
            try {
                // Try each locator until one is found
                for (const locator of tabLocators) {
                    try {
                        // Check if locator exists and is visible
                        const isVisible = await locator.isVisible({ timeout: 5000 });
                        if (isVisible) {
                            await locator.click({ timeout: 10000 });
                            console.log(`✅ Successfully clicked game tab: ${gameTab}`);

                            // Wait for "Round" element to appear to confirm game entry
                            await page.locator('text=Phiên').first().waitFor({ 
                                state: 'visible', 
                                timeout: 15000 
                            });

                            console.log('✅ Round timer visible - Game loaded successfully!');
                            return;
                        }
                    } catch {
                        continue; // Try next locator if current one fails
                    }
                }

                throw new Error('Game tab not found with any of the tried locators');

            } catch (error) {
                lastError = error;
                retryCount++;
                if (retryCount < maxRetries) {
                    console.log(`Attempt ${retryCount}/${maxRetries} failed, retrying...`);
                    await page.waitForTimeout(2000);
                }
            }
        }

        throw new Error(`Could not open game tab after ${maxRetries} attempts. Last error: ${lastError?.message}`);

    } catch (error: any) {
        console.error('Error details:', error);
        throw error;
    }
}

export default OpenGameTab;
