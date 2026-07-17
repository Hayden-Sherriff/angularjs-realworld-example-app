import { describe, it, expect } from 'vitest';
import JWT from './jwt';
import AppConstants from '@/config/constants';

describe('JWT', () => {
  it('saves, reads, and destroys the token under the configured key', () => {
    expect(JWT.get()).toBeNull();

    JWT.save('abc.def.ghi');
    expect(JWT.get()).toBe('abc.def.ghi');
    expect(localStorage.getItem(AppConstants.jwtKey)).toBe('abc.def.ghi');

    JWT.destroy();
    expect(JWT.get()).toBeNull();
  });
});
