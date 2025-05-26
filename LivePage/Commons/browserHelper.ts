import { chromium, Browser, BrowserContext, Page } from 'playwright';

export async function launchBrowser(): Promise<{
  browser: Browser;
  context: BrowserContext;
  page: Page;
}> {
  const browser = await chromium.launch();

  const context = await browser.newContext({
    viewport: { width: 1250, height: 700 }, // 👉 Fix viewport đẹp
    recordHar: { path: 'harfiles/login.har' },
  });

  const page = await context.newPage();
  return { browser, context, page };
}

export default launchBrowser;