
import { test, expect } from '../../fixtures/test.js';


test.describe('Login - Smoke Tests', () => {

    test('Sauce Demo - Complete Checkout Flow', async({ loginPage,inventoryPage, cartPage,
        checkoutPage }) => {


        const itemsToBuy = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

        await loginPage.navigate();

        await loginPage.login('standard_user','secret_sauce');

        console.log('Current URL:', await loginPage.getCurrentUrl());

        await expect(loginPage.page).toHaveURL(/inventory/);

        await expect(inventoryPage.pageTitle).toHaveText('Products');

        await inventoryPage.addProductsToCart( itemsToBuy );

        await inventoryPage.goToCart();
        await expect(cartPage.page).toHaveURL(/cart\.html/);


        const cartItems = await cartPage.getItemNames();
        for (const item of itemsToBuy) {
          
            expect( cartItems ).toContain( item );
        
        }

        await cartPage.proceedToCheckout();
        await checkoutPage.fillInformation('John', 'Doe', '560001');

        
        await checkoutPage.finishCheckout();
        const confirmation = await checkoutPage.getConfirmationDetails();
        
        expect( confirmation.header ).toContain('Thank you for your order!');
        expect(confirmation.text).toContain('Your order has been dispatched');

    });

    test('Verify locked user cannot login', async({ loginPage}) => {


        await loginPage.navigate();

        await loginPage.login('locked_out_user','secret_sauce');

        await expect(loginPage.loginError).toBeVisible();


    });

});

