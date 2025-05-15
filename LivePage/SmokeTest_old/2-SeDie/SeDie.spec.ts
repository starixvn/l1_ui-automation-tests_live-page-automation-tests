import { test, expect } from '@playwright/test';
import Login from '../../Commons/Login';
import openLivePage, { LiveEnvType } from '../../Commons/OpenLivepage';
import OpenGameTab from '../../Commons/OpenGameTab';
import { ENV, GAME_ID } from '../../Commons/EnvVars';
import WaitNewround from '../../Commons/WaitNewround';
import { checkOdds } from '../../Commons/CheckOdds';
import { placeBet } from '../../Utils/placeBet';
import { getSeDieLocators } from '../../games/2-SeDie/configs/locators';
import { seDieConfig } from '../../games/2-SeDie/configs/gameconfig';
import { GameEnvironment } from '../../Configs/gameconfig_base';

test('📍 Test Game Se Die ', async () => {
   test.setTimeout(120000); // Tăng timeout tổng thể của test lên 120 giây
   const { browser, page } = await Login(false); // ✅ UI mode
   const env = (process.env.TEST_ENV || 'PRO_SG') as LiveEnvType & GameEnvironment;
   await openLivePage(page, env);
   const gameId = Number(process.env.GAME_ID); // Lấy gameId từ biến môi trường
   await OpenGameTab(page, gameId);
   
   // Lấy locators và config cho game
   const gameLocator = getSeDieLocators(env);
   const gameConfig = seDieConfig(env);
   
   // Check odds với locators và config
   await checkOdds(page, gameId, gameLocator, gameConfig);
   
   await WaitNewround(page, gameId, gameConfig);
   const betChoice = 'Odd'; // Lựa chọn cược
   await placeBet(page, gameId, betChoice);
   await browser.close();
});