import { createRouter, createWebHistory } from "vue-router";
import HeroSection from '@/views/HeroSection.vue' // Assume you have this view component

const routes = [
  {
    path: '/',
    component: HeroSection,
    // children: [
    //   {
    //     path: '/',
    //     component: HeroSection
    //   }
    // ]
  },
  // ... other routes ...
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
