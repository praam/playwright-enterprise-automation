import { TestDataUtils } from './testDataUtils.js';
import { AIDataService } from './ai/aiDataService.js';
import { TEST_DATA_STRATEGIES } from './testDataStrategies.js';
import { TestDataValidator } from './testDataValidator.js';
import { userSchema } from './schemas/userSchema.js';

export class TestDataFactory {

    static async createUser(
        strategy = TEST_DATA_STRATEGIES.FAKER
    ) {

        let user;

        switch (strategy) {

            case TEST_DATA_STRATEGIES.FAKER:
                user = TestDataUtils.generateUser();
                break;

            case TEST_DATA_STRATEGIES.AI: {
                const aiService = new AIDataService();

                user = await aiService.generate(
    `Generate a synthetic test user as JSON.
     Return exactly these three properties:
     firstName (string),
     lastName (string),
     email (valid email address).
     Do not include any additional properties.
     Use camelCase property names.`,
    userSchema,
    1
);
                break;}

            default:
                throw new Error(
                    `Unsupported test data strategy: ${strategy}`
                );
        }

        const validation = TestDataValidator.validate(
            user,
            userSchema
        );

        if (!validation.valid) {
            throw new Error(
                `Generated test data failed schema validation: ` +
                JSON.stringify(validation.errors)
            );
        }

        return user;
    }

}