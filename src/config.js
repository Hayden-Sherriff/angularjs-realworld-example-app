const config = {
  api: import.meta.env.VITE_API_URL || 'https://conduit.productionready.io/api',
  jwtKey: 'jwtToken',
  appName: 'Conduit',
};

export default config;
