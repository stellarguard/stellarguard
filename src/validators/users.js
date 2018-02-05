const utils = require('./utils');
const yup = require('yup');

const MIN_PASSWORD_LENGTH = 8;

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    )
    .required('Password is required.'),
  email: yup
    .string()
    .email('Email must be a valid email.')
    .required('Email is required.')
});

async function validate(user) {
  return await utils.validateYup(schema, user);
}

exports.schema = schema;
exports.validate = validate;
