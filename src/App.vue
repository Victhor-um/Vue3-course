<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <div class="app_btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />k
    </div>
    <MyDialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </MyDialog>
    <post-list v-if="!isPostLoading" :posts="posts" @remove="removePost" />
    <div v-else>Идёт загрузка...</div>
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
import MyButton from './components/UI/MyButton.vue';
import MyDialog from './components/UI/MyDialog.vue';
import MySelect from './components/UI/MySelect.vue';
import axios from 'axios';
export default {
  components: {
    PostList,
    PostForm,
    MyDialog,
    MyButton,
    MySelect,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' },
        { value: 'id', name: 'По id' },
      ],
    };
  },
  methods: {
    createPost(post) {
      console.log('appvue');
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      console.log('removePost');
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?_limit=10'
        );
        this.posts = response.data;
        console.log('🚀 ~ file: App.vue:67 ~ fetchUsers ~ response', response);
      } catch (error) {
        alert('Error');
      } finally {
        this.isPostLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
.app_btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
