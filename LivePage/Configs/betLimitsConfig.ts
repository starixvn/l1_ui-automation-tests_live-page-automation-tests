type BetLimitsConfig = Record<number, Record<string, { min: number; max: number; locator: string }>>;

const betLimitsConfig: BetLimitsConfig = {
    2: {
      Odd: { min: 1, max: 2000, locator: "//div[text()='Lẻ']/following::div[1]" },
      Even: { min: 10, max: 1000, locator: "//div[text()='Chẵn']/following::div[1]" },
    },
    10: {
      Player: { min: 20, max: 2000, locator: "//div[text()='Player']" },
      Banker: { min: 20, max: 2000, locator: "//div[text()='Banker']" },
      Tie: { min: 10, max: 500, locator: "//div[text()='Tie']" },
    },
  };
  
  export default betLimitsConfig;