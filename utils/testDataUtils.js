import { faker } from '@faker-js/faker';

export class TestDataUtils {

    static generateUniqueId(prefix = 'test') {
        return `${prefix}_${Date.now()}`;
    }

    static generateEmail() {
        return faker.internet.email();
    }

    static generateUser() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email()
        };
    }

    static setSeed(seed) {
        faker.seed(seed);
    }

}