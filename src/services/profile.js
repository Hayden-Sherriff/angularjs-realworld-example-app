import api from './api';

const Profile = {
  /** @returns {Promise<object>} profile */
  get(username) {
    return api.get(`/profiles/${username}`).then((res) => res.data.profile);
  },

  follow(username) {
    return api.post(`/profiles/${username}/follow`).then((res) => res.data);
  },

  unfollow(username) {
    return api.delete(`/profiles/${username}/follow`).then((res) => res.data);
  },
};

export default Profile;
