import { test, expect } from '@playwright/test';
import Login from '../../Commons/Login';
import openLivePage from '../../Commons/OpenLivepage';
import OpenGameTab from '../../Commons/OpenGameTab';
import WaitNewround from '../../Commons/WaitNewround';
import { checkOdds } from '../../Utils/oddsChecker';
import { ENV, GAME_ID } from '../../Commons/EnvVars';



test('📍 Test Game Monte Big Small', async () => {
    test.setTimeout(120000); // Tăng timeout tổng thể của test lên 120 giây
              const { browser, page } = await Login(true); // ✅ UI mode
              await openLivePage (page,  process.env.TEST_ENV || 'PRO_SG')
              const gameId = Number(process.env.GAME_ID); // Lấy gameId từ biến môi trường
              await OpenGameTab(page, gameId);
              await checkOdds(page, gameId);
              await WaitNewround(page, gameId);
              console.log('✅ WaitNewround hoàn thành, đóng trình duyệt...');
              await browser.close();
  });