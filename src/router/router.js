import Main from '@/pages/Main.vue';
import postPage from '@/pages/PostPage.vue';
import about from '@/pages/About.vue';
import PostIdPage from '@/pages/PostIdPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/posts',
    component: postPage,
  },
  {
    path: '/about',
    component: about,
  },
  {
    path: '/posts/:id',
    component: PostIdPage,
  },
];
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default router;
