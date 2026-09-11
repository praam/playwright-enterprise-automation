import { LoginPage } from '../pages/LoginPage.js';

export const authFixtures = {

    authenticatedPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await use(page);
    }
};