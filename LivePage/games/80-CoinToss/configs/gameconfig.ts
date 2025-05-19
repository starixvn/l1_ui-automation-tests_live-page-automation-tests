import { 
    IGameConfig, 
    GameEnvironment,
    IBetLimits
} from '../../../Configs/gameconfig_base';

// Định nghĩa bet limits cho từng môi trường của game MonteBigSmall
const MONTEBIGSMALL_BET_LIMITS: Record<GameEnvironment, IBetLimits> = {
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

// Config chung cho game MonteBigSmall
const COMMON_CONFIG = {
    gameId: 80,
    gameName: 'Tung Đồng Xu',
    choices: ["heads", "tails"],
    odds: {
        heads: 1.96,
        tails: 1.96
    },
    expectedOdds: 'Ngửa1.96Sấp1.96',
    hedgeBetGroups: [["heads", "tails"]],
    timerStart: 20
};

export const cointossConfig = (env: GameEnvironment): IGameConfig => {
    // Lấy bet limits theo environment
    const betLimits = MONTEBIGSMALL_BET_LIMITS[env];
    if (!betLimits) {
        throw new Error(`Không tìm thấy bet limits cho môi trường ${env} của game Monte Big Small`);
    }

    // Trả về config đầy đủ
    return {
        ...COMMON_CONFIG,
        env,
        betLimits
    };
};

export default cointossConfig;