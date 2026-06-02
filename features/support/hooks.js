const { chromium } = require('playwright');
const { POManager } = require('../../pageobjects/POManager');
const { Before, After, BeforeStep, AfterStep, Status} = require('@cucumber/cucumber');

//BeforeAll() will be executed once before all scenarios
//AfterAll() will be executed once after all scenarios

Before(async function () {// before each scenario this method will be executed
   const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After({tags: "@Validation"},function () { // after each scenario with @tag this method will be executed
  console.log("After hook executed after each Scenario");
});

BeforeStep( function () {// before each step this method will be executed
  
});

AfterStep(  async function ({result}) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: `screenshots_cucumber/error_${Date.now()}.png` });
   
  }
});