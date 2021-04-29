import Butter from 'buttercms';

const butter = Butter(process.env.VUE_APP_BUTTERCMS_API_TOKEN,
  false,
  process.env.VUE_APP_REQUEST_TIMEOUT);

export default {
  getAllPosts(params) {
    return butter.post.list(params);
  },
  getPost(slug) {
    return butter.post.retrieve(slug);
  },
  searchPosts(query, params) {
    return butter.post.search(query, params);
  }
};
