import { Page } from 'playwright';
import betLimitsConfig from '../Configs/betLimitsConfig';

interface BetConfig {
  locator: string;
}

export async function placeBet(page: Page, gameId: number, betChoice: string): Promise<void> {
  console.log(`🔍 Placing bet for gameId: ${gameId}, betChoice: ${betChoice}`);

  // Retrieve game configuration
  const gameConfig = betLimitsConfig[gameId];
  if (!gameConfig) {
    throw new Error(`❌ Configuration not found for gameId: ${gameId}`);
  }

  const betChoiceConfig: BetConfig = gameConfig[betChoice];
  if (!betChoiceConfig) {
    throw new Error(`❌ Configuration not found for betChoice: ${betChoice} in gameId: ${gameId}`);
  }

  // Perform the betting action
  await performBetAction(page, betChoiceConfig);
  console.log(`✅ Bet placed successfully for betChoice: ${betChoice}`);
}

async function performBetAction(page: Page, betConfig: BetConfig): Promise<void> {
  const { locator } = betConfig;

  // Locate and click the bet choice
  const betChoiceLocator = page.locator(locator);
  await betChoiceLocator.waitFor({ state: 'visible', timeout: 5000 });
  await betChoiceLocator.click();

  // Confirm the bet
  await page.locator('button').filter({ hasText: 'Cược' }).click();
  await page.getByRole('checkbox', { name: 'Tắt thông báo này' }).check();
}
