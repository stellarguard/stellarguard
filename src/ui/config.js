export default {
  isTestNetwork: !process.env.USE_STELLAR_PUBLIC_NETWORK,
  isPublicNetwork: !!process.env.USE_STELLAR_PUBLIC_NETWORK,
  staticPublicKey: 'GCVHEKSRASJBD6O2Z532LWH4N2ZLCBVDLLTLKSYCSMBLOYTNMEEGUARD' // can be used by third parties to check whether an account has StellarGuard enabled
};
