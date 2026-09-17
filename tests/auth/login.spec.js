import { test, expect } from '../../fixtures/test.js';
import users from '../../test-data/users/users.json' with { type: 'json' };

test.describe('Login - Authentication Tests', () => {

    test('Verify locked user cannot login', async({ loginPage}) => {

        await loginPage.navigate(); 

        await loginPage.login(
            users.lockedOutUser.username,
            users.lockedOutUser.password
   );

        await expect(loginPage.loginError).toBeVisible();

    });

});