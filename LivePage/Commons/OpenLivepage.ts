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
    await page.getByText('Trực tiếp', { exact: true }).nth(3).click();
    await page.waitForTimeout(60000);
    // B2: Xử lý theo từng môi trường
    switch(env) {
      case 'PRO_SG':
        await page.getByText('SABA.games', { exact: true })
          .waitFor({state: 'visible', timeout: 120000 });
        console.log('✅ Đã vào đúng SABA.games');
        break;

      case 'PROVG_Credit':
        await page.getByText('Vgaming', { exact: true }).nth(1)
        .waitFor({ state: 'visible', timeout: 120000 });
        const vgElements = await page.locator('text=Vgaming').all();
       console.log('Số lượng element Vgaming tìm thấy:', vgElements.length); 
      console.log('✅ Đã vào đúng Vgaming');
      break;

      case 'PROVG_Cash':
        await page.getByText('Vgaming', { exact: true })
          .waitFor({ timeout: 30000 });
        console.log('✅ Đã vào đúng Vgaming');
        break;

      default:
        throw new Error(`❌ Không hỗ trợ ENV "${env}" trong OpenLivepage`);
    }

  } catch (error) {
    console.error(`❌ Lỗi khi mở Live Page: ${error instanceof Error ? error.message : 'Không xác định'}`);
    throw error;
  }
}

export default openLivePage;