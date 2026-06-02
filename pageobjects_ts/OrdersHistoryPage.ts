import { Page, Locator } from '@playwright/test';
export class OrdersHistoryPage{
    
    page : Page;
    ordersTable : Locator;
    rows : Locator;
    orderIdDetails : Locator;

    constructor(page : Page){
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");

    }

async searchOrderAndSelect(orderId : any){
     await this.ordersTable.waitFor();
            //i = 0, ++i = 1 console.log(1) -> 1 //++i - first increments then return the value.
            //i = 0, i++ = 0 console.log(i) -> 1
            // In loop both i++ and ++i behaves same
            for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

}
   
async getOrderId(){
    return await this.orderIdDetails.textContent();
}
       
}
module.exports = {OrdersHistoryPage};
