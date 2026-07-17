// Profiles API, ported from src/js/services/profile.service.js.
import apiClient from './client';
import type { Profile } from './types';

/** GET /profiles/:username. */
export async function get(username: string): Promise<Profile> {
  const { profile } = await apiClient.get<{ profile: Profile }>(
    `/profiles/${username}`,
  );
  return profile;
}

/** POST /profiles/:username/follow. */
export function follow(username: string): Promise<{ profile: Profile }> {
  return apiClient.post<{ profile: Profile }>(`/profiles/${username}/follow`);
}

/** DELETE /profiles/:username/follow. */
export function unfollow(username: string): Promise<{ profile: Profile }> {
  return apiClient.del<{ profile: Profile }>(`/profiles/${username}/follow`);
}
