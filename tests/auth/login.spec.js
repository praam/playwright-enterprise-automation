import { test, expect } from '../../fixtures/test.js';

test.describe('Login - Authentication Tests', () => {

    test('Verify locked user cannot login', async({ loginPage}) => {

        await loginPage.navigate(); 

        await loginPage.login('locked_out_user','secret_sauce');

        await expect(loginPage.loginError).toBeVisible();

    });

});