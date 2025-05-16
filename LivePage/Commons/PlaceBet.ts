import { Page } from 'playwright';
import { IBaseLocator } from '../Configs/locator_base';
import { IGameConfig } from '../Configs/gameconfig_base';
import WaitNewround from './WaitNewround';

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
    betChoice: string | undefined,
    gameConfig: IGameConfig,
    locator: IBaseLocator
): Promise<void> {
    try {
        // Luôn lấy choice đầu tiên từ danh sách nếu không có choice được chỉ định
        const choiceToUse = betChoice || gameConfig.choices[0];
        if (!choiceToUse) {
            throw new Error('Không tìm thấy bet choice nào trong gameConfig');
        }
        console.log(`🎲 Sẽ đặt cược cho choice: ${choiceToUse}`);

        // 1. Lấy balance hiện tại của user
        const balanceLocator = await findBalanceLocator(page);
        const initialBalance = await getBalance(page, balanceLocator);
        console.log(`💰 Balance trước khi đặt cược: ${initialBalance}`);

        // 2. Click vào bet choice
        const betChoiceLocator = locator.betChoices[choiceToUse];
        if (!betChoiceLocator) {
            throw new Error(`Không tìm thấy locator cho bet choice: ${choiceToUse}`);
        }
        
        // Đợi và verify bet choice có thể click được
        console.log(`🔍 Tìm bet choice: ${choiceToUse}`);
        const betChoiceElement = page.locator(betChoiceLocator);
        await betChoiceElement.waitFor({ state: 'visible', timeout: 10000 });
        
        // Click và đợi bet slip hiện ra
        console.log(`🎯 Click vào bet choice ${choiceToUse}`);
        await betChoiceElement.click();
        await page.waitForTimeout(1000);

        // 3. Click vào nút "Cược" trên bet slip
        await page.locator('button').filter({ hasText: 'Cược' }).click();
        console.log('🎲 Đã click nút Cược');

        // 4. Đợi giao dịch hoàn tất và verify balance
        console.log('⏳ Đợi giao dịch hoàn tất...');
        await page.waitForTimeout(2000);

        // Kiểm tra balance sau khi đặt cược
        const balanceAfterBet = await getBalance(page, balanceLocator);
        console.log(`💰 Balance sau khi đặt cược: ${balanceAfterBet}`);
        
        const expectedBalanceAfterBet = initialBalance - gameConfig.betLimits.minBet;
        if (Math.abs(balanceAfterBet - expectedBalanceAfterBet) > 1) {
            throw new Error(`❌ Đặt cược thất bại: Balance không khớp
            - Balance trước: ${initialBalance}
            - Balance sau: ${balanceAfterBet}
            - Balance kỳ vọng: ${expectedBalanceAfterBet}
            - Chênh lệch: ${balanceAfterBet - expectedBalanceAfterBet}`);
        }

        console.log('✅ Đặt cược thành công!');

        // 5. Đợi vòng mới và kiểm tra kết quả
        await WaitNewround(page, gameConfig.gameId, gameConfig);
        const finalBalance = await getBalance(page, balanceLocator);

        if (finalBalance === balanceAfterBet) {
            console.log('😢 User thua cược');
        } else {
            const winAmount = finalBalance - balanceAfterBet;
            const expectedWinAmount = gameConfig.betLimits.minBet * gameConfig.odds[choiceToUse];
            
            if (Math.abs(winAmount - expectedWinAmount) < 1) {
                console.log(`🎉 User thắng cược! Số tiền thắng: ${winAmount}`);
            } else {
                console.log(`⚠️ Kết quả không khớp. Win amount: ${winAmount}, Expected: ${expectedWinAmount}`);
            }
        }

    } catch (error: any) {
        // Chụp ảnh màn hình khi có lỗi
        const screenshotPath = `test-results/bet-error-${Date.now()}.png`;
        await page.screenshot({ path: screenshotPath });
        console.error(`❌ Lỗi khi đặt cược: ${error.message}`);
        console.error(`📸 Đã chụp ảnh màn hình: ${screenshotPath}`);
        throw error;
    }
}

/**
 * Tìm locator chứa balance
 */
async function findBalanceLocator(page: Page): Promise<string> {
    const possibleLocators = [
        "//*[@id='leftBar']//span[contains(@class, 'c-text')]",
        "//*[@id='leftBar']/div/div[2]/div[1]/div[1]/div[2]/div/div[3]/div/div[1]/div[2]/span[2]",
        "//div[contains(@class, 'balance-value')]"
    ];

    for (const locator of possibleLocators) {
        const elements = await page.$$(locator);
        for (const element of elements) {
            const text = await element.textContent();
            if (text && !isNaN(parseFloat(text.replace(/,/g, '')))) {
                return locator;
            }
        }
    }
    throw new Error('Không tìm thấy element chứa balance');
}

/**
 * Lấy số dư tài khoản từ một locator
 */
async function getBalance(page: Page, balanceLocator: string): Promise<number> {
    try {
        await page.waitForTimeout(1000);
        const elements = await page.$$(balanceLocator);
        
        for (const element of elements) {
            const text = await element.textContent();
            if (text) {
                const cleanText = text.trim().replace(/,/g, '');
                const number = parseFloat(cleanText);
                
                if (!isNaN(number) && number > 0) {
                    return number;
                }
            }
        }

        throw new Error('Không tìm thấy giá trị balance hợp lệ');
    } catch (error: any) {
        console.error('❌ Lỗi khi lấy balance:', error.message);
        throw error;
    }
} 