<template>
  <div class="post">
    <div>{{ post.id }}</div>
    <div><strong>Название: </strong>{{ post.title }}</div>
    <div><strong>Описание: </strong>{{ post.body }}</div>
    <div class="post__btns">
      <MyButton @click="openPost()">Открыть</MyButton>
      <MyButton @click="$emit('remove', post)">Удалить</MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from './UI/MyButton.vue';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openPost() {
      this.$router.push(`/posts/${this.post.id}`);
    },
  },
  components: { MyButton },
};
</script>

<style scoped>
.post {
  padding: 15px;
  margin-top: 15px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post > div:not([class*='btns']) {
  padding: 5px;
  word-break: break-all;
}
</style>
