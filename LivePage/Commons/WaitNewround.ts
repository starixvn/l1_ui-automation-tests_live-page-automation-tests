import { Page } from "playwright";
import gameIdToTabName from "../Configs/gameTabMap";
import { IGameConfig } from "../Configs/gameconfig_base";

export async function WaitNewround(page: Page, gameId: number, gameConfig: IGameConfig): Promise<void> {
    console.log(`WaitNewround received gameId: ${gameId}`);
    if (!gameId) {
        throw new Error('❌ gameId không được truyền vào WaitNewround.');
    }

    const gameTab = gameIdToTabName[gameId];
    //console.log(`Debugging WaitNewround - gameId: ${gameId}, gameTab: ${gameTab}`); // Log giá trị gameId và gameTab

    if (!gameTab) {
        throw new Error(`❌ GAME_ID ${gameId} không hợp lệ hoặc chưa được map trong gameTabMap.`);
    }

    const timerLocator = page.locator(`xpath=//div[text()='${gameTab}']//following::div[contains(@class,'in-play')][1]//div[2]/div[1]/div[2]/span[1]`);

    console.log(`⏳ Đang đợi timer = ${gameConfig.timerStart} để bắt đầu vòng mới...`);
   // console.log(`🔍 Kiểm tra locator: ${timerLocator}`); // Log locator trước khi gọi waitFor

   // console.log(`🔍 Kiểm tra trạng thái page: isClosed=${page.isClosed()}`); // Log trạng thái của page
    if (page.isClosed()) {
        throw new Error('❌ Trang đã bị đóng trước khi gọi waitFor.');
    }

    try {
        console.log('⏳ Đang đợi timerLocator hiển thị...');
        await timerLocator.waitFor({ state: 'visible', timeout: 60000 }); // Tăng timeout lên 60 giây
        console.log('✅ timerLocator đã hiển thị!');
    } catch (error) {
        const errorScreenshotPath = `test-results/locator-error-${gameId}-${Date.now()}.png`;
        await page.screenshot({ path: errorScreenshotPath });
        console.error(`❌ Không tìm thấy timerLocator: ${(error as Error).message}`);
        console.log(`📸 Đã chụp ảnh màn hình khi lỗi xảy ra: ${errorScreenshotPath}`);
        throw error;
    }

    const maxTimeout = 60000; // Tăng thời gian chờ tổng thể lên 60 giây
    const startTime = Date.now();

    while (Date.now() - startTime < maxTimeout) {
        try {
            // Đợi locator xuất hiện
            await timerLocator.waitFor({ state: 'visible', timeout: 500 }); // Giảm thời gian chờ giữa các lần kiểm tra

           // console.log(`🔍 Kiểm tra trạng thái page: isClosed=${page.isClosed()}`); // Log trạng thái của page
            if (page.isClosed()) {
                throw new Error('❌ Trang đã bị đóng trước khi gọi evaluate.');
            }

            // Lấy giá trị timer
            const timerValue = await timerLocator.evaluate((el) => el.textContent?.trim());
            //console.log(`⏱️ Giá trị timer hiện tại: ${timerValue}`);

            if (timerValue === gameConfig.timerStart.toString()) {
                console.log(`✅ Vòng mới bắt đầu - timer = ${gameConfig.timerStart}`);
                const screenshotPath = `test-results/round-start-${gameTab}-${Date.now()}.png`;
                await page.screenshot({ path: screenshotPath });
                console.log(`📸 Đã chụp ảnh màn hình khi vòng mới bắt đầu: ${screenshotPath}`);
                return;
            }
        } catch (error) {
            console.warn(`⚠️ Lỗi khi kiểm tra timer: ${error}`);
        }

        // Chờ 500ms trước khi kiểm tra lại
        await page.waitForTimeout(500);
    }

    const errorScreenshotPath = `test-results/round-timeout-${gameId}-${Date.now()}.png`;
    await page.screenshot({ path: errorScreenshotPath });
    console.log(`📸 Đã chụp ảnh màn hình khi hết thời gian chờ: ${errorScreenshotPath}`);
    throw new Error(`❌ Timeout: Không xác định được vòng mới (timer = ${gameConfig.timerStart}) sau ${maxTimeout / 1000} giây.`);
};

export default WaitNewround;