// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 2,
  timeout: 40 * 1000,
  expect: {
    timeout: 4 * 1000, //assertion timeout
  },
  reporter: 'html',
  use: {

    browserName: 'chromium',
    headless: false,
    screenshot: 'on',//for every step the screenshot will be taken when screebshot is 'on'
    //trace: 'retain-on-failure'//trace zip file will be generated only on failure// saves the memory
    //trace: 'off' //no trace file will be generated
    trace: 'on' //every step we get the log

  }
});

module.exports = config