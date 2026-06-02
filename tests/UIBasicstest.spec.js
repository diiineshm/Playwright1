const { test, expect } = require('@playwright/test');

//test.describe.configure({mode:'parallel'})
//test.describe.configure({ mode: 'serial' })

//test scripts - (name of the test, argument as function)
test('@Web Browser Context Playwright test', async ({ browser }) => {

    //browser context - plugins,cookies,proxy
    const context = await browser.newContext(); //new instance created, but we didn't pass any plugin,cookies, proxy in Context // just like incognito mode we created
    const page = await context.newPage(); //to create page with url
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css
    const userName = page.locator('input#username');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    await userName.fill("rahulshetty");//wrong username 
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator('#signInBtn').click();

    //This error message disappears quickly. So watch the dom the css style - display style=block
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('Page Playwright test', async ({ page }) => {
    //if we are using page fixture, we can skip browser context first 2 lines
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('@Web UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signInBtn = page.locator('#signInBtn');
    //dropdown
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');
    //RadioButton
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    //isChecked returns boolean value and toBeChecked is for assertions
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();//await is outside because the scope of action is outside
    //checkbox
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy(); //await is inside because the scope of action is inside
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class", "blinkingText");
    //await page.pause();

});

test('@Child windows hadl', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    //child window

    //if promise all not used, it will be in pending state.
    //Promise returns the array of pages. If we open more than one page, we can give [newpage1, newpage2]
    const [newPage] = await Promise.all(//to wrap the promises and execute for fulfilled state
        [
            //wait
            context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
            documentLink.click(),
        ])//new page is opened


    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")// arraytext is the variable that holds the array
    const domain = arrayText[1].split(" ")[0]
    //console.log(domain);

    //parent window(switched back to parent window)-->page.locator 
    await page.locator("#username").fill(domain);
    //await page.pause();
    //inputValue() is used to get the value from the input field when we dynamically giving input to the textbox
    //textcontent() is not getting the value when we give data during runtime.  
    console.log(await page.locator("#username").inputValue());

})

