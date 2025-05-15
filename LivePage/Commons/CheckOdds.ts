import { Page } from "playwright";
import gameIdToTabName from "../Configs/gameTabMap";
import { IBaseLocator } from "../Configs/locator_base";
import { IGameConfig } from "../Configs/gameconfig_base";

export async function checkOdds(
    page: Page, 
    gameId: number, 
    gameLocator: IBaseLocator,
    gameConfig: IGameConfig
): Promise<void> {
    try {
        // 1. Lấy gameTab từ gameId
        const gameTab = gameIdToTabName[gameId];
        if (!gameTab) {
            throw new Error(`Không tìm thấy game tab cho game ID: ${gameId}`);
        }

        console.log(`🎲 Kiểm tra odds cho game: ${gameTab}`);
        
        // Debug logs
        console.log('Debug - gameLocator:', gameLocator);
        console.log('Debug - oddsLocators:', gameLocator.oddsLocators);
        console.log('Debug - checkodds path:', gameLocator.oddsLocators?.['checkodds']);
        console.log('Debug - Available odds locators:', Object.keys(gameLocator.oddsLocators || {}));

        // 2. Lấy xpath checkodds từ locator và thay thế ${gameTab}
        if (!gameLocator.oddsLocators?.['checkodds']) {
            throw new Error('Không tìm thấy checkodds xpath trong locator');
        }
        const checkOddsXPath = gameLocator.oddsLocators['checkodds'].replace('${gameTab}', gameTab);
        console.log(`🔍 Checking với xpath: ${checkOddsXPath}`);

        // 3. Lấy expected odds từ config
        const expectedOdds = gameConfig.expectedOdds;
        if (!expectedOdds) {
            throw new Error(`Không tìm thấy expectedOdds trong config cho game ID: ${gameId}`);
        }

        // 4. Đợi và lấy giá trị odds hiện tại từ game
        const oddsElement = await page.locator(checkOddsXPath);
        const currentOdds = await oddsElement.textContent();
        
        if (!currentOdds) {
            throw new Error('Không thể lấy được giá trị odds từ game');
        }

        // 5. So sánh với expected odds
        if (currentOdds.trim() === expectedOdds.trim()) {
            console.log(`✅ Game hiển thị đúng các odds!\n- Expected: ${expectedOdds}\n- Actual: ${currentOdds}`);
        } else {
            throw new Error(
                `Odds không khớp:\n` +
                `- Expected: ${expectedOdds}\n` +
                `- Actual: ${currentOdds}`
            );
        }

    } catch (error: any) {
        throw new Error(`❌ Lỗi khi kiểm tra odds: ${error.message}`);
    }
} 