import { test } from '../../../testgame_core/base-fixture';
import { seDieConfig } from '../configs/gameconfig';
import { getSeDieLocators } from '../configs/locators';
import { GameEnvironment } from '../../../Configs/gameconfig_base';

// Smoke test for SeDie game
test.describe('SeDie Smoke Tests', () => {
    // Tăng timeout cho test case này
    test('Verify SeDie Livepage', async ({ gameBase }) => {
        // Tăng timeout lên 2 phút
        test.setTimeout(120000);

        try {
            // Lấy environment từ biến môi trường hoặc mặc định là PRO_SG
            const env = (process.env.TEST_ENV || 'PRO_SG') as GameEnvironment;
            
            // Lấy config và locators theo environment
            const gameConfig = seDieConfig(env);
            const locators = getSeDieLocators(env);

            // Chạy test với config và locators đã được setup
            await gameBase.runTest(gameConfig, locators);
        } catch (error: any) {
            console.error('❌ Lỗi trong test:', error.message);
            throw error;
        }
    });
});