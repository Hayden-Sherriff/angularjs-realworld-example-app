// Ported from src/js/config/app.constants.js
// The API base URL can be overridden at build time via VITE_API_URL.
export const AppConstants = {
  api: import.meta.env.VITE_API_URL ?? 'https://conduit.productionready.io/api',
  jwtKey: 'jwtToken',
  appName: 'Conduit',
} as const;

export default AppConstants;
