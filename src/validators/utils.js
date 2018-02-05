const { yupToFormErrors, validateYupSchema } = require('formik');

exports.validateYup = async function(schema, data) {
  try {
    await validateYupSchema(data, schema);
    return {};
  } catch (errors) {
    throw yupToFormErrors(errors);
  }
};
