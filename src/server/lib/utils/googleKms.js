const { google } = require('googleapis');

async function getClient() {
  const authClient = await google.auth.getClient({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });

  return google.cloudkms({
    version: 'v1',
    auth: authClient
  });
}

const DEFAULT_LOCATION_ID = 'global';
const DEFAULT_KEY_RING = 'stellarguard';
const DEFAULT_KEY_ID = 'stellar-secret-key';

async function encrypt(
  dataToEncrypt,
  {
    locationId = DEFAULT_LOCATION_ID,
    keyRingId = DEFAULT_KEY_RING,
    cryptoKeyId = DEFAULT_KEY_ID
  } = {}
) {
  const projectId = await google.auth.getDefaultProjectId();
  const kms = await getClient();
  const request = {
    name: `projects/${projectId}/locations/${locationId}/keyRings/${keyRingId}/cryptoKeys/${cryptoKeyId}`,
    resource: {
      plaintext: Buffer.from(dataToEncrypt).toString('base64')
    }
  };

  const response = await kms.projects.locations.keyRings.cryptoKeys.encrypt(
    request
  );

  return Buffer.from(response.data.ciphertext, 'base64');
}

async function decrypt(
  dataToDecrypt,
  {
    locationId = DEFAULT_LOCATION_ID,
    keyRingId = DEFAULT_KEY_RING,
    cryptoKeyId = DEFAULT_KEY_ID
  } = {}
) {
  const projectId = await google.auth.getDefaultProjectId();
  const kms = await getClient();
  const request = {
    name: `projects/${projectId}/locations/${locationId}/keyRings/${keyRingId}/cryptoKeys/${cryptoKeyId}`,
    resource: {
      ciphertext: Buffer.from(dataToDecrypt).toString('base64')
    }
  };

  const response = await kms.projects.locations.keyRings.cryptoKeys.decrypt(
    request
  );

  return Buffer.from(response.data.plaintext, 'base64');
}

module.exports = {
  encrypt,
  decrypt
};
