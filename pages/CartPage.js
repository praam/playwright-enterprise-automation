import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

    constructor( page ){

    super( page );

    this.cartItems = page.locator('.cart_item .inventory_item_name');
    this.checkoutButton = page.locator('#checkout');

  }

  async getItemNames() {

    return await this.cartItems.allTextContents();

  }

  async proceedToCheckout() {

    await this.checkoutButton.click();

  }

}