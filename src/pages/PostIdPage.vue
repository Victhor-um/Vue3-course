<template>
  <div>
    <h1>Это страница поста с ID = {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  props: ['id'],
};
</script>

<style scoped></style>
