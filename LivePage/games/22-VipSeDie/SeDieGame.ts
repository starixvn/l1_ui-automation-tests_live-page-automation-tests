import { GameBase } from "../../testgame_core/GameBase";

export class SeDieGame extends GameBase {
    protected async smokeTest(): Promise<void> {
        try {
            // B1: Mở tab game
            console.log('🎮 Mở tab game...');
            await this.openGameTab();
            
            // B2: Check odds
            console.log('🎲 Kiểm tra odds...');
            await this.checkOdds();
            
            // B3: Đợi round mới
            console.log('⏳ Đợi round mới...');
            await this.waitForNewRound();
            
            // B4: Đặt cược thử
            console.log('💰 Đặt cược thử...');
            await this.placeBet('Chẵn', 10000);
            
            console.log('✅ SeDie smoke test passed');
            
        } catch (error) {
            console.error(`❌ Lỗi trong quá trình test SeDie: ${error.message}`);
            throw error;
        }
    }
} 