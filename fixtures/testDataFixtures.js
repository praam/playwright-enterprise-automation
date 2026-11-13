
import { TestDataFactory } from '../utils/testDataFactory.js';
import { TEST_DATA_STRATEGIES } from '../utils/testDataStrategies.js';

export const testDataFixtures = {

    generatedUser: async ({}, use) => {

        const strategy =
            process.env.TEST_DATA_STRATEGY ||
            TEST_DATA_STRATEGIES.FAKER;

        const user = await TestDataFactory.createUser(strategy);

        await use(user);
    }
};
