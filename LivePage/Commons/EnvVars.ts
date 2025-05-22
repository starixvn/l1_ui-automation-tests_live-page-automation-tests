import parseArgs from "../Utils/parseArgs";

const args = parseArgs();

export const ENV = process.env.TEST_ENV || args.env || 'PRO_SG';
export const GAME_ID = Number(process.env.GAME_ID || args.gameid || 22);