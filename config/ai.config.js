import 'dotenv/config';

const aiConfig = {

    provider: process.env.AI_PROVIDER || 'mock',

    apiKey: process.env.GEMINI_API_KEY || '',

    model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',

    enabled: Boolean(process.env.GEMINI_API_KEY)

};

export default aiConfig;