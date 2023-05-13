<template>
  <div>
    <form @submit.prevent>
      <h4>Создать пост</h4>
      <MyInput
        v-focus
        maxlength="10"
        type="text"
        v-model="post.title"
        placeholder="Название"
      />
      <MyInput
        maxlength="60"
        type="text"
        v-model="post.body"
        placeholder="Описание"
      />
      <MyButton class="btn" @click="createPost">Создать пост</MyButton>
    </form>
  </div>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
import MyInput from "./UI/MyInput.vue";

export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      if (this.post.body.length && this.post.title.length) {
        this.$emit("create", this.post);
      }
      this.resetPost();
    },
    resetPost() {
      this.post = {
        title: "",
        body: "",
      };
    },
  },
  emits: {
    create() {
      return true;
    },
  },

  components: { MyButton: MyButton, MyInput: MyInputChange },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
}
</style>
