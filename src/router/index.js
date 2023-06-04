import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "@/stores/user.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      beforeEnter: (to, from, next) => {
        const store = useUserStore();
        if(store.isLoggedIn) {
          next({name: 'dashboard'});
        } else {
          next();
        }
      },
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () =>
        import(/* webpackChunkName: "prompt" */ "../views/DashboardView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/explore",
      name: "explore",
      component: () =>
        import(/* webpackChunkName: "prompt" */ "../views/ExploreView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "prompt" */ "../views/LoginView.vue"),
    },
    {
      path: "/auth/google/callback",
      name: "google-callback",
      component: () =>
        import(/* webpackChunkName: "prompt" */ "../views/CallbackView.vue"),
      props: (route) => ({ urlParams: route.query }),
    },
    {
      path: "/trip/create",
      name: "create",
      component: () =>
        import(/* webpackChunkName: "prompt" */ "../views/CreateView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/trip/:id",
      name: "trip",
      component: () =>
        import(/* webpackChunkName: "trip" */ "../views/TripView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useUserStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
