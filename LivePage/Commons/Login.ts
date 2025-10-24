import { Browser, BrowserContext, Page } from "playwright";
import envConfig from "../Configs/environment";
import launchBrowser from "./browserHelper";
import { promises } from "dns";
import { ENV, GAME_ID } from './EnvVars';

export async function Login(): Promise<{
    browser: Browser;
    context: BrowserContext;
    page: Page;
  }> {
    //const env = process.env.TEST_ENV || 'PRO_SG';
    const config = envConfig[ENV];
  
    if (!config) throw new Error(`❌ Configuration not found for TEST_ENV = "${ENV}"`);
  
    console.log(`🌐 Starting login to environment: ${ENV}`);
    const { browser, context, page } = await launchBrowser();
    await page.goto(config.baseUrl, { waitUntil: 'load' });
  
    // 👉 Specific flow for each group
    if (ENV === 'PRO_SG') {
      // ✅ Step 1: If warning popup appears → close it
      const warningPopup = page.locator('text=kiểm tra địa chỉ các trang web'); // or other more precise selector
      //await page.locator('div:nth-child(10) > .modal__dialog > .modal__close > .btn').click();
    await page.locator ("//div[contains(@class, 'modal--alert')]//i[contains(@class, 'icon--close')]").click()
      // ✅ Step 2: Click Login
     await page.locator('a').filter({ hasText: 'Đăng nhập' }).first().click();
      console.log('🔐 Opening login modal.');
      // ✅ Step 3: Enter credentials
      await page.getByRole('textbox', { name: 'Tên Truy Cập' }).click();
      await page.getByRole('textbox', { name: 'Tên Truy Cập' }).fill(config.username);
      await page.getByRole('textbox', { name: 'Mật Khẩu' }).click();
      await page.getByRole('textbox', { name: 'Mật Khẩu' }).fill(config.password);
      await page.locator('a').filter({ hasText: 'Đăng nhập' }).nth(1).click();
    }
  
    else if (ENV === 'PROVG_Credit') {
      console.log('🔐 Opening login modal.');
      await page.locator('a').filter({ hasText: 'Login' }).first().click();
      console.log('🔐 Opening login modal.');
      await page.getByRole('textbox', { name: 'Username' }).click();
      await page.getByRole('textbox', { name: 'Username' }).click();
      await page.getByRole('textbox', { name: 'Username' }).fill(config.username);
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill(config.password);
      await page.locator('a').filter({ hasText: 'Login' }).nth(1).click();
    }
  
    else if (ENV === 'PROVG_Cash') {
      await page.getByPlaceholder('Tên đăng nhập').fill(config.username);
      await page.getByPlaceholder('Mật khẩu').fill(config.password);
      await page.getByRole('button', { name: 'Đăng nhập' }).click();
    }
  
    else {
      throw new Error(`🛑 Login not supported for environment: ${ENV}`);
    }
  
    // 📸 Screenshot + login confirmation
    await page.waitForSelector('.c-text', { state: 'visible' });
   /* await page.screenshot({
      path: `testlivepage/snapshots/login-success-${env}.png`,
      fullPage: true,
    });*/
    // close new popup
    await page.getByText('OK', { exact: true }).click();
   await page.locator('#six_score a').click();
    console.log('✅ Login successful!');
    return { browser, context, page };
  };
  export default Login;
