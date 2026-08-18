import { BasePage } from "./Basepage";

export class CheckoutPage extends BasePage {

   constructor(page){

        super(page);
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        

        this.finishButton = page.locator('#finish');
        this.completeHeader = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');

   }

   async fillInformation(firstName, lastName, postalCode) {
    
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.postalCodeInput.fill(postalCode);
      await this.continueButton.click();

  }

  async finishCheckout() {

      await this.finishButton.click();

  }

  async getConfirmationDetails() {

      const header = await this.completeHeader.textContent();
      const text = await this.completeText.textContent();
      return { header, text };

  }

}