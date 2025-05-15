import { Page } from 'playwright';
import { IBaseLocator } from '../Configs/locator_base';
import { IGameConfig } from '../Configs/gameconfig_base';

/**
 * Thực hiện đặt cược cho một lựa chọn cụ thể
 * @param page - Trang Playwright hiện tại
 * @param betChoice - Lựa chọn đặt cược (từ gameConfig.choices)
 * @param gameConfig - Config của game
 * @param locator - Đối tượng chứa các locator của game
 * @returns Promise<void>
 */
export async function placeBet(
    page: Page,
    betChoice: string,
    gameConfig: IGameConfig,
    locator: IBaseLocator
): Promise<void> {
    try {
        // Kiểm tra xem betChoice có hợp lệ không
        if (!gameConfig.choices.includes(betChoice)) {
            throw new Error(`Lựa chọn cược "${betChoice}" không hợp lệ. Các lựa chọn có thể: ${gameConfig.choices.join(', ')}`);
        }

        // 1. Click vào bet choice
        const betChoiceLocator = locator.betChoices[betChoice];
        if (!betChoiceLocator) {
            throw new Error(`Không tìm thấy locator cho bet choice: ${betChoice}`);
        }
        console.log(`🎯 Đặt cược: ${betChoice}`);
        await page.locator(betChoiceLocator).click();

        // 2. Click vào nút "Cược" trên bet slip
        await page.locator('button').filter({ hasText: 'Cược' }).click();

        // 3. Xử lý thông báo cược thành công
        // Đợi thông báo xuất hiện
        await page.waitForSelector('text=Your bet is accepted');
        
        // Check vào checkbox "Tắt thông báo này"
        await page.getByRole('checkbox', { name: 'Tắt thông báo này' }).check();
        
        // Click nút OK
        await page.getByText('OK', { exact: true }).click();

        console.log(`✅ Đặt cược thành công cho lựa chọn: ${betChoice}`);
    } catch (error: any) {
        console.error(`❌ Lỗi khi đặt cược: ${error.message}`);
        throw error;
    }
} 