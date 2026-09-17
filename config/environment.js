import qaConfig from './environments/qa.config.js';
import devConfig from './environments/dev.config.js';

const environment = process.env.TEST_ENV || 'qa';

const environments = {
    qa: qaConfig,
    dev: devConfig

};

if (!environments[environment]) {
    throw new Error(
        `Unknown TEST_ENV: ${environment}. Available environments: ${Object.keys(environments).join(', ')}`
    );
}

export default environments[environment];