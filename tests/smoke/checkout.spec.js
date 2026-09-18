import { test, expect } from '../../fixtures/test.js';
import checkoutData from '../../test-data/checkout/checkoutData.json' with { type: 'json' };
import products from '../../test-data/products/products.json' with { type: 'json' };
import * as allure from 'allure-js-commons';


test.describe('Checkout - Smoke Tests', {
    tag: ['@smoke', '@checkout'],
    annotation: {
        type: 'feature',
        description: 'End-to-end checkout validation'
    }
}, () => {

    test(
    'Sauce Demo - Complete Checkout Flow',
    async ({
        inventoryPage,
        cartPage,
        checkoutPage
    }) => {

        await allure.severity("critical");
        await allure.epic("E-Commerce Application");
        await allure.story('Complete Checkout Flow');
        await allure.feature('Checkout');

        // Navigate to application
        await inventoryPage.navigate('/inventory.html');

        await expect(inventoryPage.page)
             .toHaveURL(/inventory\.html/);

        await expect(inventoryPage.pageTitle)
            .toHaveText('Products');

        const itemsToBuy = products.checkoutProducts;

        await inventoryPage.addProductsToCart(itemsToBuy);

        await inventoryPage.goToCart();

        await expect(cartPage.page)
            .toHaveURL(/cart\.html/);

        const cartItems = await cartPage.getItemNames();

        for (const item of itemsToBuy) {
            expect(cartItems).toContain(item);
        }

        await cartPage.proceedToCheckout();

        await checkoutPage.fillInformation(
            checkoutData.validCustomer.firstName,
            checkoutData.validCustomer.lastName,
            checkoutData.validCustomer.postalCode
        );

        await checkoutPage.finishCheckout();

        const confirmation =
            await checkoutPage.getConfirmationDetails();

            await allure.attachment(
                'Checkout Confirmation Details',
                JSON.stringify(confirmation, null, 2),
                'application/json'
            );

            expect(confirmation.header).toContain('Thank you for your order!');

            expect(confirmation.text).toContain("Your order has been dispatched");

    });

});