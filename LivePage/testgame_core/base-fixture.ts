import { test as base } from '@playwright/test';
import { GameBase } from './GameBase';
import { TodayGameBase } from '../../TodayPage/todaypage_core/todaygamebase';
import { IGameConfig } from '../Configs/gameconfig_base';
import { IBaseLocator } from '../Configs/locator_base';
import Login from '../Commons/Login';

// Define types for fixtures
type LivePageFixtures = {
    gameBase: GameBase;
    todayGameBase: TodayGameBase;
};

// Extend test fixture
export const test = base.extend<LivePageFixtures>({
    // Main fixture for GameBase (Live Page)
    gameBase: async ({ browser }, use) => {
        let page;
        try {
            // Login and get initialized page
            console.log('🔐 Logging in...');
            const loginResult = await Login();
            page = loginResult.page;

            // Increase timeout for page operations
            await page.setDefaultTimeout(40000);
            await page.setDefaultNavigationTimeout(40000);

            console.log('✅ Login successful');

            // Initialize and provide GameBase instance with logged-in page
            const game = new GameBase(page);
            await use(game);
        } catch (error: any) {
            console.error('❌ Error initializing GameBase:', error.message);
            throw error;
        }
    },

    // Main fixture for TodayGameBase (Today Page)
    todayGameBase: async ({ browser }, use) => {
        let page;
        try {
            // Login and get initialized page using shared login function
            console.log('🔐 Logging in for Today page...');
            const loginResult = await Login();
            page = loginResult.page;

            // Increase timeout for page operations
            await page.setDefaultTimeout(40000);
            await page.setDefaultNavigationTimeout(40000);

            console.log('✅ Login successful for Today page');

            // Initialize and provide TodayGameBase instance with logged-in page
            const game = new TodayGameBase(page);
            await use(game);
        } catch (error: any) {
            console.error('❌ Error initializing TodayGameBase:', error.message);
            throw error;
        }
    },
});

// Hook runs before each test case
test.beforeEach(async ({ }, testInfo) => {
    console.log(`\n🎮 Starting test case: ${testInfo.title}`);
});

// Hook runs after each test case for cleanup
test.afterEach(async () => {
    // Wait 1 second before ending test
    await new Promise(resolve => setTimeout(resolve, 1000));
});

// Hook runs after all test cases
test.afterAll(async ({ browser }) => {
    try {
        await browser.close();
    } catch (error) {
        console.error('❌ Error closing browser:', error);
    }
});

// Export for use in tests
export { expect } from '@playwright/test'; 