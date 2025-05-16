import { Page } from "playwright";
import gameIdToTabName from "../Configs/gameTabMap";
import { IGameConfig } from "../Configs/gameconfig_base";

/**
 * Đợi cho đến khi một vòng mới bắt đầu
 * @param page - Trang Playwright hiện tại
 * @param gameId - ID của game
 * @param gameConfig - Config của game
 * @returns Promise<void>
 */
export async function WaitNewround(page: Page, gameId: number, gameConfig: IGameConfig): Promise<void> {
    if (!gameId) {
        throw new Error('❌ gameId không được truyền vào WaitNewround.');
    }

    const gameTab = gameIdToTabName[gameId];
    if (!gameTab) {
        throw new Error(`❌ GAME_ID ${gameId} không hợp lệ hoặc chưa được map trong gameTabMap.`);
    }

    console.log(`⏳ Đang đợi vòng mới cho game ${gameTab} (timer = ${gameConfig.timerStart})...`);

    if (page.isClosed()) {
        throw new Error('❌ Trang đã bị đóng.');
    }

    // Tìm timer element
    const timerLocator = page.locator(`xpath=//div[text()='${gameTab}']//following::div[contains(@class,'in-play')][1]//div[2]/div[1]/div[2]/span[1]`);
    
    try {
        // Đợi timer element xuất hiện
        console.log(`🔍 Đợi timer element xuất hiện cho game ${gameTab}...`);
        await timerLocator.waitFor({ 
            state: 'visible', 
            timeout: 60000
        });
    } catch (error) {
        const errorScreenshotPath = `test-results/timer-not-found-${gameId}-${Date.now()}.png`;
        await page.screenshot({ path: errorScreenshotPath });
        console.error(`❌ Không tìm thấy timer sau 60s cho game ${gameTab}. Screenshot: ${errorScreenshotPath}`);
        throw error;
    }

    const maxTimeout = 60000;
    const startTime = Date.now();
    let lastTimerValue = '';

    while (Date.now() - startTime < maxTimeout) {
        try {
            // Kiểm tra trang có bị đóng không
            if (page.isClosed()) {
                throw new Error('❌ Trang đã bị đóng trong khi đợi vòng mới.');
            }

            // Đợi timer element
            await timerLocator.waitFor({ 
                state: 'visible', 
                timeout: 500
            });

            // Lấy giá trị timer
            const timerValue = await timerLocator.evaluate((el) => el.textContent?.trim() || '');

            // Log nếu timer thay đổi
            if (timerValue !== lastTimerValue) {
                //console.log(`⏱️ Timer: ${timerValue}`);
                lastTimerValue = timerValue;
            }

            // Kiểm tra nếu đã đến vòng mới
            if (timerValue === gameConfig.timerStart.toString()) {
                console.log(`✅ Vòng mới bắt đầu (timer = ${timerValue})`);
                return;
            }

        } catch (error) {
            // Bỏ qua lỗi và tiếp tục vòng lặp
            console.log('⚠️ Lỗi khi đọc timer, thử lại...');
        }

        // Đợi 500ms trước khi kiểm tra lại
        await page.waitForTimeout(500);
    }

    // Chụp ảnh nếu timeout
    const errorScreenshotPath = `test-results/round-timeout-${gameId}-${Date.now()}.png`;
    await page.screenshot({ path: errorScreenshotPath });
    throw new Error(`❌ Không tìm thấy vòng mới sau ${maxTimeout / 1000}s cho game ${gameTab}. Screenshot: ${errorScreenshotPath}`);
}

export default WaitNewround;