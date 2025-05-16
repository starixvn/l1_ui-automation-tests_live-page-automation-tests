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

            console.log(`\n🚀 Bắt đầu test game: ${gameConfig.gameName} (ID: ${gameConfig.gameId}) trên môi trường ${gameConfig.env}`);
            
            // Mở Live Page
            console.log('📺 Mở Live Page...');
            await openLivePage(this.page, gameConfig.env as LiveEnvType);
            console.log('✅ Mở Live Page thành công');
            
            // Mở tab game (nếu không skip)
            if (!options.skipOpenGameTab) {
               // console.log(`🎮 Mở tab game ${gameConfig.gameName}...`);
                await OpenGameTab(this.page, gameConfig.gameId);
                console.log('✅ Mở tab game thành công');
            }
            
            // Kiểm tra odds
            console.log('🎲 Kiểm tra tỷ lệ cược...');
            await checkOdds(this.page, gameConfig.gameId, locators, gameConfig);
            console.log('✅ Kiểm tra odds thành công');
            
            // Đợi round mới
           // console.log('⏳ Đợi round mới...');
            await WaitNewround(this.page, gameConfig.gameId, gameConfig);
           // console.log('✅ Đã tìm thấy round mới');

            // Đặt cược cho bet choice đầu tiên của game
            const firstBetChoice = gameConfig.choices[0];
            //console.log(`💰 Thử đặt cược cho lựa chọn đầu tiên: ${firstBetChoice}...`);
            try {
                await this.placeBet(firstBetChoice);
               // console.log(`✅ Đặt cược thành công cho lựa chọn: ${firstBetChoice}`);
            } catch (error: any) {
                console.error(`❌ Lỗi khi đặt cược ${firstBetChoice}:`, error.message);
                throw error;
            }

            console.log(`\n✅ Test game ${gameConfig.gameName} hoàn tất thành công!\n`);
        } catch (error: any) {
            console.error(`\n❌ Lỗi test game ${gameConfig.gameName}:`, error.message);
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