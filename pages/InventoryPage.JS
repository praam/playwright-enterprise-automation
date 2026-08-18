import { BasePage } from "./Basepage";

export class InventoryPage extends BasePage {

    
    constructor(page) {
      
       super(page);
        this.title = page.locator('.title');
        this.shoppingCartLink = page.locator('.shopping_cart_link');  

    }

  getAddToCartButton(productName) {

    
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
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