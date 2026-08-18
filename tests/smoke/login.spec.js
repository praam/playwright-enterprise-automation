import {expect, test} from 'playwright/test'
import {LoginPage} from '../../pages/LoginPage'
import {InventoryPage} from '../../pages/InventoryPage'
import {CartPage} from '../../pages/CartPage'
import {CheckoutPage} from '../../pages/CheckoutPage'


test.describe('Login - Smoke Tests', () => {

    test('Sauce Demo - Complete Checkout Flow', async({page}) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        const itemsToBuy = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

        await loginPage.navigate();

        await loginPage.login('standard_user','secret_sauce');

        await expect(page).toHaveURL(/inventory/);

        await expect(page.getByText('Products')).toBeVisible();

        await inventoryPage.addProductsToCart(itemsToBuy);

        await inventoryPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');


        const cartItems = await cartPage.getItemNames();
        for (const item of itemsToBuy) {
          
            expect(cartItems).toContain(item);
        
        }

        await cartPage.proceedToCheckout();
        await checkoutPage.fillInformation('John', 'Doe', '560001');

        
        await checkoutPage.finishCheckout();
        const confirmation = await checkoutPage.getConfirmationDetails();
        
        expect(confirmation.header).toContain('Thank you for your order!');
        console.log('Checkout Result:', confirmation);

    });

    test('Verify locked user cannot login', async({page}) => {

         const loginPage = new LoginPage(page);

         await loginPage.navigate();

        await loginPage.login('locked_out_user','secret_sauce');

        await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.'))
        .toBeVisible();

    });

});

