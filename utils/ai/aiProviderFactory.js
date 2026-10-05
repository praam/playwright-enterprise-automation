import { MockAIDataProvider } from './mockAIDataProvider.js';
import aiConfig from '../../config/ai.config.js';

export class AIProviderFactory {

    static createProvider() {

        if (aiConfig.enabled) {
            throw new Error(
                'Real AI provider is not implemented yet.'
            );
        }

        return new MockAIDataProvider();
    }

}