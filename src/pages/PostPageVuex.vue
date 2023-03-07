<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput
      v-focus
      :model-value="searchQuery"
      @update:model-value="onUpdateSearchQuery"
      placeholder="Поиск..."
    ></MyInput>
    <div class="app_btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>
    <MyDialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </MyDialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else="">Идёт загрузка...</div>
    <div
      v-if="page < limit"
      v-intersection="loadMorePosts"
      class="observer"
    ></div>
    <!-- <div class="page__wrapper">
        <div
          v-for="pageNumber in totalPages"
          key="pageNumber"
          class="page"
          :class="{ 'current-page': pageNumber === page }"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </div> 
      </div>-->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyButton from '@/components/UI/MyButton.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import MySelect from '@/components/UI/MySelect.vue';
import MyInput from '@/components/UI/MyInput.vue';
import store from '@/store/index.js';
import { STATE_TYPES } from '@/store/Types.js';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  components: {
    PostList,
    PostForm,
    MyDialog,
    MyButton,
    MySelect,
    MyInput,
  },
  store,
  data() {
    return {
      dialogVisible: false,
      searchQuery: '',
    };
  },
  methods: {
    ...mapMutations({
      setPage: STATE_TYPES.mutations.setPage,
      setSelectedSort: STATE_TYPES.mutations.setSelectedSort,
    }),
    ...mapActions({
      loadMorePosts: STATE_TYPES.actions.loadMorePosts,
      fetchPosts: STATE_TYPES.actions.fetchPosts,
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    onUpdateSearchQuery(value) {
      this.searchQuery = value;
    },
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      // searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: STATE_TYPES.getters.sortedPosts,
      // sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),
    sortedAndSearchedPosts(searchQuery) {
      const func = this.$store.getters['post/sortedAndSearchedPosts'];

      return func(this.searchQuery);
    },
  },
  mounted() {
    this.fetchPosts();
    // this.$refs.observer;
  },
  watch: {},
};
</script>

<style>
.app_btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15;
}
.page {
  border: 1px solid black;
  padding: 10px;
  margin: 5px;
}
.current-page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
  background: teal;
}
</style>
