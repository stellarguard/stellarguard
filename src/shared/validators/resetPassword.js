const utils = require('./utils');
const yup = require('yup');

const MIN_PASSWORD_LENGTH = 8;

const schema = yup.object().shape({
  password: yup
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    )
    .required('Password is required.'),
  code: yup.string().required('Reset code is required.')
});

async function validate(user) {
  return await utils.validateYup(schema, user);
}

exports.schema = schema;
exports.validate = validate;
