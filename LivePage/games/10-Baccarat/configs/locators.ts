import { IBaseLocator, LocatorFactory } from "../../../Configs/locator_base";

// Định nghĩa các bet choice có thể có của Baccarat
export type BaccaratBetChoice = 'player' | 'banker' | 'tie';

// Locators cho môi trường PRO_SG
export const PRO_SG_Locators: IBaseLocator = {
    betChoices: {
        'player': "(//div[text()='Nhà Con'])[2]",
        'banker': "(//div[text()='Nhà Cái'])[2]",
        'tie': "//div[contains(@class,'bet-option-tie')]"
    },
    oddsLocators: {
        'checkodds': "//div[text()='${gameTab}']//following::div[contains(@class,'c-in-play')][1]/div/div[1]/div[3]"
    },
    timerLocator: "//div[text()='${gameTab}']//following::div[contains(@class,'in-play')][1]//div[2]/div[1]/div[2]/span[1]",
    gameLoadedLocator: "//div[contains(@class,'game-header')]//div[contains(text(),'Phiên')]",
    additionalLocators: {
        betAmount: "//input[@class='bet-amount-input']",
        confirmBet: "//button[contains(@class,'confirm-bet')]",
        cancelBet: "//button[contains(@class,'cancel-bet')]"
    }
};

// Locators cho môi trường PROVG_Credit
export const PROVG_Credit_Locators: IBaseLocator = {
    betChoices: {
        'player': "(//div[text()='Nhà Con'])[2]",
        'banker': "(//div[text()='Nhà Cái'])[2]",
        'tie': "//div[contains(@class,'bet-option-tie')]"
    },
    oddsLocators: {
       'checkodds': "//div[text()='${gameTab}']//following::div[contains(@class,'c-in-play')][1]/div/div[1]/div[3]"
    },
    timerLocator: "//div[text()='${gameTab}']//following::div[contains(@class,'in-play')][1]//div[2]/div[1]/div[2]/span[1]",
    gameLoadedLocator: "//div[@id='game-header']//div[contains(text(),'Phiên')]",
    additionalLocators: {
        betAmount: "//input[@id='bet-amount']",
        confirmBet: "//button[@id='confirm-bet']",
        cancelBet: "//button[@id='cancel-bet']"
    }
};

// Locators cho môi trường PROVG_Cash
export const PROVG_Cash_Locators: IBaseLocator = {
    betChoices: {
        'player': "//div[@data-testid='player-choice']",
        'banker': "//div[@data-testid='banker-choice']",
        'tie': "//div[@data-testid='tie-choice']"
    },
    oddsLocators: {
        'player': "//div[@data-testid='player-odds']//span[@class='odds']",
        'banker': "//div[@data-testid='banker-odds']//span[@class='odds']",
        'tie': "//div[@data-testid='tie-odds']//span[@class='odds']"
    },
    timerLocator: "//div[text()='${gameTab}']//following::div[contains(@class,'in-play')][1]//div[2]/div[1]/div[2]/span[1]",
    gameLoadedLocator: "//div[@data-testid='game-header']//div[contains(text(),'Phiên')]",
    additionalLocators: {
        betAmount: "//input[@data-testid='bet-amount']",
        confirmBet: "//button[@data-testid='confirm-bet']",
        cancelBet: "//button[@data-testid='cancel-bet']"
    }
};

// Factory function để lấy locators theo environment
export const getBaccaratLocators: LocatorFactory = (env: string): IBaseLocator => {
    switch (env) {
        case 'PRO_SG':
            return PRO_SG_Locators;
        case 'PROVG_Credit':
            return PROVG_Credit_Locators;
        case 'PROVG_Cash':
            return PROVG_Cash_Locators;
        default:
            throw new Error(`Không tìm thấy locators cho môi trường: ${env}`);
    }
};