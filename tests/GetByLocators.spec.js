import { test, expect } from '@playwright/test';
 
test('Playwright Special locators', async ({ page }) => {
  
    //Special locators - based on the text search - Label,PlaceHolder,Role,Text
     
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
     //Filter method - This chaining method avoids the for loop ==>eliminating the list for loop
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
    //locator(css)
 
    // understanding the getByLabel("Text")
    // works only with the assciated labels
    // <label>
    //     Password
    //     <input type ="password"/> 
        
    // </label>

    // or // here for inside label tag and id for input tag is same - that's how it is associated
    // <label for ="examplePassword"> Password</label>
    // <input class="form-control" id="examplePassword" placeholder ="password" type="password"></input>
});