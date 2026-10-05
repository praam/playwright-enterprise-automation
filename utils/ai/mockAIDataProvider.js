export class MockAIDataProvider {

    async generateData(prompt) {

        return {
            firstName: 'AI',
            lastName: 'Generated',
            email: 'ai.generated@example.com'
        };

    }

}