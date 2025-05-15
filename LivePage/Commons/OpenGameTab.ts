import { Page } from "playwright";
import gameIdToTabName from "../Configs/gameTabMap";

export async function OpenGameTab(page: Page, gameId: number) {
    try {
        const gameTab = gameIdToTabName[gameId];
        if (!gameTab) {
            throw new Error(`Không tìm thấy tab cho game ID: ${gameId}`);
        }

        console.log(`🎮 Đang mở tab game: ${gameTab}...`);

        // Tìm tab game với các locator khác nhau
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
                // Thử từng locator cho đến khi tìm thấy
                for (const locator of tabLocators) {
                    try {
                        // Kiểm tra xem locator có tồn tại và visible không
                        const isVisible = await locator.isVisible({ timeout: 5000 });
                        if (isVisible) {
                            // Click vào tab
                            await locator.click({ timeout: 10000 });
                            console.log(`✅ Đã click vào tab game: ${gameTab}`);

                            // Đợi element "Phiên" xuất hiện để xác nhận đã vào game
                            await page.locator('text=Phiên').first().waitFor({ 
                                state: 'visible', 
                                timeout: 15000 
                            });

                            console.log('✅ Đã thấy đồng hồ Round - Vào game ổn định!');
                            return;
                        }
                    } catch {
                        continue; // Thử locator tiếp theo nếu locator hiện tại fail
                    }
                }

                // Nếu không tìm thấy tab với bất kỳ locator nào
                throw new Error('Không tìm thấy tab game với các locator đã thử');

            } catch (error) {
                lastError = error;
                retryCount++;
                if (retryCount < maxRetries) {
                    console.log(`Lần thử ${retryCount}/${maxRetries} thất bại, đang thử lại...`);
                    await page.waitForTimeout(2000);
                }
            }
        }

        throw new Error(`Không thể mở tab game sau ${maxRetries} lần thử. Lỗi cuối cùng: ${lastError?.message}`);

    } catch (error: any) {
        console.error('Chi tiết lỗi:', error);
        throw error;
    }
}

export default OpenGameTab;
