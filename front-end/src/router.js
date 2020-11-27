import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostPage from "./pages/PostPage";
import store from "./store/index";

const routes = [
  { path: "/", component: HomePage },
  { path: "/browse", component: BrowsePage },
  {
    path: "/toy/:id/edit",
    component: EditPage,
    beforeEnter: (_, __, next) => {
      if (store.getters.userInfo === null) {
        next("/login");
      }
      next();
    },
  },
  { path: "/toy/:id", component: DetailPage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  {
    path: "/post",
    component: PostPage,
    beforeEnter: (_, __, next) => {
      if (store.getters.userInfo === null) {
        next("/login");
      }
      next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
