import { test as base, expect } from '@playwright/test';
import { pageFixtures } from './pageFixtures.js';
import { authFixtures } from './authFixtures.js';
import { lifecycleFixtures } from './lifecycleFixtures.js';

export const test = base.extend({
    ...pageFixtures,
    ...authFixtures,
    ...lifecycleFixtures
});

export { expect };
