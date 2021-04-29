import Vue from 'vue';
import blogService from '../../api/blogService';

const state = {
  allPosts: [],
  post: null,
  foundPosts: [],
};

const getters = {
  allPosts: state => state.allPosts,
  post: state => state.post,
  foundPosts: state => state.foundPosts,
};

const mutations = {
  setAllPosts(state, newState) {
    state.allPosts = newState;
  },
  setPost(state, newState) {
    state.post = newState;
  },
  setFoundPosts(state, newState) {
    state.foundPosts = newState;
  }
};

const actions = {
  async getAllPosts({ commit }, params) {
    try {
      const res = await blogService.getAllPosts(params);
      if (res && Object.keys(res).length) {
        commit('setAllPosts', res.data);
      }
    } catch (err) {
      console.error(err);
    }
  },
  async getPost({ commit }, slug) {
    try {
      const res = await blogService.getPost(slug);
      if (res && Object.keys(res).length) {
        commit('setPost', res.data);
      }
    } catch (err) {
      console.error(err);
    }
  },
  async searchPosts({ commit }, { query, params }) {
    try {
      const res = await blogService.searchPosts(query, params);
      if (res && Object.keys(res).length) {
        // commit('setFoundPosts', res.data);
        commit('setAllPosts', res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
