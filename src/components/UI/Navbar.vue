<template>
  <div class="navbar">
    <div>Vue 3</div>
    <div class="navbar__btns">
      <MyButton @click="$router.push('/posts')">Posts</MyButton>
      <MyButton @click="$router.push('/about')">About</MyButton>
      <MyButton @click="$router.push('/postsVuex')">PostsVuex</MyButton>
      <MyButton @click="$router.push('/')">Home</MyButton>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
