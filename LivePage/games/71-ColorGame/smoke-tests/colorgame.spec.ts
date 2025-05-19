import { test } from '../../../testgame_core/base-fixture';
import { colorgameConfig } from '../configs/gameconfig';
import { getColorGameLocators } from '../configs/locators';
import { GameEnvironment } from '../../../Configs/gameconfig_base';

// Smoke test for game
test.describe('Color Game Smoke Tests', () => {
    // Tăng timeout cho test case này
    test('Verify Color Game Livepage', async ({ gameBase }) => {
        // Tăng timeout lên 2 phút
        test.setTimeout(300000);

        try {
            // Lấy environment từ biến môi trường hoặc mặc định là PRO_SG
            const env = (process.env.TEST_ENV || 'PRO_SG') as GameEnvironment;
            
            // Lấy config và locators theo environment
            const gameConfig = colorgameConfig(env);
            const locators = getColorGameLocators(env);

            // Chạy test với config và locators đã được setup
            await gameBase.runTest(gameConfig, locators);
        } catch (error: any) {
            console.error('❌ Lỗi trong test:', error.message);
            throw error;
        }
    });
});