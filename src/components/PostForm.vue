<template>
  <div>
    <form @submit.prevent>
      <h4>Создать пост</h4>
      <input type="text" v-model="post.title" class="input" />
      <input type="text" v-model="post.body" class="input" />
      <button class="btn" @click="createPost">Создать пост</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createPost() {
      console.log('123');
      this.post.id = Date.now();
      if (this.post.body.length && this.post.title.length) {
        this.$emit('create', this.post);
      }
      this.resetPost();
    },
    resetPost() {
      this.post = {
        title: '',
        body: '',
      };
    },
  },
  /*  emits: {
    create() {
      return true;
    },
  }, */
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>
