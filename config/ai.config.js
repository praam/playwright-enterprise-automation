import 'dotenv/config';

const aiConfig = {
    apiKey: process.env.AI_API_KEY || '',
    enabled: Boolean(process.env.AI_API_KEY)
};

export default aiConfig;