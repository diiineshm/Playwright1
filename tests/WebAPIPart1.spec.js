const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils');
const loginPayLoad = { userEmail: "ramilabala@gmail.com", userPassword: "Studying@2025" };
const orderPayLoad = { orders: [{ country: "Egypt", productOrderedId: "68a961459320a140fe1ca57a" }] };//product ID must be from URL or Product Details
//these payloads are test data. 

//Test case 
//Verify if order created is showing in history page
// Precondition - create order --that is via API call


let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext(); //request is for API calls
    const apiUtils = new APiUtils(apiContext, loginPayLoad);//created the instance of api utils
    response = await apiUtils.createOrder(orderPayLoad);
})


//create order is success
test('@API Place the order', async ({ page }) => {
    //injecting javascript before all other script,function as first parameter and value as second parameter
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
        //If the info in Session storage, window.sessionStorage.setItem()
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click(); //view button click
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    console.log(orderIdDetails);
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});

