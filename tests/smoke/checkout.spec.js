import { test, expect } from '../../fixtures/test.js';

test.describe('Checkout - Smoke Tests', () => {

    test('Sauce Demo - Complete Checkout Flow', async ({
        inventoryPage,
        cartPage,
        checkoutPage
    }) => {


        // Navigate to application
          await inventoryPage.navigate('/inventory.html');

    await expect(inventoryPage.page)
        .toHaveURL(/inventory\.html/);

    await expect(inventoryPage.pageTitle)
        .toHaveText('Products');

    const itemsToBuy = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light'
    ];

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
            'John',
            'Doe',
            '560001'
        );

        await checkoutPage.finishCheckout();

        const confirmation =
            await checkoutPage.getConfirmationDetails();

        expect(confirmation.header)
            .toContain('Thank you for your order!');

        expect(confirmation.text)
            .toContain('Your order has been dispatched');
    });

});