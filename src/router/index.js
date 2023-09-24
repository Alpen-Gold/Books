import { createRouter, createWebHistory } from "vue-router";
import BooksView from "../views/BooksView.vue";
import LoginView from "../views/LoginView.vue";
import BookDetail from "../views/BookDetailView.vue";
import store from "../stores";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Asosiy sahifa
    {
      path: "/",
      redirect: "/books",
      beforeEnter: (to, from, next) => {
        if (Boolean(store.state.isLogin)) {
          next();
        } else {
          next("/login");
        }
      },
    },

    // Kitoblar ro'yxati sahifasi
    {
      path: "/books",
      name: "books",
      component: BooksView,
      beforeEnter: (to, from, next) => {
        if (Boolean(store.state.isLogin)) {
          store.commit("setTypeViewBook", true);
          next();
        } else {
          store.commit("setTypeViewBook", true);
          next("/login");
        }
      },
    },

    // Kitoblar tafsilotlari sahifasi
    {
      path: "/books/:id",
      name: "book",
      component: BookDetail,
      beforeEnter: (to, from, next) => {
        // Ko'rish tugmasi bosilganda qidirish turi o'zgartiriladi
        store.commit("setTypeViewBook", false);

        next();
      },
    },

    // Kirish sahifasi
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: (to, from, next) => {
        if (!Boolean(store.state.isLogin)) {
          next();
        } else {
          next("/books");
        }
      },
    },

    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
      beforeEnter: (to, from, next) => {
        // Ko'rish tugmasi bosilganda qidirish turi o'zgartiriladi
        store.commit("setNotFoundView", false);

        next();
      },
    },
  ],
});

export default router;
