import { 
    IGameConfig, 
    GameEnvironment,
    IBetLimits
} from '../../../Configs/gameconfig_base';

// Định nghĩa bet limits cho từng môi trường của game VipSeDie
const VIPSEDIE_BET_LIMITS: Record<GameEnvironment, IBetLimits> = {
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

// Config chung cho game VipSeDie
const COMMON_CONFIG = {
    gameId: 22,
    gameName: 'Xóc Đĩa VIP',
    choices: ["odd", "even", "red2", "red3", "red4", "white3", "white4"],
    odds: {
        even: 1.96,
        odd: 1.96,
        red2: 2.4,
        red3: 3.75,
        red4: 14.4,
        white3: 3.75,
        white4: 14.4,
    },
    expectedOdds: 'Lẻ1.96Chẵn1.9614.403.752.4014.403.75',
    hedgeBetGroups: [["even", "odd"]],
    betConfig: {
        defaultChoice: "even",
        defaultAmount: 10000
    },
    timerStart: 30 // Thời gian bắt đầu vòng mới
};

export const vipSeDieConfig = (env: GameEnvironment): IGameConfig => {
    // Lấy bet limits theo environment
    const betLimits = VIPSEDIE_BET_LIMITS[env];
    if (!betLimits) {
        throw new Error(`Không tìm thấy bet limits cho môi trường ${env} của game VipSeDie`);
    }

    // Trả về config đầy đủ
    return {
        ...COMMON_CONFIG,
        env,
        betLimits
    };
};

export default vipSeDieConfig; 