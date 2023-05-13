const STATE_TYPES = {
  getters: {
    sortedPosts: "post/sortedPosts",
    sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
  },
  actions: {
    fetchPosts: "post/fetchPosts",
    loadMorePosts: "post/loadMorePosts",
  },
  mutations: {
    setPosts: "post/setPosts",
    setLoading: "post/setLoading",
    setPage: "post/setPage",
    setSelectedSort: "post/setSelectedSort",
    setSearchQuery: "post/setSearchQuery",
    setTotalPages: "post/setTotalPages",
  },
};
const MODULE_NAME = "post/";
const NAMESPACED_TYPES = structuredClone(STATE_TYPES);

function normalizeNames(Obj) {
  for (let [typeName, typeValue] of Object.entries(Obj)) {
    if (typeof typeValue === "string") {
      Obj[typeName] = typeValue.replace(MODULE_NAME, "");
    } else if (typeof typeValue === "object") {
      normalizeNames(typeValue);
    }
  }
}
normalizeNames(NAMESPACED_TYPES);

export { NAMESPACED_TYPES, STATE_TYPES };
