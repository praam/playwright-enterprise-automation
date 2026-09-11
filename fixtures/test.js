import { test as base, expect } from '@playwright/test';
import { pageFixtures } from './pageFixtures.js';
import { authFixtures } from './authFixtures.js';

export const test = base.extend({
    ...pageFixtures,
    ...authFixtures
});

export { expect };