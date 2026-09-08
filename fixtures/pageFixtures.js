import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

export const pageFixtures = {

    loginPage: async ({ page }, use) => {

        await use(new LoginPage(page));

    },
    inventoryPage: async ({ page }, use) => {

        await use(new InventoryPage(page));

    },

    cartPage: async ({ page }, use) => {

        await use(new CartPage(page));

    },

    checkoutPage: async ({ page }, use) => {

        await use(new CheckoutPage(page));

    }
};



