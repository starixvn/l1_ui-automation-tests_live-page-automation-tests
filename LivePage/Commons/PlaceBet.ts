import { Page } from 'playwright';
import { IBaseLocator } from '../Configs/locator_base';
import { IGameConfig } from '../Configs/gameconfig_base';

/**
 * Thực hiện đặt cược cho một lựa chọn cụ thể và kiểm tra kết quả
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

        // 1. Lấy balance hiện tại của user
        const balanceLocator = "//*[@id='leftBar']/div/div[2]/div[1]/div[1]/div[2]/div/div[3]/div/div[1]/div[2]/span[2]";
        const initialBalance = await getBalance(page, balanceLocator);
        console.log(`💰 Balance trước khi đặt cược: ${initialBalance}`);

        // 2. Click vào bet choice
        const betChoiceLocator = locator.betChoices[betChoice];
        if (!betChoiceLocator) {
            throw new Error(`Không tìm thấy locator cho bet choice: ${betChoice}`);
        }
        console.log(`🎯 Đặt cược: ${betChoice}`);
        await page.locator(betChoiceLocator).click();

        // Lấy tỷ lệ cược (odds) từ config
        const odds = gameConfig.odds[betChoice];
        if (!odds) {
            throw new Error(`Không tìm thấy tỷ lệ cược cho bet choice: ${betChoice}`);
        }
        console.log(`📊 Tỷ lệ cược: ${odds}`);

        // 3. Click vào nút "Cược" trên bet slip
        await page.locator('button').filter({ hasText: 'Cược' }).click();
        console.log('🎲 Đã click nút Cược');

        // Đợi một chút để giao dịch hoàn tất
        await page.waitForTimeout(2000);

        // 5. Kiểm tra balance sau khi đặt cược
        const balanceAfterBet = await getBalance(page, balanceLocator);
        console.log(`💰 Balance sau khi đặt cược: ${balanceAfterBet}`);
        const expectedBalanceAfterBet = initialBalance - gameConfig.betLimits.minBet;
        console.log(`💰 Balance kỳ vọng sau cược: ${expectedBalanceAfterBet}`);
        console.log(`💰 Chênh lệch: ${balanceAfterBet - expectedBalanceAfterBet}`);

        if (Math.abs(balanceAfterBet - expectedBalanceAfterBet) > 1) { // Cho phép sai số 1 đơn vị
            throw new Error(`❌ Đặt cược thất bại: Balance không khớp sau khi đặt cược
            - Balance hiện tại: ${balanceAfterBet}
            - Balance kỳ vọng: ${expectedBalanceAfterBet}
            - Chênh lệch: ${balanceAfterBet - expectedBalanceAfterBet}`);
        }

        // 6. Đợi vòng mới và kiểm tra kết quả
        await waitNewRound(page);
        const finalBalance = await getBalance(page, balanceLocator);

        if (finalBalance === balanceAfterBet) {
            console.log('😢 User thua cược');
        } else {
            const winAmount = finalBalance - balanceAfterBet;
            const expectedWinAmount = gameConfig.betLimits.minBet * odds;
            
            if (Math.abs(winAmount - expectedWinAmount) < 0.01) { // Sử dụng epsilon để so sánh số thực
                console.log(`🎉 User thắng cược! Số tiền thắng: ${winAmount}`);
            } else {
                console.log(`⚠️ Kết quả không khớp với dự kiến. Win amount: ${winAmount}, Expected: ${expectedWinAmount}`);
            }
        }

    } catch (error: any) {
        console.error(`❌ Lỗi khi đặt cược: ${error.message}`);
        throw error;
    }
}

/**
 * Lấy số dư tài khoản từ một locator
 */
async function getBalance(page: Page, balanceLocator: string): Promise<number> {
    try {
        // Đợi một chút để trang load hoàn toàn
        await page.waitForTimeout(2000);

        // Thử với selector đơn giản hơn
        const simpleBalanceLocator = "//*[@id='leftBar']//span[contains(@class, 'c-text')]";
        
        console.log('🔍 Đang tìm element balance...');
        
        // Lấy tất cả các elements match với selector
        const elements = await page.$$(simpleBalanceLocator);
        console.log(`📊 Tìm thấy ${elements.length} elements`);
        
        // Lặp qua từng element để tìm cái chứa số
        for (const element of elements) {
            const text = await element.textContent();
            console.log('📝 Text của element:', text);
            
            if (text) {
                const cleanText = text.trim().replace(/,/g, '');
                const number = parseFloat(cleanText);
                
                // Nếu là số và lớn hơn 0, có thể đây là balance
                if (!isNaN(number) && number > 0) {
                    console.log('💡 Tìm thấy số hợp lệ:', number);
                    return number;
                }
            }
        }

        throw new Error('Không tìm thấy element chứa balance');
    } catch (error: any) {
        console.error('❌ Lỗi khi lấy balance:', error.message);
        throw error;
    }
}

/**
 * Đợi vòng mới bắt đầu
 */
async function waitNewRound(page: Page): Promise<void> {
    // Đợi cho đến khi timer reset về giá trị ban đầu hoặc có indicator khác cho vòng mới
    await page.waitForTimeout(2000); // Đợi 2 giây để đảm bảo vòng mới đã bắt đầu
} 