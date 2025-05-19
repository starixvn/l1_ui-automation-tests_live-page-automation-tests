import { LiveEnvType } from '../Commons/OpenLivepage';

// Định nghĩa các environment được hỗ trợ
export type GameEnvironment = 'PRO_SG' | 'PROVG_Credit' | 'PROVG_Cash';

// Interface cho bet limits
export interface IBetLimits {
    minBet: number;
    maxBet: number;
}

// Interface cho odds của game
export interface IOddsConfig {
    [key: string]: number;
}

// Interface cho bet config
export interface IBetConfig {
    defaultChoice: string;
    defaultAmount: number;
}

// Interface chính cho game config
export interface IGameConfig {
    // Thông tin cơ bản
    gameId: number;
    gameName: string;
    env: GameEnvironment;

    // Cấu hình cược
    choices: string[];           // Các lựa chọn cược có thể
    odds: IOddsConfig;          // Tỷ lệ cược
    expectedOdds: string;       // Chuỗi odds mong đợi để verify
    
    // Giới hạn cược theo môi trường
    betLimits: IBetLimits;

    // Thời gian bắt đầu vòng mới (seconds)
    timerStart: number;

    // Cấu hình hedge bet (nếu có)
    hedgeBetGroups?: string[][];
}

// Helper function để validate environment
export const isValidEnvironment = (env: string): env is GameEnvironment => {
    return ['PRO_SG', 'PROVG', 'PROVG_DEV', 'PROVG_UAT'].includes(env as GameEnvironment);
};

// Factory type để tạo config theo environment
export type GameConfigFactory = (env: GameEnvironment) => IGameConfig;

// Hằng số cho các environment
export const ENVIRONMENTS: GameEnvironment[] = ['PRO_SG', 'PROVG_Credit', 'PROVG_Cash'];


