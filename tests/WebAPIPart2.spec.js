//For complicated cookies, multiple key value pairs in browsers.
//Login once. Collect all key and value pairs and store in JSON file.
// inject that json file in browser context.
//other test cases, the login informations inject, no need of login again and again. It will save the time and avoid flakyness

const {test,expect} = require('@playwright/test');
let webcontext;

test.beforeAll( async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('#userEmail').fill("ramilabala@gmail.com");
    await page.locator('#userPassword').fill("Studying@2025");
    await page.locator("[value='Login']").click();
    await page.locator(".card-body b").first().waitFor();
    await context.storageState({path:'state.json'});//when we give this path, it will create a json file with all storage information 
    webcontext = await browser.newContext({storageState: 'state.json'})//new browser has the storage informations.
     
})

test('@API Add to cart', async()=>//page fixture, because we are opening using browser 
{
    const email ="";
    const productName = 'ADIDAS ORIGINAL';
    const page = await webcontext.newPage();
     await page.goto("https://rahulshettyacademy.com/client/");
    const products = page.locator(".card-body");  
    
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i=0; i < count ; ++i)
    {
        //checking the product name which we give with the product name in the website
        if(await products.nth(i).locator("b").textContent() === productName){
               //add to cart
               await products.nth(i).locator("text =  Add To Cart").click();
               break;
        } 
    }

    await page.locator("[routerlink *= 'cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
});

test('Test case 2', async() =>{
    
    const email ="";
    const productName = 'ADIDAS ORIGINAL';
    const page = await webcontext.newPage();
     await page.goto("https://rahulshettyacademy.com/client/");
    const products = page.locator(".card-body");  
    
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
})