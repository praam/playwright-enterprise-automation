import {expect, test} from 'playwright/test'

test.describe('Login - Smoke Tests', () => {

    test('Verify user can login with valid credentials', async({page}) => {

        await page.goto("/");

        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');

        await page.getByRole('button', {name:'Login'}).click();

        await expect(page).toHaveURL(/inventory/);

        await expect(page.getByText('Products')).toBeVisible();


    });

});

