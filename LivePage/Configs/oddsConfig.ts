export const oddsConfig: Record<number, { gameTab: string; expectedOdds: string; choices: Record<string, number>; locator?: string }> = {
  2: {
    gameTab: 'Xóc Đĩa',
    expectedOdds: 'Lẻ1.96Chẵn1.9614.403.752.4014.403.75',
    choices: {
      'Odd': 1.96,
      'Even': 1.96,
      '1Red': 3.75,
    },
  },
  22: {
    gameTab: 'Xóc Đĩa VIP',
    expectedOdds: 'Lẻ1.96Chẵn1.9614.403.752.4014.403.75',
    choices: {
      'Odd': 1.96,
      'Even': 1.96,
      '1Red': 3.75,
    },
  },
  10: {
    gameTab: 'Cào Baccarat',
    expectedOdds: 'Nhà Con2.00Nhà Cái1.95Hòa9.00Con Đôi12.00Cái Đôi12.00',
    choices: {
      'Player': 1.95,
      'Banker': 1.95,
      'Tie': 8.00,
    },
  },
  55: {
    gameTab: 'Tài Xỉu',
    locator: '//*[@id="mainArea"]/div/div[2]/div/div/div[3]/div/div[1]/div[3]/div[1]/div[1]',
    expectedOdds: 'Tài [11 - 18]1.96Xỉu [3 - 10]1.96',
    choices: {
      'Big': 1.96,
      'Small': 1.96,
    },
  },
};

export const commonLocator = "//div[text()='${gameTab}']//following::div[contains(@class,'c-in-play')][1]/div/div[1]/div[3]";

export default oddsConfig;