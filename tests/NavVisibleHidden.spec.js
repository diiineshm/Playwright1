const {test,expect} = require('@playwright/test')

test("@Web Popup validations" , async({page}) =>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("http://google.com");
    //await page.goBack();
    //await page.goForward();

    //By default, the textbox is visible. So we are checking the visibility of the textbox and then clicking on hide button and checking the visibility of the textbox again.
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
   
    //await page.pause();
    //Java Pop up, we can't inspect the element so need to use page.on() method to handle the alert pop up. Alert is a type of dialog box which is used to display an important message to the user. It can be used to show warnings, errors, or other information that requires the user's attention.
    //Alert - first parameter is listens to the event dialog and second parameter is action either accept or dismiss
    page.on('dialog',dialog => dialog.accept());//page.on() is the event listener which listens to the dialog 
   //page.on('dialog',dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click(); //this will trigger the alert and we are accepting the alert using page.on() method
    
    //hover() is for mouse hover
    await page.locator("#mousehover").hover();

    //Frame - In html, it may be in iFrame or FrameSet tag
    //Switch to frame using frameLocator() method and then we can perform the action on the element which is inside the frame
    const framesPage = page.frameLocator("#courses-iframe");

    //Here the css below is not unique, it has two elements. One is visible and another one is hidden.
    //To filter out only the visible one, we use colon visible
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
})