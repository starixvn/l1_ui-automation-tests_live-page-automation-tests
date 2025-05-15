import { test } from '../../../testgame_core/base-fixture';
import { seDieConfig } from '../configs/gameconfig';
import { getSeDieLocators } from '../configs/locators';
import { GameEnvironment } from '../../../Configs/gameconfig_base';

// Smoke test for SeDie game
test.describe('SeDie Smoke Tests', () => {
    test('Verify SeDie Livepage', async ({ gameBase }) => {
        test.setTimeout(120000); // 2 phút

        // Lấy environment từ biến môi trường hoặc mặc định là PRO_SG
        const env = (process.env.TEST_ENV || 'PRO_SG') as GameEnvironment;
        
        // Lấy config và locators theo environment
        const gameConfig = seDieConfig(env);
        const locators = getSeDieLocators(env);

        // Chạy test với config và locators đã được setup
        await gameBase.runTest(gameConfig, locators);

        // Thử đặt cược với một số lựa chọn khác nhau
        const betChoices = ['odd', 'even', 'red2'] as const;
        for (const choice of betChoices) {
            try {
                await gameBase.placeBetTest(choice);
                console.log(`✅ Đặt cược thành công cho lựa chọn: ${choice}`);
            } catch (error: any) {
                console.error(`❌ Lỗi khi đặt cược ${choice}:`, error.message);
            }
            // Đợi một chút giữa các lần đặt cược
            await gameBase.wait(2000);
        }
    });
});