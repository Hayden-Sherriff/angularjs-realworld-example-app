// Typed fetch-based API client for the RealWorld Conduit API.
//
// Reproduces the behavior of the AngularJS HTTP layer:
//   - src/js/config/auth.interceptor.js  -> request/response interceptors below
//   - Automatically attaches `Authorization: Token <jwt>` to API requests.
//   - On a 401 response, clears the stored token and hard-reloads the page.
import AppConstants from '@/config/constants';
import JWT from './jwt';
import type { ApiErrors } from './types';

export interface RequestOptions {
  /** Query params serialized onto the URL. */
  params?: Record<string, string | number | boolean | undefined | null>;
  /** JSON request body. */
  body?: unknown;
  /**
   * Skip the global 401 handler (token destroy + page reload).
   * Used by the auth-verification call so a bad/expired token doesn't
   * trigger a reload loop on startup.
   */
  skipAuthRedirect?: boolean;
}

/** Error thrown for non-2xx responses. Carries the RealWorld error body. */
export class ApiError extends Error {
  readonly status: number;
  readonly errors: ApiErrors;

  constructor(status: number, errors: ApiErrors, message?: string) {
    super(message ?? `Request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

function buildUrl(path: string, params?: RequestOptions['params']): string {
  const url = new URL(
    `${AppConstants.api}${path}`,
    // base is only used when AppConstants.api is relative; harmless otherwise
    typeof window !== 'undefined' ? window.location.origin : undefined,
  );
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

// Response interceptor equivalent (auth.interceptor.js responseError).
function handleUnauthorized(): void {
  JWT.destroy();
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}

async function request<T>(
  method: string,
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Request interceptor equivalent: attach the JWT for API requests.
  const token = JWT.get();
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  const response = await fetch(buildUrl(path, options.params), {
    method,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 401 && !options.skipAuthRedirect) {
    handleUnauthorized();
  }

  if (!response.ok) {
    let errors: ApiErrors = {};
    try {
      const data = (await response.json()) as { errors?: ApiErrors };
      errors = data.errors ?? {};
    } catch {
      // response had no JSON body
    }
    throw new ApiError(response.status, errors);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>('GET', path, options),
  post: <T>(path: string, options?: RequestOptions) =>
    request<T>('POST', path, options),
  put: <T>(path: string, options?: RequestOptions) =>
    request<T>('PUT', path, options),
  del: <T>(path: string, options?: RequestOptions) =>
    request<T>('DELETE', path, options),
};

export default apiClient;
