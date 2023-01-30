<template>
  <div class="app">
    <post-form @create="createPost" />
    <post-list :posts="posts" />
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Javascript',
          body: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, nobis.',
        },
        {
          id: 2,
          title: 'Javascript 2',
          body: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, nobis.',
        },
        {
          id: 3,
          title: 'Javascript 3',
          body: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, nobis.',
        },
      ],
    };
  },
  methods: {
    createPost(post) {
      console.log('appvue');
      this.posts.push(post);
    },
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
</style>
