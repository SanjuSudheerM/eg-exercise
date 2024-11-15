import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: () => import("./views/SignIn.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/SignUp.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "",
      redirect() {
        return { path: "/signin" };
      },
    },
  ],
});

export default router;
