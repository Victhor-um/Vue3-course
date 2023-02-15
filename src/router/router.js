import Main from '@/pages/Main.vue';
import postPage from '@/pages/PostPage.vue';
import about from '@/pages/About.vue';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/postPage',
    component: postPage,
  },
  {
    path: '/about',
    component: about,
  },
];
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default router;
