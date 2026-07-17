import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import apiClient, { ApiError } from './client';
import JWT from './jwt';
import AppConstants from '@/config/constants';

function mockFetch(
  response: Partial<Response> & { json?: () => Promise<unknown> },
) {
  return vi.fn().mockResolvedValue({
    ok: response.ok ?? true,
    status: response.status ?? 200,
    json: response.json ?? (() => Promise.resolve({})),
  } as Response);
}

describe('apiClient', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('attaches the Authorization header when a token is present', async () => {
    JWT.save('my-token');
    const fetchMock = mockFetch({ json: () => Promise.resolve({ ok: 1 }) });
    vi.stubGlobal('fetch', fetchMock);

    await apiClient.get('/tags');

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${AppConstants.api}/tags`);
    expect((init as RequestInit).headers).toMatchObject({
      Authorization: 'Token my-token',
    });
  });

  it('omits the Authorization header when logged out', async () => {
    const fetchMock = mockFetch({});
    vi.stubGlobal('fetch', fetchMock);

    await apiClient.get('/tags');

    const [, init] = fetchMock.mock.calls[0];
    expect((init as RequestInit).headers).not.toHaveProperty('Authorization');
  });

  it('serializes query params', async () => {
    const fetchMock = mockFetch({});
    vi.stubGlobal('fetch', fetchMock);

    await apiClient.get('/articles', {
      params: { tag: 'react', limit: 10, skip: undefined },
    });

    const [url] = fetchMock.mock.calls[0];
    expect(url).toContain('tag=react');
    expect(url).toContain('limit=10');
    expect(url).not.toContain('skip');
  });

  it('throws ApiError carrying the validation errors body', async () => {
    const fetchMock = mockFetch({
      ok: false,
      status: 422,
      json: () => Promise.resolve({ errors: { email: ["can't be blank"] } }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(apiClient.post('/users')).rejects.toMatchObject({
      status: 422,
      errors: { email: ["can't be blank"] },
    });
    await expect(apiClient.post('/users')).rejects.toBeInstanceOf(ApiError);
  });
});
