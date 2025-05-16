import { 
    IGameConfig, 
    GameEnvironment,
    IBetLimits
} from '../../../Configs/gameconfig_base';

// Định nghĩa bet limits cho từng môi trường của game Baccarat
const BACCARAT_BET_LIMITS: Record<GameEnvironment, IBetLimits> = {
    PRO_SG: {
        minBet: 1,
        maxBet: 2000
    },
    PROVG_Credit: {
        minBet: 10,
        maxBet: 40000
    },
    PROVG_Cash: {
        minBet: 1000,
        maxBet: 100000
    }
};

// Config chung cho game Baccarat
const COMMON_CONFIG = {
    gameId: 10,
    gameName: 'Baccarat',
    choices: ["player", "banker", "tie"],
    odds: {
        player: 2.0,
        banker: 1.95,
        tie: 9.0
    },
    expectedOdds: 'Nhà Con2.00Nhà Cái1.95Hòa9.00Con Đôi12.00Cái Đôi12.00',
    betConfig: {
        defaultChoice: "player",
        defaultAmount: 10000
    },
    timerStart: 30 // Thời gian bắt đầu vòng mới
};

export const baccaratConfig = (env: GameEnvironment): IGameConfig => {
    // Lấy bet limits theo environment
    const betLimits = BACCARAT_BET_LIMITS[env];
    if (!betLimits) {
        throw new Error(`Không tìm thấy bet limits cho môi trường ${env} của game Baccarat`);
    }

    // Trả về config đầy đủ
    return {
        ...COMMON_CONFIG,
        env,
        betLimits
    };
};

export default baccaratConfig; 