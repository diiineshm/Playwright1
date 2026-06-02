const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils');
const loginPayLoad = { userEmail: "ramilabala@gmail.com", userPassword: "Studying@2025" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };
 
let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
 
})
 
 //Test Case - No Order Message
//To test the no orders - So instead of deleting all orders or having one seperate account, 
//we intercept the Network call and inject the fake API response to display the No orders. 
//So we can test No orders message.

test('No Order Message', async ({ page }) => {
  page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
 
 //https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/692e132c5008f6a909472cb4
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",//here wildcard is used for accepting any account- anything in the wildcard *
    async route => { //this route has all request, response
        //intercepting response - API response ->{playwright - fakeresponse(mocking)} browser -> render data on front end 
      const response = await page.request.fetch(route.request());//turning the web mode to API mode -page.request 
      //JSON -JavaScript Object Notation
      let body = JSON.stringify(fakePayLoadOrders);//converting java object into JSON format
      console.log(body);
      route.fulfill( //Real API response to Browser - it fulfill the response and override the body- otherwise all real response will goes to the browser
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
 
  await page.locator("button[routerlink*='myorders']").click();
  //await page.pause();
  //If we remove the page.pause() the route fulfil happens before the real API response.
  //So it will give the error - Error: "apiRequestContext.fetch: Target page, context or browser has been closed
  //Or Error - Request context disposed 
  //waitForResponse() - helps to wait for the API Response(below url) to complete
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());
 
 
});
 