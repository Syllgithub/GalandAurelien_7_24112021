import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Newsfeed from "../views/Newsfeed.vue";
import Profile from "../views/Profile.vue";

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

function tokenGuard(to, from, next) {
  if (to.name == "Login" || to.name == "Signup") {
    if (cookies.isKey("token")) {
      next("/newsfeed");
    } else next();
  }
  if (to.name == "Newsfeed" || to.name == "Profile") {
    if (cookies.isKey("token")) {
      next();
    } else next("/");
  }
}
const routes = [
  {
    path: "/",
    name: "Login",
    beforeEnter: tokenGuard,
    component: Login,
  },
  {
    path: "/sign-up",
    name: "Signup",
    beforeEnter: tokenGuard,
    component: Signup,
  },
  {
    path: "/newsfeed",
    name: "Newsfeed",
    beforeEnter: tokenGuard,
    component: Newsfeed,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    beforeEnter: tokenGuard,
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
