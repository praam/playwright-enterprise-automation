import { test, expect } from '../../fixtures/test.js';
import users from '../../test-data/users/users.json' with { type: 'json' };

test.describe('Login - Smoke Tests', () => {

    test('Sauce Demo - Smoke Tests', async ({ loginPage }) => {

        await loginPage.navigate();

        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );

        await expect(loginPage.page)
            .toHaveURL(/inventory\.html/);

        await expect(loginPage.page.locator('.title'))
            .toHaveText('Products');

    });

    test('Verify locked user cannot login', async ({ loginPage }) => {

        await loginPage.navigate();

        await loginPage.login(
            users.lockedOutUser.username,
            users.lockedOutUser.password
        );

        await expect(loginPage.loginError)
            .toBeVisible();

    });

});