// Barrel for the API layer. Import feature APIs as namespaces to avoid
// name collisions (e.g. articles.get vs profiles.get):
//   import { articlesApi, profilesApi } from '@/api';
export * as authApi from './auth';
export * as articlesApi from './articles';
export * as commentsApi from './comments';
export * as profilesApi from './profiles';
export * as tagsApi from './tags';

export { apiClient, ApiError } from './client';
export { JWT } from './jwt';
export * from './types';
