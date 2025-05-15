import * as fs from 'fs';
import { Browser, BrowserContext, Page } from "playwright";
import gameIdToTabName from "../Configs/gameTabMap";
export async function OpenGameTab(page: Page, gameId: number): Promise<void> {

    console.log(`OpenGameTab received gameId: ${gameId}`); // Log giá trị gameId được truyền vào
    if (!gameId) {
        throw new Error('❌ gameId không được truyền vào OpenGameTab.');
    }

    const gameTab = gameIdToTabName[gameId]; // Use the gameId parameter instead of GAME_ID

    if (!gameTab) {
      throw new Error(`❌ GAME_ID ${gameId} không hợp lệ hoặc chưa được map trong gameTabMap.`);
    }
  
    console.log(`➡️ Đang mở tab game: ${gameTab}...`);
    try {
      console.log(`🔍 Đang tìm tab game: ${gameTab}...`);
      await page.getByText(gameTab, { exact: true }).click({ timeout: 60000 }); // Tăng timeout lên 60 giây
      console.log(`✅ Đã click vào tab game: ${gameTab}`);
  
      // Đợi đồng hồ "Phiên" hiện ra để đảm bảo vào đúng game
      await page.locator('text=Phiên').nth(1).waitFor({ state: 'visible', timeout: 30000 }); // Tăng timeout lên 30 giây
      console.log('✅ Đã thấy đồng hồ Round, vào game ổn định!');
    } catch (error) {
      // Tạo thư mục test-results nếu chưa tồn tại
      if (!fs.existsSync('test-results')) {
        fs.mkdirSync('test-results');
        console.log('📂 Đã tạo thư mục test-results');
      }
      const errorScreenshotPath = `test-results/open-game-error-${gameId}-${Date.now()}.png`;
      await page.screenshot({ path: errorScreenshotPath });
      const errorMessage = error instanceof Error ? error.message : String(error); // Kiểm tra kiểu của error
      console.error(`❌ Lỗi khi mở tab game: ${errorMessage}`);
      console.log(`📸 Đã chụp ảnh màn hình khi lỗi xảy ra: ${errorScreenshotPath}`);
      throw error;
    }
  };
  export default OpenGameTab;