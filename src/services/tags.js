import api from './api';

const Tags = {
  /** @returns {Promise<string[]>} tags */
  getAll() {
    return api.get('/tags').then((res) => res.data.tags);
  },
};

export default Tags;
