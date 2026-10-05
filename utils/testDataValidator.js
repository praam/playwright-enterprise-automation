import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({
    allErrors: true
});

addFormats(ajv);

export class TestDataValidator {

    static validate(data, schema) {

        const validate = ajv.compile(schema);

        const valid = validate(data);

        return {
            valid,
            errors: validate.errors
        };
    }

}