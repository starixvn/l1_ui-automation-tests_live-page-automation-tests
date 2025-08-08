# Today Page Testing Framework

Framework này được thiết kế để test các game trên Today page, sử dụng chung hàm login với Live page.

## Cấu trúc thư mục

```
TodayPage/
├── todaypage_core/
│   ├── base-fixture.ts      # Base fixture cho Today page tests
│   └── todaygamebase.ts     # Base class cho Today page games
├── games/
│   └── 134-RnGSoccer/       # Game RNG Soccer
│       ├── configs/
│       │   ├── gameconfig.ts # Cấu hình game
│       │   └── locators.ts   # Locators cho game
│       └── smoke-tests/
│           └── RnGSoccer.spec.ts # Test cases
└── README.md
```

## Cách sử dụng

### 1. Tạo game mới

Để thêm một game mới vào Today page:

1. Tạo thư mục game trong `games/`
2. Tạo file `configs/gameconfig.ts` với cấu hình game
3. Tạo file `configs/locators.ts` với locators cho game
4. Tạo file `smoke-tests/game.spec.ts` với test cases

### 2. Cấu hình game

File `gameconfig.ts` cần export:
- Game configuration function nhận environment parameter
- Bet limits cho từng environment
- Game choices, odds, timer settings

### 3. Locators

File `locators.ts` cần export:
- Locators cho từng environment (PRO_SG, PROVG_Credit, PROVG_Cash)
- Bet choice locators
- Odds locators
- Timer locator
- Game loaded locator

### 4. Test cases

File test cần:
- Import base fixture từ `todaypage_core/base-fixture`
- Import game config và locators
- Sử dụng `todayGameBase` fixture
- Gọi `runTest()` method

## Ví dụ: RNG Soccer

```typescript
import { test } from '../../../todaypage_core/base-fixture';
import { RnGSoccerConfig } from '../configs/gameconfig';
import { getRnGSoccerLocator } from '../configs/locators';

test('RNG Soccer - Today Page Test', async ({ todayGameBase }) => {
    const gameConfig = RnGSoccerConfig(ENV as GameEnvironment);
    const locators = getRnGSoccerLocator(ENV);
    
    await todayGameBase.runTest(gameConfig, locators);
});
```

## Chạy test

```bash
# Chạy test cho RNG Soccer
npx playwright test TodayPage/games/134-RnGSoccer/smoke-tests/RnGSoccer.spec.ts

# Chạy tất cả test Today page
npx playwright test TodayPage/
```

## Lưu ý

- Framework sử dụng chung hàm login từ Live page (`LivePage/Commons/Login.ts`)
- Tất cả game đều kế thừa từ `TodayGameBase` class
- Locators cần được cập nhật theo UI thực tế của từng environment
- Test cases có thể được mở rộng để test các tính năng đặc biệt của từng game 