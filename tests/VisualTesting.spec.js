const {test, expect}= require('@playwright/test');

//Visual testing is the Web UI image comparison testing. The Playwright will take the 
//image for first time and then it will compare the images(test will take images) with
//first image it has taken.

//Testing will be helpful for alignment and all other elements in place.
//Test will fail if there is a time stamp.

test('visual',async({page})=>
{
    //await page.goto("https://flightaware.com/");
    await page.goto("https://portal.tekarch.com/");
    //First time the test will fail, because the original image is not there
    expect(await page.screenshot()).toMatchSnapshot('original.png');
});