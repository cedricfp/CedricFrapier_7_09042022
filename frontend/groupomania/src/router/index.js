import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/UserView.vue";
import { isUserLogged } from "@/services/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      requireLogin: true,
    },
  },
  {
    //configuration pour l'absence de la nav bar sur cette page
    path: "/signup",
    name: "signup",
    component: SignupView,
    meta: {
      noNavbar: true,
    },
  },
  {
    //configuration pour l'absence de la nav bar sur cette page
    path: "/",
    name: "login",
    component: LoginView,
    meta: {
      noNavbar: true,
    },
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    meta: {
      requireLogin: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin && !isUserLogged()) {
    next("/");
  } else {
    next();
  }
});

export default router;
