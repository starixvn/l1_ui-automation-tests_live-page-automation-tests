import parseArgs from './LivePage/Utils/parseArgs'; // if you are separating the parseArgs file
import { getSpecFileByGameId } from './LivePage/Configs/RunGameMap'; // Import function from new file

import { spawn } from 'child_process';

async function runTest() {
  const args = parseArgs();
  //console.log('Parsed arguments from parseArgs:', args); // Log return value from parseArgs

  const gameIdFromArgs = args.gameid ? Number(args.gameid) : process.env.GAME_ID ? Number(process.env.GAME_ID) : 22; // Get from process.env if not in args
  const envFromArgs = args.env || process.env.TEST_ENV || 'PRO_SG';
  const isHeaded = args.headed === 'true' || process.env.HEADED === 'true'; // Get headed mode from environment variable

  console.log('args.gameid:', args.gameid); // Log value from parseArgs
  console.log('process.env.GAME_ID:', process.env.GAME_ID); // Log value from environment variable
  console.log('Final gameIdFromArgs:', gameIdFromArgs); // Log final value being used

  // Assign to process.env for other files to use
  process.env.GAME_ID = gameIdFromArgs.toString();
  process.env.TEST_ENV = envFromArgs;

  console.log('process.env.GAME_ID after assignment:', process.env.GAME_ID); // Log value after assigning to process.env

  const specFile = getSpecFileByGameId(gameIdFromArgs);

  console.log(`🚀 Running spec file: ${specFile} with GAME_ID=${gameIdFromArgs}`);
  console.log('Calling WaitNewround with gameId:', gameIdFromArgs); // Log gameId value before calling WaitNewround

  const playwrightArgs = ['playwright', 'test', specFile];
  if (isHeaded) {
    playwrightArgs.push('--headed');
  }

  console.log('🔍 Running tests in', isHeaded ? 'headed' : 'headless', 'mode');
  console.log('Playwright arguments:', playwrightArgs.join(' ')); // Add this to debug the command
  const child = spawn('npx', playwrightArgs, { stdio: 'inherit', shell: true });

  child.on('error', (error) => {
    console.error(`❌ Error running test: ${error.message}`);
  });

  child.on('exit', (code) => {
    if (code === 0) {
      console.log('✅ Test ran successfully!');
    } else {
      console.error(`❌ Test failed with code: ${code}`);
    }
  });
}

runTest();