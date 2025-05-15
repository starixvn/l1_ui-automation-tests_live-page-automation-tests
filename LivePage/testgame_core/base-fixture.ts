import { test as base } from '@playwright/test';
import { GameBase } from './GameBase';
import { IGameConfig } from '../Configs/gameconfig_base';
import { IBaseLocator } from '../Configs/locator_base';
import Login from '../Commons/Login';

// Định nghĩa kiểu cho fixtures
type LivePageFixtures = {
    gameBase: GameBase;
};

// Mở rộng test fixture
export const test = base.extend<LivePageFixtures>({
    // Fixture chính cho GameBase
    gameBase: async ({ browser }, use) => {
        try {
            // Login và lấy page đã được khởi tạo
            console.log('🔐 Đăng nhập...');
            const { page } = await Login(false);
            console.log('✅ Đăng nhập thành công');

            // Khởi tạo và cung cấp GameBase instance với page đã login
            const game = new GameBase(page);
            await use(game);
        } catch (error: any) {
            console.error('❌ Lỗi khởi tạo GameBase:', error.message);
            throw error;
        }
    },
});

// Hook chạy trước mỗi test case
test.beforeEach(async ({ }, testInfo) => {
    console.log(`\n🎮 Bắt đầu test case: ${testInfo.title}`);
});

// Hook chạy sau tất cả test cases
test.afterAll(async ({ browser }) => {
    await browser.close();
});

// Export để sử dụng trong các test
export { expect } from '@playwright/test'; 