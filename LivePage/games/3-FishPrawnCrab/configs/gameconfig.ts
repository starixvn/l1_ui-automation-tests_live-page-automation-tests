import { 
    IGameConfig, 
    GameEnvironment,
    IBetLimits
} from '../../../Configs/gameconfig_base';

// Định nghĩa bet limits cho từng môi trường của game SeDie
const FishPrawnCrab_BET_LIMITS: Record<GameEnvironment, IBetLimits> = {
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
    gameId: 3,
    gameName: 'Bầu Cua',
    choices: ["stag", "gourd", "rooster", "fish", "crab", "prawn"],
    odds: {
        stag: 2.00,
        gourd: 2.00,
        rooster: 2.00,
        fish: 2.00,
        crab: 2.00,
        prawn: 2.00
    },
    expectedOdds: '2.002.002.002.002.002.00',
    hedgeBetGroups: [],
    timerStart: 30
};

export const fishprawncrabConfig = (env: GameEnvironment): IGameConfig => {
    // Lấy bet limits theo environment
    const betLimits = FishPrawnCrab_BET_LIMITS[env];
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

export default fishprawncrabConfig;