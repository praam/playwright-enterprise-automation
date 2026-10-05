export class AIDataProvider {

    async generateData(prompt) {
        throw new Error(
            'generateData() must be implemented by an AI data provider'
        );
    }

}