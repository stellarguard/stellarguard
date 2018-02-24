const utils = require('./utils');
const yup = require('yup');

const schema = yup.object().shape({
  code: yup.number().required('Authenticator code is required.')
});

async function validate(user) {
  return await utils.validateYup(schema, user);
}

exports.schema = schema;
exports.validate = validate;
