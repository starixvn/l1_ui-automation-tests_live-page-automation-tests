import { IBaseLocator, LocatorFactory } from "../../../Configs/locator_base";

// Định nghĩa các bet choice có thể có của SeDie
export type SeDieBetChoice = 'odd' | 'even' | 'red2' | 'red3' | 'red4' | 'white3' | 'white4';

// Locators cho môi trường PRO_SG
export const PRO_SG_Locators: IBaseLocator = {
    betChoices: {
        'odd': "//div[text()='Lẻ']/following::div[1]",
        'even': "//div[text()='Chẵn']/following::div[1]",
        'red2': "//div[contains(@class,'bet-option-red2')]",
        'red3': "//div[contains(@class,'bet-option-red3')]",
        'red4': "//div[contains(@class,'bet-option-red4')]",
        'white3': "//div[contains(@class,'bet-option-white3')]",
        'white4': "//div[contains(@class,'bet-option-white4')]"
    },

    oddsLocators: {
        'checkodds': "//div[text()='${gameTab}']//following::div[contains(@class,'c-in-play')][1]/div/div[1]/div[3]",
        'odd': "//div[contains(@class,'odds-odd')]//span[@class='odds-value']",
        'even': "//div[contains(@class,'odds-even')]//span[@class='odds-value']",
        'red2': "//div[contains(@class,'odds-red2')]//span[@class='odds-value']",
        'red3': "//div[contains(@class,'odds-red3')]//span[@class='odds-value']",
        'red4': "//div[contains(@class,'odds-red4')]//span[@class='odds-value']",
        'white3': "//div[contains(@class,'odds-white3')]//span[@class='odds-value']",
        'white4': "//div[contains(@class,'odds-white4')]//span[@class='odds-value']"
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
        'odd': "//div[@id='odd-choice']",
        'even': "//div[@id='even-choice']",
        'red2': "//div[@id='red2-choice']",
        'red3': "//div[@id='red3-choice']",
        'red4': "//div[@id='red4-choice']",
        'white3': "//div[@id='white3-choice']",
        'white4': "//div[@id='white4-choice']"
    },

    oddsLocators: {
        'odd': "//div[@id='odd-odds']//span[@class='value']",
        'even': "//div[@id='even-odds']//span[@class='value']",
        'red2': "//div[@id='red2-odds']//span[@class='value']",
        'red3': "//div[@id='red3-odds']//span[@class='value']",
        'red4': "//div[@id='red4-odds']//span[@class='value']",
        'white3': "//div[@id='white3-odds']//span[@class='value']",
        'white4': "//div[@id='white4-odds']//span[@class='value']"
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
        'odd': "//div[@data-testid='odd-choice']",
        'even': "//div[@data-testid='even-choice']",
        'red2': "//div[@data-testid='red2-choice']",
        'red3': "//div[@data-testid='red3-choice']",
        'red4': "//div[@data-testid='red4-choice']",
        'white3': "//div[@data-testid='white3-choice']",
        'white4': "//div[@data-testid='white4-choice']"
    },

    oddsLocators: {
        'odd': "//div[@data-testid='odd-odds']//span[@class='odds']",
        'even': "//div[@data-testid='even-odds']//span[@class='odds']",
        'red2': "//div[@data-testid='red2-odds']//span[@class='odds']",
        'red3': "//div[@data-testid='red3-odds']//span[@class='odds']",
        'red4': "//div[@data-testid='red4-odds']//span[@class='odds']",
        'white3': "//div[@data-testid='white3-odds']//span[@class='odds']",
        'white4': "//div[@data-testid='white4-odds']//span[@class='odds']"
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
export const getSeDieLocators: LocatorFactory = (env: string): IBaseLocator => {
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