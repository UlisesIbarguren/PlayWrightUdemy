import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  retries: 1,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:4200/',
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
  },

  projects: [
    {
      name: 'chromium',
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      },
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['Galaxy S9+']
      }
    }
  ],

  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
  }
});
