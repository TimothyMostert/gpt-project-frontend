import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useVisitedRoutesStore } from "@/stores/routes.js";
import { useUserStore } from "@/stores/user.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
      name: "trip-create",
      component: () =>
        import(/* webpackChunkName: "prompt" */ "../views/CreateView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/trip/view/:id",
      name: "trip-view",
      component: () =>
        import(/* webpackChunkName: "itinerary" */ "../views/TripView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const visitedRoutesStore = useVisitedRoutesStore();
  const store = useUserStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (storeisLoggedIn) {
      visitedRoutesStore.add(to.name);
      next();
      return;
    }
    next("/login");
  } else {
    visitedRoutesStore.add(to.name);
    next();
  }
});

export default router;
