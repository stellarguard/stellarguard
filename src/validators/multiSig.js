const StellarSdk = require('stellar-sdk');
const StrKey = StellarSdk.StrKey;

const utils = require('./utils');
const yup = require('yup');

yup.addMethod(yup.string, 'stellarPublicKey', function(name) {
  return this.test({
    name: 'public-key',
    exclusive: true,
    params: { name },
    test: value => !value || StrKey.isValidEd25519PublicKey(value),
    message: 'Must be a valid Stellar Public Key'
  });
});

const schema = yup.object().shape({
  sourceAccount: yup
    .string()
    .required('Stellar Public Key is required.')
    .stellarPublicKey(),
  backupSigner: yup.string().stellarPublicKey()
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
