import { Browser, BrowserContext, Page } from "playwright";

export type LiveEnvType = 'PRO_SG' | 'PROVG_Credit' | 'PROVG_Cash' ;

export async function openLivePage(page: Page, env: LiveEnvType) {
  // Validate env
  if (!env) {
    throw new Error('❌ ENV cannot be empty in OpenLivepage');
  }

  console.log(`📺 Switching to Live lobby (${env})...`);

  try {
    await page.waitForLoadState('domcontentloaded');

    // Step 1: Click on "Live" button
    await page.getByText('Trực tiếp', { exact: true }).nth(3).click();
    await page.waitForTimeout(60000);
    // Step 2: Handle based on environment
    switch(env) {
      case 'PRO_SG':
        await page.getByText('SABA.games', { exact: true })
          .waitFor({state: 'visible', timeout: 120000 });
        console.log('✅ Successfully entered SABA.games');
        break;

      case 'PROVG_Credit':
        await page.getByText('Vgaming', { exact: true }).nth(1)
        .waitFor({ state: 'visible', timeout: 120000 });
        const vgElements = await page.locator('text=Vgaming').all();
        console.log('Number of Vgaming elements found:', vgElements.length); 
        console.log('✅ Successfully entered Vgaming');
        break;

      case 'PROVG_Cash':
        await page.getByText('Vgaming', { exact: true })
          .waitFor({ timeout: 30000 });
        console.log('✅ Successfully entered Vgaming');
        break;

      default:
        throw new Error(`❌ Environment "${env}" not supported in OpenLivepage`);
    }

  } catch (error) {
    console.error(`❌ Error opening Live Page: ${error instanceof Error ? error.message : 'Unknown'}`);
    throw error;
  }
}

export default openLivePage;