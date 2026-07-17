// Tags API, ported from src/js/services/tags.service.js.
import apiClient from './client';
import type { Tag } from './types';

/** GET /tags. */
export async function getAll(): Promise<Tag[]> {
  const { tags } = await apiClient.get<{ tags: Tag[] }>('/tags');
  return tags;
}
