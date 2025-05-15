import { Page } from 'playwright';
import { commonLocator, oddsConfig } from '../Configs/oddsConfig';

export async function checkOdds(page: Page, gameId: number): Promise<void> {
  console.log(`🔍 Đang kiểm tra odds cho gameId: ${gameId}`);

  const gameOdds = oddsConfig[gameId];
  if (!gameOdds) {
    throw new Error(`❌ Không tìm thấy cấu hình odds cho gameId: ${gameId}`);
  }

  const { gameTab, expectedOdds, locator: specificLocator } = gameOdds;

  // Sử dụng locator riêng nếu có, nếu không thì dùng commonLocator
  const locator = specificLocator || commonLocator.replace('${gameTab}', gameTab);

  // Sử dụng locator để lấy toàn bộ odds
  const oddsLocator = page.locator(locator);

  // Đợi locator xuất hiện
  await oddsLocator.waitFor({ state: 'visible', timeout: 5000 });

  // Lấy toàn bộ chuỗi odds từ giao diện
  const actualOddsText = await oddsLocator.textContent();
  if (!actualOddsText) {
    throw new Error('❌ Không tìm thấy odds trên giao diện.');
  }

  console.log(`✅ Odds trên giao diện: ${actualOddsText.trim()}`);

  // So sánh toàn bộ chuỗi odds với chuỗi mong đợi
  if (actualOddsText.trim() !== expectedOdds) {
    throw new Error(`❌ Odds không khớp. Mong đợi: ${expectedOdds}, Thực tế: ${actualOddsText.trim()}`);
  }

  console.log('✅ Tất cả odds đều khớp!');
}