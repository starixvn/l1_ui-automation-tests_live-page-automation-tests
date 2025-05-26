import { Page } from "@playwright/test";
import openLivePage, { LiveEnvType } from "../Commons/OpenLivepage";
import OpenGameTab from "../Commons/OpenGameTab";
import { checkOdds } from "../Commons/CheckOdds";
import WaitNewround from "../Commons/WaitNewround";
import { IGameConfig } from '../Configs/gameconfig_base';
import { IBaseLocator } from '../Configs/locator_base';
import { placeBet } from '../Commons/PlaceBet';

interface TestOptions {
    skipOpenGameTab?: boolean;
}

export class GameBase {
    protected page: Page;
    protected gameConfig!: IGameConfig;
    protected locators!: IBaseLocator;

    constructor(page: Page) {
        this.page = page;
    }

    public async runTest(gameConfig: IGameConfig, locators: IBaseLocator, options: TestOptions = {}) {
        try {
            this.gameConfig = gameConfig;
            this.locators = locators;

            console.log(`\n🚀 Start testing game: ${gameConfig.gameName} (ID: ${gameConfig.gameId}) on environment ${gameConfig.env}`);
            
            // Mở Live Page
            console.log('📺 Opening Live Page...');
            await openLivePage(this.page, gameConfig.env as LiveEnvType);
            console.log('✅ Opened Live Page successfully');
            
            // Mở tab game (nếu không skip)
            if (!options.skipOpenGameTab) {
               // console.log(`🎮 Opening game tab ${gameConfig.gameName}...`);
                await OpenGameTab(this.page, gameConfig.gameId);
                console.log('✅ Opened game tab successfully');
            }
            
            // Kiểm tra odds
            console.log('🎲 Checking odds...');
            await checkOdds(this.page, gameConfig.gameId, locators, gameConfig);
            console.log('✅ Checked odds successfully');
            
            // Đợi round mới
           // console.log('⏳ Waiting for new round...');
            await WaitNewround(this.page, gameConfig.gameId, gameConfig);
           // console.log('✅ Found new round');

            // Đặt cược cho bet choice đầu tiên của game
            const firstBetChoice = gameConfig.choices[0];
            //console.log(`💰 Trying to place bet for the first choice: ${firstBetChoice}...`);
            try {
                await this.placeBet(firstBetChoice);
               // console.log(`✅ Placed bet successfully for choice: ${firstBetChoice}`);
            } catch (error: any) {
                console.error(`❌ Error placing bet for ${firstBetChoice}:`, error.message);
                throw error;
            }

            console.log(`\n✅ Test for game ${gameConfig.gameName} completed successfully!\n`);
        } catch (error: any) {
            console.error(`\n❌ Error testing game ${gameConfig.gameName}:`, error.message);
            throw error;
        }
    }

    protected async placeBet(betChoice: string): Promise<void> {
        await placeBet(this.page, betChoice, this.gameConfig, this.locators);
    }

    // Public methods for test files
    public async placeBetTest(betChoice: string): Promise<void> {
        await this.placeBet(betChoice);
    }

    public async wait(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
}