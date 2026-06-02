const {test,expect} = require('@playwright/test');

test('Browser Context-Validating Error message in Login Page', async({page})=>
{
    const productName = 'ADIDAS ORIGINAL';
    const products = page.locator(".card-body");  
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('#userEmail').fill("ramilabala@gmail.com");
    await page.locator('#userPassword').fill("Studying@2025");
    await page.locator("[value='Login']").click();
    //networkidle is working. But it is discouraged because of it's flakky.Maybe starts loading delay.
   // await page.waitForLoadState('networkidle');
   //waitFor() works only for unique element.
   //wait
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i=0; i < count ; ++i)
    {
        //checking the product name which we give with the product name in the website
        //here parent locator is card-body and child locator is b. 
        //Here we are not searching from page.locator. We are searching from parent locator
        //=> search will be within the parent locator
              if(await products.nth(i).locator("b").textContent() === productName){
               //add to cart
               await products.nth(i).locator("text =  Add To Cart").click();
               break;
        } 
    }

    await page.locator("[routerlink *= 'cart']").click();
    //here isVisible() is not having auto wait. So we need to use waitFor() before isVisible()
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
});