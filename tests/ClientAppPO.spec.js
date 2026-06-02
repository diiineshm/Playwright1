const { test, expect } = require('@playwright/test');
const { customtest } = require('../test-data/test-base')
const { POManager } = require('../pageobjects/POManager');
//Json -> string -> js object (to avoid encoding issues, first convert into string and them java object)
const dataset = JSON.parse(JSON.stringify(require("../test-data/placeorderTestData.json")));

for (const data of dataset) { //Parameterization using json file
    test(`@Web Client App login ${data.productName}`, async ({ page }) => {//no two test can have same name
        //js file- Login js, DashboardPage
        //test data is in json file

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo(page);
        await loginPage.validLogin(data.username, data.password)
        
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        //await page.waitForLoadState('networkidle');
        //await page.pause();

        const cartPage = poManager.getCartPage();
        await cartPage.VeriftProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect(data.countryCode, data.countryName);
        await ordersReviewPage.VerifyEmaiId(data.username);
        const orderId = await ordersReviewPage.SubmitAndGetOrderID();
        console.log(orderId);

        await dashboardPage.navigateToOrders();

        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        const orderIdDetails = await ordersHistoryPage.getOrderId();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();

    });
}

// create the test data for all test cases by creating the custom test and properties, so we can give the feature
customtest(`Client App login custom `, async ({ page, testDataForOrders }) => {
    //test data is in test-base file stored as the custom feature
    // customize the test behaviour
    //custom feature can be created by extending the test and creating the properties

    const poManager = new POManager(page);


    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(page);
    await loginPage.validLogin(testDataForOrders.username, testDataForOrders.password)

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrders.productName);
    await dashboardPage.navigateToCart();

    //await page.waitForLoadState('networkidle');
    //await page.pause();

    const cartPage = poManager.getCartPage();
    await cartPage.VeriftProductIsDisplayed(testDataForOrders.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect(testDataForOrders.countryCode, testDataForOrders.countryName);
    await ordersReviewPage.VerifyEmaiId(testDataForOrders.username);
    const orderId = await ordersReviewPage.SubmitAndGetOrderID();
    console.log(orderId);

    await dashboardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    const orderIdDetails = await ordersHistoryPage.getOrderId();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

