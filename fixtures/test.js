import { test as base, expect } from '@playwright/test';

import { pageFixtures } from './pageFixtures.js';

import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

export const test = base.extend(pageFixtures);

export { expect };