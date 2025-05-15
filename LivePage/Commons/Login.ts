import { Browser, BrowserContext, Page } from "playwright";
import envConfig from "../Configs/environment";
import launchBrowser from "./browserHelper";
import { promises } from "dns";
import { ENV, GAME_ID } from './EnvVars';

export async function Login(headless = true): Promise<{
    browser: Browser;
    context: BrowserContext;
    page: Page;
  }> {
    //const env = process.env.TEST_ENV || 'PRO_SG';
    const config = envConfig[ENV];
  
    if (!config) throw new Error(`❌ Không tìm thấy cấu hình cho TEST_ENV = "${ENV}"`);
  
    console.log(`🌐 Bắt đầu login vào môi trường: ${ENV}`);
    const { browser, context, page } = await launchBrowser(headless);
    await page.goto(config.baseUrl, { waitUntil: 'load' });
  
    // 👉 Flow riêng cho từng nhóm
    if (ENV === 'PRO_SG') {
      // ✅ B1: Nếu popup cảnh báo xuất hiện → close it
  const warningPopup = page.locator('text=kiểm tra địa chỉ các trang web'); // hoặc selector khác chính xác hơn
  await page.locator('div:nth-child(10) > .modal__dialog > .modal__close > .btn').click();
  // ✅ B2: Bấm Đăng nhập
  await page.locator('a').filter({ hasText: 'Đăng nhập' }).first().click();
  console.log('🔐 Mở modal đăng nhập.');
  // ✅ B3: Nhập thông tin
  await page.getByRole('textbox', { name: 'Tên Truy Cập' }).click();
  await page.getByRole('textbox', { name: 'Tên Truy Cập' }).fill(config.username);
  await page.getByRole('textbox', { name: 'Mật Khẩu' }).click();
  await page.getByRole('textbox', { name: 'Mật Khẩu' }).fill(config.password);
  await page.locator('a').filter({ hasText: 'Đăng nhập' }).nth(1).click();
    }
  
    else if (ENV === 'PROVG_Credit') {
        console.log('🔐 Mở modal đăng nhập.');
        await page.locator('a').filter({ hasText: 'Login' }).first().click();
        console.log('🔐 Mở modal đăng nhập.');
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('MemIBCINDOSB52');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('123456');
        await page.locator('a').filter({ hasText: 'Login' }).nth(1).click();
        await page.goto('https://d.nova88.com/Sports/');
        await page.getByText('Live', { exact: true }).nth(2).click();
    }
  
    else if (ENV === 'PROVG_Cash') {
      await page.getByPlaceholder('Tên đăng nhập').fill(config.username);
      await page.getByPlaceholder('Mật khẩu').fill(config.password);
      await page.getByRole('button', { name: 'Đăng nhập' }).click();
    }
  
    else {
      throw new Error(`🛑 Chưa hỗ trợ login cho môi trường: ${ENV}`);
    }
  
    // 📸 Screenshot + xác nhận login
    await page.waitForSelector('.c-text', { state: 'visible' });
   /* await page.screenshot({
      path: `testlivepage/snapshots/login-success-${env}.png`,
      fullPage: true,
    });*/
  
    console.log('✅ Login thành công!');
    return { browser, context, page };
  };
  export default Login;
