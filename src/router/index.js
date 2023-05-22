import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useVisitedRoutesStore } from '@/stores/routes.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/trip/create',
      name: 'trip-create',
      component: () => import(/* webpackChunkName: "prompt" */ '../views/CreateView.vue'),
    },
    {
      path: '/trip/view/:id',
      name: 'trip-view',
      component: () => import(/* webpackChunkName: "itinerary" */ '../views/TripView.vue'),
    },
  ]
})


router.beforeEach((to, from, next) => {
  const visitedRoutesStore = useVisitedRoutesStore()
  visitedRoutesStore.add(to.name);
  next();
});

export default router
