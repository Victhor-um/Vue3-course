const STATE_TYPES = {
  getters: {
    sortedPosts: 'post/sortedPosts',
    sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
  },
  actions: {
    fetchPosts: 'post/fetchPosts',
    loadMorePosts: 'post/loadMorePosts',
  },
  mutations: {
    setPosts: 'post/setPosts',
    setLoading: 'post/setLoading',
    setPage: 'post/setPage',
    setSelectedSort: 'post/setSelectedSort',
    setSearchQuery: 'post/setSearchQuery',
    setTotalPages: 'post/setTotalPages',
  },
};

export default STATE_TYPES;
