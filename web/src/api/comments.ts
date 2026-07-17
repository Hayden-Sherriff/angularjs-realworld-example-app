// Comments API, ported from src/js/services/comments.service.js.
import apiClient from './client';
import type { Comment } from './types';

/** POST /articles/:slug/comments — add a comment (body string). */
export async function add(slug: string, body: string): Promise<Comment> {
  const response = await apiClient.post<{ comment: Comment }>(
    `/articles/${slug}/comments`,
    { body: { comment: { body } } },
  );
  return response.comment;
}

/** GET /articles/:slug/comments. */
export async function getAll(slug: string): Promise<Comment[]> {
  const { comments } = await apiClient.get<{ comments: Comment[] }>(
    `/articles/${slug}/comments`,
  );
  return comments;
}

/** DELETE /articles/:slug/comments/:id. */
export function destroy(commentId: number, articleSlug: string): Promise<void> {
  return apiClient.del<void>(`/articles/${articleSlug}/comments/${commentId}`);
}
