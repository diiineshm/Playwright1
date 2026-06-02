import { Page, Locator} from '@playwright/test';
export class LoginPage{

    page : Page;
    signInbutton : Locator;
    userName : Locator;
    password : Locator;
    productsText : Locator;

    constructor(page: Page )
    {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.productsText = page.locator(".card-body b");

    }

    async goTo(page : Page)
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username: string, password: string)
    {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
        //await page.waitForLoadState('networkidle');
        await this.productsText.first().waitFor();

    }
}

module.exports ={LoginPage};