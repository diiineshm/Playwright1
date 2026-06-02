import { Page } from '@playwright/test';
import { test, expect, Locator } from '@playwright/test';

export class CartPage {

    page: Page;
    cartProducts: Locator;
    checkout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.checkout = page.locator("text=Checkout");

    }

    getProductLocator(productName: string): Locator {

        return this.page.locator("h3:has-text('" + productName + "')");
    }

    async VeriftProductIsDisplayed(productName: string) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async Checkout() {
        await this.checkout.click();
    }


}

module.exports = { CartPage };

