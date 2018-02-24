const utils = require('./utils');
const yup = require('yup');

const schema = yup.object().shape({
  xdr: yup.string().required('Transaction XDR is required.')
});

async function validate(transaction) {
  return await utils.validateYup(schema, transaction);
}

module.exports = {
  schema,
  validate
};

exports.schema = schema;
exports.validate = validate;
