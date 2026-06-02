import { Page, Locator, expect } from '@playwright/test';

export class OrdersReviewPage {
    page: Page;
    country: Locator;
    dropdown: Locator;
    emailId: Locator;
    submit: Locator;
    orderConfirmationText: Locator;
    orderId: Locator;
    constructor(page: Page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

    }
    async searchCountryAndSelect(countryCode: string, countryName: string) {
        await this.country.pressSequentially(countryCode, { delay: 150 });
        const dropdown = this.dropdown;
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count(); //chaining locator so not created seperate variable
        for (let i = 0; i < optionsCount; ++i) {
            let text: any;
            text = await dropdown.locator("button").nth(i).textContent();
            if (text === countryName) {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

    }

    async VerifyEmaiId(username: string) {
        await expect(this.emailId).toHaveText(username);
    }

    async SubmitAndGetOrderID() {
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();

    }
}

module.exports = { OrdersReviewPage };