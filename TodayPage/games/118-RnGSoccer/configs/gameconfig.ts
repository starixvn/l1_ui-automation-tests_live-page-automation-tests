import { 
    IGameConfig, 
    GameEnvironment,
    IBetLimits
} from '../../../../LivePage/Configs/gameconfig_base';

// Định nghĩa bet limits cho từng môi trường của game RnGSoccer
const RnGSoccer_BET_LIMITS: Record<GameEnvironment, IBetLimits> = {
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

// Config chung cho game RnGSoccer
const COMMON_CONFIG = {
    gameId: 118,
    gameName: 'Bóng Đá RNG',
    choices: ["home", "draw", "away"],
    odds: {
        home: 2.00,
        draw: 11.00,
        away: 2.00,
    },
    expectedOdds: 'Đội Nhà2.00Hòa11.00Đội Khách2.00',
    hedgeBetGroups: [["home", "away"]],
    timerStart: 20
};

export const RnGSoccerConfig = (env: GameEnvironment): IGameConfig => {
    // Lấy bet limits theo environment
    const betLimits = RnGSoccer_BET_LIMITS[env];
    if (!betLimits) {
        throw new Error(`Không tìm thấy bet limits cho môi trường ${env} của game RnGSoccer`);
    }

    // Trả về config đầy đủ
    return {
        ...COMMON_CONFIG,
        env,
        betLimits
    };
};

export default RnGSoccerConfig;