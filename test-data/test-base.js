const base = require('@playwright/test');

//Can you customize the test behavior? yes - by creating the custom feature 
//extending the test and creating the properties 
//create the test data for all test cases by creating the properties, so we can give the feature and custom test
//if we are having 40 test cases, we can create 40 properties  and use them in the test cases --> that avoids the json parsing,for loop and we can directly use the properties in the test cases
exports.customtest = base.test.extend(//extending the test
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