import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/UserView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  { 
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
