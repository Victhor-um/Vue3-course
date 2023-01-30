<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <PostItem
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @remove="$emit('remove', post)"
    />
  </div>
  <h2 style="color: red" v-else>Список постов пуст</h2>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  emits: {
    remove() {
      return true;
    },
  },
  components: { PostItem },
};
</script>

<style scoped></style>
