const utils = require('./utils');
const yup = require('yup');

const schema = yup.object().shape({
  xdr: yup.string().required('Transaction XDR is required.')
});

async function validate(user) {
  return await utils.validateYup(schema, user);
}

module.exports = {
  schema,
  validate
};

exports.schema = schema;
exports.validate = validate;
