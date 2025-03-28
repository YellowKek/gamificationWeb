import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store.js";

const routes = [
    {
        path: "/",
        redirect: () => (store.state.isAuthenticated ? "/Home" : "/Auth"),
    },
    {
        path: "/Auth",
        name: "authPage",
        component: () => import("../views/AuthPage.vue"),
        meta: { guestOnly: true, hideHeader: true },
    },
    {
        path: "/Clan",
        name: "clanPage",
        component: () => import("../views/ClanPage.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/Profile",
        name: "profilePage",
        component: () => import("../views/ProfilePage.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/Home",
        name: "homePage",
        component: () => import("../views/HomePage.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/Admin",
        name: "adminPage",
        component: () => import("../views/AdminPage.vue"),
        meta: { requiresAuth: true },
    }
];

const router = createRouter({
    history: createWebHistory("/Gamification"),
    routes,
});

router.beforeEach((to, from, next) => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const isAuthenticated = store.state.isAuthenticated;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next("/Auth");
    } else if (to.meta.guestOnly && isAuthenticated) {
        next("/Home");
    } else {
        next();
    }

    next(); // Разрешение перехода без проверки аутентификации
});

export default router;
