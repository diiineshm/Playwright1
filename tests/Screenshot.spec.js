const {test,expect} = require('@playwright/test')

test("Screenshot of Page and element" , async({page}) =>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //here screenshot method takes screenshot only that particular element
    //await page.locator("#displayed-text").screenshot({path:'screenshot/partialScreenshot.png'});
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();

    //takes screenshot of entire visible page
    await page.screenshot({path:'screenshot/screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});