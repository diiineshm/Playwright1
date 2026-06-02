// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries : 1, //1 or 2 times is common in many projects
  //workers :3, //By default 5 workers will execute in playwright
 //Test file will execute in parallel by default
 //The test in each file execute in sequence 
  timeout: 40 *1000,
  expect:{ 
    timeout: 4 *1000, //assertion timeout
  },
  reporter: 'html',
  projects:[
    {
    name : 'safari',
    use: {
   
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        //screenshot: 'only-on-failure', //screenshot will be taken only on failure
        //trace: 'retain-on-failure'
        trace: 'on',
        ...devices['iPhone 11'] // webkit , so iPhone dimensions will open
        }
    },
    {
    name : 'chrome',
    use: {
   
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        //trace: 'retain-on-failure'
        trace: 'on',
        video: 'retain-on-failure',
        ignoreHttpsErrors:true, //It avoids the SSL certification error and accepts the advanced settings
        permissions:['geolocation'], //it gives permission for location --> websites asks for geo location 
        //...devices['Galaxy Note 3'], //chromium phones - android dimensions screen will open
       // viewport: {width:720, height:720}//desired dimensions for mobile/tablet view -> web responsive testing
      }
    }
  ]
});

module.exports = config