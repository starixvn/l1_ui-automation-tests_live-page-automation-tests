import parseArgs from './LivePage/Utils/parseArgs'; // nếu bạn đang tách file parseArgs
import { getSpecFileByGameId } from './LivePage/Configs/RunGameMap'; // Import function từ file mới

import { spawn } from 'child_process';

async function runTest() {
  const args = parseArgs();
  //console.log('Parsed arguments from parseArgs:', args); // Log giá trị trả về từ parseArgs

  const gameIdFromArgs = args.gameid ? Number(args.gameid) : process.env.GAME_ID ? Number(process.env.GAME_ID) : 22; // Lấy từ process.env nếu không có trong args
  const envFromArgs = args.env || process.env.TEST_ENV || 'PRO_SG';

  console.log('args.gameid:', args.gameid); // Log giá trị từ parseArgs
  console.log('process.env.GAME_ID:', process.env.GAME_ID); // Log giá trị từ biến môi trường
  console.log('Final gameIdFromArgs:', gameIdFromArgs); // Log giá trị cuối cùng được sử dụng

  // Gán vào process.env để các file khác lấy
  process.env.GAME_ID = gameIdFromArgs.toString();
  process.env.TEST_ENV = envFromArgs;

  console.log('process.env.GAME_ID after assignment:', process.env.GAME_ID); // Log giá trị sau khi gán vào process.env

  const specFile = getSpecFileByGameId(gameIdFromArgs);

  console.log(`🚀 Đang chạy spec file: ${specFile} với GAME_ID=${gameIdFromArgs}`);
  console.log('Calling WaitNewround with gameId:', gameIdFromArgs); // Log giá trị gameId trước khi gọi WaitNewround

  //console.log('Debugging process.argv:', process.argv); // Log toàn bộ process.argv
  //console.log('Debugging process.env:', process.env); // Log toàn bộ process.env
  //console.log(`Executing command: npx playwright test ${specFile}`);

  console.log('🔍 Running tests in debug mode with Playwright Inspector');
  const child = spawn('npx', ['playwright', 'test', specFile, '--headed', '--debug'], { stdio: 'inherit', shell: true });

  child.on('error', (error) => {
    console.error(`❌ Lỗi khi chạy test: ${error.message}`);
  });

  child.on('exit', (code) => {
    if (code === 0) {
      console.log('✅ Test chạy thành công!');
    } else {
      console.error(`❌ Test thất bại với mã lỗi: ${code}`);
    }
  });
}

runTest();