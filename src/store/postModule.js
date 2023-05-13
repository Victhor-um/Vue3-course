import axios from "axios";
import { NAMESPACED_TYPES as POST_TYPES } from "./Types";

export const postModule = {
  state: () => ({
    posts: [],
    isPostsLoading: false,
    selectedSort: "",
    page: 1,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      { value: "title", name: "По названию" },
      { value: "body", name: "По описанию" },
    ],
  }),
  getters: {
    [POST_TYPES.getters.sortedPosts](state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      );
    },
    [POST_TYPES.getters.sortedAndSearchedPosts](state, getters) {
      return (searchQuery) => {
        return getters.sortedPosts.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      };
      // return getters.sortedPosts.filter((post) =>
      //   post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      // );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        if (!state.posts.length) commit("setLoading", true);

        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              __limit: state.limit,
            },
          }
        );

        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", [...state.posts, ...response.data]);
        return response.data;
      } catch (error) {
        console.error(error);
      } finally {
        commit("setLoading", false);
      }
    },
    async loadMorePosts(context) {
      try {
        context.commit("setPage", context.state.page + 1);
        const test = await context.dispatch("fetchPosts");
      } catch (error) {
        console.error(error);
      } finally {
      }
    },
  },
  namespaced: true,
};
