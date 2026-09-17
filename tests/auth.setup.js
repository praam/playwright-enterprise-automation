import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import users from '../test-data/users/users.json' with { type: 'json' };

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );
    // Wait for authentication to complete
    await expect(page).toHaveURL(/inventory\.html/);

    await expect(page.locator('.title'))
        .toHaveText('Products');

    // Save authenticated state
    await page.context().storageState({
        path: authFile
    });
});