const { test, expect } = require('@playwright/test');

//Test Scenario
//When we click view button, the order number is visible in the URL. 
//hackers might change the order number(different order which is not belong to the user)

//Test case
//Security message - You are not authorized to see the another account
//Access Forbidden - Status - 403

test('@Web Security test request intercept', async ({ page }) => {

    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("ramilabala@gmail.com");
    await page.locator("#userPassword").fill("Studying@2025");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    //Intercepting the request call with route.continue() method
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))//before hit the server(before sending to browser), we intercept the request - fake product ID
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})