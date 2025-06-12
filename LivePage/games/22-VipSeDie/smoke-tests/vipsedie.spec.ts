import { test } from '../../../testgame_core/base-fixture';
import { vipSeDieConfig } from '../configs/gameconfig';
import { getVipSeDieLocators } from '../configs/locators';
import { GameEnvironment } from '../../../Configs/gameconfig_base';

// Smoke test for VipSeDie game
test.describe('VipSeDie Smoke Tests', () => {
    test('Verify VipSeDie Livepage', async ({ gameBase }) => {
        test.setTimeout(300000); // 5 phút

        // Lấy environment từ biến môi trường hoặc mặc định là PRO_SG
        const env = (process.env.TEST_ENV || 'PRO_SG') as GameEnvironment;
        
        // Lấy config và locators theo environment
        const gameConfig = vipSeDieConfig(env);
        const locators = getVipSeDieLocators(env);

        // Chạy test với config và locators đã được setup, skip OpenGameTab
        await gameBase.runTest(gameConfig, locators, { skipOpenGameTab: true });
    });
});