import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {

    
    constructor( page ) {
      
        super( page );

        this.pageTitle = page.locator('.title');
        this.shoppingCartLink = page.locator('.shopping_cart_link'); 
        

    }

  getAddToCartButton(productName) {

    
    const formattedName = productName.toLowerCase()
    .replace(/\s+/g, '-');
    return this.page.locator(`#add-to-cart-${formattedName}`);


  }

  async addProductsToCart(productNames) {

    for (const name of productNames) {

      await this.getAddToCartButton(name).click();

    }
  }

  async goToCart() {

    await this.shoppingCartLink.click();

  }


}