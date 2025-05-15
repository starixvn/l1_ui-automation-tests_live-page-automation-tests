import { Browser, BrowserContext, Page } from "playwright";

export type LiveEnvType = 'PRO_SG' | 'PROVG_Credit' | 'PROVG_Cash' ;

export async function openLivePage(page: Page, env: LiveEnvType) {
  // Validate env
  if (!env) {
    throw new Error('❌ ENV không được để trống trong OpenLivepage');
  }

  console.log(`📺 Đang chuyển vào sảnh Live (${env})...`);

  try {
    await page.waitForLoadState('domcontentloaded');

    // B1: Click vào nút "Trực tiếp"
    await page.getByText('Trực tiếp', { exact: true }).nth(2).click();

    // B2: Xử lý theo từng môi trường
    switch(env) {
      case 'PRO_SG':
        await page.getByText('SABA.games', { exact: true })
          .waitFor({ timeout: 30000 });
        console.log('✅ Đã vào đúng SABA.games');

        await page.locator('div')
          .filter({ hasText: /^Xóc Đĩa VIP$/ })
          .nth(1)
          .waitFor({ state: 'visible', timeout: 15000 });
        console.log('✅ Tab "VIP Se Die" đã hiển thị');
        break;

      case 'PROVG_Credit':
      case 'PROVG_Cash':
        await page.getByText('Vgaming', { exact: true })
          .waitFor({ timeout: 30000 });
        console.log('✅ Đã vào đúng Vgaming');

        await page.locator('div')
          .filter({ hasText: /^Baccarat$/ })
          .waitFor({ state: 'visible', timeout: 15000 });
        console.log('✅ Tab "Baccarat" đã hiển thị');
        break;

      default:
        throw new Error(`❌ Không hỗ trợ ENV "${env}" trong OpenLivepage`);
    }

    // B3: Đợi chữ "Round" xuất hiện
    await page.getByText(/^Phiên/, { exact: false })
      .nth(0)
      .waitFor({ timeout: 20000 });
    console.log('✅ Đã thấy đồng hồ Round — Vào livepage ổn định!');

  } catch (error) {
    console.error(`❌ Lỗi khi mở Live Page: ${error.message}`);
    throw error;
  }
}

export default openLivePage;