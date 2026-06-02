const {test, expect}= require('@playwright/test');

//Test Scenario - If server is down, the message to validate 
//Abort the network - API response is not loaded 
//Here we don't have that scenario to test - no website for it

//test scripts - (name of the test, argument as function)
test('Network Intercept Abort', async({browser})=>
{
    
    //browser context - plugins,cookies,proxy
    const context = await browser.newContext(); //new instance created, but we didn't pass any plugin,cookies, proxy in Context // just like incognito mode we created
    const page = await context.newPage(); //to create page with url

    //route method will listen to the url , route.abort() -> will abort
    //Test scenario- if css takes too long to load and the automation script is not disturbed
    //page.route('**/*.css', route => route.abort());
   
    //Test scenario - If the Webpage is too slow because of images, 
    //the automation script is not disturbed because of aborting the images.
    //this will abort the images in the webpage
    page.route('**/*.{jpg,png,jpeg}',route => route.abort());

    //Event Listener - To listen request and response with url
    page.on('request', request => console.log(request.url()));
    page.on('response', response=> console.log(response.url,response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title()); 
    
    //css
    const userName = page.locator('input#username');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    await userName.fill("rahulshetty");//wrong username 
    await page.locator("[type='password']").fill("learning");
    await page.locator('#signInBtn').click();
    
    //This error message disappears quickly. So watch the dom the css style - display style=block
    console.log(await page.locator("[style*='block']").textContent());
    await expect( page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});
