const { When, Then, Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');

//const dataset = JSON.parse(JSON.stringify(require("../test-data/placeorderTestData.json")));

Given('Start to type your Given step here a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo(this.page); //this. is the world constructor - available for all scenarios.
    await loginPage.validLogin(username, password)
});

When('Add {string} to Cart', { timeout: 100 * 1000 }, async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in the Cart', { timeout: 100 * 1000 }, async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VeriftProductIsDisplayed(productName);
    await cartPage.Checkout();

});


When('Enter valid details {string}, {string} and {string} and Place the order', { timeout: 100 * 1000 }, async function (username, countryCode, countryName) {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect(countryCode, countryName);
    await ordersReviewPage.VerifyEmaiId(username);
    this.orderId = await ordersReviewPage.SubmitAndGetOrderID();
    console.log(this.orderId);
});

Then('Verify order is present in the OrderHistory', { timeout: 100 * 1000 }, async function () {
    await this.dashboardPage.navigateToOrders();

    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    const orderIdDetails = await ordersHistoryPage.getOrderId();
    expect(this.orderId.includes(orderIdDetails)).toBeTruthy();
});

Given('login to Ecommerce2 application with {string} and {string}', async function (username, password) {
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    //css
    const userName = this.page.locator('input#username');
    const signInBtn = this.page.locator('#signInBtn');
    const cardTitles = this.page.locator(".card-body a");
    await userName.fill(username);//wrong username 
    await this.page.locator("[type='password']").fill(password);
    await this.page.locator('#signInBtn').click();
  
});

Then('Verify error message is Incorrect email or password', async function () {
    
    //This error message disappears quickly. So watch the dom the css style - display style=block
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});