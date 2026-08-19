import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    
    constructor(page){
        
        super( page );

        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput =  page.getByPlaceholder('Password') ;

        this.loginButton = page.getByRole('button', {name: 'Login'});

        this.loginError = page.locator('[data-test="error"]');

    } 

    async login(username, password){

        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);

        await this.loginButton.click();

    }

     async getLoginErrorMessage() {

       return await this.loginError.textContent();

  }

}