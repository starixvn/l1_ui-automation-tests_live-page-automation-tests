import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './LivePage',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['line'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false
    }]
  ],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Smoke_Live_Page',
      use: { 
        ...devices['Desktop Chrome'],
        headless: true,
        channel: 'chrome'
      },
    },
  ],
}); 