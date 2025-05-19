import { 
    IGameConfig, 
    GameEnvironment,
    IBetLimits
} from '../../../Configs/gameconfig_base';

// Định nghĩa bet limits cho từng môi trường của game SeDie
const ColorGame_BET_LIMITS: Record<GameEnvironment, IBetLimits> = {
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

// Config chung cho game SeDie
const COMMON_CONFIG = {
    gameId: 71,
    gameName: 'Xí Ngầu Lục Sắc',
    choices: ["yellow", "white", "pink", "blue", "red", "green"],
    odds: {
        yellow: 2.00,
        white: 2.00,
        pink: 2.00,
        blue: 2.00,
        red: 2.00,
        green: 2.00
    },
    expectedOdds: '2.002.002.002.002.002.00',
    hedgeBetGroups: [],
    timerStart: 30
};

export const colorgameConfig = (env: GameEnvironment): IGameConfig => {
    // Lấy bet limits theo environment
    const betLimits = ColorGame_BET_LIMITS[env];
    if (!betLimits) {
        throw new Error(`Không tìm thấy bet limits cho môi trường ${env} của game SeDie`);
    }

    // Trả về config đầy đủ
    return {
        ...COMMON_CONFIG,
        env,
        betLimits
    };
};

export default colorgameConfig;