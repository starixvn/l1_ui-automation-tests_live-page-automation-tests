import { test } from '../../../testgame_core/base-fixture';
import { fishprawncrabConfig } from '../configs/gameconfig';
import { getFishPrawnCrabLocators } from '../configs/locators';
import { GameEnvironment } from '../../../Configs/gameconfig_base';

// Smoke test for SeDie game
test.describe('Fish Prawn Crab Smoke Tests', () => {
    // Tăng timeout cho test case này
    test('Verify Fish Prawn Crab Livepage', async ({ gameBase }) => {
        // Tăng timeout lên 2 phút
        test.setTimeout(300000);

        try {
            // Lấy environment từ biến môi trường hoặc mặc định là PRO_SG
            const env = (process.env.TEST_ENV || 'PRO_SG') as GameEnvironment;
            
            // Lấy config và locators theo environment
            const gameConfig = fishprawncrabConfig(env);
            const locators = getFishPrawnCrabLocators(env);

            // Chạy test với config và locators đã được setup
            await gameBase.runTest(gameConfig, locators);
        } catch (error: any) {
            console.error('❌ Lỗi trong test:', error.message);
            throw error;
        }
    });
});