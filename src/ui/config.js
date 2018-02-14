export default {
  isTestNetwork: !process.env.USE_STELLAR_PUBLIC_NETWORK,
  isPublicNetwork: !!process.env.USE_STELLAR_PUBLIC_NETWORK
};
