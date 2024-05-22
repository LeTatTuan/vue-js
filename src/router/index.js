import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'dashboard',
        meta: { requiresAuth: true },
        component: () => import('@/views/Dashboard.vue'),
    },
    {
        path: '/users',
        name: 'users',
        meta: { requiresAuth: true, roles: ['ADMIN'] },
        component: () => import('@/views/UserList.vue'),
    },
    {
        path: '/login',
        name: 'login',
        meta: { layout: 'empty'},
        component: () => import('@/views/LoginPage.vue'),
    },
    {
        path: '/register',
        name: 'register',
        meta: { layout: 'empty' },
        component: () => import("@/views/RegisterPage.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior() {
        return { top: 0 };
    },
    routes,
});

export default router;