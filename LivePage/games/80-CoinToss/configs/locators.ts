import { IBaseLocator, LocatorFactory } from "../../../Configs/locator_base";

// Định nghĩa các bet choice có thể có của Monte Big Small
export type MonteBigSmallBetChoice = 'big' | 'small' | 'triple';

// Locators cho môi trường PRO_SG
export const PRO_SG_Locators: IBaseLocator = {
    betChoices: {
        'heads': "//div[text()='Ngửa']",
        'tails': "//div[text()='Sấp']"
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
        'heads': "//div[text()='Ngửa']",
        'tails': "//div[text()='Sấp']"
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
        'big': "//div[@data-testid='big-choice']",
        'small': "//div[@data-testid='small-choice']",
        'triple': "//div[@data-testid='triple-choice']"
    },
    oddsLocators: {
        'checkodds': "//div[text()='${gameTab}']//following::div[contains(@class,'c-in-play')][1]/div/div[1]/div[3]"
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
export const getCoinTossLocators: LocatorFactory = (env: string): IBaseLocator => {
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

export default getCoinTossLocators;