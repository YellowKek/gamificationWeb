import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store.js";

const routes = [
    {
        path: "/",
        redirect: () => (store.state.isAuthenticated ? "/home" : "/auth"),
    },
    {
        path: "/auth",
        name: "authPage",
        component: () => import("../views/AuthPage.vue"),
        meta: { guestOnly: true },
    },
    {
        path: "/home",
        name: "homePage",
        component: () => import("../views/HomePage.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/profile",
        name: "profilePage",
        component: () => import("../views/ProfilePage.vue"),
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory("/Gamification"),
    routes,
});

router.beforeEach((to, from, next) => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const isAuthenticated = store.state.isAuthenticated;

    // if (to.meta.requiresAuth && !isAuthenticated) {
    //     next("/auth");
    // } else if (to.meta.guestOnly && isAuthenticated) {
    //     next("/home");
    // } else {
    //     next();
    // }

    next(); // Разрешение перехода без проверки аутентификации
});

export default router;
