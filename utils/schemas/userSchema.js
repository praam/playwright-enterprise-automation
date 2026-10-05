export const userSchema = {
    type: 'object',

    properties: {
        firstName: {
            type: 'string'
        },

        lastName: {
            type: 'string'
        },

        email: {
            type: 'string',
            format: 'email'
        }
    },

    required: [
        'firstName',
        'lastName',
        'email'
    ],

    additionalProperties: false
};