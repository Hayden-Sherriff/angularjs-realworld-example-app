// Articles API, ported from src/js/services/articles.service.js.
import apiClient from './client';
import type {
  Article,
  ArticleFormData,
  ArticleListConfig,
  ArticleListResponse,
} from './types';

/** GET /articles or /articles/feed with optional filters. */
export function query(config: ArticleListConfig): Promise<ArticleListResponse> {
  const path = config.type === 'feed' ? '/articles/feed' : '/articles';
  return apiClient.get<ArticleListResponse>(path, {
    params: config.filters,
  });
}

/** GET /articles/:slug. */
export async function get(slug: string): Promise<Article> {
  if (!slug.replace(' ', '')) {
    throw new Error('Article slug is empty');
  }
  const { article } = await apiClient.get<{ article: Article }>(
    `/articles/${slug}`,
  );
  return article;
}

/** DELETE /articles/:slug. */
export function destroy(slug: string): Promise<void> {
  return apiClient.del<void>(`/articles/${slug}`);
}

/**
 * Create (POST /articles) or update (PUT /articles/:slug) an article.
 * Presence of `slug` selects update, mirroring Articles.save().
 */
export async function save(article: ArticleFormData): Promise<Article> {
  const { slug, ...fields } = article;
  const response = slug
    ? await apiClient.put<{ article: Article }>(`/articles/${slug}`, {
        body: { article: fields },
      })
    : await apiClient.post<{ article: Article }>('/articles', {
        body: { article: fields },
      });
  return response.article;
}

/** POST /articles/:slug/favorite. */
export function favorite(slug: string): Promise<{ article: Article }> {
  return apiClient.post<{ article: Article }>(`/articles/${slug}/favorite`);
}

/** DELETE /articles/:slug/favorite. */
export function unfavorite(slug: string): Promise<{ article: Article }> {
  return apiClient.del<{ article: Article }>(`/articles/${slug}/favorite`);
}
