import { IBaseLocator, LocatorFactory } from "../../../../LivePage/Configs/locator_base";

// Định nghĩa các bet choice có thể có của game
export type RnGSoccerBetChoice = 'home' | 'draw' | 'away';

// Locators cho môi trường PRO_SG
export const PRO_SG_Locators: IBaseLocator = {
    betChoices: {
        'home': "(//span[@title='Đội Nhà'])[1]/following::div[1]",
        'draw': "//span[@title='Hòa']/following::div[1]",
        'away': "//span[@title='Đội Khách']/following::div[1]"
    },

    oddsLocators: {
        'checkodds':"//div[@data-choice='home']/parent::div[1]",
        'home': "//div[contains(@class,'bet-choice') and contains(text(),'Home')]//following::div[contains(@class,'odds')][1]",
        'draw': "//div[contains(@class,'bet-choice') and contains(text(),'Draw')]//following::div[contains(@class,'odds')][1]",
        'away': "//div[contains(@class,'bet-choice') and contains(text(),'Away')]//following::div[contains(@class,'odds')][1]"
    },

    timerLocator: "//div[@data-testid='round-id']/following::div[2]/div/div",
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
        'home': "//div[contains(@class,'bet-choice') and contains(text(),'Home')]",
        'draw': "//div[contains(@class,'bet-choice') and contains(text(),'Draw')]",
        'away': "//div[contains(@class,'bet-choice') and contains(text(),'Away')]"
    },

    oddsLocators: {
        'checkodds':"//div[@data-choice='home']/parent::div[1]",
        'home': "//div[contains(@class,'bet-choice') and contains(text(),'Home')]//following::div[contains(@class,'odds')][1]",
        'draw': "//div[contains(@class,'bet-choice') and contains(text(),'Draw')]//following::div[contains(@class,'odds')][1]",
        'away': "//div[contains(@class,'bet-choice') and contains(text(),'Away')]//following::div[contains(@class,'odds')][1]"
    },

    timerLocator: "//div[@data-testid='round-id']/following::div[2]/div/div",
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
        'home': "//div[contains(@class,'bet-choice') and contains(text(),'Home')]",
        'draw': "//div[contains(@class,'bet-choice') and contains(text(),'Draw')]",
        'away': "//div[contains(@class,'bet-choice') and contains(text(),'Away')]"
    },

    oddsLocators: {
        'checkodds':"//div[@data-choice='home']/parent::div[1]",
        'home': "//div[contains(@class,'bet-choice') and contains(text(),'Home')]//following::div[contains(@class,'odds')][1]",
        'draw': "//div[contains(@class,'bet-choice') and contains(text(),'Draw')]//following::div[contains(@class,'odds')][1]",
        'away': "//div[contains(@class,'bet-choice') and contains(text(),'Away')]//following::div[contains(@class,'odds')][1]"
    },

    timerLocator: "//div[contains(@class,'timer')]//span[contains(@class,'time')]",
    gameLoadedLocator: "//div[@id='game-header']//div[contains(text(),'Phiên')]",

    additionalLocators: {
        betAmount: "//input[@id='bet-amount']",
        confirmBet: "//button[@id='confirm-bet']",
        cancelBet: "//button[@id='cancel-bet']"
    }
};


// Factory function để lấy locators theo environment
export const getRnGSoccerLocator: LocatorFactory = (env: string): IBaseLocator => {
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