import { test, expect } from '@playwright/test';
import Login from '../../Commons/Login';
import openLivePage, { LiveEnvType } from '../../Commons/OpenLivepage';
import OpenGameTab from '../../Commons/OpenGameTab';
import WaitNewround from '../../Commons/WaitNewround';
import { checkOdds } from '../../Commons/CheckOdds';
import { ENV, GAME_ID } from '../../Commons/EnvVars';
import { baccaratConfig } from '../../games/10-Baccarat/configs/gameconfig';
import { GameEnvironment } from '../../Configs/gameconfig_base';
import { getBaccaratLocators } from '../../games/10-Baccarat/configs/locators';

test('📍 Test Game Baccarat', async () => {
    test.setTimeout(120000); // Tăng timeout tổng thể của test lên 120 giây
    const { browser, page } = await Login(true); // ✅ UI mode
    const env = (process.env.TEST_ENV || 'PRO_SG') as LiveEnvType & GameEnvironment;
    await openLivePage(page, env);
    const gameId = Number(process.env.GAME_ID); // Lấy gameId từ biến môi trường
    await OpenGameTab(page, gameId);

    // Lấy config và locators cho game
    const gameConfig = baccaratConfig(env);
    const locators = getBaccaratLocators(env);

    await checkOdds(page, gameId, locators, gameConfig);
    await WaitNewround(page, gameId, gameConfig);
    console.log('✅ WaitNewround hoàn thành, đóng trình duyệt...');
    await browser.close();
});