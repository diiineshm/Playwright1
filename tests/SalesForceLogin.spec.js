const {test} = require('@playwright/test');
let webcontext;

test( 'Salesforce Login',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://login.salesforce.com/");
    await page.locator('#username').fill("rami@solids.com");
    await page.locator('#password').fill("Feb20@2009");
    await page.locator("#Login").click(); 
    await context.storageState({path:'SFstate.json'});//when we give this path, it will create a json file with all storage information 
    webcontext = await browser.newContext({storageState: 'SFstate.json'})//new browser has the storage informations.
     
})

// const { test, expect } = require('@playwright/test');

// test('Salesforce Login', async ({ page, context }) => {
//   await page.goto('https://login.salesforce.com/');

//   await page.fill('#username', 'rami@solids.com');
//   await page.fill('#password', 'Feb20@2009');
//   await page.click('#Login');

//   await expect(page).toHaveURL(/lightning/);

//   await context.storageState({ path: 'SFstate.json' });
// });


test.use({ storageState: 'SFstate.json' });

test('Access Home Page', async () => {
  const page = await webcontext.newPage();
  await page.goto('https://solids-dev-ed.develop.my.salesforce-setup.com/lightning/setup/SetupOneHome/home');
  await expect(page).toHaveTitle('Home | Salesforce');
});
