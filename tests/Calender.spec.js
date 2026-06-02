const {test,expect} = require("@playwright/test");
 
 
test("Calendar validations",async({page})=>
{
 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    
    //select the year, then month and then date
    await page.getByText(year).click();
    //Converting the string month number into number in javascript using Number() method  
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
   //below is the xpath 
    await page.locator("//abbr[text()='"+date+"']").click();
 
    const inputs =  page.locator('.react-date-picker__inputGroup__input') //returns the list that has the value - month,date,year which entered dynamically
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue(); //in dom value=" " for month,date,year and we are getting that value using inputValue() method and comparing with the expected list value 
        expect(value).toEqual(expectedList[i]);
 
    }
  
})

