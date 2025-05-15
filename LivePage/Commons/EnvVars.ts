import parseArgs from "../Utils/parseArgs";

const args = parseArgs();

export const ENV = (args.env || 'PRO_SG').toUpperCase();
export const GAME_ID = Number(args.gameid || 22);