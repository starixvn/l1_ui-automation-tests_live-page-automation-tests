export function getSpecFileByGameId(gameId: number): string {
  console.log(`Mapping gameId ${gameId} to spec file.`); // Log gameId mà không gọi lại hàm
  if (gameId === 2) {
    return 'LivePage/games/2-SeDie/smoke-tests/sedie.spec.ts';
  }
  if (gameId === 10) {
    return 'LivePage/games/10-Baccarat/smoke-tests/baccarat.spec.ts';
  }
  if (gameId === 22) {
    return 'LivePage/games/22-VipSeDie/smoke-tests/vipsedie.spec.ts';
  }
  if (gameId === 55) {
    return 'LivePage/SmokeTest/55-MonteBigSmall/MonteBigSmall.spec.ts';
  }
  throw new Error(`Không tìm thấy spec file cho GAME_ID = ${gameId}`);
}