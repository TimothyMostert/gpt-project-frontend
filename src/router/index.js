import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/prompt',
      name: 'prompt',
      component: () => import(/* webpackChunkName: "prompt" */ '../views/PromptView.vue')
    },
    {
      path: '/itinerary',
      name: 'itinerary',
      component: () => import(/* webpackChunkName: "itinerary" */ '../views/ItineraryView.vue')
    },
  ]
})

export default router
