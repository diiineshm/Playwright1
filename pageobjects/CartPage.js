const { test, expect } = require('@playwright/test');

class CartPage {

    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.checkout = page.locator("text=Checkout");

    }
    ////this method dynamically creating the locator with text of product and returning the locator
    getProductLocator(productName) {

        return this.page.locator("h3:has-text('" + productName + "')");
    }

    async VeriftProductIsDisplayed(productName) {
        await this.page.waitForLoadState('networkidle');
        await this.cartProducts.waitFor({ timeout: 10000 });
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async Checkout() {
        await this.checkout.click();
    }


}

module.exports = { CartPage };

