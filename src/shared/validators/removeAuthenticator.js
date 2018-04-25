const utils = require('./utils');
const yup = require('yup');

const schema = yup.object().shape({
  verificationCode: yup
    .string()
    .min(6, 'Verification Code must be 6 characters long.')
    .max(6, 'Verification Code must be 6 characters long.')
    .required('Authenticator Verification Code is required.')
});

async function validate(authenticator) {
  return await utils.validateYup(schema, authenticator);
}

module.exports = {
  schema,
  validate
};

exports.schema = schema;
exports.validate = validate;
