import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
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