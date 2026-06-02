//const base = require('@playwright/test');
import { test as baseTest } from '@playwright/test';
interface TestDataForOrders {
    username: string;
    password: string;
    productName: string;
    countryCode: string;
    countryName: string;
};
//Can you customize the test behavior? yes - by creating the custom feature 
//extending the test and creating the properties 
// create the test data for all test cases by creating the properties, so we can give the feature and custom test

//TestData file: interface declaration and extending declaration and export the variable  
export const customTest = baseTest.extend<{ testDataForOrders: TestDataForOrders }>(//extending the test
    {
        testDataForOrders: {//property
            username: "ramilabala@gmail.com",
            password: "Studying@2025",
            productName: "ZARA COAT 3",
            countryCode: "ind",
            countryName: " India"
        }

    }
)