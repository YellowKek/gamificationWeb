import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/', redirect: '/home',
    },
    {
        path: '/home',
        name: 'homePage',
        component: () => import('../views/HomePage.vue'),
    },
    {
        path: '/auth',
        name: 'authPage',
        component: () => import('../views/AuthPage.vue'),
    }
]

const router = createRouter({
    history: createWebHistory("/Gamification"),
    routes,
});

router.beforeEach((to, from, next) => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const nearestWithTitle = to.matched.find((route) => route.meta && route.meta.title);

    document.title = nearestWithTitle ? nearestWithTitle.meta.title : "Gamification Web";

    next();
});

export default router;