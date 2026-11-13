import { GoogleGenAI } from '@google/genai';
import aiConfig from '../../config/ai.config.js';

export class GeminiAIDataProvider {

    constructor() {

        if (!aiConfig.apiKey) {
            throw new Error('Gemini API key is missing.');
        }

        this.client = new GoogleGenAI({
            apiKey: aiConfig.apiKey
        });

        this.model = aiConfig.model;
    }

    async generateData(prompt) {

        const response = await this.client.models.generateContent({

            model: this.model,

            contents: `
                ${prompt}

                Return only a valid JSON object.
                Do not include Markdown or explanations.
            `,

            config: {
                responseMimeType: 'application/json',
                temperature: 0.2
            }

        });

        const generatedText = response.text;

        if (!generatedText) {
            throw new Error('Gemini returned an empty response.');
        }

        try {
            return JSON.parse(generatedText);
        } catch (error) {
            throw new Error(
                `Gemini returned invalid JSON: ${error.message}`
            );
        }
    }
}