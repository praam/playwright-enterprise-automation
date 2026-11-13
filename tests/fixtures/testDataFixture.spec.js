import { test, expect } from '../../fixtures/test.js';

test('Verify generated user fixture', async ({ generatedUser }) => {

    console.log('Generated User:', generatedUser);

    expect(generatedUser.firstName).toBeTruthy();
    expect(generatedUser.lastName).toBeTruthy();
    expect(generatedUser.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

});