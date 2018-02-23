const utils = require('./utils');
const yup = require('yup');

const schema = yup.object().shape({
  password: yup.string().required('Password is required.'),
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
