import { MockAIDataProvider } from './mockAIDataProvider.js';
import { GeminiAIDataProvider } from './geminiAIDataProvider.js';
import aiConfig from '../../config/ai.config.js';

export class AIProviderFactory {

    static createProvider() {

        switch (aiConfig.provider) {

            case 'mock':
                return new MockAIDataProvider();

            case 'gemini':
                return new GeminiAIDataProvider();

            default:
                throw new Error(
                    `Unsupported AI provider: ${aiConfig.provider}`
                );
        }
    }
}