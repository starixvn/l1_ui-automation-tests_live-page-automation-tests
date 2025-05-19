import { test } from '../../../testgame_core/base-fixture';
import { baccaratConfig } from '../configs/gameconfig';
import { getBaccaratLocators } from '../configs/locators';
import { GameEnvironment } from '../../../Configs/gameconfig_base';

// Smoke test for Baccarat game
test.describe('Baccarat Smoke Tests', () => {
    test('Verify Baccarat Livepage', async ({ gameBase }) => {
        test.setTimeout(300000); // 5 phút
        try {
        // Lấy environment từ biến môi trường hoặc mặc định là PRO_SG
        const env = (process.env.TEST_ENV || 'PRO_SG') as GameEnvironment;
        
        // Lấy config và locators theo environment
        const gameConfig = baccaratConfig(env);
        const locators = getBaccaratLocators(env);

        // Chạy test với config và locators đã được setup
        await gameBase.runTest(gameConfig, locators);
    } catch (error: any) {
        console.error('❌ Lỗi trong test:', error.message);
        throw error;
    }
    });
}); 