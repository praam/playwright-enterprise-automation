import { AIProviderFactory } from './aiProviderFactory.js';
import { TestDataValidator } from '../testDataValidator.js';

export class AIDataService {

    constructor(provider = AIProviderFactory.createProvider()) {
        this.provider = provider;
    }

    async generate(prompt, schema = null, maxRetries = 3) {

        let lastValidationErrors = null;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {

            const data = await this.provider.generateData(prompt);

            if (!schema) {
                return data;
            }

            const validation = TestDataValidator.validate(data, schema);

            if (validation.valid) {
                return data;
            }

            lastValidationErrors = validation.errors;

            console.log(
                `AI data validation failed. Attempt ${attempt}/${maxRetries}`
            );
        }

        throw new Error(
            `AI generated invalid test data after ${maxRetries} attempts: ` +
            JSON.stringify(lastValidationErrors)
        );
    }

}