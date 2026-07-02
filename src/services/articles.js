import api from './api';

const Articles = {
  /**
   * @param {{ type: 'all' | 'feed', filters?: Record<string, string|number> }} config
   * @returns {Promise<{ articles: object[], articlesCount: number }>}
   */
  query(config) {
    const url = config.type === 'feed' ? '/articles/feed' : '/articles';
    return api.get(url, { params: config.filters }).then((res) => res.data);
  },

  /** @returns {Promise<object>} article */
  get(slug) {
    return api.get(`/articles/${slug}`).then((res) => res.data.article);
  },

  destroy(slug) {
    return api.delete(`/articles/${slug}`);
  },

  /** @returns {Promise<object>} article */
  save(article) {
    if (article.slug) {
      const { slug, ...body } = article;
      return api
        .put(`/articles/${slug}`, { article: body })
        .then((res) => res.data.article);
    }
    return api
      .post('/articles', { article })
      .then((res) => res.data.article);
  },

  favorite(slug) {
    return api.post(`/articles/${slug}/favorite`);
  },

  unfavorite(slug) {
    return api.delete(`/articles/${slug}/favorite`);
  },
};

export default Articles;
