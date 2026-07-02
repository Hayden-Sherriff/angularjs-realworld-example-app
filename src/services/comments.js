import api from './api';

const Comments = {
  /** @returns {Promise<object>} comment */
  add(slug, body) {
    return api
      .post(`/articles/${slug}/comments`, { comment: { body } })
      .then((res) => res.data.comment);
  },

  /** @returns {Promise<object[]>} comments */
  getAll(slug) {
    return api
      .get(`/articles/${slug}/comments`)
      .then((res) => res.data.comments);
  },

  destroy(commentId, articleSlug) {
    return api.delete(`/articles/${articleSlug}/comments/${commentId}`);
  },
};

export default Comments;
